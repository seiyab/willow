import produce from "immer";
import { GraphicalElement, GraphicalElementType } from "lib/element";
import { range } from "lib/util";
import React, { SetStateAction } from "react";
import { createContext, useContextSelector } from "use-context-selector";

export type State = {
  elements: Entity<GraphicalElement>[];
  tool: Tool;
  selectedElement: string | null;
  selectedToken: number | null;
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
  const a = "a".charCodeAt(0);
  const A = "A".charCodeAt(0);
  const chars = [
    ...range(10).map((i) => `${i}`),
    ...range(26).map((i) => String.fromCharCode(a + i)),
    ...range(26).map((i) => String.fromCharCode(A + i)),
    "+",
    "-",
    "_",
    "*",
  ];
  return () =>
    range(5)
      .map(
        () => chars[Math.floor((Math.random() * chars.length) % chars.length)]
      )
      .join("");
};

const id = createID();

export type Tool = GraphicalElementType | "cursor";

const useActions = (dispatch: React.Dispatch<SetStateAction<State>>) =>
  React.useMemo(() => {
    const mutate =
      <T extends unknown[]>(proc: (prev: State, ...args: T) => void) =>
      (...args: T) =>
        dispatch((prev) => produce(prev, (draft) => proc(draft, ...args)));
    return {
      setTool: mutate((draft, tool: Tool) => {
        draft.tool = tool;
        if (tool !== "cursor") {
          draft.selectedElement = null;
        }
      }),
      addElement: mutate((draft, elem: GraphicalElement) => {
        draft.elements.push(entity(elem));
      }),
      selectElement: mutate((draft, id: string | null) => {
        draft.selectedElement = id;
        draft.tool = "cursor";
      }),
      modifyElement: mutate((draft, id: string, newElem: GraphicalElement) => {
        const target = draft.elements.find((e) => e.id === id);
        if (target === undefined) return;
        target.value = newElem;
      }),
      swapElements: mutate((draft, i: number, j: number) => {
        if (i < 0) return;
        if (j < 0) return;
        if (!(i < draft.elements.length)) return;
        if (!(j < draft.elements.length)) return;
        [draft.elements[i], draft.elements[j]] = [
          draft.elements[j],
          draft.elements[i],
        ];
      }),
      removeElement: mutate((draft, id: string) => {
        const target = draft.elements.findIndex((e) => e.id === id);
        if (target < 0) return;
        draft.elements.splice(target, 1);
      }),
      clearElements: mutate((draft) => {
        draft.elements = [];
      }),
      setSelectedToken: mutate((draft, id: number) => {
        draft.selectedToken = id;
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
      selectedElement: null,
      selectedToken: null,
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
