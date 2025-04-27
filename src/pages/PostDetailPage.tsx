import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DataStateHandler from '@components/common/DataStateHandler';
import PostContent from '@components/post/PostContent';
import PostDetailHeader from '@components/post/PostDetailHeader';
import CommentSection from '@components/post/comment/CommentSection';
import PostDetailSkeleton from '@components/skeleton/post/PostDetailSkeleton';

import { PATH } from '@constants/path';

import { useDeletePostMutation } from '@hooks/queries/post/useDeletePostMutation';
import { usePostDetailQuery } from '@hooks/queries/post/usePostDetailQuery';

import { useDeviceStore } from '@stores/useDeviceStore';

const PostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>();

  const navigate = useNavigate();

  const responsivePaddingClass = useDeviceStore((state) => state.responsivePaddingClass);
  const isMobile = useDeviceStore((state) => state.isMobile);

  // 페이지 진입 시 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  const {
    data: post,
    isPending: isPostPending,
    error: postError,
  } = usePostDetailQuery({ postId: postId || '' });

  const deletePostMutation = useDeletePostMutation();

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

  const postDetailLoadingComponent = (
    <div className={`w-full ${isMobile ? 'pb-[80px]' : responsivePaddingClass}`}>
      <PostDetailSkeleton />
      <span id="loading-status" className="sr-only">
        게시글을 불러오는 중입니다
      </span>
    </div>
  );

  const postDetailErrorComponent = (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4 bg-[#F5F5F5]">
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
    </div>
  );

  return (
    <main
      className={`flex flex-col items-center min-h-[calc(100vh-var(--header-height,0px))] ${isMobile ? 'bg-white' : 'bg-[#F5F5F5]'}`}
      aria-labelledby="post-title"
    >
      <DataStateHandler
        data={post}
        isLoading={isPostPending}
        error={postError}
        loadingComponent={postDetailLoadingComponent}
        errorComponent={postDetailErrorComponent}
      >
        {(postData) => (
          <div className={`w-full ${isMobile ? 'pb-[80px]' : responsivePaddingClass}`}>
            <article
              className={`w-full overflow-hidden bg-white ${!isMobile && 'rounded-xl border border-[#EEEFF1]'}`}
            >
              <PostDetailHeader
                title={postData.title}
                author={postData.author.nickname}
                authorId={postData.author.id}
                createdAt={postData.createdAt}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
              />

              <PostContent content={postData.content} commentCount={postData.commentCount} />

              <CommentSection postId={postId || ''} />
            </article>
          </div>
        )}
      </DataStateHandler>
    </main>
  );
};

export default PostDetailPage;
