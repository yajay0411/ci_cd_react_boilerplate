import { describe, it, expect } from 'vitest';

import { NormalizeCssSize } from '../NormalizeCssSize';


describe('NormalizeCssSize', () => {
  it('should return undefined when value is undefined', () => {
    expect(NormalizeCssSize(undefined)).toBeUndefined();
  });

  it('should return the same string when value is a string', () => {
    expect(NormalizeCssSize('100%')).toBe('100%');
    expect(NormalizeCssSize('auto')).toBe('auto');
    expect(NormalizeCssSize('1rem')).toBe('1rem');
  });

  it('should convert numbers to pixel values', () => {
    expect(NormalizeCssSize(100)).toBe('100px');
    expect(NormalizeCssSize(0)).toBe('0px');
    expect(NormalizeCssSize(1.5)).toBe('1.5px');
  });

  it('should handle edge cases', () => {
    // @ts-expect-error Testing invalid input
    expect(NormalizeCssSize(null)).toBeNull();
    // @ts-expect-error Testing invalid input
    expect(NormalizeCssSize(true)).toBe(true);
  });
});
