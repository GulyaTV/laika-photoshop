const canvasContainer = document.getElementById('canvas-container');
let layers = [];

function addLayer() {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  canvasContainer.appendChild(canvas);
  layers.push(canvas);
  enableBrush(canvas);
}

function clearAllLayers() {
  layers.forEach(layer => {
    const ctx = layer.getContext('2d');
    ctx.clearRect(0, 0, layer.width, layer.height);
  });
}

function exportImage() {
  const final = document.createElement('canvas');
  final.width = layers[0].width;
  final.height = layers[0].height;
  const finalCtx = final.getContext('2d');

  layers.forEach(layer => finalCtx.drawImage(layer, 0, 0));
  const dataURL = final.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'laika-export.png';
  link.click();
}

document.getElementById('fileInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(evt) {
    const img = new Image();
    img.onload = () => {
      if (layers.length === 0) addLayer();
      const ctx = layers[0].getContext('2d');
      layers[0].width = img.width;
      layers[0].height = img.height;
      canvasContainer.style.width = img.width + 'px';
      canvasContainer.style.height = img.height + 'px';
      ctx.drawImage(img, 0, 0);
      saveHistory();
    };
    img.src = evt.target.result;
  };
  reader.readAsDataURL(file);
});

// Инициализация
addLayer();
saveHistory();
