'use strict';

(function () {
  var initPage = function () {
    var TABLET_SIZE = 767;

    var nojs = document.querySelector('.nojs');
    nojs.classList.remove('nojs');

    var navToggleHandler = function (ntEvt) {
      if (ntEvt.target.classList.contains('nav-main__head-toggle_open')) {
        ntEvt.preventDefault();
        ntEvt.currentTarget.classList.remove('nav-main_close');
        ntEvt.target.classList.remove('nav-main__head-toggle_open');
        ntEvt.target.classList.add('nav-main__head-toggle_close');
        return;
      }
      if (ntEvt.target.classList.contains('nav-main__head-toggle_close')) {
        ntEvt.preventDefault();
        ntEvt.currentTarget.classList.add('nav-main_close');
        ntEvt.target.classList.add('nav-main__head-toggle_open');
        ntEvt.target.classList.remove('nav-main__head-toggle_close');
        return;
      }
    };

    if (document.body.offsetWidth <= TABLET_SIZE) {
      var nav = document.querySelector('.nav-main');
      nav.addEventListener('click', navToggleHandler);
    }
  };
  window.addEventListener('load', initPage);
})();
