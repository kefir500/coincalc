import { describe, it, expect } from 'vitest';
import { Coin } from '../src/types/currency';

const coin5 = new Coin({
  label: 'Coin 5',
  value: 5,
  diameter: 2500,
  thickness: 250,
  mass: 250,
});

const coin10 = new Coin({
  label: 'Coin 10',
  value: 10,
  diameter: 10000,
  thickness: 1000,
  mass: 1000,
});

describe('Coins', () => {
  describe('Count', () => {
    it('is calculated based on sum', () => {
      expect(coin5.sumToCount(20)).toBe(4);
      expect(coin10.sumToCount(20)).toBe(2);
      expect(coin5.sumToCount(5000)).toBe(1000);
      expect(coin10.sumToCount(5000)).toBe(500);
    });
  });

  describe('Mass', () => {
    it('is calculated based on sum', () => {
      expect(coin5.sumToMass(20).value).toBe(1000n);
      expect(coin10.sumToMass(20).value).toBe(2000n);
      expect(coin5.sumToMass(5000).value).toBe(250000n);
      expect(coin10.sumToMass(5000).value).toBe(500000n);
    });

    it('is using a proper exponent', () => {
      expect(coin5.sumToMass(20).exponent).toBe(1);
      expect(coin10.sumToMass(20).exponent).toBe(1);
    });
  });

  describe('Height', () => {
    it('is calculated based on sum', () => {
      expect(coin5.sumToHeight(20).value).toBe(1000n);
      expect(coin10.sumToHeight(20).value).toBe(2000n);
      expect(coin5.sumToHeight(5000).value).toBe(250000n);
      expect(coin10.sumToHeight(5000).value).toBe(500000n);
    });

    it('is using a proper exponent', () => {
      expect(coin5.sumToHeight(20).exponent).toBe(1);
      expect(coin10.sumToHeight(20).exponent).toBe(1);
    });
  });
});

describe('Coins volume', () => {
  it('is calculated based on sum', () => {
    expect(coin5.sumToVolume(5).value).toBe(1227184630n);
    expect(coin5.sumToVolume(20).value).toBe(4908738520n);
    expect(coin10.sumToVolume(10).value).toBe(78539816339n);
    expect(coin10.sumToVolume(20).value).toBe(157079632678n);
    expect(coin10.sumToVolume(10000000000000000).value).toBe(78539816339000000000000000n);
  });

  it('is using a proper exponent', () => {
    expect(coin10.sumToVolume(10).exponent).toBe(3);
    expect(coin5.sumToVolume(5000).exponent).toBe(3);
  });
});
