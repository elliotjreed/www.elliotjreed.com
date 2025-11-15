import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { StayAlert } from "./StayAlert";

vi.mock("dom-to-image-more", () => ({
  default: {
    toPng: vi.fn(() => Promise.resolve("data:image/png;base64,mockImageData")),
  },
}));

vi.mock("~/components/StayAlert/YellowBox", () => ({
  YellowBox: ({ lineOne, lineTwo, lineThree }: { lineOne: string; lineTwo: string; lineThree: string }) => (
    <div data-testid="yellow-box">
      <div>{lineOne}</div>
      <div>{lineTwo}</div>
      <div>{lineThree}</div>
    </div>
  ),
}));

describe("StayAlert", () => {
  it("should render YellowBox component", () => {
    render(<StayAlert />);

    expect(screen.getByTestId("yellow-box")).toBeInTheDocument();
  });

  it("should render three input fields", () => {
    render(<StayAlert />);

    const firstInput = screen.getByLabelText("First line of the poster text");
    const secondInput = screen.getByLabelText("Second line of the poster text");
    const thirdInput = screen.getByLabelText("Third line of the poster text");

    expect(firstInput).toBeInTheDocument();
    expect(secondInput).toBeInTheDocument();
    expect(thirdInput).toBeInTheDocument();
  });

  it("should have correct placeholders", () => {
    render(<StayAlert />);

    expect(screen.getByPlaceholderText("Stay alert.")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Control the virus.")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Save lives.")).toBeInTheDocument();
  });

  it("should render download button", async () => {
    render(<StayAlert />);

    await waitFor(() => {
      const downloadLink = screen.getByRole("link", { name: "Download" });
      expect(downloadLink).toBeInTheDocument();
      expect(downloadLink).toHaveAttribute("download", "stayalert.png");
    });
  });

  it("should update YellowBox when input changes", async () => {
    const user = userEvent.setup();
    render(<StayAlert />);

    const firstInput = screen.getByLabelText("First line of the poster text");
    await user.type(firstInput, "New first line");

    await waitFor(() => {
      expect(screen.getByText("New first line")).toBeInTheDocument();
    });
  });

  it("should have download URL href", async () => {
    render(<StayAlert />);

    await waitFor(() => {
      const downloadLink = screen.getByRole("link", { name: "Download" });
      const href = downloadLink.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).toContain("data:image/png");
    });
  });

  it("should have correct initial values in YellowBox", () => {
    render(<StayAlert />);

    expect(screen.getByText("STAY ALERT.")).toBeInTheDocument();
    expect(screen.getByText("CONTROL THE VIRUS.")).toBeInTheDocument();
    expect(screen.getByText("SAVE LIVES.")).toBeInTheDocument();
  });

  it("should have form element", () => {
    const { container } = render(<StayAlert />);
    const form = container.querySelector("form");

    expect(form).toBeInTheDocument();
  });

  it("should have container with grid layout", () => {
    const { container } = render(<StayAlert />);
    const grid = container.querySelector(".grid");

    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass("grid-cols-4", "gap-4");
  });

  it("should update all three lines independently", async () => {
    const user = userEvent.setup();
    render(<StayAlert />);

    const firstInput = screen.getByLabelText("First line of the poster text");
    const secondInput = screen.getByLabelText("Second line of the poster text");
    const thirdInput = screen.getByLabelText("Third line of the poster text");

    await user.clear(firstInput);
    await user.type(firstInput, "Line 1");

    await user.clear(secondInput);
    await user.type(secondInput, "Line 2");

    await user.clear(thirdInput);
    await user.type(thirdInput, "Line 3");

    await waitFor(() => {
      expect(screen.getByText("Line 1")).toBeInTheDocument();
      expect(screen.getByText("Line 2")).toBeInTheDocument();
      expect(screen.getByText("Line 3")).toBeInTheDocument();
    });
  });
});
