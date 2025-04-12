export type Comparable = number | bigint | string | Date;
export type Stringable = { toString(): string };

/**
 * Find the closest neighbor values in an array.
 *
 * @param value Value to find closest neighbors for.
 * @param arr A sorted array of values.
 * @param accessor A function to extract a comparable value from each element.
 * @returns Closest neighboring values.
 */
export function findClosestValues<T>(value: Comparable, arr: T[], accessor?: (item: T) => Comparable): { left?: T; right?: T } {
  let leftValue: T | undefined = undefined;
  let rightValue: T | undefined = undefined;
  let leftIndex = 0;
  let rightIndex = arr.length - 1;

  while (leftIndex <= rightIndex) {
    const midIndex = Math.floor((leftIndex + rightIndex) / 2);
    const currentValue = accessor ? accessor(arr[midIndex]) : arr[midIndex];

    if (currentValue <= value) {
      leftValue = arr[midIndex];
      leftIndex = midIndex + 1;
    } else {
      rightValue = arr[midIndex];
      rightIndex = midIndex - 1;
    }
  }

  return { left: leftValue, right: rightValue };
}

/**
 * Get the progress percentage between two values.
 *
 * @param current Current value to count percentage for.
 * @param start Starting value.
 * @param end Ending value.
 * @returns Progress percentage for `current` value between `start` and `end`.
 */
export function getProgress(current: bigint, start?: bigint, end?: bigint): number | undefined {
  if ((start !== undefined) && (end !== undefined) && (start < end)) {
    const percentage = Number((current - start) * 100n / (end - start));
    return Math.min(100, Math.max(0, percentage));
  }
}

/**
 * Convert a numeric exponent to a string.
 *
 * @param exponent Numeric exponent.
 * @returns Human-readable exponent string.
 */
export function exponentToString(exponent: number): string {
  if (exponent === 1) {
    return '';
  }

  const mapping: Record<string, string> = {
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹',
  };

  return exponent.toString().replace(/\d/g, (char) => mapping[char]);
}
