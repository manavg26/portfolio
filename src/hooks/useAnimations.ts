import { useInView } from 'react-intersection-observer';

// Types for animation variants
type FadeDirection = 'up' | 'down' | 'left' | 'right' | 'none';
type StaggerDirection = 'fromLeft' | 'fromRight' | 'fromTop' | 'fromBottom' | 'fromCenter';

// Interface for fade animation options
interface FadeAnimationOptions {
  direction?: FadeDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

// Interface for stagger animation options
interface StaggerAnimationOptions {
  direction?: StaggerDirection;
  delayChildren?: number;
  staggerChildren?: number;
  duration?: number;
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

// Default options for stagger animations
const defaultStaggerOptions: StaggerAnimationOptions = {
  direction: 'fromBottom',
  delayChildren: 0.1,
  staggerChildren: 0.1,
  duration: 0.5,
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

// Generate variants for stagger animations
const generateStaggerVariants = (options: StaggerAnimationOptions) => {
  const { direction, delayChildren, staggerChildren, duration } = {
    ...defaultStaggerOptions,
    ...options,
  };

  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren,
          delayChildren,
        },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        y: direction === 'fromTop' ? -20 : direction === 'fromBottom' ? 20 : 0,
        x: direction === 'fromLeft' ? -20 : direction === 'fromRight' ? 20 : 0,
        scale: direction === 'fromCenter' ? 0.9 : 1,
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          duration,
          ease: [0.22, 1, 0.36, 1],
        },
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

// Hooks for stagger animations
export const useStaggerAnimation = (options: StaggerAnimationOptions = {}) => {
  const mergedOptions = { ...defaultStaggerOptions, ...options };
  const [ref, inView] = useInView({
    threshold: mergedOptions.threshold,
    triggerOnce: mergedOptions.triggerOnce,
  });

  const variants = generateStaggerVariants(mergedOptions);

  return {
    ref,
    inView,
    variants,
    animation: inView ? 'visible' : 'hidden',
  };
}; 