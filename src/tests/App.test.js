import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./../App";

describe("App component", () => {
  it("Adheres to item limit", async () => {
    const query = "cats";
    const data = await fetch(
      "https://api.artic.edu/api/v1/artworks?limit=10&search?q=" +
        { query } +
        "&query[term][is_public_domain]=true"
    );
    const results = await data.json();
    const resultItems = results.data;
    expect(resultItems.length).toBe(10);
  });
});
