import { exponentToString } from '@/helpers';

/**
 * Unit of measurement.
 */
export interface IUnit {
  /**
   * Short unit symbol.
   */
  symbol: string;

  /**
   * Full unit title.
   */
  title: string;

  /**
   * Conversion factor to the base unit.
   */
  factor: bigint;
}

/**
 * Abstract measurement class to work with measure units.
 */
export abstract class Measurement {
  /**
   * Value of the measurement in base units.
   */
  public value: bigint;

  /**
   * Exponent of the measurement (square, cubic, etc.).
   */
  public exponent: number;

  /**
   * Array of available units for this measurement.
   */
  protected abstract units: IUnit[];

  constructor(value: bigint | number, exponent: number = 1) {
    this.value = BigInt(value);
    this.exponent = exponent;
  }

  /**
   * Convert to a specified measure unit.
   *
   * @param unit Symbol of a measure unit to convert to.
   * @param precision Number of digits following the decimal point.
   * @returns Converted measure unit.
   */
  to(unit: string, precision: number = 3): number {
    const factor = this.findUnit(unit)?.factor;

    if (factor === undefined) {
      throw new Error(`Unit "${unit}" doesn't exist.`);
    }

    return this.toNumber(factor, precision);
  }

  /**
   * Convert to a number with a specified precision.
   *
   * @param factor Conversion factor.
   * @param precision Number of digits following the decimal point.
   * @returns Number with a specified precision.
   */
  toNumber(factor: bigint = 1n, precision: number = 3): number {
    const precisionFactor = (10 ** precision);

    return Number(this.value * BigInt(precisionFactor) / factor ** BigInt(this.exponent)) / precisionFactor;
  }

  /**
   * Convert to a human-readable string with the most suitable unit and an exponent.
   *
   * @param abbr Whether to abbreviate the unit or use the full title.
   * @param precision Number of digits following the decimal point.
   * @returns Human-readable string.
   */
  toString(abbr: boolean = true, precision: number = 3): string {
    let bestUnit = this.units[0];

    for (const unit of this.units) {
      if (this.value < (unit.factor ** BigInt(this.exponent))) {
        break;
      }
      bestUnit = unit;
    }

    const convertedValue = this.toNumber(bestUnit.factor, precision);
    const exponentString = exponentToString(this.exponent);
    const unitTitle = abbr ? bestUnit.symbol : bestUnit.title;

    return `${convertedValue.toLocaleString('en')} ${unitTitle}${exponentString}`;
  }

  /**
   * Find unit by its symbol.
   *
   * @param symbol Symbol of a measure unit.
   * @returns Measure unit (or `undefined` if not found).
   */
  private findUnit(symbol: string): IUnit | undefined {
    return this.units.find((unit) => unit.symbol === symbol);
  }
}

/**
 * Measurement class for length.
 */
export class Micrometer extends Measurement {
  units: IUnit[] = [
    { symbol: 'μm', title: 'micrometer(s)', factor: 1n },
    { symbol: 'mm', title: 'millimeter(s)', factor: 1_000n },
    { symbol: 'cm', title: 'centimeter(s)', factor: 10_000n },
    { symbol: 'dm', title: 'decimeter(s)', factor: 100_000n },
    { symbol: 'm', title: 'meter(s)', factor: 1_000_000n },
    { symbol: 'km', title: 'kilometer(s)', factor: 1_000_000_000n },
    { symbol: 'Mm', title: 'megameter(s)', factor: 1_000_000_000_000_000n },
    { symbol: 'Gm', title: 'gigameter(s)', factor: 1_000_000_000_000_000_000n },
    { symbol: 'Tm', title: 'terameter(s)', factor: 1_000_000_000_000_000_000_000n },
  ];
}

/**
 * Measurement class for mass.
 */
export class Milligram extends Measurement {
  units: IUnit[] = [
    { symbol: 'mg', title: 'milligram(s)', factor: 1n },
    { symbol: 'g', title: 'gram(s)', factor: 1_000n },
    { symbol: 'kg', title: 'kilogram(s)', factor: 1_000_000n },
    { symbol: 't', title: 'tonne(s)', factor: 1_000_000_000n },
    { symbol: 'Kt', title: 'kilotonne(s)', factor: 1_000_000_000_000n },
    { symbol: 'Mt', title: 'megatonne(s)', factor: 1_000_000_000_000_000n },
  ];
}
