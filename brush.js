let isDrawing = false;
let currentLayer = null;

function enableBrush(layer) {
  currentLayer = layer;
  const ctx = layer.getContext('2d');
  ctx.lineCap = 'round';
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#000';

  layer.onmousedown = (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  };

  layer.onmousemove = (e) => {
    if (!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  };

  layer.onmouseup = () => {
    isDrawing = false;
    saveHistory();
  };
}
