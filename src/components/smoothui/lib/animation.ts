/**
 * Animation constants for SmoothUI components
 */

// Spring animation presets
export const SPRING_DEFAULT = { type: 'spring' as const, duration: 0.25, bounce: 0.1 };
export const SPRING_BOUNCY = { type: 'spring' as const, duration: 0.3, bounce: 0.2 };
export const SPRING_SNAPPY = { type: 'spring' as const, duration: 0.2, bounce: 0 };

// Duration constants
export const DURATION_INSTANT = 0;
export const DURATION_FAST = 0.1;
export const DURATION_NORMAL = 0.2;
export const DURATION_SLOW = 0.3;

// Easing curves
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT_CUBIC = [0.4, 0, 0.2, 1] as const;
