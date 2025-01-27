import { makeAutoObservable } from "mobx";
import { Element, ElementType, Point } from "../core/types";
import { createContext, useContext } from "react";

interface VisibleArea {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface ZoomPoint {
  x: number;
  y: number;
}

class AppStore {
  elements: Element[] = [];
  selectedTool: ElementType | null = null;
  selectedElement: Element | null = null;
  activeElement: Element | null = null;
  isDrawing = false;
  zoom = 1;
  history: Element[][] = [[]];
  currentIndex: number = 0;
  selectedElements: Element[] = [];
  selectedColor: string = "#000000";
  cursorPosition: Point = { x: 0, y: 0 };
  visibleArea: VisibleArea = { top: 0, right: 0, bottom: 0, left: 0 };
  snapLines: Array<{ points: number[] }> = [];
  pan = { x: 0, y: 0 };
  private lastTouchPosition: Point | null = null;
  selectedId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedTool = (tool: ElementType) => {
    this.selectedTool = tool;
  };

  selectElement = (id: string) => {
    this.selectedId = id;
    this.selectedElement = this.elements.find(el => el.id === id) || null;
  };

  copySelected = () => {
    if (this.selectedElement) {
      const copy = {
        ...this.selectedElement,
        id: Date.now().toString(),
        position: {
          x: this.selectedElement.position.x + 10,
          y: this.selectedElement.position.y + 10
        }
      };
      this.elements.push(copy);
    }
  };

  paste = () => {
    if (this.selectedElement) {
      this.copySelected();
    }
  };

  // Color Methods
  setColor(color: string) {
    this.selectedColor = color;
  }

  // Navigation Methods
  setPan(newPan: Point) {
    this.pan = newPan;
  }

  setZoom(newZoom: number, point?: ZoomPoint) {
    const oldZoom = this.zoom;
    this.zoom = Math.min(Math.max(newZoom, 0.1), 5); // Clamp zoom between 0.1 and 5
    
    if (point) {
      // Adjust pan to keep the point under cursor
      const dx = point.x * (oldZoom - this.zoom);
      const dy = point.y * (oldZoom - this.zoom);
      this.pan.x += dx;
      this.pan.y += dy;
    }
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      
      if (this.lastTouchPosition) {
        // Calculate the delta between current and last touch position
        const deltaX = touch.clientX - this.lastTouchPosition.x;
        const deltaY = touch.clientY - this.lastTouchPosition.y;
        
        // Update pan by adding the delta to current pan
        const newPan = {
          x: this.pan.x + deltaX,
          y: this.pan.y + deltaY,
        };
        this.setPan(newPan);
      }

      // Update last touch position
      this.lastTouchPosition = { x: touch.clientX, y: touch.clientY };
    } else {
      // Reset last touch position when touch ends
      this.lastTouchPosition = null;
    }
  };

  handleMouseDown = (e: MouseEvent) => {
    if (!this.selectedTool) return;
    
    this.isDrawing = true;
    const point = {
      x: (e.clientX - this.pan.x) / this.zoom,
      y: (e.clientY - this.pan.y) / this.zoom
    };

    if (this.selectedTool === ElementType.SELECT) {
      if (this.elements.length > 0) {
        // Find element under cursor with proper zoom and pan calculations
        const selectedElement = this.elements.find(element => {
          const { x, y } = element.position;
          const width = element.properties.width || 0;
          const height = element.properties.height || 0;
          
          return point.x >= x && 
                 point.x <= x + width &&
                 point.y >= y && 
                 point.y <= y + height;
        });

        this.selectedElements = selectedElement ? [selectedElement] : [];
        this.selectedElement = selectedElement || null;
      }
    } else {
      // Start drawing new element with proper zoom and pan calculations
      const newElement: Element = {
        id: Date.now().toString(),
        type: this.selectedTool,
        position: point,
        properties: {
          width: 0,
          height: 0,
          fill: this.selectedColor,
          stroke: '#000000',
          strokeWidth: 1
        }
      };
      this.elements = [...this.elements, newElement];
      this.activeElement = newElement;
    }
  };

  handleMouseUp = (e: MouseEvent) => {
    if (!this.isDrawing) return;
    
    this.isDrawing = false;
    if (this.selectedTool !== ElementType.SELECT && this.activeElement) {
      this.activeElement = null;
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

  deleteSelected = () => {
    if (!this.selectedElement) return;
    // Remove the selected element from elements array
    this.elements = this.elements.filter(element => element.id !== this.selectedElement?.id);
    
    // Clear the selection
    this.selectedElement = null;
    // Add to history
    this.updateHistory();
  };

  updateElements = (elements: Element[]) => {
    this.elements = elements;
    this.updateHistory();
  };

  jumpToState(index: number) {
    if (index >= 0 && index < this.history.length) {
      this.currentIndex = index;
      this.elements = [...this.history[index]];
    }
  }
}

const appStore = new AppStore();
const AppStoreContext = createContext(appStore);

export const useAppStore = () => useContext(AppStoreContext);
export default appStore;
