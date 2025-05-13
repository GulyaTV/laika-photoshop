document.getElementById('filterSelect').addEventListener('change', function () {
  const filter = this.value;
  const ctx = layers[0].getContext('2d');
  const imgData = layers[0].toDataURL();

  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, layers[0].width, layers[0].height);
    ctx.filter = filter;
    ctx.drawImage(img, 0, 0);
    ctx.filter = 'none';
    saveHistory();
  };
  img.src = imgData;
});
