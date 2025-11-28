/**
 * Precision percentage calculation utilities
 * Provides functionality matching https://percentagecalculator.net/
 */

/**
 * Options for controlling decimal precision in percentage calculations
 */
export interface PrecisionOptions {
  /**
   * Number of decimal places to round to (default: 2)
   */
  decimalPlaces?: number;
  /**
   * Whether to round the result (default: true)
   */
  round?: boolean;
}

/**
 * Rounds a number to a specified number of decimal places
 * Uses proper rounding to avoid floating point errors
 */
function roundToPrecision(value: number, decimalPlaces: number): number {
  const multiplier = 10 ** decimalPlaces;
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Calculates what X% of Y is
 *
 * @example
 * whatIsPercentOf(25, 200) // returns 50 (25% of 200 is 50)
 * whatIsPercentOf(15, 80) // returns 12 (15% of 80 is 12)
 *
 * @param percent - The percentage value (e.g., 25 for 25%)
 * @param value - The total value to calculate the percentage of
 * @param options - Optional precision settings
 * @returns The calculated value
 * @throws {Error} If percent or value is not a finite number
 */
export function whatIsPercentOf(percent: number, value: number, options: PrecisionOptions = {}): number {
  if (!Number.isFinite(percent)) {
    throw new Error("Percent must be a finite number");
  }
  if (!Number.isFinite(value)) {
    throw new Error("Value must be a finite number");
  }

  const { decimalPlaces = 2, round = true } = options;
  const result = (percent / 100) * value;

  return round ? roundToPrecision(result, decimalPlaces) : result;
}

/**
 * Calculates what percent X is of Y
 *
 * @example
 * whatPercentOf(50, 200) // returns 25 (50 is 25% of 200)
 * whatPercentOf(12, 80) // returns 15 (12 is 15% of 80)
 *
 * @param part - The part/portion value
 * @param whole - The whole/total value
 * @param options - Optional precision settings
 * @returns The percentage value
 * @throws {Error} If part or whole is not a finite number, or if whole is zero
 */
export function whatPercentOf(part: number, whole: number, options: PrecisionOptions = {}): number {
  if (!Number.isFinite(part)) {
    throw new Error("Part must be a finite number");
  }
  if (!Number.isFinite(whole)) {
    throw new Error("Whole must be a finite number");
  }
  if (whole === 0) {
    throw new Error("Whole cannot be zero");
  }

  const { decimalPlaces = 2, round = true } = options;
  const result = (part / whole) * 100;

  return round ? roundToPrecision(result, decimalPlaces) : result;
}

/**
 * Calculates the percentage change from one value to another
 * Returns positive for increase, negative for decrease
 *
 * @example
 * percentageChange(100, 150) // returns 50 (50% increase)
 * percentageChange(150, 100) // returns -33.33 (33.33% decrease)
 * percentageChange(50, 50) // returns 0 (no change)
 *
 * @param startValue - The starting/original value
 * @param endValue - The ending/new value
 * @param options - Optional precision settings
 * @returns The percentage change (positive for increase, negative for decrease)
 * @throws {Error} If startValue or endValue is not a finite number, or if startValue is zero
 */
export function percentageChange(startValue: number, endValue: number, options: PrecisionOptions = {}): number {
  if (!Number.isFinite(startValue)) {
    throw new Error("Start value must be a finite number");
  }
  if (!Number.isFinite(endValue)) {
    throw new Error("End value must be a finite number");
  }
  if (startValue === 0) {
    throw new Error("Start value cannot be zero");
  }

  const { decimalPlaces = 2, round = true } = options;
  const change = endValue - startValue;
  const result = (change / Math.abs(startValue)) * 100;

  return round ? roundToPrecision(result, decimalPlaces) : result;
}

/**
 * Calculates the percentage increase from one value to another
 * Only returns positive values; throws error if there's a decrease
 *
 * @example
 * percentageIncrease(100, 150) // returns 50 (50% increase)
 *
 * @param startValue - The starting/original value
 * @param endValue - The ending/new value (must be greater than startValue)
 * @param options - Optional precision settings
 * @returns The percentage increase
 * @throws {Error} If endValue is not greater than startValue
 */
export function percentageIncrease(startValue: number, endValue: number, options: PrecisionOptions = {}): number {
  if (endValue <= startValue) {
    throw new Error("End value must be greater than start value for percentage increase");
  }

  return percentageChange(startValue, endValue, options);
}

/**
 * Calculates the percentage decrease from one value to another
 * Only returns positive values representing the decrease; throws error if there's an increase
 *
 * @example
 * percentageDecrease(150, 100) // returns 33.33 (33.33% decrease)
 *
 * @param startValue - The starting/original value
 * @param endValue - The ending/new value (must be less than startValue)
 * @param options - Optional precision settings
 * @returns The percentage decrease (as a positive number)
 * @throws {Error} If endValue is not less than startValue
 */
export function percentageDecrease(startValue: number, endValue: number, options: PrecisionOptions = {}): number {
  if (endValue >= startValue) {
    throw new Error("End value must be less than start value for percentage decrease");
  }

  return Math.abs(percentageChange(startValue, endValue, options));
}

/**
 * Adds a percentage to a value
 *
 * @example
 * addPercentage(100, 20) // returns 120 (100 + 20% of 100)
 * addPercentage(50, 10) // returns 55 (50 + 10% of 50)
 *
 * @param value - The original value
 * @param percent - The percentage to add
 * @param options - Optional precision settings
 * @returns The value with the percentage added
 * @throws {Error} If value or percent is not a finite number
 */
export function addPercentage(value: number, percent: number, options: PrecisionOptions = {}): number {
  if (!Number.isFinite(value)) {
    throw new Error("Value must be a finite number");
  }
  if (!Number.isFinite(percent)) {
    throw new Error("Percent must be a finite number");
  }

  const { decimalPlaces = 2, round = true } = options;
  const result = value * (1 + percent / 100);

  return round ? roundToPrecision(result, decimalPlaces) : result;
}

/**
 * Subtracts a percentage from a value
 *
 * @example
 * subtractPercentage(100, 20) // returns 80 (100 - 20% of 100)
 * subtractPercentage(50, 10) // returns 45 (50 - 10% of 50)
 *
 * @param value - The original value
 * @param percent - The percentage to subtract
 * @param options - Optional precision settings
 * @returns The value with the percentage subtracted
 * @throws {Error} If value or percent is not a finite number
 */
export function subtractPercentage(value: number, percent: number, options: PrecisionOptions = {}): number {
  if (!Number.isFinite(value)) {
    throw new Error("Value must be a finite number");
  }
  if (!Number.isFinite(percent)) {
    throw new Error("Percent must be a finite number");
  }

  const { decimalPlaces = 2, round = true } = options;
  const result = value * (1 - percent / 100);

  return round ? roundToPrecision(result, decimalPlaces) : result;
}

/**
 * Calculates the difference between two percentages
 *
 * @example
 * percentageDifference(75, 50) // returns 25 (75% - 50% = 25 percentage points)
 *
 * @param percent1 - The first percentage
 * @param percent2 - The second percentage
 * @param options - Optional precision settings
 * @returns The difference in percentage points
 * @throws {Error} If percent1 or percent2 is not a finite number
 */
export function percentageDifference(percent1: number, percent2: number, options: PrecisionOptions = {}): number {
  if (!Number.isFinite(percent1)) {
    throw new Error("Percent1 must be a finite number");
  }
  if (!Number.isFinite(percent2)) {
    throw new Error("Percent2 must be a finite number");
  }

  const { decimalPlaces = 2, round = true } = options;
  const result = percent1 - percent2;

  return round ? roundToPrecision(result, decimalPlaces) : result;
}

/**
 * Calculates what value is needed to achieve a target percentage of a whole
 *
 * @example
 * valueFromPercent(25, 200) // returns 50 (to get 25% of 200, you need 50)
 *
 * @param percent - The target percentage
 * @param whole - The whole/total value
 * @param options - Optional precision settings
 * @returns The value needed
 */
export function valueFromPercent(percent: number, whole: number, options: PrecisionOptions = {}): number {
  return whatIsPercentOf(percent, whole, options);
}

/**
 * Calculates the average of an array of percentages
 *
 * @example
 * averagePercentage([10, 20, 30]) // returns 20
 *
 * @param percentages - Array of percentage values
 * @param options - Optional precision settings
 * @returns The average percentage
 * @throws {Error} If percentages array is empty or contains non-finite numbers
 */
export function averagePercentage(percentages: number[], options: PrecisionOptions = {}): number {
  if (percentages.length === 0) {
    throw new Error("Percentages array cannot be empty");
  }
  if (!percentages.every(Number.isFinite)) {
    throw new Error("All percentages must be finite numbers");
  }

  const { decimalPlaces = 2, round = true } = options;
  const sum = percentages.reduce((acc, val) => acc + val, 0);
  const result = sum / percentages.length;

  return round ? roundToPrecision(result, decimalPlaces) : result;
}
