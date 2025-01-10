import React, { useEffect, useRef } from "react";

const Minimap = ({ elements, viewportSize, onViewportChange }) => {
  const canvasRef = useRef(null);
  const scale = 0.1; // Scale factor for minimap

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw elements
    elements.forEach((element) => {
      ctx.fillStyle = element.fill || "#000";
      ctx.strokeStyle = element.stroke || "#000";

      switch (element.type) {
        case "rectangle":
          ctx.fillRect(
            element.x * scale,
            element.y * scale,
            element.width * scale,
            element.height * scale,
          );
          break;
        case "circle":
          ctx.beginPath();
          ctx.arc(
            element.x * scale,
            element.y * scale,
            element.radius * scale,
            0,
            Math.PI * 2,
          );
          ctx.fill();
          break;
        default:
          break;
      }
    });
  }, [elements]);

  return (
    <div className="minimap">
      <canvas
        ref={canvasRef}
        width={200}
        height={150}
        onClick={(e) => {
          const rect = canvasRef.current.getBoundingClientRect();
          const x = (e.clientX - rect.left) / scale;
          const y = (e.clientY - rect.top) / scale;
          onViewportChange({ x, y });
        }}
      />
    </div>
  );
};

export default Minimap;
