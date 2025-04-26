export const PATH = {
  ROOT: '/',
  LOGIN: '/login',
  DETAIL_POST: (postId: string = ':postId') => `/post/${postId}`,
  CREATE_AND_EDIT_POST: (postId: string = ':postId') => `/post/create?postId=${postId}`,
};
