export const exportCanvasAsPNG = (canvas) => {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `whiteboard-${Date.now()}.png`;
  link.href = dataURL;
  link.click();
};

export const exportCanvasAsJSON = (canvasState) => {
  const jsonData = JSON.stringify(canvasState);
  const blob = new Blob([jsonData], {type: 'application/json'});
  const link = document.createElement('a');
  link.download = `whiteboard-${Date.now()}.json`;
  link.href = URL.createObjectURL(blob);
  link.click();
};
