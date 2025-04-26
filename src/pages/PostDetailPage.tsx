import CommentForm from '@/components/post/CommentForm';
import CommentItem from '@/components/post/CommentItem';
import PostContent from '@/components/post/PostContent';
import PostDetailHeader from '@/components/post/PostDetailHeader';
import { PATH } from '@/constants/path';
import { useGetCommentsQuery } from '@/hooks/queries/useCommentsQuery';
import { usePostCommentMutation } from '@/hooks/queries/usePostCommentMutation';
import { usePostDetailQuery } from '@/hooks/queries/usePostDetailQuery';
import { useDeviceStore } from '@/store/useDeviceStore';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const responsivePaddingClass = useDeviceStore((state) => state.responsivePaddingClass);
  const isMobile = useDeviceStore((state) => state.isMobile);

  const {
    data: post,
    isPending: isPostPending,
    error: postError,
  } = usePostDetailQuery(postId || '');
  const {
    data: comments,
    isPending: isCommentsPending,
    error: commentsError,
  } = useGetCommentsQuery(postId || '');
  const commentMutation = usePostCommentMutation({ postId: postId || '' });

  const handleCommentSubmit = useCallback(
    (content: string) => {
      commentMutation.mutate(content);
    },
    [commentMutation],
  );

  const handleEditComment = useCallback(() => {
    // 댓글 수정 로직
  }, []);

  const handleDeleteComment = useCallback(() => {
    // 댓글 삭제 로직
  }, []);

  const handleBackClick = () => {
    navigate(PATH.ROOT);
  };

  const handleEditPost = useCallback(() => {
    if (postId) {
      navigate(PATH.CREATE_AND_EDIT_POST(postId));
    }
  }, [navigate, postId]);

  const handleDeletePost = useCallback(() => {
    // 게시글 삭제 로직
    alert('게시글이 삭제되었습니다.');
    navigate(PATH.ROOT);
  }, [navigate]);

  if (isPostPending || isCommentsPending) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F5F5F5]">
        <p className="text-gray-500">게시글을 불러오는 중입니다...</p>
      </div>
    );
  }

  if (postError || commentsError || !post || !comments) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4 bg-[#F5F5F5]">
        <p className="text-red-500">게시글을 불러오는 중 오류가 발생했습니다.</p>
        <button
          onClick={() => handleBackClick()}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <main
      className={`flex flex-col items-center min-h-[calc(100vh-var(--header-height,0px))] ${isMobile ? 'bg-white' : 'bg-[#F5F5F5]'}`}
    >
      <div className={`w-full ${isMobile ? 'pb-[80px]' : responsivePaddingClass}`}>
        <div
          className={`w-full overflow-hidden bg-white ${!isMobile && 'rounded-xl border border-[#EEEFF1]'}`}
        >
          <PostDetailHeader
            title={post.title}
            author={post.author.nickname}
            authorId={post.author.id}
            createdAt={post.createdAt}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
          />

          <PostContent content={post.content} commentCount={post.commentCount} />

          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              author={comment.user.nickname}
              authorId={comment.user.id}
              content={comment.content}
              createdAt={comment.createdAt}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
            />
          ))}

          <CommentForm onSubmit={handleCommentSubmit} />
        </div>
      </div>
    </main>
  );
};

export default PostDetailPage;
