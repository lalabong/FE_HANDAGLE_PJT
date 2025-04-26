import { useState } from 'react';


import { useAuthStore } from '@stores/useAuthStore';
import { useDeviceStore } from '@stores/useDeviceStore';

import { Button } from '../common/Button';

interface CommentFormProps {
  onSubmit: (content: string) => void;
}

const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [content, setContent] = useState('');
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isMobile = useDeviceStore((state) => state.isMobile);

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
  };

  return (
    <div
      className={`flex items-center gap-3 p-6 bg-white rounded-b-xl ${isMobile ? 'fixed bottom-0 left-0 right-0 z-50' : ''}`}
    >
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 통해 자유롭게 의견을 나눠보세요"
        className="flex-1 p-3 text-base text-black border-0 border-b-2 border-b-[#EEEFF1] focus:outline-none focus:border-b-black focus:ring-0"
        disabled={!isAuthenticated}
      />
      <Button variant={'black'} onClick={handleSubmit}>
        등록
      </Button>
    </div>
  );
};

export default CommentForm;
