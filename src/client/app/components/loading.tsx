interface LoadingBarProps {
  width: string;
  animation: string;
  bgColor: string;
  marginLeft: string;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ width, animation, bgColor, marginLeft }) => (
  <div className={`h-2.5 ${width} ${animation} rounded-full ${bgColor} ${marginLeft}`}></div>
);

export default function Loading() {
  const loadingBars = [
    [
      { width: 'w-32', animation: 'animate-pulse-slow', bgColor: 'bg-gray-200 dark:bg-gray-700', marginLeft: '' },
      { width: 'w-24', animation: 'animate-pulse-normal', bgColor: 'bg-gray-300 dark:bg-gray-600', marginLeft: 'ms-2' },
      { width: 'w-full', animation: 'animate-pulse-fast', bgColor: 'bg-gray-300 dark:bg-gray-600', marginLeft: 'ms-2' },
    ],
    [
      { width: 'w-full', animation: 'animate-pulse-normal', bgColor: 'bg-gray-200 dark:bg-gray-700', marginLeft: '' },
      { width: 'w-full', animation: 'animate-pulse-slow', bgColor: 'bg-gray-300 dark:bg-gray-600', marginLeft: 'ms-2' },
      { width: 'w-24', animation: 'animate-pulse-fast', bgColor: 'bg-gray-300 dark:bg-gray-600', marginLeft: 'ms-2' },
    ],
    [
      { width: 'w-full', animation: 'animate-pulse-fast', bgColor: 'bg-gray-300 dark:bg-gray-600', marginLeft: '' },
      { width: 'w-80', animation: 'animate-pulse-normal', bgColor: 'bg-gray-200 dark:bg-gray-700', marginLeft: 'ms-2' },
      { width: 'w-full', animation: 'animate-pulse-slow', bgColor: 'bg-gray-300 dark:bg-gray-600', marginLeft: 'ms-2' },
    ],
    [
      { width: 'w-full', animation: 'animate-pulse-slow', bgColor: 'bg-gray-200 dark:bg-gray-700', marginLeft: 'ms-2' },
      { width: 'w-full', animation: 'animate-pulse-normal', bgColor: 'bg-gray-300 dark:bg-gray-600', marginLeft: 'ms-2' },
      { width: 'w-24', animation: 'animate-pulse-fast', bgColor: 'bg-gray-300 dark:bg-gray-600', marginLeft: 'ms-2' },
    ],
    [
      { width: 'w-32', animation: 'animate-pulse-normal', bgColor: 'bg-gray-300 dark:bg-gray-600', marginLeft: 'ms-2' },
      { width: 'w-24', animation: 'animate-pulse-slow', bgColor: 'bg-gray-300 dark:bg-gray-600', marginLeft: 'ms-2' },
      { width: 'w-full', animation: 'animate-pulse-fast', bgColor: 'bg-gray-200 dark:bg-gray-700', marginLeft: 'ms-2' },
    ],
    [
      { width: 'w-full', animation: 'animate-pulse-fast', bgColor: 'bg-gray-300 dark:bg-gray-600', marginLeft: 'ms-2' },
      { width: 'w-80', animation: 'animate-pulse-normal', bgColor: 'bg-gray-200 dark:bg-gray-700', marginLeft: 'ms-2' },
      { width: 'w-full', animation: 'animate-pulse-slow', bgColor: 'bg-gray-300 dark:bg-gray-600', marginLeft: 'ms-2' },
    ],
  ];

  return (
    <div role='status' className='mb-4 space-y-2.5 p-6 dark:bg-gray-900'>
      {loadingBars.map((bars, index) => (
        <div key={index} className='flex w-full items-center'>
          {bars.map((bar, idx) => (
            <LoadingBar key={idx} {...bar} />
          ))}
        </div>
      ))}
      <span className='sr-only'>Loading...</span>
    </div>
  );
}
