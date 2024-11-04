// public/main.js

// Referencias a los elementos del DOM
const uploadButton = document.getElementById('uploadButton');
const uploadFormContainer = document.getElementById('uploadFormContainer');
const uploadForm = document.getElementById('uploadForm');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const videoContainer = document.getElementById('videoContainer');

// Mostrar el formulario al hacer clic en el botón flotante
uploadButton.addEventListener('click', () => {
  uploadFormContainer.classList.remove('hidden');
  uploadButton.classList.add('hidden');
});

// Ocultar el formulario al hacer clic en "Cancelar"
cancelBtn.addEventListener('click', () => {
  uploadFormContainer.classList.add('hidden');
  uploadButton.classList.remove('hidden');
});

// Subir el video y mostrarlo en la galería
submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  const formData = new FormData();
  const fileInput = document.getElementById('videoFile');
  formData.append('video', fileInput.files[0]);

  // Enviar el video al servidor
  const response = await fetch('/upload', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  displayVideo(data.videoPath);

  // Resetear y ocultar el formulario
  uploadFormContainer.classList.add('hidden');
  uploadButton.classList.remove('hidden');
  uploadForm.reset();
});

// Función para mostrar el video en la galería
function displayVideo(videoPath) {
  const videoElement = document.createElement('video');
  videoElement.src = videoPath;
  videoElement.controls = true;
  videoElement.autoplay = true;
  videoContainer.appendChild(videoElement);
}
