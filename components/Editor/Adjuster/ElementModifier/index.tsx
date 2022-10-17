import * as React from "react";

import { useSelector } from "components/Editor/state";
import RectModifier from "./RectModifier";
import QuoteModifier from "./QuoteModifier";
import EllipseModifier from "./EllipseModifier";
import PolygonModifier from "./PolygonModifier";

const ElementModifier: React.FC = () => {
  const id = useSelector(({ state }) => state.selectedElement);
  const element = useSelector(({ state }) =>
    state.elements.find((e) => e.id === id)
  );

  if (element === undefined) return null;

  if (element.value.type === "quote") return <QuoteModifier />;
  if (element.value.type === "rect") return <RectModifier />;
  if (element.value.type === "ellipse") return <EllipseModifier />;
  if (element.value.type === "polygon") return <PolygonModifier />;

  return null;
};

export default ElementModifier;
