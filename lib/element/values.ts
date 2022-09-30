import { uint8 } from "lib/util";

export type StepUint<Step extends number> = {
  shrunk: () => number;
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
