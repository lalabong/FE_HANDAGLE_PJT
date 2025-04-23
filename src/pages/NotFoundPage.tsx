const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">페이지를 찾을 수 없습니다.</p>
        <a
          href="/"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          tabIndex={0}
          aria-label="홈으로 돌아가기"
        >
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
