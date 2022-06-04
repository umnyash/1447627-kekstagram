import {photoDescriptions} from './data.js';
import {closeOverlay} from './overlay.js';

const bigPictureNode = document.querySelector('.big-picture');
const bigPictureCancelNode = bigPictureNode.querySelector('.big-picture__cancel');
const socialCommentsNode = bigPictureNode.querySelector('.social__comments');
const socialCommentTemplate = socialCommentsNode.querySelector('.social__comment');

const createCommentNode = ({avatar, message, name}) => {
  const socialCommentNode = socialCommentTemplate.cloneNode(true);

  socialCommentNode.querySelector('.social__picture').src = avatar;
  socialCommentNode.querySelector('.social__picture').alt = name;
  socialCommentNode.querySelector('.social__text').textContent = message;

  return socialCommentNode;
};

const renderCommentNodes = (comments) => {
  const socialCommentFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    socialCommentFragment.appendChild(createCommentNode(comment));
  });

  socialCommentsNode.appendChild(socialCommentFragment);
};

const changeBigPicturePreview = (id) => {
  let index = id - 1;

  bigPictureNode.querySelector('.big-picture__img img').src = photoDescriptions[index].url;
  bigPictureNode.querySelector('.likes-count').textContent = photoDescriptions[index].likes;
  bigPictureNode.querySelector('.comments-count').textContent = photoDescriptions[index].comments.length;
  socialCommentsNode.innerHTML = '';
  renderCommentNodes(photoDescriptions[index].comments);
};

bigPictureNode.querySelector('.social__comment-count').classList.add('hidden');
bigPictureNode.querySelector('.social__comments-loader').classList.add('hidden');

bigPictureCancelNode.addEventListener('click', () => {
  closeOverlay();
});

export {changeBigPicturePreview};
