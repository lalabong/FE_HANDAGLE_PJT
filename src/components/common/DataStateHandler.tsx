import { ReactNode } from 'react';

import { cn } from '@lib/cn';

interface DataStateHandlerProps<T> {
  data: T | undefined | null;
  isLoading: boolean;
  error: unknown;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  className?: string;
  children: (data: T) => ReactNode;
}

const DataStateHandler = <T,>({
  data,
  isLoading,
  error,
  loadingComponent,
  errorComponent,
  className = '',
  children,
}: DataStateHandlerProps<T>) => {
  if (isLoading) {
    return loadingComponent ? (
      <>{loadingComponent}</>
    ) : (
      <div className={cn('flex justify-center items-center p-4', className)}>
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (error || !data) {
    return errorComponent ? (
      <>{errorComponent}</>
    ) : (
      <div className={cn('flex justify-center items-center p-4', className)}>
        <p className="text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return <>{children(data)}</>;
};

export default DataStateHandler;
