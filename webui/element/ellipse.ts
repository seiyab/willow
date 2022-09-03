import { color, Color } from "./color"
import { Element } from "./element"

export type Ellipse = {
    x: number,
    y: number,
    cx: number,
    cy: number,
    fill: Color;
    stroke: Color;
}

export const ellipse = ({x, y, cx, cy, fill, stroke}: Ellipse): Element => {
    const [f, s] = [color(fill), color(stroke)];
    const encode = () => [
        0x02, x, y, cx, cy, ...f.encode(), ...s.encode() 
    ]
    return ({
        encode,
    })
}