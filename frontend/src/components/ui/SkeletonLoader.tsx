const SkeletonLoader = () => {
  return (
    <div className="mb-4 overflow-hidden p-2">
      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <div
          className="group relative animate-pulse space-y-6"
          style={{ animationDuration: '1.5s' }}
        >
          <div>
            <div className="mb-2 h-8 w-4/5 rounded bg-gray-300"></div>
            <div className="h-4 w-1/4 rounded bg-gray-300"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-gray-300"></div>
            <div className="h-4 w-full rounded bg-gray-300"></div>
            <div className="h-4 w-full rounded bg-gray-300"></div>
            <div className="h-4 w-3/4 rounded bg-gray-300"></div>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="h-6 w-12 rounded-full bg-gray-300"></div>
              <div className="h-6 w-12 rounded-full bg-gray-300"></div>
              <div className="h-6 w-12 rounded-full bg-gray-300"></div>
              <div className="h-6 w-12 rounded-full bg-gray-300"></div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex w-full items-center justify-between gap-2">
            <div className="h-8 w-24 rounded-full bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-gray-300"></div>
              <div className="size-8 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
