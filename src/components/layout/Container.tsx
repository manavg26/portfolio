import { ReactNode, CSSProperties } from 'react';
import { cn } from '@/utils/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  id?: string;
  style?: CSSProperties;
}

export default function Container({
  children,
  className,
  as: Component = 'div',
  id,
  style,
}: ContainerProps) {
  return (
    <Component
      id={id}
      className={cn(
        'container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl',
        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
}

export function SectionContainer({
  children,
  className,
  id,
  style,
}: ContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-12 md:py-16 lg:py-24',
        className
      )}
      style={style}
    >
      <Container>{children}</Container>
    </section>
  );
} 
