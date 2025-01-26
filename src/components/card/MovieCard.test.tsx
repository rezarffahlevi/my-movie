import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MovieCard } from "./MMovieCard";
import "@testing-library/jest-dom";
import { IMG_404 } from "../../utils/constants";

const mockOnClick = jest.fn();

const defaultProps: any = {
  image: "valid-image-url.jpg",
  title: "Test Movie",
  description: "This is a test movie description.",
  year: 2021,
  id: "1",
  onClick: mockOnClick,
};

const renderComponent = (props = defaultProps) => {
  render(<MovieCard {...props} />);
};

describe("MovieCard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the movie card with correct title, year, and image", () => {
    renderComponent();

    // Check title and year
    expect(screen.getAllByText("Test Movie (2021)")[0]).toBeInTheDocument();

    // Check image
    const image = screen.getByRole("img", { name: /test movie/i });
    expect(image).toHaveAttribute("src", "valid-image-url.jpg");
  });

  it("displays fallback image when the image fails to load", () => {
    renderComponent();

    const image = screen.getByRole("img", { name: /test movie/i });
    fireEvent.error(image);
    expect(image).toHaveAttribute("src", IMG_404);
  });

  it("calls the onClick handler when the button is clicked", () => {
    renderComponent();

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("shows overlay and hides the title on hover", () => {
    renderComponent();

    const button = screen.getByRole("button");
    const title = screen.getAllByText("Test Movie (2021)")[0];
    const overlayDescription = screen.getAllByText(
      "This is a test movie description."
    )[0];

    // Before hover
    expect(title).not.toHaveClass("opacity-0");
    expect(overlayDescription.closest("div")).toHaveClass("opacity-0");

    // Simulate hover
    fireEvent.mouseEnter(button);

    // After hover
    expect(title).toHaveClass("group-hover:opacity-0");
    expect(overlayDescription.closest("div")).toHaveClass("group-hover:opacity-100");
  });

  it("renders description if provided", () => {
    renderComponent();

    const description = screen.getByText("This is a test movie description.");
    expect(description).toBeInTheDocument();
  });

  it("does not break if description is missing", () => {
    renderComponent({ ...defaultProps, description: null });

    expect(screen.queryByText("This is a test movie description.")).toBeNull();
  });

  it("renders correctly when no id is provided", () => {
    renderComponent({ ...defaultProps, id: undefined });

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
