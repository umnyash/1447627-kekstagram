import {isEscEvent} from './util.js';

const photoViewModal = document.querySelector('.big-picture');
const modalCloseButton = photoViewModal.querySelector('.big-picture__cancel');
const commentsList = photoViewModal.querySelector('.social__comments');
const сommentTemplate = commentsList.querySelector('.social__comment');

// Открытие и закрытие окна просмотра фотографии

const openPhotoViewModal = () => {
  photoViewModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
};

const closePhotoViewModal = () => {
  photoViewModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
};

const onModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePhotoViewModal();
  }
};

modalCloseButton.addEventListener('click', closePhotoViewModal);

// Функция для создания узла комментария

const createComment = ({avatar, message, name}) => {
  const сomment = сommentTemplate.cloneNode(true);

  сomment.querySelector('.social__picture').src = avatar;
  сomment.querySelector('.social__picture').alt = name;
  сomment.querySelector('.social__text').textContent = message;

  return сomment;
};

// Функция для отображения создаваемых комментариев

const renderComments = (comments) => {
  const commentsListFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    commentsListFragment.appendChild(createComment(comment));
  });

  commentsList.appendChild(commentsListFragment);
};

// Функция для отображения выбранной фотографии и сопуствующих данных

const selectPhoto = ({url, description, likes, comments}) => {
  photoViewModal.querySelector('.big-picture__img img').src = url;
  photoViewModal.querySelector('.social__caption').textContent = description;
  photoViewModal.querySelector('.likes-count').textContent = likes;
  photoViewModal.querySelector('.comments-count').textContent = comments.length;
  commentsList.innerHTML = '';
  renderComments(comments);

  // Временное скрытие элементов
  photoViewModal.querySelector('.social__comment-count').classList.add('hidden');
  photoViewModal.querySelector('.social__comments-loader').classList.add('hidden');
}

export {openPhotoViewModal, selectPhoto};
