import { useState } from 'react';

import DataStateHandler from '@components/common/DataStateHandler';
import CommentForm from '@components/post/CommentForm';
import CommentItem from '@components/post/CommentItem';

import { useGetCommentsQuery } from '@hooks/queries/useCommentsQuery';
import { useCreateCommentMutation } from '@hooks/queries/useCreateCommentMutation';
import { useDeleteCommentMutation } from '@hooks/queries/useDeleteCommentMutation';
import { useEditCommentMutation } from '@hooks/queries/useEditCommentMutation';

interface CommentSectionProps {
  postId: string;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentContent, setEditCommentContent] = useState('');

  const {
    data: comments,
    isPending: isCommentsPending,
    error: commentsError,
  } = useGetCommentsQuery({ postId: postId });

  const commentMutation = useCreateCommentMutation({ postId });
  const editCommentMutation = useEditCommentMutation({ postId });
  const deleteCommentMutation = useDeleteCommentMutation({ postId });

  const handleCommentSubmit = (content: string) => {
    commentMutation.mutate({ postId, content });
  };

  const handleEditCommentSubmit = (commentId: string) => {
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
  };

  const handleEditCommentStart = (commentId: string, content: string) => {
    setEditingCommentId(commentId);
    setEditCommentContent(content);
  };

  const handleEditCommentCancel = () => {
    setEditingCommentId(null);
    setEditCommentContent('');
  };

  const handleDeleteComment = (commentId: string) => {
    if (!postId) return;

    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      deleteCommentMutation.mutate({ postId, commentId });
    }
  };

  const commentListLoadingComponent = <div className="p-4 text-center">댓글을 불러오는 중...</div>;

  const commentListErrorComponent = (
    <div className="p-4 text-center text-red-500">댓글을 불러오는 중 오류가 발생했습니다.</div>
  );

  return (
    <>
      <DataStateHandler
        data={comments}
        isLoading={isCommentsPending}
        error={commentsError}
        loadingComponent={commentListLoadingComponent}
        errorComponent={commentListErrorComponent}
      >
        {(commentsData) => (
          <section aria-label="댓글 목록">
            {commentsData.length === 0 ? (
              <p className="text-center text-gray-500 py-4">첫 댓글을 작성해보세요!</p>
            ) : (
              <ul aria-label={`총 ${commentsData.length}개의 댓글`}>
                {commentsData.map((comment) => (
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
        )}
      </DataStateHandler>

      <section aria-label="댓글 작성">
        <CommentForm onSubmit={handleCommentSubmit} />
      </section>
    </>
  );
};

export default CommentSection;
