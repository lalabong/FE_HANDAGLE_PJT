export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  POSTS: {
    BASE: '/api/posts',
    DETAIL: (postId: string) => `/api/posts/${postId}`,
    COMMENTS: {
      BASE: (postId: string) => `/api/posts/${postId}/comments`,
      DETAIL: (postId: string, commentId: string) => `/api/posts/${postId}/comments/${commentId}`,
    },
  },
};
