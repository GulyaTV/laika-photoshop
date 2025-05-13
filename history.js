let historyStack = [];
let redoStack = [];

function saveHistory() {
  const snapshot = canvasContainerToImage();
  historyStack.push(snapshot);
  redoStack = [];
}

function undo() {
  if (historyStack.length > 1) {
    redoStack.push(historyStack.pop());
    applyHistory(historyStack[historyStack.length - 1]);
  }
}

function redo() {
  if (redoStack.length > 0) {
    const state = redoStack.pop();
    historyStack.push(state);
    applyHistory(state);
  }
}

function canvasContainerToImage() {
  const container = document.getElementById('canvas-container');
  const offCanvas = document.createElement('canvas');
  offCanvas.width = container.offsetWidth;
  offCanvas.height = container.offsetHeight;
  const offCtx = offCanvas.getContext('2d');

  container.querySelectorAll('canvas').forEach(layer => {
    offCtx.drawImage(layer, 0, 0);
  });

  return offCanvas.toDataURL();
}

function applyHistory(dataURL) {
  const img = new Image();
  img.onload = () => {
    clearAllLayers();
    const base = layers[0].getContext('2d');
    base.drawImage(img, 0, 0);
  };
  img.src = dataURL;
}
