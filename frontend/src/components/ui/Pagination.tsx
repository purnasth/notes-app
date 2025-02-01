import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2';

const Pagination = () => {
  return (
    <>
      <div className="mt-16 flex items-center justify-center gap-8">
        <button className="transition-200 group flex items-center gap-1 rounded-full border border-amber-400/0 py-1.5 pl-6 pr-4 uppercase hover:border hover:border-amber-400 hover:bg-amber-100">
          <HiArrowLongLeft className="transition-200 origin-right text-2xl group-hover:-translate-x-1 group-hover:scale-x-[1.35]" />
          Prev
        </button>
        <div className="flex items-center gap-2">
          <button className="transition-200 size-10 rounded-full border border-amber-400 bg-amber-400 text-lg font-medium text-dark hover:bg-amber-200 focus:outline-none focus:ring-4 focus:ring-amber-300">
            1
          </button>
          <button className="transition-200 size-10 rounded-full border border-amber-400 bg-amber-100 text-lg font-medium text-dark hover:bg-amber-200 focus:outline-none focus:ring-4 focus:ring-amber-300">
            2
          </button>
          <button className="transition-200 size-10 rounded-full border border-amber-400 bg-amber-100 text-lg font-medium text-dark hover:bg-amber-200 focus:outline-none focus:ring-4 focus:ring-amber-300">
            3
          </button>
        </div>
        <button className="transition-200 group flex items-center gap-1 rounded-full border border-amber-400/0 py-1.5 pl-4 pr-6 uppercase hover:border hover:border-amber-400 hover:bg-amber-100">
          Next
          <HiArrowLongRight className="transition-200 origin-left text-2xl group-hover:translate-x-1 group-hover:scale-x-[1.35]" />
        </button>
      </div>
    </>
  );
};

export default Pagination;
