import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCalculator } from "@fortawesome/free-solid-svg-icons/faCalculator";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons/faRotateLeft";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type ChangeEvent, type FC, type FormEvent, type ReactElement, useState } from "react";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { percentageChange, whatIsPercentOf, whatPercentOf } from "~/utils/percentages/percentages";

interface CalculationHistory {
  type: "whatIsPercentOf" | "whatPercentOf" | "percentageChange";
  input1: number;
  input2: number;
  result: number;
  timestamp: number;
}

export const PercentageCalculator: FC = (): ReactElement => {
  // State for "What is X% of Y?" calculator
  const [percentOf, setPercentOf] = useState<string>("");
  const [valueOfNumber, setValueOfNumber] = useState<string>("");
  const [resultPercentOf, setResultPercentOf] = useState<number | null>(null);
  const [calculatedPercentOf, setCalculatedPercentOf] = useState<string>("");
  const [calculatedValueOf, setCalculatedValueOf] = useState<string>("");

  // State for "X is what percent of Y?" calculator
  const [partValue, setPartValue] = useState<string>("");
  const [wholeValue, setWholeValue] = useState<string>("");
  const [resultWhatPercent, setResultWhatPercent] = useState<number | null>(null);
  const [calculatedPartValue, setCalculatedPartValue] = useState<string>("");
  const [calculatedWholeValue, setCalculatedWholeValue] = useState<string>("");

  // State for "Percentage Change" calculator
  const [startValue, setStartValue] = useState<string>("");
  const [endValue, setEndValue] = useState<string>("");
  const [resultChange, setResultChange] = useState<number | null>(null);
  const [calculatedStartValue, setCalculatedStartValue] = useState<string>("");
  const [calculatedEndValue, setCalculatedEndValue] = useState<string>("");

  // History state with localStorage
  const [history, setHistory] = useLocalStorage<CalculationHistory[]>("percentage-calculator-history", []);

  // Error states
  const [errorPercentOf, setErrorPercentOf] = useState<string>("");
  const [errorWhatPercent, setErrorWhatPercent] = useState<string>("");
  const [errorChange, setErrorChange] = useState<string>("");

  // Calculate "What is X% of Y?"
  const handleCalculatePercentOf = (e: FormEvent): void => {
    e.preventDefault();
    setErrorPercentOf("");

    const percent = Number.parseFloat(percentOf);
    const value = Number.parseFloat(valueOfNumber);

    if (Number.isNaN(percent) || Number.isNaN(value)) {
      setErrorPercentOf("Please enter valid numbers");
      return;
    }

    try {
      const result = whatIsPercentOf(percent, value);
      setResultPercentOf(result);
      setCalculatedPercentOf(percentOf);
      setCalculatedValueOf(valueOfNumber);

      // Add to history
      setHistory((prev) => [
        {
          type: "whatIsPercentOf",
          input1: percent,
          input2: value,
          result,
          timestamp: Date.now(),
        },
        ...prev,
      ]);
    } catch (error: unknown) {
      setErrorPercentOf(error instanceof Error ? error.message : "Calculation error");
    }
  };

  // Calculate "X is what percent of Y?"
  const handleCalculateWhatPercent = (e: FormEvent): void => {
    e.preventDefault();
    setErrorWhatPercent("");

    const part = Number.parseFloat(partValue);
    const whole = Number.parseFloat(wholeValue);

    if (Number.isNaN(part) || Number.isNaN(whole)) {
      setErrorWhatPercent("Please enter valid numbers");
      return;
    }

    try {
      const result = whatPercentOf(part, whole);
      setResultWhatPercent(result);
      setCalculatedPartValue(partValue);
      setCalculatedWholeValue(wholeValue);

      // Add to history
      setHistory((prev) => [
        {
          type: "whatPercentOf",
          input1: part,
          input2: whole,
          result,
          timestamp: Date.now(),
        },
        ...prev,
      ]);
    } catch (error: unknown) {
      setErrorWhatPercent(error instanceof Error ? error.message : "Calculation error");
    }
  };

  // Calculate "Percentage Change"
  const handleCalculateChange = (e: FormEvent): void => {
    e.preventDefault();
    setErrorChange("");

    const start = Number.parseFloat(startValue);
    const end = Number.parseFloat(endValue);

    if (Number.isNaN(start) || Number.isNaN(end)) {
      setErrorChange("Please enter valid numbers");
      return;
    }

    try {
      const result = percentageChange(start, end);
      setResultChange(result);
      setCalculatedStartValue(startValue);
      setCalculatedEndValue(endValue);

      // Add to history
      setHistory((prev) => [
        {
          type: "percentageChange",
          input1: start,
          input2: end,
          result,
          timestamp: Date.now(),
        },
        ...prev,
      ]);
    } catch (error: unknown) {
      setErrorChange(error instanceof Error ? error.message : "Calculation error");
    }
  };

  // Re-run a calculation from history
  const handleRerun = (item: CalculationHistory): void => {
    if (item.type === "whatIsPercentOf") {
      setPercentOf(item.input1.toString());
      setValueOfNumber(item.input2.toString());
      setResultPercentOf(item.result);
      setCalculatedPercentOf(item.input1.toString());
      setCalculatedValueOf(item.input2.toString());
    } else if (item.type === "whatPercentOf") {
      setPartValue(item.input1.toString());
      setWholeValue(item.input2.toString());
      setResultWhatPercent(item.result);
      setCalculatedPartValue(item.input1.toString());
      setCalculatedWholeValue(item.input2.toString());
    } else if (item.type === "percentageChange") {
      setStartValue(item.input1.toString());
      setEndValue(item.input2.toString());
      setResultChange(item.result);
      setCalculatedStartValue(item.input1.toString());
      setCalculatedEndValue(item.input2.toString());
    }
  };

  // Delete a single history item
  const handleDeleteHistoryItem = (timestamp: number): void => {
    setHistory((prev) => prev.filter((item) => item.timestamp !== timestamp));
  };

  // Clear all history
  const handleClearHistory = (): void => {
    setHistory([]);
  };

  // Filter history by type
  const getHistoryByType = (type: CalculationHistory["type"]): CalculationHistory[] => {
    return history.filter((item) => item.type === type).slice(0, 5); // Show last 5
  };

  // Format history item text
  const formatHistoryText = (item: CalculationHistory): string => {
    if (item.type === "whatIsPercentOf") {
      return `${item.input1}% of ${item.input2} = ${item.result}`;
    }
    if (item.type === "whatPercentOf") {
      return `${item.input1} is ${item.result}% of ${item.input2}`;
    }
    return `${item.input1} to ${item.input2} = ${item.result > 0 ? "+" : ""}${item.result}%`;
  };

  const inputClassName = "ejr-input w-full";
  const buttonClassName = "ejr-btn ejr-btn-secondary w-full justify-center";
  const resultClassName = "mt-4 rounded-md bg-surface-300 p-4 text-center text-figure text-ink tabular-nums";
  const errorClassName = "mt-2 rounded-md bg-danger-soft p-2 text-center text-caption font-bold text-danger";
  const cardClassName = "rounded-lg bg-surface-200 p-6";
  const historyItemClassName = "flex items-center justify-between rounded-md bg-surface-300 p-3 text-caption";
  const iconButtonClassName =
    "inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:bg-surface-100 hover:text-ink";
  const explanationClassName = "mt-2 rounded-md bg-surface-300 p-3 text-caption text-ink-muted";

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4">
      <div className="text-center">
        <h1 className="text-display text-ink mb-2 font-bold">
          <FontAwesomeIcon icon={faCalculator as IconProp} className="mr-3" />
          Percentage calculator
        </h1>
        <p className="text-ink-muted">Calculate percentages with ease and keep track of your calculation history</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* What is X% of Y? */}
        <div className={cardClassName}>
          <h2 className="text-heading-3 text-ink mb-4 font-semibold">What is X% of Y?</h2>
          <form onSubmit={handleCalculatePercentOf} className="space-y-4">
            <div>
              <label htmlFor="percent-of" className="text-caption text-ink mb-1 block font-medium">
                Percentage (%)
              </label>
              <input
                id="percent-of"
                type="number"
                step="any"
                value={percentOf}
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setPercentOf(e.target.value)}
                className={inputClassName}
                placeholder="e.g., 25"
                required
              />
            </div>
            <div>
              <label htmlFor="value-of" className="text-caption text-ink mb-1 block font-medium">
                Value
              </label>
              <input
                id="value-of"
                type="number"
                step="any"
                value={valueOfNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setValueOfNumber(e.target.value)}
                className={inputClassName}
                placeholder="e.g., 200"
                required
              />
            </div>
            <button type="submit" className={buttonClassName}>
              Calculate
            </button>
          </form>

          {errorPercentOf && <div className={errorClassName}>{errorPercentOf}</div>}
          {resultPercentOf !== null && (
            <>
              <div className={resultClassName}>{resultPercentOf}</div>
              <div className={explanationClassName}>
                <strong>How it works:</strong> ({calculatedPercentOf} ÷ 100) × {calculatedValueOf} = {resultPercentOf}
              </div>
            </>
          )}

          {getHistoryByType("whatIsPercentOf").length > 0 && (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-caption text-ink font-semibold">Recent calculations</h3>
                <button
                  type="button"
                  onClick={(): void => setHistory((prev) => prev.filter((item) => item.type !== "whatIsPercentOf"))}
                  className="text-caption text-danger hover:text-ink"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-2">
                {getHistoryByType("whatIsPercentOf").map((item) => (
                  <div key={item.timestamp} className={historyItemClassName}>
                    <span className="text-ink flex-1">{formatHistoryText(item)}</span>
                    <div className="ml-2 flex gap-1">
                      <button
                        type="button"
                        onClick={(): void => handleRerun(item)}
                        className={iconButtonClassName}
                        title="Rerun calculation"
                      >
                        <FontAwesomeIcon icon={faRotateLeft as IconProp} />
                      </button>
                      <button
                        type="button"
                        onClick={(): void => handleDeleteHistoryItem(item.timestamp)}
                        className={iconButtonClassName}
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash as IconProp} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* X is what percent of Y? */}
        <div className={cardClassName}>
          <h2 className="text-heading-3 text-ink mb-4 font-semibold">X is what percent of Y?</h2>
          <form onSubmit={handleCalculateWhatPercent} className="space-y-4">
            <div>
              <label htmlFor="part-value" className="text-caption text-ink mb-1 block font-medium">
                Part
              </label>
              <input
                id="part-value"
                type="number"
                step="any"
                value={partValue}
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setPartValue(e.target.value)}
                className={inputClassName}
                placeholder="e.g., 50"
                required
              />
            </div>
            <div>
              <label htmlFor="whole-value" className="text-caption text-ink mb-1 block font-medium">
                Whole
              </label>
              <input
                id="whole-value"
                type="number"
                step="any"
                value={wholeValue}
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setWholeValue(e.target.value)}
                className={inputClassName}
                placeholder="e.g., 200"
                required
              />
            </div>
            <button type="submit" className={buttonClassName}>
              Calculate
            </button>
          </form>

          {errorWhatPercent && <div className={errorClassName}>{errorWhatPercent}</div>}
          {resultWhatPercent !== null && (
            <>
              <div className={resultClassName}>{resultWhatPercent}%</div>
              <div className={explanationClassName}>
                <strong>How it works:</strong> ({calculatedPartValue} ÷ {calculatedWholeValue}) × 100 ={" "}
                {resultWhatPercent}%
              </div>
            </>
          )}

          {getHistoryByType("whatPercentOf").length > 0 && (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-caption text-ink font-semibold">Recent calculations</h3>
                <button
                  type="button"
                  onClick={(): void => setHistory((prev) => prev.filter((item) => item.type !== "whatPercentOf"))}
                  className="text-caption text-danger hover:text-ink"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-2">
                {getHistoryByType("whatPercentOf").map((item) => (
                  <div key={item.timestamp} className={historyItemClassName}>
                    <span className="text-ink flex-1">{formatHistoryText(item)}</span>
                    <div className="ml-2 flex gap-1">
                      <button
                        type="button"
                        onClick={(): void => handleRerun(item)}
                        className={iconButtonClassName}
                        title="Rerun calculation"
                      >
                        <FontAwesomeIcon icon={faRotateLeft as IconProp} />
                      </button>
                      <button
                        type="button"
                        onClick={(): void => handleDeleteHistoryItem(item.timestamp)}
                        className={iconButtonClassName}
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash as IconProp} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Percentage Change */}
        <div className={cardClassName}>
          <h2 className="text-heading-3 text-ink mb-4 font-semibold">Percentage change</h2>
          <form onSubmit={handleCalculateChange} className="space-y-4">
            <div>
              <label htmlFor="start-value" className="text-caption text-ink mb-1 block font-medium">
                Start value
              </label>
              <input
                id="start-value"
                type="number"
                step="any"
                value={startValue}
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setStartValue(e.target.value)}
                className={inputClassName}
                placeholder="e.g., 100"
                required
              />
            </div>
            <div>
              <label htmlFor="end-value" className="text-caption text-ink mb-1 block font-medium">
                End value
              </label>
              <input
                id="end-value"
                type="number"
                step="any"
                value={endValue}
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setEndValue(e.target.value)}
                className={inputClassName}
                placeholder="e.g., 150"
                required
              />
            </div>
            <button type="submit" className={buttonClassName}>
              Calculate
            </button>
          </form>

          {errorChange && <div className={errorClassName}>{errorChange}</div>}
          {resultChange !== null && (
            <>
              <div className={resultClassName}>
                {resultChange > 0 ? "+" : ""}
                {resultChange}%
              </div>
              <div className={explanationClassName}>
                <strong>How it works:</strong> (({calculatedEndValue} - {calculatedStartValue}) ÷{" "}
                {Math.abs(Number.parseFloat(calculatedStartValue))}) × 100 = {resultChange > 0 ? "+" : ""}
                {resultChange}%
              </div>
            </>
          )}

          {getHistoryByType("percentageChange").length > 0 && (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-caption text-ink font-semibold">Recent calculations</h3>
                <button
                  type="button"
                  onClick={(): void => setHistory((prev) => prev.filter((item) => item.type !== "percentageChange"))}
                  className="text-caption text-danger hover:text-ink"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-2">
                {getHistoryByType("percentageChange").map((item) => (
                  <div key={item.timestamp} className={historyItemClassName}>
                    <span className="text-ink flex-1">{formatHistoryText(item)}</span>
                    <div className="ml-2 flex gap-1">
                      <button
                        type="button"
                        onClick={(): void => handleRerun(item)}
                        className={iconButtonClassName}
                        title="Rerun calculation"
                      >
                        <FontAwesomeIcon icon={faRotateLeft as IconProp} />
                      </button>
                      <button
                        type="button"
                        onClick={(): void => handleDeleteHistoryItem(item.timestamp)}
                        className={iconButtonClassName}
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash as IconProp} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {history.length > 0 && (
        <div className="text-center">
          <button type="button" onClick={handleClearHistory} className="ejr-btn ejr-btn-danger">
            <FontAwesomeIcon icon={faTrash as IconProp} className="mr-2" />
            Clear all history
          </button>
        </div>
      )}
    </div>
  );
};
