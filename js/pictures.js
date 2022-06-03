import {createPhotoDescriptions} from './data.js';

const picturesNode = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesData = createPhotoDescriptions();

const createPictureNode = ({url, comments, likes}) => {
  const pictureNode = pictureTemplate.cloneNode(true);

  pictureNode.querySelector('.picture__img').src = url;
  pictureNode.querySelector('.picture__comments').textContent = comments.length;
  pictureNode.querySelector('.picture__likes').textContent = likes;

  return pictureNode;
}

const renderPictureNodes = () => {
  const picturesFragment = document.createDocumentFragment();

  picturesData.forEach((picture) => {
    picturesFragment.appendChild(createPictureNode(picture));
  });

  picturesNode.appendChild(picturesFragment);
}

renderPictureNodes();
