import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CommentForm from '@components/post/CommentForm';
import CommentItem from '@components/post/CommentItem';
import PostContent from '@components/post/PostContent';
import PostDetailHeader from '@components/post/PostDetailHeader';

import { PATH } from '@constants/path';

import { useGetCommentsQuery } from '@hooks/queries/useCommentsQuery';
import { useCreateCommentMutation } from '@hooks/queries/useCreateCommentMutation';
import { useDeleteCommentMutation } from '@hooks/queries/useDeleteCommentMutation';
import { useDeletePostMutation } from '@hooks/queries/useDeletePostMutation';
import { useEditCommentMutation } from '@hooks/queries/useEditCommentMutation';
import { usePostDetailQuery } from '@hooks/queries/usePostDetailQuery';

import { useDeviceStore } from '@stores/useDeviceStore';

const PostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const responsivePaddingClass = useDeviceStore((state) => state.responsivePaddingClass);
  const isMobile = useDeviceStore((state) => state.isMobile);

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentContent, setEditCommentContent] = useState('');

  const {
    data: post,
    isPending: isPostPending,
    error: postError,
  } = usePostDetailQuery({ postId: postId || '' });
  const {
    data: comments,
    isPending: isCommentsPending,
    error: commentsError,
  } = useGetCommentsQuery({ postId: postId || '' });

  const commentMutation = useCreateCommentMutation({ postId: postId || '' });
  const editCommentMutation = useEditCommentMutation({ postId: postId || '' });
  const deleteCommentMutation = useDeleteCommentMutation({ postId: postId || '' });

  const deletePostMutation = useDeletePostMutation();

  const handleCommentSubmit = useCallback(
    (content: string) => {
      commentMutation.mutate({ postId: postId || '', content });
    },
    [commentMutation, postId],
  );

  const handleEditCommentStart = useCallback((commentId: string, content: string) => {
    setEditingCommentId(commentId);
    setEditCommentContent(content);
  }, []);

  const handleEditCommentCancel = useCallback(() => {
    setEditingCommentId(null);
    setEditCommentContent('');
  }, []);

  const handleEditCommentSubmit = useCallback(
    (commentId: string) => {
      if (!postId || !editCommentContent.trim()) return;

      editCommentMutation.mutate(
        {
          postId,
          commentId,
          content: editCommentContent,
        },
        {
          onSuccess: () => {
            setEditingCommentId(null);
            setEditCommentContent('');
          },
        },
      );
    },
    [editCommentContent, editCommentMutation, postId],
  );

  const handleDeleteComment = useCallback(
    (commentId: string) => {
      if (!postId) return;

      if (window.confirm('댓글을 삭제하시겠습니까?')) {
        deleteCommentMutation.mutate({ postId, commentId });
      }
    },
    [deleteCommentMutation, postId],
  );

  const handleBackClick = () => {
    navigate(PATH.ROOT);
  };

  const handleEditPost = useCallback(() => {
    if (postId) {
      navigate(PATH.CREATE_AND_EDIT_POST(postId));
    }
  }, [navigate, postId]);

  const handleDeletePost = useCallback(() => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      deletePostMutation.mutate(postId || '');
    }
  }, [deletePostMutation, postId]);

  if (isPostPending || isCommentsPending) {
    return (
      <main
        className="flex justify-center items-center min-h-screen bg-[#F5F5F5]"
        aria-labelledby="loading-status"
      >
        <p id="loading-status" className="text-gray-500" aria-live="polite">
          게시글을 불러오는 중입니다...
        </p>
      </main>
    );
  }

  if (postError || commentsError || !post || !comments) {
    return (
      <main
        className="flex flex-col justify-center items-center min-h-screen gap-4 bg-[#F5F5F5]"
        aria-labelledby="error-status"
      >
        <p id="error-status" className="text-red-500" aria-live="assertive">
          게시글을 불러오는 중 오류가 발생했습니다.
        </p>
        <button
          onClick={handleBackClick}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          aria-label="홈으로 돌아가기"
        >
          홈으로 돌아가기
        </button>
      </main>
    );
  }

  return (
    <main
      className={`flex flex-col items-center min-h-[calc(100vh-var(--header-height,0px))] ${isMobile ? 'bg-white' : 'bg-[#F5F5F5]'}`}
      aria-labelledby="post-title"
    >
      <div className={`w-full ${isMobile ? 'pb-[80px]' : responsivePaddingClass}`}>
        <article
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

          <section aria-label="댓글 목록">
            {comments.length === 0 ? (
              <p className="text-center text-gray-500 py-4">첫 댓글을 작성해보세요!</p>
            ) : (
              <ul aria-label={`총 ${comments.length}개의 댓글`}>
                {comments.map((comment) => (
                  <li key={comment.id}>
                    <CommentItem
                      author={comment.user.nickname}
                      authorId={comment.user.id}
                      content={comment.content}
                      createdAt={comment.createdAt}
                      isEditing={editingCommentId === comment.id}
                      editContent={editingCommentId === comment.id ? editCommentContent : ''}
                      onEditChange={(e) => setEditCommentContent(e.target.value)}
                      onEditStart={() => handleEditCommentStart(comment.id, comment.content)}
                      onEditCancel={handleEditCommentCancel}
                      onEditSubmit={() => handleEditCommentSubmit(comment.id)}
                      onDelete={() => handleDeleteComment(comment.id)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section aria-label="댓글 작성">
            <CommentForm onSubmit={handleCommentSubmit} />
          </section>
        </article>
      </div>
    </main>
  );
};

export default PostDetailPage;
