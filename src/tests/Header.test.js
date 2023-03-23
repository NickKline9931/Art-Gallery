import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Header from "./../components/Header";

describe("Header component", () => {
  it("calls enterSearch function on button click", async () => {
    const user = userEvent.setup();
    const enterSearchMock = jest.fn();
    render(<Header enterSearch={enterSearchMock} />);
    const button = screen.getByRole("button");

    await user.click(button);
    expect(enterSearchMock).toHaveBeenCalled();
  });
});
