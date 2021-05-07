import { useLayoutEffect as useReactLayoutEffect } from 'react';
export const useLayoutEffect: typeof useReactLayoutEffect =
  typeof window === 'undefined' ? () => {} : useReactLayoutEffect;
