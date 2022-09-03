import { color, Color } from "./color"
import { Element } from "./element"

export type Rect = {
    x: number,
    y: number,
    width: number,
    height: number,
    fill: Color;
    stroke: Color;
}

export const rect = ({x, y, width, height, fill, stroke}: Rect): Element => {
    const [f, s] = [color(fill), color(stroke)];
    const encode = () => [
        0x01, x, y, width, height, ...f.encode(), ...s.encode() 
    ]
    return ({
        encode,
    })
}