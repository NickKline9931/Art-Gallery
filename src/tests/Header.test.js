import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Header from "./../components/Header";

describe("Header component", () => {
  it("calls enterSearch function on button click", async () => {
    const enterSearchMock = jest.fn();
    render(<Header enterSearch={enterSearchMock} />);
    const button = screen.getByTestId("searchButton");

    await userEvent.click(button);
    expect(enterSearchMock).toHaveBeenCalled();
  });
});
