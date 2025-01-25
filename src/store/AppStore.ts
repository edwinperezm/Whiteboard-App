import { makeAutoObservable } from "mobx";
import { Element, ElementType, Point } from "../core/types";
import { createContext, useContext } from "react";

interface ElementWithDimensions extends Element {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface VisibleArea {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

class AppStore {
  // Existing properties
  elements: Element[] = [];
  selectedElement: Element | null = null;
  selectedElements: Element[] = [];
  isDrawing: boolean = false;
  zoom: number = 1;
  history: Element[][] = [[]];
  currentIndex: number = 0;
  selectedTool: ElementType = ElementType.SELECT;
  pan: Point = { x: 0, y: 0 };

  // New properties
  selectedColor: string = "#000000";
  cursorPosition: Point = { x: 0, y: 0 };
  visibleArea: VisibleArea = { top: 0, right: 0, bottom: 0, left: 0 };
  snapLines: Array<{ points: number[] }> = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Tool and Selection Methods
  setSelectedTool(tool: ElementType) {
    this.selectedTool = tool;
  }

  selectElement(id: string) {
    const element = this.elements.find((el) => el.id === id);
    if (element) {
      this.setSelectedElement(element);
    }
  }

  // Color Methods
  setColor(color: string) {
    this.selectedColor = color;
  }

  // Navigation Methods
  setPan(newPan: Point) {
    this.pan = newPan;
  }

  setZoom(value: number) {
    this.zoom = Math.max(0.1, Math.min(4, value)); // Limit zoom range
  }

  // Element Management
  addElement(element: Element) {
    this.elements.push({
      ...element,
      position: element.position || { x: 0, y: 0 },
      properties: {
        ...element.properties,
        fill: element.properties?.fill || this.selectedColor,
      },
    });
    this.updateHistory();
  }

  removeElement(id: string) {
    this.elements = this.elements.filter((element) => element.id !== id);
    this.updateHistory();
  }

  updateElement(updates: Partial<Element>) {
    if (!this.selectedElement) return;

    this.elements = this.elements.map((element) =>
      element.id === this.selectedElement?.id
        ? {
            ...element,
            ...updates,
            properties: {
              ...element.properties,
              ...(updates.properties || {}),
            },
          }
        : element,
    );
    this.updateHistory();
  }

  // Selection Management
  setSelectedElement(element: Element | null) {
    this.selectedElement = element;
    this.selectedElements = element ? [element] : [];
  }

  setSelectedElements(elements: Element[]) {
    this.selectedElements = elements;
    this.selectedElement = elements.length === 1 ? elements[0] : null;
  }

  // Canvas Management
  clearCanvas() {
    this.elements = [];
    this.selectedElement = null;
    this.selectedElements = [];
    this.updateHistory();
  }

  // History Management
  private updateHistory() {
    this.history = [
      ...this.history.slice(0, this.currentIndex + 1),
      [...this.elements],
    ];
    this.currentIndex = this.history.length - 1;
  }

  undo() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.elements = [...this.history[this.currentIndex]];
      this.selectedElement = null;
      this.selectedElements = [];
    }
  }

  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      this.elements = [...this.history[this.currentIndex]];
      this.selectedElement = null;
      this.selectedElements = [];
    }
  }

  // Event Handlers
  handleMouseMove = (e: MouseEvent) => {
    this.cursorPosition = { x: e.clientX, y: e.clientY };
  };

  handlePinch = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY,
      );
      // Implement pinch zoom logic
    }
  };

  handlePan = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const newPan = {
        x: this.pan.x + touch.clientX,
        y: this.pan.y + touch.clientY,
      };
      this.setPan(newPan);
    }
  };

  // Alignment
  alignElements(
    direction: "left" | "center" | "right" | "top" | "middle" | "bottom",
  ) {
    if (this.selectedElements.length < 2) return;

    const bounds = this.selectedElements.reduce(
      (acc, el) => ({
        left: Math.min(acc.left, el.position.x),
        right: Math.max(acc.right, el.position.x + (el.properties.width || 0)),
        top: Math.min(acc.top, el.position.y),
        bottom: Math.max(
          acc.bottom,
          el.position.y + (el.properties.height || 0),
        ),
      }),
      { left: Infinity, right: -Infinity, top: Infinity, bottom: -Infinity },
    );

    const updatedElements = this.selectedElements.map((el) => {
      const newPos = { ...el.position };

      switch (direction) {
        case "left":
          newPos.x = bounds.left;
          break;
        case "right":
          newPos.x = bounds.right - (el.properties.width || 0);
          break;
        // Add other cases
      }

      return { ...el, position: newPos };
    });

    this.updateElements(updatedElements);
  }

  // Visibility and Performance
  setVisibleArea(area: VisibleArea) {
    this.visibleArea = area;
  }

  getVisibleElements() {
    return this.elements.filter(
      (el) =>
        el.position.x < this.visibleArea.right &&
        el.position.x + (el.properties.width || 0) > this.visibleArea.left &&
        el.position.y < this.visibleArea.bottom &&
        el.position.y + (el.properties.height || 0) > this.visibleArea.top,
    );
  }
}

const appStore = new AppStore();
const AppStoreContext = createContext(appStore);

export const useAppStore = () => useContext(AppStoreContext);
export default appStore;
