export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: CommentUser;
  }
  
  export interface CommentUser {
    id: string;
    nickname: string;
  }