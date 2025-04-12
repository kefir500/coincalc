import { Milligram, Micrometer } from './measurement';

/**
 * Country currency.
 */
export interface ICurrency {
  title: string;
  country: string;
  code: string;
  symbol: string;
  coins: ICoin[];
}

/**
 * Coin of a certain denomination.
 */
export interface ICoin {
  /**
   * Coin label.
   */
  label: string;

  /**
   * Coin actual value.
   */
  value: number;

  /**
   * Coin denomination.
   */
  denomination?: number;

  /**
   * Coin diameter.
   */
  diameter: number;

  /**
   * Coin thickness.
   */
  thickness: number;

  /**
   * Coin mass.
   */
  mass: number;
}

/**
 * Class to work with coin of a certain denomination.
 */
export class Coin implements ICoin {
  label: string;
  value: number;
  denomination: number;
  diameter: number;
  thickness: number;
  mass: number;

  constructor(coin: ICoin) {
    this.label = coin.label;
    this.value = coin.value;
    this.denomination = coin.denomination ?? coin.value;
    this.diameter = coin.diameter;
    this.thickness = coin.thickness;
    this.mass = coin.mass;
  }

  /**
   * Calculate the count of coins forming the specified sum of money.
   *
   * @param sum Sum of money.
   * @returns Coin total count.
   */
  sumToCount(sum: number): number {
    return Math.round(sum / this.value);
  }

  /**
   * Calculate the height of a coin tower forming the specified sum of money.
   *
   * @param sum Sum of money.
   * @returns Coin total height.
   */
  sumToHeight(sum: number): Micrometer {
    return new Micrometer(this.thickness * this.sumToCount(sum));
  }

  /**
   * Calculate the mass of coins forming the specified sum of money.
   *
   * @param sum Sum of money.
   * @returns Coin total mass.
   */
  sumToMass(sum: number): Milligram {
    return new Milligram(this.mass * this.sumToCount(sum));
  }

  /**
   * Calculate the volume of coins forming the specified sum of money.
   *
   * @param sum Sum of money.
   * @returns Coin total volume.
   */
  sumToVolume(sum: number): Micrometer {
    const precision = 13;
    const pi = BigInt(Math.round(Math.PI * 10 ** precision));
    const radius = BigInt(this.diameter / 2);
    const volume = (pi * BigInt(this.thickness) * radius ** 2n) / (10n ** BigInt(precision));

    if (!Number.isSafeInteger(Number(volume))) {
      throw new Error('Volume is too large to be represented as a number.');
    }

    return new Micrometer(volume * BigInt(this.sumToCount(sum)), 3);
  }
}
