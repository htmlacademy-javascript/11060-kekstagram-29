const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const imagePreview = document.querySelector('.img-upload__preview img');

const fileChooserChangeHandler = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
  }
};

const initFileUpload = () => {
  fileChooser.addEventListener('change', fileChooserChangeHandler);
};

export {initFileUpload};

