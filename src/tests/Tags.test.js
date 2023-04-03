import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tags from "./../components/Tags";

describe("Tags component", () => {
  it("renders tags", () => {
    const terms = ["term1"];
    render(<Tags terms={terms} />);
    expect(screen.getByRole("button"));
  });
});
