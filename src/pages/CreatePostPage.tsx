import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@components/common/Button';
import Input from '@components/common/Input';
import TextArea from '@components/common/TextArea';
import MobileEditorHeader from '@components/header/mobile/MobileEditorHeader';

import { useCreatePostMutation } from '@hooks/queries/useCreatePostMutation';
import { useEditPostMutation } from '@hooks/queries/useEditPostMutation';
import { usePostDetailQuery } from '@hooks/queries/usePostDetailQuery';

import { useDeviceStore } from '@stores/useDeviceStore';

interface CreatePostFormErrors {
  title?: string;
  content?: string;
}

const CreatePostPage = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('postId');
  const isEditMode = Boolean(postId);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [originalContent, setOriginalContent] = useState('');

  const [formErrors, setFormErrors] = useState<CreatePostFormErrors>({});

  const isMobile = useDeviceStore((state) => state.isMobile);
  const responsivePaddingClass = useDeviceStore((state) => state.responsivePaddingClass);

  const { data: post } = usePostDetailQuery({ postId: postId || '' });
  const { mutate: createPost } = useCreatePostMutation();
  const { mutate: editPost } = useEditPostMutation();

  useEffect(() => {
    if (isEditMode && post) {
      setTitle(post.title || '');
      setContent(post.content || '');
      setOriginalTitle(post.title || '');
      setOriginalContent(post.content || '');
    }
  }, [isEditMode, postId, post]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const validateForm = (): boolean => {
    const errors: CreatePostFormErrors = {};
    let isValid = true;

    if (title.trim().length === 0) {
      errors.title = '제목을 1자 이상 입력해주세요.';
      isValid = false;
    }

    if (content.trim().length < 5) {
      errors.content = '내용을 5자 이상 입력해주세요.';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const hasChanges = useMemo(() => {
    if (!isEditMode) return true;

    return title.trim() !== originalTitle.trim() || content.trim() !== originalContent.trim();
  }, [isEditMode, title, content, originalTitle, originalContent]);

  const handleSubmit = () => {
    if (validateForm()) {
      try {
        if (isEditMode && postId) {
          editPost({ postId, payload: { title, content } });
        } else {
          createPost({ title, content });
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <>
      {isMobile && <MobileEditorHeader isEditMode={isEditMode} handleSubmit={handleSubmit} />}
      <main
        className={`w-full ${responsivePaddingClass} ${!isMobile && 'bg-[#F5F5F5]'}`}
        aria-labelledby="form-heading"
      >
        <section className="w-full">
          <div className={`${!isMobile && 'bg-white border border-[#EEEFF1] rounded-xl p-6'}`}>
            {!isMobile && (
              <h1 id="form-heading" className="text-xl font-bold mb-6">
                {isEditMode ? '게시글 수정' : '게시글 작성'}
              </h1>
            )}

            <form
              className="flex flex-col gap-4"
              aria-label={isEditMode ? '게시글 수정 양식' : '게시글 작성 양식'}
            >
              <div>
                <Input
                  placeholder="제목을 입력해주세요."
                  value={title}
                  onChange={(e) => handleTitleChange(e)}
                  name="title"
                  error={formErrors.title}
                  aria-label="게시글 제목"
                  aria-required="true"
                  aria-invalid={!!formErrors.title}
                />
              </div>

              <div>
                <TextArea
                  placeholder="내용을 입력해주세요."
                  value={content}
                  onChange={(e) => handleContentChange(e)}
                  name="content"
                  maxLength={300}
                  error={formErrors.content}
                  aria-label="게시글 내용"
                  aria-required="true"
                  aria-invalid={!!formErrors.content}
                />
              </div>

              {!isMobile && (
                <div className="flex justify-center mt-6">
                  <Button
                    variant="black"
                    size="lg"
                    onClick={() => handleSubmit()}
                    disabled={isEditMode && !hasChanges}
                    aria-disabled={isEditMode && !hasChanges}
                    type="button"
                  >
                    {isEditMode ? '수정하기' : '등록하기'}
                  </Button>
                </div>
              )}
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default CreatePostPage;
