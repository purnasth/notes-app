import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2';

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
  return (
    <>
      <div className="mt-16 flex items-center justify-center gap-8">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="transition-200 group flex items-center gap-1 rounded-full border border-amber-400/0 py-1.5 pl-6 pr-4 uppercase hover:border hover:border-amber-400 hover:bg-amber-100"
        >
          <HiArrowLongLeft className="transition-200 origin-right text-2xl group-hover:-translate-x-1 group-hover:scale-x-[1.35]" />
          Prev
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`transition-200 size-10 rounded-full border border-amber-400 ${
                  currentPage === pageNumber ? 'bg-amber-400' : 'bg-amber-100'
                } text-lg font-medium text-dark hover:bg-amber-200 focus:outline-none focus:ring-4 focus:ring-amber-300`}
              >
                {pageNumber}
              </button>
            ),
          )}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="transition-200 group flex items-center gap-1 rounded-full border border-amber-400/0 py-1.5 pl-4 pr-6 uppercase hover:border hover:border-amber-400 hover:bg-amber-100"
        >
          Next
          <HiArrowLongRight className="transition-200 origin-left text-2xl group-hover:translate-x-1 group-hover:scale-x-[1.35]" />
        </button>
      </div>
    </>
  );
};

export default Pagination;
