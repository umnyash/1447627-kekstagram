import {getData} from './api.js';
import {renderPhotoPreviews, setPhotoPreviewsClick} from './photo-previews.js';
import {showAlert} from './util.js';
import {setPhotoUploadFormSubmit, closePhotoUploadModal} from './photo-upload-modal.js';
import './photo-effects.js';
import './photo-upload-text.js';

const PHOTO_PREVIEWS_COUNT = 25;

getData((photoDescriptions) => {
  const photoDescriptionsLimited = photoDescriptions.slice(0, PHOTO_PREVIEWS_COUNT);

  renderPhotoPreviews(photoDescriptionsLimited);
  setPhotoPreviewsClick(photoDescriptionsLimited);
}, showAlert.bind(null, 'Не удалось загрузить фотографии =( Попробуйте обновить страницу'));

setPhotoUploadFormSubmit(closePhotoUploadModal);
