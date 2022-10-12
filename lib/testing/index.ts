import { fireEvent } from "@testing-library/react";
import { Point, range } from "lib/util";

export const drag = (element: Element, steps = 20, duration = 100) => {
  return {
    start: (from: Point) => {
      const { left, top } = element.getBoundingClientRect();
      const clientFrom = {
        clientX: left + from.x,
        clientY: top + from.y,
      };
      fireEvent.mouseEnter(element, clientFrom);
      fireEvent.mouseOver(element, clientFrom);
      fireEvent.mouseMove(element, clientFrom);
      fireEvent.mouseDown(element, clientFrom);
      return {
        end: async (to: Point) => {
          for (let i = 0; i < steps; i++) {
            fireEvent.mouseMove(element, {
              clientX: clientFrom.clientX + ((to.x - from.x) * steps) / i,
              clientY: clientFrom.clientY + ((to.y - from.y) * steps) / i,
            });
            await sleep(duration / steps);
          }
          fireEvent.mouseUp(element, {
            clientX: left + to.x,
            clientY: top + to.y,
          });
        },
      };
    },
  };
};

export const click = (element: Element) => {
  return {
    at: (points: Point[]) => {
      const { left, top } = element.getBoundingClientRect();
      points.forEach(({ x, y }) => {
        fireEvent.click(element, {
          clientX: left + x,
          clientY: top + y,
        });
      });
    },
  };
};

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
