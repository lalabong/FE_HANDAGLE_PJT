import { useDeviceStore } from '@/stores/useDeviceStore';
import { useEffect, useRef, useState } from 'react';

const carouselContents = [
  {
    id: 1,
    src: 'carousel/sparta-bg.png',
    title: '스파르타빌더스',
    subtitle: '팀스파르타',
    description: '물류 관계자 비교견적 솔루션',
  },
  {
    id: 2,
    src: 'carousel/kosta-bg.png',
    title: 'KOSTA-EDU',
    subtitle: '한국소프트웨어 기술진흥협회',
    description: '학습관리 시스템',
  },
  {
    id: 3,
    src: 'carousel/printi-bg.png',
    title: '프린티',
    subtitle: '주식회사 프린티',
    description: '작가와 팬을 잇는 일러스트 출력 플랫폼',
  },
  {
    id: 4,
    src: 'carousel/dalcom-bg.png',
    title: '달콤수학',
    subtitle: '달콤교육',
    description: '엄마표 온라인 수학교육 강의 플랫폼',
  },
];

const Carousel = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLUListElement>(null);

  const isMobile = useDeviceStore((state) => state.isMobile);
  const cardWidth = isMobile ? 'w-[280px]' : 'w-[319px]';

  const allContents = [...carouselContents, ...carouselContents, ...carouselContents];

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      if (isPaused) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      setScrollPosition((prev) => {
        const contentWidth = contentRef.current?.firstElementChild?.clientWidth || 0; // 각 콘텐츠의 너비
        const firstSetWidth = contentWidth * carouselContents.length; // 한 콘텐츠 세트의 총 너비
        let newPosition = prev + 0.8; // 속도 조절

        // 첫 번째 콘텐츠 세트의 너비만큼 이동했다면, 보이지 않게 처음 위치로 이동
        if (newPosition >= firstSetWidth) {
          newPosition = 0;
        }

        return newPosition;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

  // 마우스를 올리면 멈춤 처리
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section
      className="w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={carouselRef}
      aria-label="프로젝트 쇼케이스"
      role="region"
    >
      <ul
        className="flex"
        style={{ transform: `translateX(-${scrollPosition}px)` }}
        ref={contentRef}
      >
        {allContents.map((content, index) => (
          <li
            key={`${content.id}-${index}`}
            className="shrink-0 px-2.5"
            aria-hidden={index >= carouselContents.length ? 'true' : 'false'}
          >
            <article className={`relative ${cardWidth} h-[391px] rounded-[20px] overflow-hidden`}>
              <figure className="h-full w-full">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${content.src})` }}
                  role="img"
                  aria-label={`${content.title} 프로젝트 이미지`}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <figcaption className="absolute inset-0 p-6 flex flex-col justify-between">
                  <header>
                    <h3 className="text-white text-2xl font-bold leading-9 tracking-tight">
                      {content.title}
                    </h3>
                  </header>
                  <footer className="flex flex-col gap-4">
                    <div className="h-px bg-[#D6D7DC]"></div>
                    <div className="flex flex-col gap-2">
                      <p className="text-white text-base font-normal leading-6 line-clamp-2 min-h-[48px]">
                        {content.description}
                      </p>
                      <cite className="text-white text-base font-bold leading-6 not-italic">
                        {content.subtitle}
                      </cite>
                    </div>
                  </footer>
                </figcaption>
              </figure>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Carousel;
