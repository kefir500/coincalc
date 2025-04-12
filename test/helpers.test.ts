import { describe, it, expect } from 'vitest';
import { exponentToString, findClosestValues, getProgress } from '../src/helpers';

describe('Helpers', () => {
  describe('Neighbor values', () => {
    const primitives = [2, 3, 6, 10, 500, 505, 1000];

    it('can be found in an array of primitives', () => {
      expect(findClosestValues(1, primitives)).toMatchObject({ left: undefined, right: 2 });
      expect(findClosestValues(2, primitives)).toMatchObject({ left: 2, right: 3 });
      expect(findClosestValues(4, primitives)).toMatchObject({ left: 3, right: 6 });
      expect(findClosestValues(200, primitives)).toMatchObject({ left: 10, right: 500 });
      expect(findClosestValues(400, primitives)).toMatchObject({ left: 10, right: 500 });
      expect(findClosestValues(501, primitives)).toMatchObject({ left: 500, right: 505 });
      expect(findClosestValues(800, primitives)).toMatchObject({ left: 505, right: 1000 });
      expect(findClosestValues(10000, primitives)).toMatchObject({ left: 1000, right: undefined });
    });

    it('can be found in an array of objects', () => {
      const objects = primitives.map((item) => ({ value: item }));
      const accessor = (item: typeof objects[0]) => item.value;
      expect(findClosestValues(1, objects, accessor)).toMatchObject({ left: undefined, right: { value: 2 } });
      expect(findClosestValues(2, objects, accessor)).toMatchObject({ left: { value: 2 }, right: { value: 3 } });
      expect(findClosestValues(4, objects, accessor)).toMatchObject({ left: { value: 3 }, right: { value: 6 } });
      expect(findClosestValues(200, objects, accessor)).toMatchObject({ left: { value: 10 }, right: { value: 500 } });
      expect(findClosestValues(400, objects, accessor)).toMatchObject({ left: { value: 10 }, right: { value: 500 } });
      expect(findClosestValues(501, objects, accessor)).toMatchObject({ left: { value: 500 }, right: { value: 505 } });
      expect(findClosestValues(800, objects, accessor)).toMatchObject({ left: { value: 505 }, right: { value: 1000 } });
      expect(findClosestValues(10000, objects, accessor)).toMatchObject({ left: { value: 1000 }, right: undefined });
    });
  });

  describe('Progress percentage', () => {
    it('is properly calculated', () => {
      expect(getProgress(10n, 10n, 50n)).toBe(0);
      expect(getProgress(30n, 10n, 50n)).toBe(50);
      expect(getProgress(40n, 10n, 50n)).toBe(75);
      expect(getProgress(50n, 10n, 50n)).toBe(100);

      expect(getProgress(0n, 0n, 1000n)).toBe(0);
      expect(getProgress(500n, 0n, 1000n)).toBe(50);
      expect(getProgress(750n, 0n, 1000n)).toBe(75);
      expect(getProgress(1000n, 0n, 1000n)).toBe(100);
    });

    it('handles empty values', () => {
      expect(getProgress(0n)).toBeUndefined();
      expect(getProgress(10n)).toBeUndefined();
      expect(getProgress(10n, undefined, undefined)).toBeUndefined();
      expect(getProgress(50n, undefined, undefined)).toBeUndefined();
      expect(getProgress(50n, undefined, 500n)).toBeUndefined();
      expect(getProgress(50n, 25n, undefined)).toBeUndefined();
    });

    it('handles out-of-bound values', () => {
      expect(getProgress(50n, 500n, 5000n)).toBe(0);
      expect(getProgress(50000n, 500n, 5000n)).toBe(100);

      expect(getProgress(10n, 100n, 100n)).toBeUndefined();
      expect(getProgress(50n, 50000n, 500n)).toBeUndefined();
      expect(getProgress(1000n, 10000n, 100n)).toBeUndefined();
      expect(getProgress(100000n, 10000n, 100n)).toBeUndefined();
    });
  });

  describe('Exponent helper', () => {
    it('converts an exponent number to a string', () => {
      expect(exponentToString(1)).toBe('');
      expect(exponentToString(2)).toBe('²');
      expect(exponentToString(3)).toBe('³');
      expect(exponentToString(4)).toBe('⁴');
      expect(exponentToString(5)).toBe('⁵');
      expect(exponentToString(6)).toBe('⁶');
      expect(exponentToString(7)).toBe('⁷');
      expect(exponentToString(8)).toBe('⁸');
      expect(exponentToString(9)).toBe('⁹');
      expect(exponentToString(10)).toBe('¹⁰');
      expect(exponentToString(999)).toBe('⁹⁹⁹');
    });
  });
});
