import { Element, ElementType } from '../core/types';

export function drawElement(
  ctx: CanvasRenderingContext2D, 
  element: Element, 
  scale: number = 1
): void {
  const { position, properties, type } = element;
  const x = position.x * scale;
  const y = position.y * scale;
  
  ctx.fillStyle = properties.fill || '#000000';
  ctx.strokeStyle = properties.stroke || '#000000';
  ctx.lineWidth = (properties.strokeWidth || 1) * scale;

  switch (type) {
    case ElementType.RECTANGLE:
      ctx.beginPath();
      ctx.rect(
        x, 
        y, 
        (properties.width || 0) * scale, 
        (properties.height || 0) * scale
      );
      ctx.fill();
      ctx.stroke();
      break;

    case ElementType.CIRCLE:
      ctx.beginPath();
      ctx.arc(
        x, 
        y, 
        ((properties.width || 0) / 2) * scale, 
        0, 
        Math.PI * 2
      );
      ctx.fill();
      ctx.stroke();
      break;

    case ElementType.TEXT:
      if (properties.text) {
        ctx.font = `${(properties.fontSize || 12) * scale}px ${properties.fontFamily || 'Arial'}`;
        ctx.fillText(properties.text, x, y);
      }
      break;
  }
} 