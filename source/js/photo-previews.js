import {openPhotoViewModal, selectPhoto} from './photo-view-modal.js'

const photoPreviewsWrapper = document.querySelector('.pictures');
const photoPreviewTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Создание миниатюры фотографии
const createPhotoPreview = ({id, url, comments, likes}) => {
  const photoPreview = photoPreviewTemplate.cloneNode(true);

  photoPreview.dataset.id = id;
  photoPreview.querySelector('.picture__img').src = url;
  photoPreview.querySelector('.picture__comments').textContent = comments.length;
  photoPreview.querySelector('.picture__likes').textContent = likes;

  return photoPreview;
};

// Функция для отрисовки миниатюр фотографий
const renderPhotoPreviews = (photoDescriptions) => {
  const photoPreviewsFragment = document.createDocumentFragment();

  photoDescriptions.forEach((photo) => {
    photoPreviewsFragment.appendChild(createPhotoPreview(photo));
  });

  photoPreviewsWrapper.appendChild(photoPreviewsFragment);
};

// Функция для удаления миниатюр фотографий
const removePhotoPreviews = () => {
  document.querySelectorAll('.picture').forEach((item) => item.remove());
}

// Функция для создания и добавления обработчика нажатия по миниатюрам фотографий
const setPhotoPreviewsClick = (photoDescriptions) => {
  const onPhotoPreviewClick = (evt) => {
    if (!evt.target.closest('.picture')) {
      return;
    } else {
      evt.preventDefault();

      const photoId = evt.target.closest('.picture').dataset.id;

      selectPhoto(photoDescriptions[photoId]);
      openPhotoViewModal();
    }
  };

  photoPreviewsWrapper.addEventListener('click', onPhotoPreviewClick);
};

export {renderPhotoPreviews, setPhotoPreviewsClick, removePhotoPreviews};
