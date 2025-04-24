import { memo, useMemo } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
}

const Pagination = memo(
  ({ currentPage, totalPages, pageSize = 5, onPageChange }: PaginationProps) => {
    const currentSet = Math.ceil(currentPage / pageSize); // 현재 보여지는 페이지 그룹
    const startPage = (currentSet - 1) * pageSize + 1; // 현재 보여지는 페이지 그룹의 첫 번째 페이지
    const endPage = Math.min(startPage + pageSize - 1, totalPages); // 현재 보여지는 페이지 그룹의 마지막 페이지(최대 totalPages)

    // 페이지 번호 배열 생성
    const pageNumbers = useMemo(() => {
      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    }, [startPage, endPage]);

    const handlePrevSet = () => {
      if (startPage > 1) {
        onPageChange(startPage - 1);
      }
    };

    const handleNextSet = () => {
      if (endPage < totalPages) {
        onPageChange(endPage + 1);
      }
    };

    return (
      <nav className="flex justify-center items-center py-6" aria-label="페이지네이션">
        <div className="flex gap-2">
          <button
            className="p-2"
            aria-label="이전 페이지 세트"
            onClick={() => handlePrevSet()}
            disabled={startPage <= 1}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={startPage <= 1 ? 'opacity-50' : ''}
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="#A7A9B4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`w-8 h-8 flex items-center justify-center ${
                currentPage === pageNumber ? 'bg-[#EEEFF1] rounded' : ''
              }`}
              onClick={() => onPageChange(pageNumber)}
              aria-current={currentPage === pageNumber ? 'page' : undefined}
            >
              <span className="text-base">{pageNumber}</span>
            </button>
          ))}

          <button
            className="p-2 rotate-180"
            aria-label="다음 페이지 세트"
            onClick={() => handleNextSet()}
            disabled={endPage >= totalPages}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={endPage >= totalPages ? 'opacity-50' : ''}
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="#A7A9B4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </nav>
    );
  },
);

export default Pagination;
