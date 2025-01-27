import { Stage } from "konva/lib/Stage";
import { Element } from "../core/types";

export const exportToImage = (stage: Stage) => {
  if (!stage) return;
  
  const dataURL = stage.toDataURL();
  const link = document.createElement("a");
  link.download = "whiteboard.png";
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (elements: Element[]) => {
  const data = JSON.stringify(elements);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "whiteboard.json";
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
};
