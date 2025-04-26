export const PATH = {
  ROOT: '/',
  LOGIN: '/login',
  DETAIL_POST: (postId: string = ':postId') => `/post/${postId}`,
  CREATE_POST: '/post/create',
  CREATE_AND_EDIT_POST: (postId?: string) => {
    // postId가 있으면 수정 모드, 없으면 생성 모드
    return postId && postId !== ':postId' ? `/post/create?postId=${postId}` : PATH.CREATE_POST;
  },
};
