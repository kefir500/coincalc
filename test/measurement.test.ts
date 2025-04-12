import { describe, it, expect } from 'vitest';
import { Micrometer, Milligram, type IUnit } from '../src/types/measurement';

function isSorted(units: IUnit[]): boolean {
  return units.every((unit, i) => i === 0 || units[i - 1].factor <= unit.factor);
}

describe('Measure', () => {
  it('can be converted to other units with floating point', () => {
    expect(new Milligram(1n).to('g')).toBe(0.001);
    expect(new Milligram(50n).to('g')).toBe(0.05);
  });

  it('can be converted to a human-readable string', () => {
    expect(new Milligram(1n).toString()).toBe('1 mg');
    expect(new Milligram(1_000n).toString()).toBe('1 g');
    expect(new Milligram(1_000_000n).toString()).toBe('1 kg');
    expect(new Milligram(1_000_000_000n).toString()).toBe('1 t');
    expect(new Milligram(1_000_000_000_000n).toString()).toBe('1 Kt');
    expect(new Milligram(1_000_000_000_000_000n).toString()).toBe('1 Mt');
  });

  it('can be converted to a human-readable string with floating point', () => {
    expect(new Milligram(1_500n).toString(true, 1)).toBe('1.5 g');
    expect(new Milligram(1_420n).toString(true, 2)).toBe('1.42 g');
    expect(new Milligram(1_420n).toString(true, 1)).toBe('1.4 g');
  });

  it('can be converted to a human-readable string with an exponent', () => {
    expect(new Milligram(10_000n).toString()).toBe('10 g');
    expect(new Milligram(10_000n, 1).toString()).toBe('10 g');
    expect(new Milligram(10_000_000n, 2).toString()).toBe('10 g²');
    expect(new Milligram(10_000_000_000n, 3).toString()).toBe('10 g³');
  });

  it('throws error on invalid unit', () => {
    expect(() => new Micrometer(1n).to('xx')).toThrow();
  });

  describe('Micrometer', () => {
    it('units are sorted', () => {
      expect(isSorted(new Micrometer(1n).units)).toBe(true);
    });

    it('can be converted to other units', () => {
      expect(new Micrometer(1n).to('μm')).toBe(1);
      expect(new Micrometer(2_000n).to('mm')).toBe(2);
      expect(new Micrometer(30_000n).to('cm')).toBe(3);
      expect(new Micrometer(400_000n).to('dm')).toBe(4);
      expect(new Micrometer(5_000_000n).to('m')).toBe(5);
      expect(new Micrometer(6_000_000_000n).to('km')).toBe(6);
      expect(new Micrometer(7_000_000_000_000_000n).to('Mm')).toBe(7);
      expect(new Micrometer(8_000_000_000_000_000_000n).to('Gm')).toBe(8);
      expect(new Micrometer(9_000_000_000_000_000_000_000n).to('Tm')).toBe(9);
    });
  });

  describe('Milligram', () => {
    it('units are sorted', () => {
      expect(isSorted(new Milligram(1n).units)).toBe(true);
    });

    it('can be converted to other units', () => {
      expect(new Milligram(1n).to('mg')).toBe(1);
      expect(new Milligram(2_000n).to('g')).toBe(2);
      expect(new Milligram(3_000_000n).to('kg')).toBe(3);
      expect(new Milligram(4_000_000_000n).to('t')).toBe(4);
      expect(new Milligram(5_000_000_000_000n).to('Kt')).toBe(5);
      expect(new Milligram(6_000_000_000_000_000n).to('Mt')).toBe(6);
    });
});
});
