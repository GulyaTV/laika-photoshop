const canvas = document.getElementById('editorCanvas');
const ctx = canvas.getContext('2d');
const fileInput = document.getElementById('fileInput');

let image = new Image();

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
    };
    image.src = evt.target.result;
  };
  reader.readAsDataURL(file);
});

function exportImage() {
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'laika-export.png';
  link.click();
}
