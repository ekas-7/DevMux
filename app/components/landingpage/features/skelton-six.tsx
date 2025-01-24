
export const SkeletonSix = () => {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-full max-w-md p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
          <div className="flex justify-between items-end h-32 mb-4">
            <div className="w-1/6 bg-blue-500 dark:bg-blue-400 h-1/3"></div>
            <div className="w-1/6 bg-blue-500 dark:bg-blue-400 h-2/3"></div>
            <div className="w-1/6 bg-blue-500 dark:bg-blue-400 h-full"></div>
            <div className="w-1/6 bg-blue-500 dark:bg-blue-400 h-1/2"></div>
            <div className="w-1/6 bg-blue-500 dark:bg-blue-400 h-3/4"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }
  
  