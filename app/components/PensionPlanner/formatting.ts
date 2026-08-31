const gbpFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

/**
 * Formats a monetary amount as whole pounds sterling, e.g. "£250,000".
 */
export const formatGBP = (amount: number): string => gbpFormatter.format(Math.round(amount));

/**
 * Formats a fraction as a whole percentage, e.g. 0.87 becomes "87%".
 */
export const formatPercentage = (fraction: number): string => `${Math.round(fraction * 100)}%`;
