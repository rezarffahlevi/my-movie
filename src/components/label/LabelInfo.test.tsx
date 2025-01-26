import React from "react";
import { render, screen } from "@testing-library/react";
import { LabelInfo } from "./LLabelInfo"; // Adjust the import path as needed
import "@testing-library/jest-dom";

describe("LabelInfo", () => {
  it("renders the label and value correctly", () => {
    render(<LabelInfo label="Test Label" value="Test Value" />);

    // Assert the label is rendered correctly
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Test Label")).toHaveClass("font-bold");

    // Assert the value is rendered correctly
    expect(screen.getByText("Test Value")).toBeInTheDocument();
  });

  it("renders a dash ('-') when value is an empty string", () => {
    render(<LabelInfo label="Empty Value Label" value="" />);

    // Assert the label is rendered correctly
    expect(screen.getByText("Empty Value Label")).toBeInTheDocument();

    // Assert the dash is rendered as the value
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("renders correctly when value is undefined", () => {
    render(<LabelInfo label="Undefined Value Label" value={undefined} />);

    // Assert the label is rendered correctly
    expect(screen.getByText("Undefined Value Label")).toBeInTheDocument();

    // Assert undefined value is not rendered, and instead the dash is rendered
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("renders correctly when label is undefined", () => {
    render(<LabelInfo label={undefined} value="Some Value" />);

    // Assert the value is rendered correctly
    expect(screen.getByText("Some Value")).toBeInTheDocument();
  });
});
