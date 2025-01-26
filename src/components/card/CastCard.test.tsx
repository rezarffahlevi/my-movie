import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CastCard } from "./CastCard"; 
import { BASE_URL_IMAGE, IMG_404 } from "../../utils/constants";

describe("CastCard", () => {
  const props = {
    avatar: "avatar.jpg",
    name: "John Doe",
    character: "Superhero",
  };

  it("should render the CastCard with name and character", () => {
    render(<CastCard {...props} />);

    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByText(props.character)).toBeInTheDocument();
  });

  it("should render the image with the correct src", () => {
    render(<CastCard {...props} />);

    const image = screen.getByAltText(props.name);
    expect(image).toHaveAttribute("src", BASE_URL_IMAGE + props.avatar);
  });

  it("should display the fallback image if there is an error loading the avatar image", () => {
    render(<CastCard {...props} avatar={undefined} />);

    const image = screen.getByAltText(props.name);
    fireEvent.error(image); // Simulate image error
    expect(image).toHaveAttribute("src", IMG_404);
  });

  it("should render a fallback image if avatar prop is undefined", () => {
    render(<CastCard {...props} avatar={undefined} />);

    const image = screen.getByAltText(props.name);
    expect(image).toHaveAttribute("src", IMG_404);
  });

  it("should render the component with default styles", () => {
    const { container } = render(<CastCard {...props} />);

    // Check if the component has the expected styles (e.g., width, height, etc.)
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("w-40");
    expect(card).toHaveClass("items-center");
    expect(card).toHaveClass("mr-6");
    expect(card).toHaveClass("bg-[#1f2937]");
  });
});
