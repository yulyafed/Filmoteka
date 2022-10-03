import { Loading } from 'notiflix/build/notiflix-loading-aio';

const openModalBtn = document.querySelector('[data-open-modal]');
const closeModalBtn = document.querySelector('[data-modal-close]');
const teamBackdrop = document.querySelector('[data-backdrop]');

openModalBtn.addEventListener('click', onOpenModal);

function onOpenModal() {
    Loading.dots({
  svgColor: '#ff6b02',
    });
  window.addEventListener('keydown', onEscClick);
  Loading.remove(1000);
  teamBackdrop.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

closeModalBtn.addEventListener('click', onCloseModal);
function onCloseModal() {
  window.removeEventListener('keydown', onEscClick);
  teamBackdrop.classList.add('is-hidden');
  document.body.style.overflow = '';
}

teamBackdrop.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscClick(event) {
  const ESC_KEY_CODE = 'Escape';
  console.log(event.code);

  if (event.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}
