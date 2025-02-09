import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2';
import { TbDots } from 'react-icons/tb';
import { useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      // behavior: 'smooth'
    });
  }, [currentPage]);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 2) {
        pageNumbers.push('...');
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((pageNumber, index) =>
      typeof pageNumber === 'number' ? (
        <button
          key={index}
          type="button"
          aria-label={`Go to page ${pageNumber}`}
          onClick={() => onPageChange(pageNumber)}
          className={`transition-200 size-10 rounded-full border border-amber-400 ${
            currentPage === pageNumber ? 'bg-amber-400' : 'bg-amber-100'
          } text-lg font-medium text-dark hover:bg-amber-200 focus:outline-none focus:ring-4 focus:ring-amber-300`}
        >
          {pageNumber}
        </button>
      ) : (
        <span
          key={index}
          className="flex size-10 items-center justify-center text-center text-2xl font-medium text-dark"
        >
          {/* {pageNumber} */}
          <TbDots />
        </span>
      ),
    );
  };

  return (
    <div className="mt-16 flex items-center justify-center gap-8">
      <button
        type="button"
        aria-label="Go to previous page"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="transition-200 group flex items-center gap-1 rounded-full border border-amber-400/0 py-1.5 pl-6 pr-4 uppercase hover:border hover:border-amber-400 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <HiArrowLongLeft className="transition-200 origin-right text-2xl group-hover:-translate-x-1 group-hover:scale-x-[1.35]" />
        Prev
      </button>
      <div className="flex items-center gap-2">{renderPageNumbers()}</div>
      <button
        type="button"
        aria-label="Go to next page"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="transition-200 group flex items-center gap-1 rounded-full border border-amber-400/0 py-1.5 pl-4 pr-6 uppercase hover:border hover:border-amber-400 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
        <HiArrowLongRight className="transition-200 origin-left text-2xl group-hover:translate-x-1 group-hover:scale-x-[1.35]" />
      </button>
    </div>
  );
};

export default Pagination;
