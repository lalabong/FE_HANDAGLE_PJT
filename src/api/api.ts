import { postRefreshToken } from '@/api/user/postRefreshToken';
import { useAuthStore } from '@/store/useAuthStore';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

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
    const accessToken = useAuthStore.getState().accessToken;
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
    const response = await postRefreshToken(currentRefreshToken);
    const { accessToken, refreshToken } = response;

    if (!accessToken) {
      throw new Error('유효하지 않은 토큰 응답 형식입니다.');
    }

    useAuthStore.getState().setTokens(accessToken, refreshToken || currentRefreshToken);

    return accessToken;
  } catch (error) {
    useAuthStore.getState().logout();
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

    if (error.response?.status === 401 && originalRequest.retryCount < 3) {
      originalRequest.retryCount += 1;

      // 이미 재시도 중인 요청은 건너뜀
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // 이미 토큰 갱신 중이면 큐에 추가
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

      const currentRefreshToken = useAuthStore.getState().refreshToken;

      if (!currentRefreshToken) {
        useAuthStore.getState().logout();
        processQueue(new Error('리프레시 토큰이 없습니다.') as AxiosError);
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
        useAuthStore.getState().logout();
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
