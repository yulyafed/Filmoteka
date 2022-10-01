const goToTop = document.querySelector('.btn-to-top');

export function onTopBallon() {
  window.addEventListener('scroll', trackScroll);
  goToTop.addEventListener('click', backToTop);

  function trackScroll() {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goToTop.classList.add('btn-to-top-show');
    }
    if (scrolled < coords) {
      goToTop.classList.remove('btn-to-top-show');
    }
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -100);
      setTimeout(backToTop, 10);
    }
  }
}
onTopBallon();