import { useEffect } from "react";
import { useAppStore } from "../store/AppStore";
import { Element } from "../core/types";

export const usePaste = () => {
  const store = useAppStore();

  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      // Your paste logic here
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [store]);

  return null;
};
