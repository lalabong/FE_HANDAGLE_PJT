export const PATH = {
  ROOT: '/',
  LOGIN: '/login',
  DETAIL_POST: (postId: string = ':postId') => `/post/${postId}`,
  CREATE_POST: '/post/create',
};
