import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  id?: string;
}

export default function Container({
  children,
  className,
  as: Component = 'div',
  id,
}: ContainerProps) {
  return (
    <Component
      id={id}
      className={cn(
        'container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl',
        className
      )}
    >
      {children}
    </Component>
  );
}

export function SectionContainer({
  children,
  className,
  id,
}: ContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-12 md:py-16 lg:py-24',
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
} 