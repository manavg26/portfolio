import { useInView } from 'react-intersection-observer';

// Types for animation variants
type FadeDirection = 'up' | 'down' | 'left' | 'right' | 'none';

// Interface for fade animation options
interface FadeAnimationOptions {
  direction?: FadeDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

// Default options for fade animations
const defaultFadeOptions: FadeAnimationOptions = {
  direction: 'up',
  delay: 0,
  duration: 0.6,
  distance: 20,
  threshold: 0.1,
  triggerOnce: true,
};

// Generate variants for fade animations
const generateFadeVariants = (options: FadeAnimationOptions) => {
  const { direction, delay, duration, distance } = {
    ...defaultFadeOptions,
    ...options,
  };

  let initialX = 0;
  let initialY = 0;

  switch (direction) {
    case 'up':
      initialY = distance || 20;
      break;
    case 'down':
      initialY = -1 * (distance || 20);
      break;
    case 'left':
      initialX = distance || 20;
      break;
    case 'right':
      initialX = -1 * (distance || 20);
      break;
    default:
      break;
  }

  return {
    hidden: {
      opacity: 0,
      x: initialX,
      y: initialY,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
};

// Hooks for fade animations
export const useFadeAnimation = (options: FadeAnimationOptions = {}) => {
  const mergedOptions = { ...defaultFadeOptions, ...options };
  const [ref, inView] = useInView({
    threshold: mergedOptions.threshold,
    triggerOnce: mergedOptions.triggerOnce,
  });

  const variants = generateFadeVariants(mergedOptions);

  return {
    ref,
    inView,
    variants,
    animation: inView ? 'visible' : 'hidden',
  };
}; 
