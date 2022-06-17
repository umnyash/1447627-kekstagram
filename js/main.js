import {getData} from './api.js';
import {renderPhotoPreviews, setPhotoPreviewsClick} from './photo-previews.js';
import './photo-upload-modal.js';
import './photo-effects.js';
import './photo-upload-text.js';

const PHOTO_PREVIEWS_COUNT = 25;

getData((photoDescriptions) => {
  const photoDescriptionsLimited = photoDescriptions.slice(0, PHOTO_PREVIEWS_COUNT);

  renderPhotoPreviews(photoDescriptionsLimited);
  setPhotoPreviewsClick(photoDescriptionsLimited);
});
