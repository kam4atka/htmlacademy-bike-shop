'use strict';

(function () {
  var initPage = function () {
    var nojs = document.querySelector('.nojs');
    nojs.classList.remove('nojs');

    var navToggleHandler = function (ntEvt) {
      ntEvt.preventDefault();
      if (ntEvt.target.classList.contains('nav-main__head-toggle_open')) {
        ntEvt.currentTarget.classList.remove('nav-main_close');
        ntEvt.target.classList.remove('nav-main__head-toggle_open');
        ntEvt.target.classList.add('nav-main__head-toggle_close');
        return;
      }
      if (ntEvt.target.classList.contains('nav-main__head-toggle_close')) {
        ntEvt.currentTarget.classList.add('nav-main_close');
        ntEvt.target.classList.add('nav-main__head-toggle_open');
        ntEvt.target.classList.remove('nav-main__head-toggle_close');
        return;
      }
    };

    var nav = document.querySelector('.nav-main');
    nav.addEventListener('click', navToggleHandler);
  };
  window.addEventListener('load', initPage);
})();
