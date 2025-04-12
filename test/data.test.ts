import { describe, it, expect } from 'vitest';
import { objects } from '../src/data';

describe('Objects', () => {
  it('Heights are sorted', () => {
    expect(objects.heights.every(
      (object, i) => i === 0 || objects.heights[i - 1].height.value <= object.height.value)
    ).toBe(true);
  });

  it('Masses are sorted', () => {
    expect(objects.masses.every(
      (object, i) => i === 0 || objects.masses[i - 1].mass.value <= object.mass.value)
    ).toBe(true);
  });
});
