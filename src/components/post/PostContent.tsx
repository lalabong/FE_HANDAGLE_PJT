interface PostContentProps {
  content: string;
  commentCount: number;
}

const PostContent = ({ content, commentCount }: PostContentProps) => {
  return (
    <div className="flex flex-col h-[261px] py-6 px-6 border-b border-[#EEEFF1] bg-white">
      <div className="flex flex-col justify-between h-full">
        <p className="text-base text-[#474953] whitespace-pre-wrap">{content}</p>

        <div className="flex items-center gap-2">
          <img src="/icon/comment-icon.png" alt="댓글 아이콘"/>
          <span className="text-base text-[#474953]">{commentCount}개</span>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
