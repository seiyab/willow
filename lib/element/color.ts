export type Color = Record<"r" | "g" | "b" | "a", number>;

export const rgba = (r: number, g: number, b: number, a: number): Color => ({
  r,
  g,
  b,
  a,
});

export namespace Color {
  export const stringify = ({ r, g, b, a }: Color) =>
    `rgba(${r * 16}, ${g * 16}, ${b * 16}, ${a / 0x15})`;
  export const random = () => {
    const r = () => Math.floor(Math.random() * 16);
    return rgba(r(), r(), r(), 0x15);
  };
}
