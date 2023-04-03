import React from "react";
import Home from "./../components/Home";
import { render, screen } from "@testing-library/react";

describe("Home component", () => {
  window.scrollTo = jest.fn();

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders correct heading", () => {
    render(<Home />);
    const heading = screen.getByTestId("lastUpdated");
    expect(heading.textContent).toBe("Last Updated");
  });

  it("renders NewWorks component list", () => {
    const { getByRole } = render(<Home />);
    expect(getByRole("list"));
  });

  it("fetches correct number of works", async () => {
    const response = await fetch(
      "https://api.artic.edu/api/v1/artworks?fields=id,artist_display,title,date_display&query[term][is_public_domain]=true&limit=4"
    );
    const data = await response.json();
    const works = data.data;

    expect(works.length).toBe(4);
  });
});
