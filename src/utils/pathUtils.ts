import { Point } from "../core/types";

interface PathParams {
  points: Point[];
  tension?: number;
  closed?: boolean;
}

export function createFreehandPath(params: PathParams) {
  const { points, tension = 0.5, closed = false } = params;
  // Implementation
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}
