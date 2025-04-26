import { Button } from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import MobileEditorHeader from '@/components/Header/Mobile/MobileEditorHeader';
import { usePostDetailQuery } from '@/hooks/queries/usePostDetailQuery';
import { useDeviceStore } from '@/store/useDeviceStore';
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCreatePostMutation } from '@/hooks/queries/useCreatePostMutation';
import { useEditPostMutation } from '@/hooks/queries/useEditPostMutation';

interface FormErrors {
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

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const isMobile = useDeviceStore((state) => state.isMobile);
  const responsivePaddingClass = useDeviceStore((state) => state.responsivePaddingClass);

  const { data: post } = usePostDetailQuery(postId || '');
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
    const errors: FormErrors = {};
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
          editPost({ postId, title, content });
        } else {
          createPost({ title, content });
        }
      } catch (error) {
        alert('게시글 등록 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <>
      {isMobile && <MobileEditorHeader isEditMode={isEditMode} handleSubmit={handleSubmit} />}
      <div className={`w-full ${responsivePaddingClass} ${!isMobile && 'bg-[#F5F5F5]'}`}>
        <div className="w-full">
          <div className={`${!isMobile && 'bg-white border border-[#EEEFF1] rounded-xl p-6'}`}>
            {!isMobile && (
              <h1 className="text-xl font-bold mb-6">
                {isEditMode ? '게시글 수정' : '게시글 작성'}
              </h1>
            )}

            <div className="flex flex-col gap-4">
              <Input
                placeholder="제목을 입력해주세요."
                value={title}
                onChange={(e) => handleTitleChange(e)}
                name="title"
                error={formErrors.title}
              />

              <TextArea
                placeholder="내용을 입력해주세요."
                value={content}
                onChange={(e) => handleContentChange(e)}
                name="content"
                maxLength={300}
                error={formErrors.content}
              />

              {!isMobile && (
                <div className="flex justify-center mt-6">
                  <Button
                    variant="black"
                    size="lg"
                    onClick={() => handleSubmit()}
                    disabled={isEditMode && !hasChanges}
                  >
                    {isEditMode ? '수정하기' : '등록하기'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePostPage;
