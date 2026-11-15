import { describe, expect, it } from "vitest";
import { formatLongDate } from "./dates";

describe("formatLongDate", () => {
  it.each([
    ["2026-11-01", "1st November 2026"],
    ["2026-11-02", "2nd November 2026"],
    ["2026-11-03", "3rd November 2026"],
    ["2026-11-10", "10th November 2026"],
    ["2026-11-11", "11th November 2026"],
    ["2026-11-12", "12th November 2026"],
    ["2026-11-13", "13th November 2026"],
    ["2026-11-21", "21st November 2026"],
    ["2026-11-22", "22nd November 2026"],
    ["2026-11-23", "23rd November 2026"],
    ["2026-01-31", "31st January 2026"],
  ])("formats %s as %s", (isoDate, expected) => {
    expect(formatLongDate(isoDate)).toBe(expected);
  });

  it("uses the calendar date of an ISO timestamp regardless of the local time zone", () => {
    expect(formatLongDate("2026-02-10T00:00:00+00:00")).toBe("10th February 2026");
  });
});
