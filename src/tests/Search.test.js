import React, { Children } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Search from "./../components/Search";

describe("search component", () => {
  it("displays results correctly", () => {
    const testSearch = [
      {
        title: "one",
      },

      {
        title: "two",
      },

      {
        title: "three",
      },
    ];
    const favorites = [
      {
        title: "one",
      },
    ];
    render(<Search searchResults={testSearch} favorites={favorites} />);
    expect(screen.getByRole("list"));
  });
});
