import Carousel from '@components/common/Carousel';
import PostList from '@components/post/list/PostList';
import MobilePostList from '@components/post/mobile/MobilePostList';

import { useDeviceStore } from '@stores/useDeviceStore';

import { cn } from '@lib/cn';

const HomePage = () => {
  const responsivePaddingClass = useDeviceStore((state) => state.responsivePaddingClass);

  const isMobile = useDeviceStore((state) => state.isMobile);

  return (
    <main
      className={cn(
        'flex flex-col items-center gap-5 py-8 md:py-16 lg:py-24',
        isMobile ? 'bg-white' : 'bg-[#F5F5F5]',
      )}
      aria-labelledby="main-heading"
    >
      <header className="text-center mb-4">
        <h2
          className={cn('text-[#5E616E] font-bold mb-3', 'text-md sm:text-lg')}
          aria-hidden="true"
        >
          다글제작소
        </h2>
        <h1 id="main-heading" className={cn('font-bold leading-relaxed', 'text-2xl sm:text-3xl')}>
          다글제작소의 과제전형에
          <br />
          오신 것을 환영합니다.
        </h1>
      </header>

      <section
        className={cn('w-full max-w-[1400px] overflow-hidden', responsivePaddingClass)}
        aria-label="메인 배너"
      >
        <Carousel />
      </section>

      {isMobile && (
        <hr
          className="w-full h-[12px] bg-[#F4F4F6]"
          role="separator"
          aria-orientation="horizontal"
        />
      )}

      <section className={cn('w-full', responsivePaddingClass)} aria-label="게시글 목록">
        {isMobile ? <MobilePostList /> : <PostList />}
      </section>
    </main>
  );
};

export default HomePage;
