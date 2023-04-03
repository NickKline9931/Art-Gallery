import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Frame from "./../components/Frame";

describe("Frame component", () => {
  window.scrollTo = jest.fn();
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders correct  artwork info", () => {
    const favorites = [
      {
        title: "one",
      },
    ];
    const framedWork = {
      id: 1,
      title: "title",
      artist_display: "artist",
      terms: "terms",
      date_display: "date",
    };
    const terms = ["term1"];
    const frame = render(
      <Frame framedWork={framedWork} favorites={favorites} terms={terms} />
    );
    const titleDisplay = frame.container.querySelector(".framedWorkTitle");
    const artistDisplay = frame.container.querySelector(".framedWorkArtist");
    const dateDisplay = frame.container.querySelector(".framedWorkDate");
    expect(titleDisplay.textContent).toBe("title");
    expect(artistDisplay.textContent).toBe("artist");
    expect(dateDisplay.textContent).toBe("date");
  });
});
