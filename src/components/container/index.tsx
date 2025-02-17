import type { ContainerProps } from '@/types/Other';
import type { RefObject } from 'react';
import { cn } from '@/libs/utils';

const Container = ({ ref, className, as: Component = 'div', ...props }: ContainerProps & { ref?: RefObject<HTMLDivElement | null> }) => {
  return (
    <Component
      ref={ref}
      className={cn(
        'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
        className,
      )}
      {...props}
    />
  );
};

Container.displayName = 'Container';

export default Container;
