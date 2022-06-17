import {photoDescriptions} from './data.js';
import {openPhotoViewModal, selectPhoto} from './photo-view-modal.js'

const photoPreviewsWrapper = document.querySelector('.pictures');
const photoPreviewsFragment = document.createDocumentFragment();
const photoPreviewTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Создание и отрисовка миниатюр фотографий

const createphotoPreview = ({id, url, comments, likes}) => {
  const photoPreview = photoPreviewTemplate.cloneNode(true);

  photoPreview.dataset.id = id;
  photoPreview.querySelector('.picture__img').src = url;
  photoPreview.querySelector('.picture__comments').textContent = comments.length;
  photoPreview.querySelector('.picture__likes').textContent = likes;

  return photoPreview;
};

photoDescriptions.forEach((photo) => {
  photoPreviewsFragment.appendChild(createphotoPreview(photo));
});

photoPreviewsWrapper.appendChild(photoPreviewsFragment);

// Добавление обработчика нажатия по миниатюрам фотографий

const onPhotoPreviewClick = (evt) => {
  if (!evt.target.closest('.picture')) {
    return;
  } else {
    evt.preventDefault();

    const photoId = evt.target.closest('.picture').dataset.id;

    selectPhoto(photoId);
    openPhotoViewModal();
  }
};

photoPreviewsWrapper.addEventListener('click', onPhotoPreviewClick);
