import {isEscEvent} from './util.js';

const COMMENTS_PER_PORTION = 5;
const photoViewModal = document.querySelector('.big-picture');
const modalCloseButton = photoViewModal.querySelector('.big-picture__cancel');
const commentsList = photoViewModal.querySelector('.social__comments');
const сommentTemplate = commentsList.querySelector('.social__comment');
const commentsLoaderButton = photoViewModal.querySelector('.social__comments-loader');

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

const renderComments = (comments, from = 0, to = comments.length - 1) => {
  const commentsListFragment = document.createDocumentFragment();

  for (let i = from; i <= to; i++) {
    commentsListFragment.appendChild(createComment(comments[i]))
  }

  commentsList.appendChild(commentsListFragment);
};

// Отображение комментариев порциями
let firstCommentIndexFromNewPortion = 0;
const shownCommentsCount = photoViewModal.querySelector('.shown-comments-count');
let selectedPhotoComments;

const renderCommentsPortion = (comments) => {
  let lastCommentIndexFromNewPortion = firstCommentIndexFromNewPortion + COMMENTS_PER_PORTION - 1;

  if (comments.length - 1 > lastCommentIndexFromNewPortion) {
    shownCommentsCount.textContent = lastCommentIndexFromNewPortion + 1;
    renderComments(comments, firstCommentIndexFromNewPortion, lastCommentIndexFromNewPortion);
    firstCommentIndexFromNewPortion = lastCommentIndexFromNewPortion + 1;
  } else {
    shownCommentsCount.textContent = comments.length;
    renderComments(comments, firstCommentIndexFromNewPortion, comments.length - 1);
    commentsLoaderButton.classList.add('hidden');
  }
};

// Функция для отображения выбранной фотографии и сопуствующих данных

const selectPhoto = ({url, description, likes, comments}) => {
  photoViewModal.querySelector('.big-picture__img img').src = url;
  photoViewModal.querySelector('.social__caption').textContent = description;
  photoViewModal.querySelector('.likes-count').textContent = likes;
  photoViewModal.querySelector('.comments-count').textContent = comments.length;

  // Сохранить ссылку на список комментариев новой фотографии
  selectedPhotoComments = comments;

  commentsList.innerHTML = '';
  firstCommentIndexFromNewPortion = 0;

  // Показать кнопку (она могла быть скрыта при просмотре комментариев другой фотографии)
  commentsLoaderButton.classList.remove('hidden');

  // Отрисовать до 5 первых комментариев
  renderCommentsPortion(comments);
};

// Загрузка новых комментариев

commentsLoaderButton.addEventListener('click', () => {
  renderCommentsPortion(selectedPhotoComments);
});

export {openPhotoViewModal, selectPhoto};
