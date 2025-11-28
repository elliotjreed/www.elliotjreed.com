import { describe, expect, it } from "vitest";
import {
  addPercentage,
  averagePercentage,
  percentageChange,
  percentageDecrease,
  percentageDifference,
  percentageIncrease,
  subtractPercentage,
  valueFromPercent,
  whatIsPercentOf,
  whatPercentOf,
} from "./percentages";

describe("whatIsPercentOf", () => {
  it("calculates basic percentages correctly", () => {
    expect(whatIsPercentOf(25, 200)).toBe(50);
    expect(whatIsPercentOf(15, 80)).toBe(12);
    expect(whatIsPercentOf(50, 100)).toBe(50);
    expect(whatIsPercentOf(10, 50)).toBe(5);
  });

  it("handles zero percent", () => {
    expect(whatIsPercentOf(0, 100)).toBe(0);
  });

  it("handles zero value", () => {
    expect(whatIsPercentOf(50, 0)).toBe(0);
  });

  it("handles decimal percentages", () => {
    expect(whatIsPercentOf(12.5, 80)).toBe(10);
    expect(whatIsPercentOf(33.33, 90)).toBe(30);
  });

  it("handles decimal values", () => {
    expect(whatIsPercentOf(10, 55.5)).toBe(5.55);
    expect(whatIsPercentOf(20, 37.5)).toBe(7.5);
  });

  it("handles negative percentages", () => {
    expect(whatIsPercentOf(-10, 100)).toBe(-10);
    expect(whatIsPercentOf(-25, 80)).toBe(-20);
  });

  it("handles negative values", () => {
    expect(whatIsPercentOf(10, -100)).toBe(-10);
    expect(whatIsPercentOf(25, -80)).toBe(-20);
  });

  it("rounds to specified decimal places", () => {
    expect(whatIsPercentOf(33.33, 100, { decimalPlaces: 2 })).toBe(33.33);
    expect(whatIsPercentOf(66.666, 100, { decimalPlaces: 1 })).toBe(66.7);
    expect(whatIsPercentOf(12.345, 100, { decimalPlaces: 0 })).toBe(12);
    expect(whatIsPercentOf(33.33, 100, { decimalPlaces: 4 })).toBe(33.33);
  });

  it("handles large numbers", () => {
    expect(whatIsPercentOf(10, 1000000)).toBe(100000);
    expect(whatIsPercentOf(0.001, 1000000)).toBe(10);
  });

  it("returns unrounded result when round is false", () => {
    expect(whatIsPercentOf(33.333333, 100, { round: false })).toBe(33.333333);
    expect(whatIsPercentOf(66.666666, 90, { round: false })).toBeCloseTo(59.9999994, 5);
  });

  it("throws error for non-finite percent", () => {
    expect(() => whatIsPercentOf(Number.POSITIVE_INFINITY, 100)).toThrow("Percent must be a finite number");
    expect(() => whatIsPercentOf(Number.NEGATIVE_INFINITY, 100)).toThrow("Percent must be a finite number");
    expect(() => whatIsPercentOf(Number.NaN, 100)).toThrow("Percent must be a finite number");
  });

  it("throws error for non-finite value", () => {
    expect(() => whatIsPercentOf(50, Number.POSITIVE_INFINITY)).toThrow("Value must be a finite number");
    expect(() => whatIsPercentOf(50, Number.NEGATIVE_INFINITY)).toThrow("Value must be a finite number");
    expect(() => whatIsPercentOf(50, Number.NaN)).toThrow("Value must be a finite number");
  });
});

describe("whatPercentOf", () => {
  it("calculates percentages correctly", () => {
    expect(whatPercentOf(50, 200)).toBe(25);
    expect(whatPercentOf(12, 80)).toBe(15);
    expect(whatPercentOf(25, 100)).toBe(25);
    expect(whatPercentOf(30, 60)).toBe(50);
  });

  it("handles zero part", () => {
    expect(whatPercentOf(0, 100)).toBe(0);
  });

  it("throws error for zero whole", () => {
    expect(() => whatPercentOf(50, 0)).toThrow("Whole cannot be zero");
  });

  it("handles decimal values", () => {
    expect(whatPercentOf(5.5, 11)).toBe(50);
    expect(whatPercentOf(7.5, 30)).toBe(25);
  });

  it("handles negative part", () => {
    expect(whatPercentOf(-50, 200)).toBe(-25);
    expect(whatPercentOf(-25, 100)).toBe(-25);
  });

  it("handles negative whole", () => {
    expect(whatPercentOf(50, -200)).toBe(-25);
    expect(whatPercentOf(25, -100)).toBe(-25);
  });

  it("handles both negative", () => {
    expect(whatPercentOf(-50, -200)).toBe(25);
  });

  it("rounds to specified decimal places", () => {
    expect(whatPercentOf(1, 3, { decimalPlaces: 2 })).toBe(33.33);
    expect(whatPercentOf(1, 3, { decimalPlaces: 1 })).toBe(33.3);
    expect(whatPercentOf(1, 3, { decimalPlaces: 0 })).toBe(33);
    expect(whatPercentOf(2, 3, { decimalPlaces: 4 })).toBe(66.6667);
  });

  it("handles large numbers", () => {
    expect(whatPercentOf(250000, 1000000)).toBe(25);
    expect(whatPercentOf(1, 1000000)).toBe(0);
  });

  it("handles very small percentages", () => {
    expect(whatPercentOf(1, 1000000, { decimalPlaces: 4 })).toBe(0.0001);
    expect(whatPercentOf(0.5, 1000, { decimalPlaces: 3 })).toBe(0.05);
  });

  it("returns unrounded result when round is false", () => {
    expect(whatPercentOf(1, 3, { round: false })).toBeCloseTo(33.333333333333336);
    expect(whatPercentOf(2, 3, { round: false })).toBeCloseTo(66.66666666666667);
  });

  it("throws error for non-finite part", () => {
    expect(() => whatPercentOf(Number.POSITIVE_INFINITY, 100)).toThrow("Part must be a finite number");
    expect(() => whatPercentOf(Number.NEGATIVE_INFINITY, 100)).toThrow("Part must be a finite number");
    expect(() => whatPercentOf(Number.NaN, 100)).toThrow("Part must be a finite number");
  });

  it("throws error for non-finite whole", () => {
    expect(() => whatPercentOf(50, Number.POSITIVE_INFINITY)).toThrow("Whole must be a finite number");
    expect(() => whatPercentOf(50, Number.NEGATIVE_INFINITY)).toThrow("Whole must be a finite number");
    expect(() => whatPercentOf(50, Number.NaN)).toThrow("Whole must be a finite number");
  });
});

describe("percentageChange", () => {
  it("calculates percentage increase correctly", () => {
    expect(percentageChange(100, 150)).toBe(50);
    expect(percentageChange(50, 75)).toBe(50);
    expect(percentageChange(200, 250)).toBe(25);
  });

  it("calculates percentage decrease correctly", () => {
    expect(percentageChange(150, 100)).toBe(-33.33);
    expect(percentageChange(200, 150)).toBe(-25);
    expect(percentageChange(80, 60)).toBe(-25);
  });

  it("handles no change", () => {
    expect(percentageChange(100, 100)).toBe(0);
    expect(percentageChange(50, 50)).toBe(0);
  });

  it("handles negative start values", () => {
    expect(percentageChange(-100, -50)).toBe(50);
    expect(percentageChange(-100, -150)).toBe(-50);
  });

  it("handles crossing zero", () => {
    expect(percentageChange(-50, 50)).toBe(200);
    expect(percentageChange(50, -50)).toBe(-200);
  });

  it("throws error for zero start value", () => {
    expect(() => percentageChange(0, 100)).toThrow("Start value cannot be zero");
  });

  it("rounds to specified decimal places", () => {
    expect(percentageChange(3, 4, { decimalPlaces: 2 })).toBe(33.33);
    expect(percentageChange(3, 4, { decimalPlaces: 1 })).toBe(33.3);
    expect(percentageChange(3, 4, { decimalPlaces: 0 })).toBe(33);
    expect(percentageChange(3, 4, { decimalPlaces: 4 })).toBe(33.3333);
  });

  it("handles large percentage changes", () => {
    expect(percentageChange(1, 1000)).toBe(99900);
    expect(percentageChange(1000, 1)).toBe(-99.9);
  });

  it("handles decimal values", () => {
    expect(percentageChange(10.5, 15.75)).toBe(50);
    expect(percentageChange(7.5, 5.625)).toBe(-25);
  });

  it("returns unrounded result when round is false", () => {
    expect(percentageChange(3, 4, { round: false })).toBeCloseTo(33.333333333333336);
    expect(percentageChange(150, 100, { round: false })).toBeCloseTo(-33.333333333333336);
  });

  it("throws error for non-finite start value", () => {
    expect(() => percentageChange(Number.POSITIVE_INFINITY, 100)).toThrow("Start value must be a finite number");
    expect(() => percentageChange(Number.NEGATIVE_INFINITY, 100)).toThrow("Start value must be a finite number");
    expect(() => percentageChange(Number.NaN, 100)).toThrow("Start value must be a finite number");
  });

  it("throws error for non-finite end value", () => {
    expect(() => percentageChange(100, Number.POSITIVE_INFINITY)).toThrow("End value must be a finite number");
    expect(() => percentageChange(100, Number.NEGATIVE_INFINITY)).toThrow("End value must be a finite number");
    expect(() => percentageChange(100, Number.NaN)).toThrow("End value must be a finite number");
  });
});

describe("percentageIncrease", () => {
  it("calculates percentage increase correctly", () => {
    expect(percentageIncrease(100, 150)).toBe(50);
    expect(percentageIncrease(50, 100)).toBe(100);
    expect(percentageIncrease(200, 300)).toBe(50);
  });

  it("throws error when end value is less than start value", () => {
    expect(() => percentageIncrease(150, 100)).toThrow(
      "End value must be greater than start value for percentage increase",
    );
  });

  it("throws error when values are equal", () => {
    expect(() => percentageIncrease(100, 100)).toThrow(
      "End value must be greater than start value for percentage increase",
    );
  });

  it("handles negative values increasing towards zero", () => {
    expect(percentageIncrease(-100, -50)).toBe(50);
  });

  it("handles negative to positive increase", () => {
    expect(percentageIncrease(-50, 50)).toBe(200);
  });

  it("rounds to specified decimal places", () => {
    expect(percentageIncrease(3, 4, { decimalPlaces: 2 })).toBe(33.33);
    expect(percentageIncrease(3, 4, { decimalPlaces: 1 })).toBe(33.3);
  });
});

describe("percentageDecrease", () => {
  it("calculates percentage decrease correctly", () => {
    expect(percentageDecrease(150, 100)).toBe(33.33);
    expect(percentageDecrease(100, 50)).toBe(50);
    expect(percentageDecrease(200, 150)).toBe(25);
  });

  it("returns positive values", () => {
    expect(percentageDecrease(100, 50)).toBeGreaterThan(0);
    expect(percentageDecrease(200, 100)).toBeGreaterThan(0);
  });

  it("throws error when end value is greater than start value", () => {
    expect(() => percentageDecrease(100, 150)).toThrow(
      "End value must be less than start value for percentage decrease",
    );
  });

  it("throws error when values are equal", () => {
    expect(() => percentageDecrease(100, 100)).toThrow(
      "End value must be less than start value for percentage decrease",
    );
  });

  it("handles negative values decreasing", () => {
    expect(percentageDecrease(-50, -100)).toBe(100);
  });

  it("handles positive to negative decrease", () => {
    expect(percentageDecrease(50, -50)).toBe(200);
  });

  it("rounds to specified decimal places", () => {
    expect(percentageDecrease(4, 3, { decimalPlaces: 2 })).toBe(25);
    expect(percentageDecrease(150, 100, { decimalPlaces: 1 })).toBe(33.3);
  });
});

describe("addPercentage", () => {
  it("adds percentage to value correctly", () => {
    expect(addPercentage(100, 20)).toBe(120);
    expect(addPercentage(50, 10)).toBe(55);
    expect(addPercentage(200, 15)).toBe(230);
  });

  it("handles zero percentage", () => {
    expect(addPercentage(100, 0)).toBe(100);
  });

  it("handles zero value", () => {
    expect(addPercentage(0, 50)).toBe(0);
  });

  it("handles negative percentages", () => {
    expect(addPercentage(100, -20)).toBe(80);
    expect(addPercentage(50, -10)).toBe(45);
  });

  it("handles negative values", () => {
    expect(addPercentage(-100, 20)).toBe(-120);
    expect(addPercentage(-50, 10)).toBe(-55);
  });

  it("handles decimal values", () => {
    expect(addPercentage(55.5, 10)).toBe(61.05);
    expect(addPercentage(33.33, 20)).toBe(40);
  });

  it("handles decimal percentages", () => {
    expect(addPercentage(100, 12.5)).toBe(112.5);
    expect(addPercentage(80, 7.5)).toBe(86);
  });

  it("rounds to specified decimal places", () => {
    expect(addPercentage(100, 33.333, { decimalPlaces: 2 })).toBe(133.33);
    expect(addPercentage(100, 33.333, { decimalPlaces: 1 })).toBe(133.3);
    expect(addPercentage(100, 33.333, { decimalPlaces: 0 })).toBe(133);
  });

  it("handles large percentages", () => {
    expect(addPercentage(100, 100)).toBe(200);
    expect(addPercentage(50, 200)).toBe(150);
  });

  it("returns unrounded result when round is false", () => {
    const result = addPercentage(100, 33.333333, { round: false });
    expect(result).toBeCloseTo(133.333333);
  });

  it("throws error for non-finite value", () => {
    expect(() => addPercentage(Number.POSITIVE_INFINITY, 10)).toThrow("Value must be a finite number");
    expect(() => addPercentage(Number.NaN, 10)).toThrow("Value must be a finite number");
  });

  it("throws error for non-finite percent", () => {
    expect(() => addPercentage(100, Number.POSITIVE_INFINITY)).toThrow("Percent must be a finite number");
    expect(() => addPercentage(100, Number.NaN)).toThrow("Percent must be a finite number");
  });
});

describe("subtractPercentage", () => {
  it("subtracts percentage from value correctly", () => {
    expect(subtractPercentage(100, 20)).toBe(80);
    expect(subtractPercentage(50, 10)).toBe(45);
    expect(subtractPercentage(200, 15)).toBe(170);
  });

  it("handles zero percentage", () => {
    expect(subtractPercentage(100, 0)).toBe(100);
  });

  it("handles zero value", () => {
    expect(subtractPercentage(0, 50)).toBe(0);
  });

  it("handles negative percentages", () => {
    expect(subtractPercentage(100, -20)).toBe(120);
    expect(subtractPercentage(50, -10)).toBe(55);
  });

  it("handles negative values", () => {
    expect(subtractPercentage(-100, 20)).toBe(-80);
    expect(subtractPercentage(-50, 10)).toBe(-45);
  });

  it("handles decimal values", () => {
    expect(subtractPercentage(55.5, 10)).toBe(49.95);
    expect(subtractPercentage(40, 25)).toBe(30);
  });

  it("handles decimal percentages", () => {
    expect(subtractPercentage(100, 12.5)).toBe(87.5);
    expect(subtractPercentage(80, 7.5)).toBe(74);
  });

  it("rounds to specified decimal places", () => {
    expect(subtractPercentage(100, 33.333, { decimalPlaces: 2 })).toBe(66.67);
    expect(subtractPercentage(100, 33.333, { decimalPlaces: 1 })).toBe(66.7);
    expect(subtractPercentage(100, 33.333, { decimalPlaces: 0 })).toBe(67);
  });

  it("handles large percentages", () => {
    expect(subtractPercentage(100, 100)).toBe(0);
    expect(subtractPercentage(100, 50)).toBe(50);
  });

  it("can result in negative values", () => {
    expect(subtractPercentage(100, 150)).toBe(-50);
  });

  it("returns unrounded result when round is false", () => {
    const result = subtractPercentage(100, 33.333333, { round: false });
    expect(result).toBeCloseTo(66.666667);
  });

  it("throws error for non-finite value", () => {
    expect(() => subtractPercentage(Number.POSITIVE_INFINITY, 10)).toThrow("Value must be a finite number");
    expect(() => subtractPercentage(Number.NaN, 10)).toThrow("Value must be a finite number");
  });

  it("throws error for non-finite percent", () => {
    expect(() => subtractPercentage(100, Number.POSITIVE_INFINITY)).toThrow("Percent must be a finite number");
    expect(() => subtractPercentage(100, Number.NaN)).toThrow("Percent must be a finite number");
  });
});

describe("percentageDifference", () => {
  it("calculates difference between percentages correctly", () => {
    expect(percentageDifference(75, 50)).toBe(25);
    expect(percentageDifference(100, 25)).toBe(75);
    expect(percentageDifference(50, 30)).toBe(20);
  });

  it("handles negative differences", () => {
    expect(percentageDifference(25, 75)).toBe(-50);
    expect(percentageDifference(30, 50)).toBe(-20);
  });

  it("handles zero difference", () => {
    expect(percentageDifference(50, 50)).toBe(0);
  });

  it("handles negative percentages", () => {
    expect(percentageDifference(-25, -50)).toBe(25);
    expect(percentageDifference(-50, 25)).toBe(-75);
    expect(percentageDifference(25, -50)).toBe(75);
  });

  it("handles decimal percentages", () => {
    expect(percentageDifference(33.33, 16.67)).toBe(16.66);
    expect(percentageDifference(12.5, 7.5)).toBe(5);
  });

  it("rounds to specified decimal places", () => {
    expect(percentageDifference(66.666, 33.333, { decimalPlaces: 2 })).toBe(33.33);
    expect(percentageDifference(66.666, 33.333, { decimalPlaces: 1 })).toBe(33.3);
    expect(percentageDifference(66.666, 33.333, { decimalPlaces: 0 })).toBe(33);
  });

  it("returns unrounded result when round is false", () => {
    const result = percentageDifference(66.666666, 33.333333, { round: false });
    expect(result).toBeCloseTo(33.333333);
  });

  it("throws error for non-finite percent1", () => {
    expect(() => percentageDifference(Number.POSITIVE_INFINITY, 50)).toThrow("Percent1 must be a finite number");
    expect(() => percentageDifference(Number.NaN, 50)).toThrow("Percent1 must be a finite number");
  });

  it("throws error for non-finite percent2", () => {
    expect(() => percentageDifference(50, Number.POSITIVE_INFINITY)).toThrow("Percent2 must be a finite number");
    expect(() => percentageDifference(50, Number.NaN)).toThrow("Percent2 must be a finite number");
  });
});

describe("valueFromPercent", () => {
  it("calculates value from percent correctly", () => {
    expect(valueFromPercent(25, 200)).toBe(50);
    expect(valueFromPercent(10, 50)).toBe(5);
    expect(valueFromPercent(50, 100)).toBe(50);
  });

  it("is equivalent to whatIsPercentOf", () => {
    expect(valueFromPercent(25, 200)).toBe(whatIsPercentOf(25, 200));
    expect(valueFromPercent(15, 80)).toBe(whatIsPercentOf(15, 80));
    expect(valueFromPercent(33.33, 90)).toBe(whatIsPercentOf(33.33, 90));
  });

  it("handles decimal values", () => {
    expect(valueFromPercent(12.5, 80)).toBe(10);
    expect(valueFromPercent(33.33, 90)).toBe(30);
  });

  it("rounds to specified decimal places", () => {
    expect(valueFromPercent(33.333, 100, { decimalPlaces: 2 })).toBe(33.33);
    expect(valueFromPercent(33.333, 100, { decimalPlaces: 1 })).toBe(33.3);
  });
});

describe("averagePercentage", () => {
  it("calculates average of percentages correctly", () => {
    expect(averagePercentage([10, 20, 30])).toBe(20);
    expect(averagePercentage([25, 50, 75, 100])).toBe(62.5);
    expect(averagePercentage([0, 100])).toBe(50);
  });

  it("handles single percentage", () => {
    expect(averagePercentage([50])).toBe(50);
  });

  it("handles negative percentages", () => {
    expect(averagePercentage([-10, 10])).toBe(0);
    expect(averagePercentage([-20, -10, 0, 10, 20])).toBe(0);
  });

  it("handles decimal percentages", () => {
    expect(averagePercentage([10.5, 20.5, 30])).toBe(20.33);
    expect(averagePercentage([12.5, 25, 37.5])).toBe(25);
  });

  it("rounds to specified decimal places", () => {
    expect(averagePercentage([10, 20, 30], { decimalPlaces: 2 })).toBe(20);
    expect(averagePercentage([33.333, 66.666], { decimalPlaces: 2 })).toBe(50);
    expect(averagePercentage([33.333, 66.666], { decimalPlaces: 1 })).toBe(50);
  });

  it("handles large arrays", () => {
    const percentages = Array.from({ length: 100 }, (_, i) => i);
    expect(averagePercentage(percentages)).toBe(49.5);
  });

  it("returns unrounded result when round is false", () => {
    const result = averagePercentage([10.333333, 20.666666], { round: false });
    expect(result).toBeCloseTo(15.4999995);
  });

  it("throws error for empty array", () => {
    expect(() => averagePercentage([])).toThrow("Percentages array cannot be empty");
  });

  it("throws error for non-finite values", () => {
    expect(() => averagePercentage([10, Number.POSITIVE_INFINITY, 30])).toThrow(
      "All percentages must be finite numbers",
    );
    expect(() => averagePercentage([10, Number.NaN, 30])).toThrow("All percentages must be finite numbers");
  });
});

describe("precision and edge cases", () => {
  it("handles floating point precision issues", () => {
    expect(whatIsPercentOf(10, 29.99)).toBe(3);
    expect(whatPercentOf(0.1, 0.3, { decimalPlaces: 2 })).toBe(33.33);
    expect(percentageChange(0.1, 0.2)).toBe(100);
  });

  it("handles very small numbers", () => {
    expect(whatIsPercentOf(0.001, 1000)).toBe(0.01);
    expect(whatPercentOf(0.0001, 1, { decimalPlaces: 4 })).toBe(0.01);
  });

  it("handles very large numbers", () => {
    expect(whatIsPercentOf(10, 10000000)).toBe(1000000);
    expect(whatPercentOf(5000000, 10000000)).toBe(50);
  });

  it("maintains precision with multiple operations", () => {
    const value = 100;
    const withAdded = addPercentage(value, 10);
    const backToOriginal = subtractPercentage(withAdded, 9.09, { decimalPlaces: 0 });
    expect(backToOriginal).toBe(100);
  });
});

describe("real-world scenarios", () => {
  it("calculates sales tax correctly", () => {
    const price = 99.99;
    const taxRate = 8.5;
    const priceWithTax = addPercentage(price, taxRate);
    expect(priceWithTax).toBe(108.49);
  });

  it("calculates discount correctly", () => {
    const originalPrice = 199.99;
    const discountPercent = 25;
    const finalPrice = subtractPercentage(originalPrice, discountPercent);
    expect(finalPrice).toBe(149.99);
  });

  it("calculates tip percentage", () => {
    const billAmount = 47.82;
    const tipAmount = 10;
    const tipPercent = whatPercentOf(tipAmount, billAmount);
    expect(tipPercent).toBe(20.91);
  });

  it("calculates stock price change", () => {
    const openingPrice = 150.25;
    const closingPrice = 157.76;
    const change = percentageChange(openingPrice, closingPrice);
    expect(change).toBe(5);
  });

  it("calculates grade percentage", () => {
    const correctAnswers = 47;
    const totalQuestions = 50;
    const grade = whatPercentOf(correctAnswers, totalQuestions);
    expect(grade).toBe(94);
  });

  it("calculates completion percentage", () => {
    const tasksCompleted = 23;
    const totalTasks = 30;
    const completionRate = whatPercentOf(tasksCompleted, totalTasks);
    expect(completionRate).toBe(76.67);
  });

  it("calculates interest earned", () => {
    const principal = 10000;
    const annualRate = 5.5;
    const interest = whatIsPercentOf(annualRate, principal);
    expect(interest).toBe(550);
  });

  it("calculates population growth", () => {
    const yearStart = 1000000;
    const yearEnd = 1050000;
    const growthRate = percentageChange(yearStart, yearEnd);
    expect(growthRate).toBe(5);
  });
});
