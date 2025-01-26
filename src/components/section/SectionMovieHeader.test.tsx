import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SectionMovieHeader } from "./SSectionMovieHeader";
import { IMG_404 } from "../../utils/constants";

describe("SectionMovieHeader", () => {
  const defaultProps = {
    poster: "https://via.placeholder.com/150",
    title: "Sample Movie",
    tagline: "This is a sample tagline.",
    overview: "This is a sample overview.",
    releaseDate: "2025-01-01",
    adult: true,
    country: "USA",
    genres: "Action, Adventure",
    runtime: 120,
    voteAverage: 8.5,
    voteCount: 2000,
    director: "John Doe",
    directorRole: "Director",
    writer: "Jane Doe",
    writerRole: "Writer",
  };

  it("renders the movie title and release year", () => {
    render(<SectionMovieHeader {...defaultProps} />);
    expect(screen.getByText(/Sample Movie/i)).toBeInTheDocument();
    expect(screen.getByText("(2025)")).toBeInTheDocument();
  });

  it("renders the movie poster and handles fallback on error", () => {
    render(<SectionMovieHeader {...defaultProps} />);
    const posterImage = screen.getByAltText(/Sample Movie/i);

    // Assert initial image
    expect(posterImage).toHaveAttribute("src", defaultProps.poster);

    // Simulate onError and check fallback image
    posterImage.onerror?.(new Event("error"));

    fireEvent.error(posterImage);
    expect(posterImage).toHaveAttribute("src", IMG_404);
  });

  it("renders the genres and runtime", () => {
    render(<SectionMovieHeader {...defaultProps} />);
    expect(screen.getByText(/Action, Adventure/i)).toBeInTheDocument();
    expect(screen.getByText(/2h 0m/i)).toBeInTheDocument(); // Assuming minutesToHours works correctly
  });

  it("renders the director and writer information", () => {
    render(<SectionMovieHeader {...defaultProps} />);
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Writer/i)).toBeInTheDocument();
  });

  it("does not render writer if the same as director", () => {
    render(
      <SectionMovieHeader
        {...defaultProps}
        writer="John Doe"
        writerRole="Director"
      />
    );
    expect(screen.queryByText(/Writer/i)).not.toBeInTheDocument();
  });

  it("renders the vote average and vote count", () => {
    render(<SectionMovieHeader {...defaultProps} />);
    expect(screen.getByText(/8.5/i)).toBeInTheDocument();
    expect(screen.getByText(/2000 Votes/i)).toBeInTheDocument();
  });
});
