import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Canvas } from "../../components/Canvas/CanvasRenderer";
import { AppProvider } from "../../contexts/AppContext";
import { describe, expect, jest, test } from "@jest/globals";

jest.mock("zustand");
jest.mock("react-konva");

const mockStore = {
  elements: [],
  selectedTool: "select",
  zoom: 1,
  updateTool: jest.fn(),
  addElement: jest.fn(),
};

jest.mock("../../store/AppStore", () => ({
  useAppStore: () => mockStore,
}));

describe("Canvas", () => {
  test("renders canvas stage", async () => {
    render(
      <AppProvider>
        <Canvas />
      </AppProvider>,
    );

    await waitFor(() => screen.getByTestId("konva-stage"));
    const stage = screen.getByTestId("konva-stage");
    expect(stage).toBeDefined();
  });
});
