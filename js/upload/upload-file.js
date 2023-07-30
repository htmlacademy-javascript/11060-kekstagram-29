const FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];

const fileChooser = document.querySelector('.img-upload__input');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');

const fileChooserChangeHandler = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const src = URL.createObjectURL(file);
    imagePreview.src = src;
    effectPreviews.forEach((effect) => {
      effect.style.backgroundImage = `url('${src}')`;
    });
  }
};

const initFileUpload = () => {
  fileChooser.addEventListener('change', fileChooserChangeHandler);
};

export { initFileUpload };
