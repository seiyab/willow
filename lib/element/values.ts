export type StepUint<Step extends number> = {
  shrunk: () => Uint8;
  value: () => number;
  __phantom_step: Step;
};

export const stepUint = <Step extends number>(
  original: number,
  step: Step
): StepUint<Step> => {
  const shrunk = Math.round(original / step);
  const u8 = uint8(shrunk);
  return {
    shrunk: () => u8,
    value: () => u8 * step,
    __phantom_step: step,
  };
};

const sUint8 = Symbol();
export type Uint8 = number & {
  [sUint8]: never;
};

export const uint8 = (x: number) =>
  Math.floor(Math.max(0, Math.min(x, 255))) as Uint8;
