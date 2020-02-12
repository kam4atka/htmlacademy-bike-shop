'use strict';

(function () {
  var initPage = function () {
    var TABLET_SIZE = 767;

    var nojs = document.querySelector('.nojs');
    nojs.classList.remove('nojs');

    var bodyScroll = function (action) {
      if (action === 'off') {
        document.body.style.overflow = 'hidden';
      }
      if (action === 'on') {
        document.body.style.overflow = 'scroll';
      }
    };

    var navToggleHandler = function (ntEvt) {
      if (ntEvt.target.classList.contains('nav-main__head-toggle_open')) {
        ntEvt.preventDefault();
        ntEvt.currentTarget.classList.remove('nav-main_close');
        ntEvt.target.classList.remove('nav-main__head-toggle_open');
        ntEvt.target.classList.add('nav-main__head-toggle_close');
        bodyScroll('off');
        return;
      }
      if (ntEvt.target.classList.contains('nav-main__head-toggle_close')) {
        ntEvt.preventDefault();
        ntEvt.currentTarget.classList.add('nav-main_close');
        ntEvt.target.classList.add('nav-main__head-toggle_open');
        ntEvt.target.classList.remove('nav-main__head-toggle_close');
        bodyScroll('on');
        return;
      }
    };

    var filterCloseHandler = function (fcEvt) {
      var root = fcEvt.currentTarget;
      if (fcEvt.target.classList.contains('filter__close')) {
        if (!root.classList.contains('filter_mobile')) {
          root.classList.add('filter_mobile');
          bodyScroll('on');
          root.removeEventListener('click', filterCloseHandler);
        }
      }
    };

    var filterOpenHandler = function (ftEvt) {
      var filter = document.querySelector('.filter');
      if (filter.classList.contains('filter_mobile')) {
        ftEvt.preventDefault();
        filter.classList.remove('filter_mobile');
        bodyScroll('off');
        filter.addEventListener('click', filterCloseHandler);
      }

    };

    if (document.body.offsetWidth <= TABLET_SIZE) {
      var nav = document.querySelector('.nav-main');
      nav.addEventListener('click', navToggleHandler);
      var filterOpen = document.querySelector('.sort__toggle');
      filterOpen.addEventListener('click', filterOpenHandler);
    }
  };
  window.addEventListener('load', initPage);
})();
