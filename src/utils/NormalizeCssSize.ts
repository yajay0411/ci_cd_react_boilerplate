import type { CSSSize } from '@/types';

export const NormalizeCssSize = (value: CSSSize | undefined): string | number | undefined => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};
