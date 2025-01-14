export const exportToImage = (stage) => {
  const dataURL = stage.toDataURL();
  const link = document.createElement('a');
  link.download = 'whiteboard.png';
  link.href = dataURL;
  link.click();
};

export const exportToJSON = (elements) => {
  const data = JSON.stringify(elements);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'whiteboard.json';
  link.href = url;
  link.click();
};
