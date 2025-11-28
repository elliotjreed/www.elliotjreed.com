import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { PercentageCalculator } from "./PercentageCalculator";

// Mock useLocalStorage hook to use regular useState
vi.mock("~/hooks/useLocalStorage", () => ({
  useLocalStorage: <T,>(_key: string, initialValue: T) => {
    return useState<T>(initialValue);
  },
}));

describe("PercentageCalculator", () => {
  describe("Rendering", () => {
    it("renders the main heading", () => {
      render(<PercentageCalculator />);
      expect(screen.getByRole("heading", { name: /percentage calculator/i })).toBeInTheDocument();
    });

    it("renders all three calculator sections", () => {
      render(<PercentageCalculator />);
      expect(screen.getByRole("heading", { name: /what is x% of y\?/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /x is what percent of y\?/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /percentage change/i })).toBeInTheDocument();
    });

    it("renders all input fields", () => {
      render(<PercentageCalculator />);

      // What is X% of Y? section
      expect(screen.getByLabelText(/percentage \(%\)/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/e\.g\., 25/i)).toBeInTheDocument();

      // X is what percent of Y? section
      expect(screen.getByLabelText(/^part$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^whole$/i)).toBeInTheDocument();

      // Percentage Change section
      expect(screen.getByLabelText(/start value/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/end value/i)).toBeInTheDocument();
    });

    it("renders calculate buttons for each section", () => {
      render(<PercentageCalculator />);
      const calculateButtons = screen.getAllByRole("button", { name: /calculate/i });
      expect(calculateButtons).toHaveLength(3);
    });
  });

  describe("What is X% of Y? Calculator", () => {
    it("calculates percentage correctly", () => {
      render(<PercentageCalculator />);

      const percentInput = screen.getByLabelText(/percentage \(%\)/i);
      const valueInput = screen.getByLabelText(/^value$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[0];

      fireEvent.change(percentInput, { target: { value: "25" } });
      fireEvent.change(valueInput, { target: { value: "200" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText("50")).toBeInTheDocument();
    });

    it("handles decimal inputs", () => {
      render(<PercentageCalculator />);

      const percentInput = screen.getByLabelText(/percentage \(%\)/i);
      const valueInput = screen.getByLabelText(/^value$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[0];

      fireEvent.change(percentInput, { target: { value: "12.5" } });
      fireEvent.change(valueInput, { target: { value: "80" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText("10")).toBeInTheDocument();
    });

    it("handles zero values correctly", () => {
      render(<PercentageCalculator />);

      const percentInput = screen.getByLabelText(/percentage \(%\)/i);
      const valueInput = screen.getByLabelText(/^value$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[0];

      fireEvent.change(percentInput, { target: { value: "0" } });
      fireEvent.change(valueInput, { target: { value: "100" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("adds calculation to history", () => {
      render(<PercentageCalculator />);

      const percentInput = screen.getByLabelText(/percentage \(%\)/i);
      const valueInput = screen.getByLabelText(/^value$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[0];

      fireEvent.change(percentInput, { target: { value: "25" } });
      fireEvent.change(valueInput, { target: { value: "200" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText(/25% of 200 = 50/i)).toBeInTheDocument();
    });

    it("displays calculation explanation", () => {
      render(<PercentageCalculator />);

      const percentInput = screen.getByLabelText(/percentage \(%\)/i);
      const valueInput = screen.getByLabelText(/^value$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[0];

      fireEvent.change(percentInput, { target: { value: "25" } });
      fireEvent.change(valueInput, { target: { value: "200" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText(/how it works:/i)).toBeInTheDocument();
      expect(screen.getByText(/\(25 ÷ 100\) × 200 = 50/i)).toBeInTheDocument();
    });
  });

  describe("X is what percent of Y? Calculator", () => {
    it("calculates percentage correctly", () => {
      render(<PercentageCalculator />);

      const partInput = screen.getByLabelText(/^part$/i);
      const wholeInput = screen.getByLabelText(/^whole$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[1];

      fireEvent.change(partInput, { target: { value: "50" } });
      fireEvent.change(wholeInput, { target: { value: "200" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText("25%")).toBeInTheDocument();
    });

    it("handles decimal results", () => {
      render(<PercentageCalculator />);

      const partInput = screen.getByLabelText(/^part$/i);
      const wholeInput = screen.getByLabelText(/^whole$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[1];

      fireEvent.change(partInput, { target: { value: "1" } });
      fireEvent.change(wholeInput, { target: { value: "3" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText("33.33%")).toBeInTheDocument();
    });

    it("shows error when whole is zero", () => {
      render(<PercentageCalculator />);

      const partInput = screen.getByLabelText(/^part$/i);
      const wholeInput = screen.getByLabelText(/^whole$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[1];

      fireEvent.change(partInput, { target: { value: "50" } });
      fireEvent.change(wholeInput, { target: { value: "0" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText(/whole cannot be zero/i)).toBeInTheDocument();
    });

    it("adds calculation to history", () => {
      render(<PercentageCalculator />);

      const partInput = screen.getByLabelText(/^part$/i);
      const wholeInput = screen.getByLabelText(/^whole$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[1];

      fireEvent.change(partInput, { target: { value: "50" } });
      fireEvent.change(wholeInput, { target: { value: "200" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText(/50 is 25% of 200/i)).toBeInTheDocument();
    });

    it("displays calculation explanation", () => {
      render(<PercentageCalculator />);

      const partInput = screen.getByLabelText(/^part$/i);
      const wholeInput = screen.getByLabelText(/^whole$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[1];

      fireEvent.change(partInput, { target: { value: "50" } });
      fireEvent.change(wholeInput, { target: { value: "200" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText(/how it works:/i)).toBeInTheDocument();
      expect(screen.getByText(/\(50 ÷ 200\) × 100 = 25%/i)).toBeInTheDocument();
    });
  });

  describe("Percentage Change Calculator", () => {
    it("calculates percentage increase correctly", () => {
      render(<PercentageCalculator />);

      const startInput = screen.getByLabelText(/start value/i);
      const endInput = screen.getByLabelText(/end value/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[2];

      fireEvent.change(startInput, { target: { value: "100" } });
      fireEvent.change(endInput, { target: { value: "150" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText("+50%")).toBeInTheDocument();
    });

    it("calculates percentage decrease correctly", () => {
      render(<PercentageCalculator />);

      const startInput = screen.getByLabelText(/start value/i);
      const endInput = screen.getByLabelText(/end value/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[2];

      fireEvent.change(startInput, { target: { value: "150" } });
      fireEvent.change(endInput, { target: { value: "100" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText("-33.33%")).toBeInTheDocument();
    });

    it("shows error when start value is zero", () => {
      render(<PercentageCalculator />);

      const startInput = screen.getByLabelText(/start value/i);
      const endInput = screen.getByLabelText(/end value/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[2];

      fireEvent.change(startInput, { target: { value: "0" } });
      fireEvent.change(endInput, { target: { value: "150" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText(/start value cannot be zero/i)).toBeInTheDocument();
    });

    it("adds calculation to history", () => {
      render(<PercentageCalculator />);

      const startInput = screen.getByLabelText(/start value/i);
      const endInput = screen.getByLabelText(/end value/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[2];

      fireEvent.change(startInput, { target: { value: "100" } });
      fireEvent.change(endInput, { target: { value: "150" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText(/100 to 150 = \+50%/i)).toBeInTheDocument();
    });

    it("displays calculation explanation for increase", () => {
      render(<PercentageCalculator />);

      const startInput = screen.getByLabelText(/start value/i);
      const endInput = screen.getByLabelText(/end value/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[2];

      fireEvent.change(startInput, { target: { value: "100" } });
      fireEvent.change(endInput, { target: { value: "150" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText(/how it works:/i)).toBeInTheDocument();
      expect(screen.getByText(/\(\(150 - 100\) ÷ 100\) × 100 = \+50%/i)).toBeInTheDocument();
    });

    it("displays calculation explanation for decrease", () => {
      render(<PercentageCalculator />);

      const startInput = screen.getByLabelText(/start value/i);
      const endInput = screen.getByLabelText(/end value/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[2];

      fireEvent.change(startInput, { target: { value: "150" } });
      fireEvent.change(endInput, { target: { value: "100" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText(/how it works:/i)).toBeInTheDocument();
      expect(screen.getByText(/\(\(100 - 150\) ÷ 150\) × 100 = -33\.33%/i)).toBeInTheDocument();
    });
  });

  describe("History Functionality", () => {
    it("displays recent calculations heading when history exists", () => {
      render(<PercentageCalculator />);

      const percentInput = screen.getByLabelText(/percentage \(%\)/i);
      const valueInput = screen.getByLabelText(/^value$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[0];

      fireEvent.change(percentInput, { target: { value: "25" } });
      fireEvent.change(valueInput, { target: { value: "200" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText(/recent calculations/i)).toBeInTheDocument();
    });

    it("allows rerunning a calculation from history", () => {
      render(<PercentageCalculator />);

      const percentInput = screen.getByLabelText(/percentage \(%\)/i);
      const valueInput = screen.getByLabelText(/^value$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[0];

      // First calculation
      fireEvent.change(percentInput, { target: { value: "25" } });
      fireEvent.change(valueInput, { target: { value: "200" } });
      fireEvent.click(calculateButton);

      // Clear inputs
      fireEvent.change(percentInput, { target: { value: "" } });
      fireEvent.change(valueInput, { target: { value: "" } });

      // Rerun from history
      const rerunButton = screen.getByTitle(/rerun calculation/i);
      fireEvent.click(rerunButton);

      // Check that inputs are populated
      expect(percentInput).toHaveValue(25);
      expect(valueInput).toHaveValue(200);
    });

    it("allows deleting individual history items", async () => {
      render(<PercentageCalculator />);

      const percentInput = screen.getByLabelText(/percentage \(%\)/i);
      const valueInput = screen.getByLabelText(/^value$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[0];

      fireEvent.change(percentInput, { target: { value: "25" } });
      fireEvent.change(valueInput, { target: { value: "200" } });
      fireEvent.click(calculateButton);

      const historyText = screen.getByText(/25% of 200 = 50/i);
      expect(historyText).toBeInTheDocument();

      const deleteButton = screen.getByTitle(/^delete$/i);
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.queryByText(/25% of 200 = 50/i)).not.toBeInTheDocument();
      });
    });

    it("allows clearing section-specific history", async () => {
      render(<PercentageCalculator />);

      const percentInput = screen.getByLabelText(/percentage \(%\)/i);
      const valueInput = screen.getByLabelText(/^value$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[0];

      fireEvent.change(percentInput, { target: { value: "25" } });
      fireEvent.change(valueInput, { target: { value: "200" } });
      fireEvent.click(calculateButton);

      const clearButtons = screen.getAllByRole("button", { name: /^clear$/i });
      fireEvent.click(clearButtons[0]);

      await waitFor(() => {
        expect(screen.queryByText(/25% of 200 = 50/i)).not.toBeInTheDocument();
      });
    });

    it("shows clear all history button when history exists", () => {
      render(<PercentageCalculator />);

      const percentInput = screen.getByLabelText(/percentage \(%\)/i);
      const valueInput = screen.getByLabelText(/^value$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[0];

      fireEvent.change(percentInput, { target: { value: "25" } });
      fireEvent.change(valueInput, { target: { value: "200" } });
      fireEvent.click(calculateButton);

      expect(screen.getByRole("button", { name: /clear all history/i })).toBeInTheDocument();
    });

    it("clears all history when clear all button is clicked", async () => {
      render(<PercentageCalculator />);

      // Add calculations to different sections
      const percentInput = screen.getByLabelText(/percentage \(%\)/i);
      const valueInput = screen.getByLabelText(/^value$/i);
      const calculateButton1 = screen.getAllByRole("button", { name: /calculate/i })[0];

      fireEvent.change(percentInput, { target: { value: "25" } });
      fireEvent.change(valueInput, { target: { value: "200" } });
      fireEvent.click(calculateButton1);

      const partInput = screen.getByLabelText(/^part$/i);
      const wholeInput = screen.getByLabelText(/^whole$/i);
      const calculateButton2 = screen.getAllByRole("button", { name: /calculate/i })[1];

      fireEvent.change(partInput, { target: { value: "50" } });
      fireEvent.change(wholeInput, { target: { value: "200" } });
      fireEvent.click(calculateButton2);

      // Clear all history
      const clearAllButton = screen.getByRole("button", { name: /clear all history/i });
      fireEvent.click(clearAllButton);

      await waitFor(() => {
        expect(screen.queryByText(/25% of 200 = 50/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/50 is 25% of 200/i)).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /clear all history/i })).not.toBeInTheDocument();
      });
    });

    it("limits history display to 5 items per section", () => {
      render(<PercentageCalculator />);

      const percentInput = screen.getByLabelText(/percentage \(%\)/i);
      const valueInput = screen.getByLabelText(/^value$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[0];

      // Add 7 calculations
      for (let i = 1; i <= 7; i++) {
        fireEvent.change(percentInput, { target: { value: `${i}` } });
        fireEvent.change(valueInput, { target: { value: "100" } });
        fireEvent.click(calculateButton);
      }

      // Check that only 5 are displayed
      const historyItems = screen.getAllByTitle(/rerun calculation/i);
      expect(historyItems).toHaveLength(5);
    });
  });

  describe("Accessibility", () => {
    it("has proper labels for all inputs", () => {
      render(<PercentageCalculator />);

      expect(screen.getByLabelText(/percentage \(%\)/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^value$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^part$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^whole$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/start value/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/end value/i)).toBeInTheDocument();
    });

    it("has proper button types", () => {
      render(<PercentageCalculator />);

      const calculateButtons = screen.getAllByRole("button", { name: /calculate/i });
      calculateButtons.forEach((button) => {
        expect(button).toHaveAttribute("type", "submit");
      });
    });

    it("has title attributes for icon buttons", () => {
      render(<PercentageCalculator />);

      const percentInput = screen.getByLabelText(/percentage \(%\)/i);
      const valueInput = screen.getByLabelText(/^value$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[0];

      fireEvent.change(percentInput, { target: { value: "25" } });
      fireEvent.change(valueInput, { target: { value: "200" } });
      fireEvent.click(calculateButton);

      expect(screen.getByTitle(/rerun calculation/i)).toBeInTheDocument();
      expect(screen.getByTitle(/^delete$/i)).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles negative numbers", () => {
      render(<PercentageCalculator />);

      const percentInput = screen.getByLabelText(/percentage \(%\)/i);
      const valueInput = screen.getByLabelText(/^value$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[0];

      fireEvent.change(percentInput, { target: { value: "-10" } });
      fireEvent.change(valueInput, { target: { value: "100" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText("-10")).toBeInTheDocument();
    });

    it("handles very large numbers", () => {
      render(<PercentageCalculator />);

      const percentInput = screen.getByLabelText(/percentage \(%\)/i);
      const valueInput = screen.getByLabelText(/^value$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[0];

      fireEvent.change(percentInput, { target: { value: "10" } });
      fireEvent.change(valueInput, { target: { value: "1000000" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText("100000")).toBeInTheDocument();
    });

    it("handles multiple calculations in sequence", () => {
      render(<PercentageCalculator />);

      const percentInput = screen.getByLabelText(/percentage \(%\)/i);
      const valueInput = screen.getByLabelText(/^value$/i);
      const calculateButton = screen.getAllByRole("button", { name: /calculate/i })[0];

      // First calculation
      fireEvent.change(percentInput, { target: { value: "10" } });
      fireEvent.change(valueInput, { target: { value: "100" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText("10")).toBeInTheDocument();

      // Second calculation
      fireEvent.change(percentInput, { target: { value: "25" } });
      fireEvent.change(valueInput, { target: { value: "200" } });
      fireEvent.click(calculateButton);

      expect(screen.getByText("50")).toBeInTheDocument();
    });
  });
});
