import assert from "assert";
import { fireEvent, render, screen, within } from "@testing-library/react";
import Editor from ".";
import { drag } from "lib/testing";

describe("<Editor />", () => {
  it("draw a rect", async () => {
    render(<Editor />);

    const canvas = screen.getByTestId("canvas");

    fireEvent.click(screen.getByRole("button", { name: "rect" }));

    assert.equal(canvas.querySelectorAll("rect").length, 0);

    await drag(canvas).start({ x: 20, y: 40 }).end({ x: 100, y: 150 });

    assert.equal(canvas.querySelectorAll("rect").length, 1);
  });
});
