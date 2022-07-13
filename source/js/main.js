import {getData} from './api.js';
import {renderPhotoPreviews, setPhotoPreviewsClick, removePhotoPreviews} from './photo-previews.js';
import {showAlert} from './util.js';
import {setPhotoUploadFormSubmit, closePhotoUploadModal} from './photo-upload-modal.js';
import './photo-effects.js';
import './photo-upload-text.js';
import {showMessage} from './messages.js';
import {showPhotoFilters, setPhotoFilterButtonClick} from './photo-filters.js';

getData((photoDescriptions) => {
  renderPhotoPreviews(photoDescriptions);
  setPhotoPreviewsClick(photoDescriptions);
  showPhotoFilters();
  setPhotoFilterButtonClick(photoDescriptions,  removePhotoPreviews, renderPhotoPreviews);
}, showAlert.bind(null, 'Не удалось загрузить фотографии =( Попробуйте обновить страницу'));

setPhotoUploadFormSubmit(() => {
  closePhotoUploadModal();
  showMessage('success');
}, () => {
  closePhotoUploadModal();
  showMessage('error');
});
