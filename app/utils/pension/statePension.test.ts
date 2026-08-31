import { describe, expect, it } from "vitest";
import { annualStatePension, statePensionAge } from "./statePension";

describe("annualStatePension", () => {
  it("pays nothing below the minimum qualifying years", () => {
    expect(annualStatePension(0)).toBe(0);
    expect(annualStatePension(9)).toBe(0);
  });

  it("pro-rates between the minimum and full qualifying years", () => {
    expect(annualStatePension(10)).toBeCloseTo((241.3 * 52 * 10) / 35, 2);
    expect(annualStatePension(20)).toBeCloseTo((241.3 * 52 * 20) / 35, 2);
  });

  it("pays the full amount at 35 qualifying years", () => {
    expect(annualStatePension(35)).toBeCloseTo(12_547.6, 2);
  });

  it("caps at the full amount above 35 qualifying years", () => {
    expect(annualStatePension(40)).toBeCloseTo(12_547.6, 2);
  });

  it("throws for non-finite or negative years", () => {
    expect(() => annualStatePension(Number.NaN)).toThrow();
    expect(() => annualStatePension(-1)).toThrow();
  });
});

describe("statePensionAge", () => {
  it("returns 66 for those at or near the current state pension age", () => {
    expect(statePensionAge(66)).toBe(66);
    expect(statePensionAge(70)).toBe(66);
  });

  it("returns 67 for those reaching state pension age after the rise to 67", () => {
    expect(statePensionAge(60)).toBe(67);
    expect(statePensionAge(50)).toBe(67);
  });

  it("returns 68 for younger people affected by the planned rise to 68", () => {
    expect(statePensionAge(40)).toBe(68);
    expect(statePensionAge(25)).toBe(68);
  });

  it("throws for non-finite or negative ages", () => {
    expect(() => statePensionAge(Number.NaN)).toThrow();
    expect(() => statePensionAge(-1)).toThrow();
  });
});
