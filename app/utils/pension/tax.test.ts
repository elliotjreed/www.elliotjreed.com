import { describe, expect, it } from "vitest";
import {
  grossFromNet,
  grossPensionWithdrawalForNet,
  incomeTaxDue,
  netFromGross,
  netFromPensionWithdrawal,
  personalAllowanceFor,
} from "./tax";

describe("personalAllowanceFor", () => {
  it("gives the full allowance at or below the taper threshold", () => {
    expect(personalAllowanceFor(0)).toBe(12_570);
    expect(personalAllowanceFor(50_000)).toBe(12_570);
    expect(personalAllowanceFor(100_000)).toBe(12_570);
  });

  it("tapers the allowance by £1 for every £2 above £100,000", () => {
    expect(personalAllowanceFor(110_000)).toBe(7_570);
    expect(personalAllowanceFor(120_000)).toBe(2_570);
  });

  it("removes the allowance entirely at £125,140 and above", () => {
    expect(personalAllowanceFor(125_140)).toBe(0);
    expect(personalAllowanceFor(200_000)).toBe(0);
  });

  it("throws for non-finite income", () => {
    expect(() => personalAllowanceFor(Number.NaN)).toThrow();
    expect(() => personalAllowanceFor(Number.POSITIVE_INFINITY)).toThrow();
  });

  it("throws for negative income", () => {
    expect(() => personalAllowanceFor(-1)).toThrow();
  });
});

describe("incomeTaxDue", () => {
  it("charges no tax at or below the personal allowance", () => {
    expect(incomeTaxDue(0)).toBe(0);
    expect(incomeTaxDue(12_570)).toBe(0);
  });

  it("charges basic rate just above the personal allowance", () => {
    expect(incomeTaxDue(12_571)).toBeCloseTo(0.2, 2);
  });

  it("charges basic rate within the basic band", () => {
    // £30,000 - £12,570 = £17,430 taxable at 20%
    expect(incomeTaxDue(30_000)).toBeCloseTo(3_486, 2);
  });

  it("charges basic rate on the whole band at the higher-rate threshold", () => {
    // £50,270 - £12,570 = £37,700 taxable at 20%
    expect(incomeTaxDue(50_270)).toBeCloseTo(7_540, 2);
  });

  it("charges higher rate above the threshold", () => {
    // Taxable £47,430: £37,700 at 20% + £9,730 at 40%
    expect(incomeTaxDue(60_000)).toBeCloseTo(11_432, 2);
  });

  it("reflects the taper (60% effective zone) between £100,000 and £125,140", () => {
    // £110,000: allowance £7,570, taxable £102,430: £37,700 at 20% + £64,730 at 40%
    expect(incomeTaxDue(110_000)).toBeCloseTo(7_540 + 25_892, 2);
    // £125,140: allowance £0, taxable £125,140: £37,700 at 20% + £87,440 at 40%
    expect(incomeTaxDue(125_140)).toBeCloseTo(7_540 + 34_976, 2);
  });

  it("charges additional rate above £125,140", () => {
    // £150,000 taxable in full: £37,700 at 20% + £87,440 at 40% + £24,860 at 45%
    expect(incomeTaxDue(150_000)).toBeCloseTo(7_540 + 34_976 + 11_187, 2);
  });

  it("throws for non-finite or negative income", () => {
    expect(() => incomeTaxDue(Number.NaN)).toThrow();
    expect(() => incomeTaxDue(-100)).toThrow();
  });
});

describe("netFromGross and grossFromNet", () => {
  it("returns gross unchanged when no tax is due", () => {
    expect(netFromGross(10_000)).toBe(10_000);
  });

  it("round-trips through every band including the taper zone", () => {
    const samples = [0, 5_000, 12_570, 20_000, 50_270, 60_000, 100_000, 110_000, 125_140, 150_000, 300_000];
    for (const gross of samples) {
      const net = netFromGross(gross);
      expect(grossFromNet(net)).toBeCloseTo(gross, 1);
    }
  });

  it("throws for non-finite or negative input", () => {
    expect(() => netFromGross(Number.NaN)).toThrow();
    expect(() => grossFromNet(-5)).toThrow();
  });
});

describe("netFromPensionWithdrawal", () => {
  it("taxes only the taxable portion of a withdrawal", () => {
    // £20,000 withdrawal, 25% tax-free: £15,000 taxable, £12,570 allowance leaves £2,430 at 20%
    expect(netFromPensionWithdrawal(20_000, 0.25, 0)).toBeCloseTo(20_000 - 486, 2);
  });

  it("taxes the full withdrawal when the tax-free fraction is zero", () => {
    expect(netFromPensionWithdrawal(20_000, 0, 0)).toBeCloseTo(20_000 - incomeTaxDue(20_000), 2);
  });

  it("accounts for other taxable income consuming the personal allowance", () => {
    const statePension = 12_547.6;
    // Taxable part £15,000 sits almost entirely in the basic band once the state pension uses the allowance
    const expectedTax = incomeTaxDue(statePension + 15_000) - incomeTaxDue(statePension);
    expect(netFromPensionWithdrawal(20_000, 0.25, statePension)).toBeCloseTo(20_000 - expectedTax, 2);
  });

  it("throws for invalid fractions", () => {
    expect(() => netFromPensionWithdrawal(1_000, -0.1, 0)).toThrow();
    expect(() => netFromPensionWithdrawal(1_000, 1.1, 0)).toThrow();
  });
});

describe("grossPensionWithdrawalForNet", () => {
  it("inverts netFromPensionWithdrawal across bands", () => {
    const samples = [1_000, 10_000, 25_000, 60_000, 120_000];
    for (const targetNet of samples) {
      const gross = grossPensionWithdrawalForNet(targetNet, 0.25, 0);
      expect(netFromPensionWithdrawal(gross, 0.25, 0)).toBeCloseTo(targetNet, 1);
    }
  });

  it("inverts with other taxable income present", () => {
    const gross = grossPensionWithdrawalForNet(20_000, 0.25, 12_547.6);
    expect(netFromPensionWithdrawal(gross, 0.25, 12_547.6)).toBeCloseTo(20_000, 1);
  });

  it("returns zero for a zero target", () => {
    expect(grossPensionWithdrawalForNet(0, 0.25, 0)).toBe(0);
  });

  it("throws for negative targets", () => {
    expect(() => grossPensionWithdrawalForNet(-1, 0.25, 0)).toThrow();
  });
});
