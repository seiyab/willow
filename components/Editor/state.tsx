import produce from "immer";
import { Element, ElementType, Rect } from "lib/element";
import { Color, rgba } from "lib/element/color";
import { uint8 } from "lib/util";
import React, { PropsWithoutRef, SetStateAction } from "react";
import { createContext, useContextSelector } from "use-context-selector";

export type State = {
  elements: Entity<Element>[];
  tool: Tool;
};

export type Entity<T> = {
  id: string;
  value: T;
};

export const entity = <T,>(value: T): Entity<T> => ({
  id: id(),
  value,
});

const createID = (): (() => string) => {
  let i = 0;
  return () => String(i++);
};

const id = createID();

export type Tool = ElementType | "cursor";

export const useActions = (dispatch: React.Dispatch<SetStateAction<State>>) =>
  React.useMemo(() => {
    const mutate =
      <T extends unknown[]>(proc: (prev: State, ...args: T) => void) =>
      (...args: T) =>
        dispatch((prev) => produce(prev, (draft) => proc(draft, ...args)));
    return {
      setTool: mutate((draft, tool: Tool) => {
        draft.tool = tool;
      }),
      addElement: mutate((draft, elem: Element) => {
        draft.elements.push(entity(elem));
      }),
    };
  }, [dispatch]);

type ContextValue = {
  state: State;
  actions: ReturnType<typeof useActions>;
};

const StateContext = createContext<ContextValue>({} as any);

export const withState = <T,>(Component: React.ComponentType<T>) => {
  const Memoized = React.memo(Component) as any;
  const Decorated: React.FC<T> = (props) => {
    const [state, setState] = React.useState<State>({
      elements: [],
      tool: "cursor",
    });
    const actions = useActions(setState);
    return (
      <StateContext.Provider value={{ state, actions }}>
        <Memoized {...props} />
      </StateContext.Provider>
    );
  };
  return Decorated;
};

export const useSelector = <T,>(selector: (value: ContextValue) => T) =>
  useContextSelector(StateContext, selector);