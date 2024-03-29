export default function Loading() {
  return (
    <div
      role='status'
      className='mb-4 max-w-lg space-y-2.5 rounded-lg border border-gray-200 p-6 dark:border-gray-700 dark:bg-gray-900'
    >
      <div className='flex w-full items-center'>
        <div className='h-2.5 w-32 animate-pulse-slow rounded-full bg-gray-200 dark:bg-gray-700'></div>
        <div className='ms-2 h-2.5 w-24 animate-pulse-normal rounded-full bg-gray-300 dark:bg-gray-600'></div>
        <div className='ms-2 h-2.5 w-full animate-pulse-fast rounded-full bg-gray-300 dark:bg-gray-600'></div>
      </div>
      <div className='flex w-full max-w-[480px] items-center'>
        <div className='h-2.5 w-full animate-pulse-normal rounded-full bg-gray-200 dark:bg-gray-700'></div>
        <div className='ms-2 h-2.5 w-full animate-pulse-slow rounded-full bg-gray-300 dark:bg-gray-600'></div>
        <div className='ms-2 h-2.5 w-24 animate-pulse-fast rounded-full bg-gray-300 dark:bg-gray-600'></div>
      </div>
      <div className='flex w-full max-w-[400px] items-center'>
        <div className='h-2.5 w-full animate-pulse-fast rounded-full bg-gray-300 dark:bg-gray-600'></div>
        <div className='ms-2 h-2.5 w-80 animate-pulse-normal rounded-full bg-gray-200 dark:bg-gray-700'></div>
        <div className='ms-2 h-2.5 w-full animate-pulse-slow rounded-full bg-gray-300 dark:bg-gray-600'></div>
      </div>
      <div className='flex w-full max-w-[480px] items-center'>
        <div className='ms-2 h-2.5 w-full animate-pulse-slow rounded-full bg-gray-200 dark:bg-gray-700'></div>
        <div className='ms-2 h-2.5 w-full animate-pulse-normal rounded-full bg-gray-300 dark:bg-gray-600'></div>
        <div className='ms-2 h-2.5 w-24 animate-pulse-fast rounded-full bg-gray-300 dark:bg-gray-600'></div>
      </div>
      <div className='flex w-full max-w-[440px] items-center'>
        <div className='ms-2 h-2.5 w-32 animate-pulse-normal rounded-full bg-gray-300 dark:bg-gray-600'></div>
        <div className='ms-2 h-2.5 w-24 animate-pulse-slow rounded-full bg-gray-300 dark:bg-gray-600'></div>
        <div className='ms-2 h-2.5 w-full animate-pulse-fast rounded-full bg-gray-200 dark:bg-gray-700'></div>
      </div>
      <div className='flex w-full max-w-[360px] items-center'>
        <div className='ms-2 h-2.5 w-full animate-pulse-fast rounded-full bg-gray-300 dark:bg-gray-600'></div>
        <div className='ms-2 h-2.5 w-80 animate-pulse-normal rounded-full bg-gray-200 dark:bg-gray-700'></div>
        <div className='ms-2 h-2.5 w-full animate-pulse-slow rounded-full bg-gray-300 dark:bg-gray-600'></div>
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}
