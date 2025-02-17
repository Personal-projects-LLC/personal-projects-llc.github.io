import type { ButtonProps } from '@/types/Other';
import { cn } from '@/libs/utils';
import { Slot } from '@radix-ui/react-slot';
import { buttonVariants } from './buttonVariants';

const Button = ({ ref, className, variant, size, asChild = false, ...props }: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
};

Button.displayName = 'Button';

export default Button;
