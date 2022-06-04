import {photoDescriptions} from './data.js';
import {changeBigPicturePreview} from './big-picture.js';
import {openOverlay} from './overlay.js';

const picturesNode = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictureNode = ({id, url, comments, likes}) => {
  const pictureNode = pictureTemplate.cloneNode(true);

  pictureNode.setAttribute('data-id', id);
  pictureNode.querySelector('.picture__img').src = url;
  pictureNode.querySelector('.picture__comments').textContent = comments.length;
  pictureNode.querySelector('.picture__likes').textContent = likes;

  return pictureNode;
}

const renderPictureNodes = () => {
  const picturesFragment = document.createDocumentFragment();

  photoDescriptions.forEach((picture) => {
    picturesFragment.appendChild(createPictureNode(picture));
  });

  picturesNode.appendChild(picturesFragment);
}

renderPictureNodes();

const onPictureClick = (evt) => {
  evt.preventDefault();

  if (!evt.target.closest('.picture')) {
    return;
  }

  const pictureId = evt.target.closest('.picture').getAttribute('data-id');

  changeBigPicturePreview(pictureId);
  openOverlay();
};

picturesNode.addEventListener('click', onPictureClick);
