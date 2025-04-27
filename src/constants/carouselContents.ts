export interface CarouselContent {
  id: number;
  src: string;
  title: string;
  subtitle: string;
  description: string;
}

export const CAROUSEL_CONTENTS: CarouselContent[] = [
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
