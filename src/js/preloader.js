
document.querySelector('.preloader');

window.addEventListener('load', () => {
    preloader.classList.add('preloader--hide');
    setTimeout(() => {
        preloader.remove();
    }, 1000);
});





//  const loaderFromModal = document.querySelector('.preloader');

// // window.addEventListener('load', () => {
// //     preloader.classList.add('preloader--hide');
// //     setTimeout(() => {
// //         preloader.remove();
// //     }, 1000);
// // });

// function hideLoaderFromModal() {
//     loaderFromModal.classList.add('preloader--hide');
// }

// function showLoaderFromModal() {
//     loaderFromModal.classList.remove('preloader--hide');
// }

//  setTimeout(() => {
//      hideLoaderFromModal();
//     }, 1000);