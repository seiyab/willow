import assert from "assert";
import { fireEvent, render, screen, within } from "@testing-library/react";
import Editor from ".";
import { click, drag } from "lib/testing";

describe("<Editor />", () => {
  it("draw a rect", async () => {
    render(<Editor />);

    const canvas = screen.getByTestId("canvas");

    fireEvent.click(screen.getByRole("button", { name: "rect" }));

    assert.equal(canvas.querySelectorAll("rect").length, 0);

    await drag(canvas).start({ x: 20, y: 40 }).end({ x: 100, y: 150 });

    assert.equal(canvas.querySelectorAll("rect").length, 1);
  });

  it("draw a polygon", () => {
    render(<Editor />);

    const canvas = screen.getByTestId("canvas");

    fireEvent.click(screen.getByRole("button", { name: "polygon" }));

    assert.equal(canvas.querySelectorAll("polygon").length, 0);

    click(canvas).at([
      { x: 50, y: 50 },
      { x: 200, y: 50 },
      { x: 125, y: 125 },
      { x: 50, y: 50 },
    ]);

    assert.equal(canvas.querySelectorAll("polygon").length, 1);
  });
});
