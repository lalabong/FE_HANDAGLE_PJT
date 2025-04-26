import { Button } from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import { useDeviceStore } from '@/store/useDeviceStore';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface FormErrors {
  title?: string;
  content?: string;
}

const CreatePostPage = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('postId');
  const isEditMode = Boolean(postId);

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const isMobile = useDeviceStore((state) => state.isMobile);
  const responsivePaddingClass = useDeviceStore((state) => state.responsivePaddingClass);

  useEffect(() => {
    if (isEditMode) {
      // 원본 글 내용 가져오기
    }
  }, [isEditMode, postId]);

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

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // 글 수정 or 작성 로직
        alert(isEditMode ? '게시글이 수정되었습니다.' : '게시글이 등록되었습니다.');
        // 수정이면 해당 글로, 작성이면 작성한 글의 상세 페이지로 이동
        navigate(isEditMode ? `/posts/${postId}` : '/posts');
      } catch (error) {
        alert('게시글 등록 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <>
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
                  <Button variant="black" size="lg" onClick={() => handleSubmit()}>
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
