export const SUCCESS_MESSAGES = {
  LOGIN: '로그인이 완료되었습니다.',
  LOGOUT: '로그아웃 되었습니다.',
  POST: {
    CREATE: '게시글이 등록되었습니다.',
    UPDATE: '게시글이 수정되었습니다.',
    DELETE: '게시글이 삭제되었습니다.',
  },
  COMMENT: {
    CREATE: '댓글이 등록되었습니다.',
    UPDATE: '댓글이 수정되었습니다.',
    DELETE: '댓글이 삭제되었습니다.',
  },
};

export const ERROR_MESSAGES = {
  COMMON: {
    NETWORK: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
    UNAUTHORIZED: '로그인이 필요합니다.',
    REQUIRED_FIELD: '필수 입력 항목이 누락되었습니다.',
  },
  AUTH: {
    INVALID_CREDENTIALS: '아이디 또는 비밀번호가 일치하지 않습니다.',
    NO_USER: '존재하지 않는 아이디입니다.',
    NO_REFRESH_TOKEN: '리프레시 토큰이 없습니다.',
    INVALID_TOKEN_RESPONSE: '유효하지 않은 토큰 응답 형식입니다.',
  },
  POST: {
    NOT_FOUND: '게시글을 찾을 수 없습니다.',
    DELETE_ERROR: '게시글 삭제 중 오류가 발생했습니다.',
  },
  COMMENT: {
    NOT_FOUND: '댓글을 찾을 수 없습니다.',
    DELETE_ERROR: '댓글 삭제 중 오류가 발생했습니다.',
  },
};
