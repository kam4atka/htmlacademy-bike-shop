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

    var filterOpenHandler = function (foEvt) {
      var filter = document.querySelector('.filter');
      if (filter.classList.contains('filter_mobile')) {
        foEvt.preventDefault();
        filter.classList.remove('filter_mobile');
        bodyScroll('off');
        filter.addEventListener('click', filterCloseHandler);
      }
    };

    var filterToggleHandler = function (ftEvt) {
      ftEvt.preventDefault();
      var item = ftEvt.currentTarget;
      item.classList.toggle('filter__block_hidden');
    };

    var aboutItemClose = function (list, className) {
      for (var k = 0; k < list.length; k++) {
        if (list[k].classList.contains(className)) {
          list[k].classList.remove(className);
        }
      }
    };

    var aboutToggleHandler = function (atEvt) {
      atEvt.preventDefault();
      var root = document.querySelector('.item-about__wrapper');
      if (atEvt.target.classList.contains('item-about__head') || atEvt.currentTarget.classList.contains('item-about__head')) {
        aboutItemClose(root.children, 'item-about__item_checked');
        atEvt.currentTarget.parentNode.classList.add('item-about__item_checked');
      }
    };

    if (document.body.offsetWidth <= TABLET_SIZE) {
      var nav = document.querySelector('.nav-main');
      nav.addEventListener('click', navToggleHandler);
      var filterOpen = document.querySelector('.sort__toggle');
      if (filterOpen) {
        filterOpen.addEventListener('click', filterOpenHandler);
      }
    }

    var formatRangeInput = function (element) {
      var val = String(element.value);
      var str = val.replace(/\s+/g, '');
      element.value = Number(str).toLocaleString('ru-RU');
    };

    var rangeInputHandler = function (riEvt) {
      formatRangeInput(riEvt.target);
    };

    var rangeFilter = document.querySelector('.range__price');
    if (rangeFilter) {
      formatRangeInput(rangeFilter);
      var rangeInputs = rangeFilter.querySelectorAll('#range-min, #range-max');
      for (var l = 0; l < rangeInputs.length; l++) {
        formatRangeInput(rangeInputs[l]);
        rangeInputs[l].addEventListener('change', rangeInputHandler);
      }
    }

    var filterBlocks = document.querySelectorAll('.filter__block');
    for (var i = 0; i < filterBlocks.length; i++) {
      filterBlocks[i].addEventListener('click', filterToggleHandler);
    }

    var aboutItems = document.querySelectorAll('.item-about__head');
    for (var j = 0; j < aboutItems.length; j++) {
      aboutItems[j].addEventListener('click', aboutToggleHandler);
    }

    // initial slider

    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 55,
      slidesPerGroup: 3,
      // slidesPerGroupSkip: 1,
      centeredSlides: true,
      centeredSlidesBounds: true,
      centerInsufficientSlides: true,
      slideClass: 'catalog-slider__item',
      slideActiveClass: 'catalog-slider__item_active',
      slidePrevClass: 'catalog-slider__item_active',
      slideNextClass: 'catalog-slider__item_active',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

  };
  window.addEventListener('load', initPage);
})();
