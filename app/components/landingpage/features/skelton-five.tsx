
export const SkeletonFive = () => {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-full max-w-md p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
            <div className="w-10 h-10 bg-green-500 rounded-full"></div>
            <div className="w-10 h-10 bg-yellow-500 rounded-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }