import produce from "immer";
import { GraphicalElement, GraphicalElementType } from "lib/element";
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
  let i = 0;
  return () => String(i++);
};

const id = createID();

export type Tool = GraphicalElementType | "cursor";

export const useActions = (dispatch: React.Dispatch<SetStateAction<State>>) =>
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
