import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Frame from "./../components/Frame";

describe("Frame component", () => {
  it("renders correct  artwork info", () => {
    const title = "Example Title";
    const artist = "Example Artist";
    const date = "Example Data";
    const terms = ["term1", "term2"];
    const frame = render(
      <Frame title={title} artist={artist} date={date} terms={terms} />
    );
    const titleDisplay = frame.container.querySelector("#frameTitle");
    const artistDisplay = frame.container.querySelector("#frameArtist");
    const dateDisplay = frame.container.querySelector("#frameDate");
    expect(titleDisplay.textContent).toBe("Example Title");
    expect(artistDisplay.textContent).toBe("Example Artist");
    expect(dateDisplay.textContent).toBe("Example Data");
  });
});
