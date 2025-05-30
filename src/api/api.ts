import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { postRefreshToken } from '@api/user/postRefreshToken';

import { ERROR_MESSAGES } from '@constants/messages';
import { STATUS_CODES } from '@constants/statusCodes';

import { useAuthStore } from '@stores/useAuthStore';

const BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().tokens?.accessToken;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false;
// 토큰 갱신을 기다리는 요청들의 콜백 큐
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void }[] = [];

// 토큰 갱신 완료 후 큐에 있는 요청 처리
const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const refreshAuthToken = async (currentRefreshToken: string): Promise<string> => {
  try {
    const response = await postRefreshToken({ refreshToken: currentRefreshToken });
    const { accessToken, refreshToken } = response;

    if (!accessToken) {
      throw new Error(ERROR_MESSAGES.AUTH.INVALID_TOKEN_RESPONSE);
    }

    useAuthStore
      .getState()
      .setTokens({ accessToken, refreshToken: refreshToken || currentRefreshToken });

    return accessToken;
  } catch (error) {
    useAuthStore.getState().clearAuth();
    throw error;
  }
};

const redirectToLogin = () => {
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname;
    window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
  }
};

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: any) => {
    const originalRequest = error.config;

    // 재시도 횟수 제한 설정
    originalRequest.retryCount = originalRequest.retryCount || 0;

    if (error.response?.status === STATUS_CODES.UNAUTHORIZED && originalRequest.retryCount < 3) {
      originalRequest.retryCount += 1;

      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const currentRefreshToken = useAuthStore.getState().tokens?.refreshToken;

      if (!currentRefreshToken) {
        useAuthStore.getState().clearAuth();
        processQueue(new Error(ERROR_MESSAGES.AUTH.NO_REFRESH_TOKEN) as AxiosError);
        redirectToLogin();
        return Promise.reject(error);
      }

      try {
        const newAccessToken = await refreshAuthToken(currentRefreshToken);

        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        return apiClient(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();
        processQueue(refreshError as AxiosError);
        redirectToLogin();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

const handleApiError = (error: any) => {
  throw {
    status: error.response?.status || 500,
    originalError: error,
    message: error.response?.data?.message || '요청 처리 중 오류가 발생했습니다',
    timestamp: new Date().toISOString(),
  };
};

type ApiMethod = <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;

const createApiMethod = (
  method: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<any>>,
): ApiMethod => {
  return <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return method(url, data, config)
      .then((response) => response.data)
      .catch(handleApiError);
  };
};

export const api = {
  get: createApiMethod(apiClient.get),
  post: createApiMethod(apiClient.post),
  put: createApiMethod(apiClient.put),
  delete: createApiMethod(apiClient.delete),
  patch: createApiMethod(apiClient.patch),
};

export default api;
