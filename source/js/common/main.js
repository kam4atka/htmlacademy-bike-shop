'use strict';

(function () {
  var initPage = function () {
    // for swiper.js - startsWidth
    if (!String.prototype.startsWith) {
      String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
      };
    }
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
        var filterBlock = getFilterStatus();
        if (filterBlock !== false && !filterBlock.classList.contains('filter_mobile')) {
          closeFilter(filterBlock);
        }
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
    var getFilterStatus = function () {
      var filter = document.querySelector('.filter');
      if (filter && !filter.classList.contains('.filter_mobile')) {
        return filter;
      } else {
        return false;
      }
    };
    var closeFilter = function (block) {
      block.classList.add('filter_mobile');
      bodyScroll('on');
      block.removeEventListener('click', filterCloseHandler);
    };
    var filterCloseHandler = function (fcEvt) {
      var root = fcEvt.currentTarget;
      if (fcEvt.target.classList.contains('filter__close')) {
        if (!root.classList.contains('filter_mobile')) {
          closeFilter(root);
        }
      }
    };
    var filterOpenHandler = function (foEvt) {
      var filterBlock = getFilterStatus();
      if (filterBlock !== false && filterBlock.classList.contains('filter_mobile')) {
        foEvt.preventDefault();
        filterBlock.classList.remove('filter_mobile');
        bodyScroll('off');
        filterBlock.addEventListener('click', filterCloseHandler);
      }
    };
    var filterToggleHandler = function (ftEvt) {
      ftEvt.preventDefault();
      ftEvt.currentTarget.parentNode.classList.toggle('filter__block_hidden');
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
    var filterBlocks = document.querySelectorAll('.filter__block-head');
    for (var i = 0; i < filterBlocks.length; i++) {
      filterBlocks[i].addEventListener('click', filterToggleHandler);
    }
    var aboutItems = document.querySelectorAll('.item-about__head');
    for (var j = 0; j < aboutItems.length; j++) {
      aboutItems[j].addEventListener('click', aboutToggleHandler);
    }
    // initial slider bikes
    if (document.querySelector('.swiper-bikes')) {
      var swiperBikes = new Swiper('.swiper-bikes', {
        initialSlide: 2,
        slidesPerView: 1,
        slidesPerGroup: 1,
        centeredSlides: true,
        centeredSlidesBounds: true,
        centerInsufficientSlides: true,
        loop: true,
        preloadImages: false,
        lazy: true,
        elementClass: 'swiper-lazy',
        loadingClass: 'swiper-lazy-loading',
        loadedClass: 'swiper-lazy-loaded',
        slideClass: 'catalog-slider__item',
        slideActiveClass: 'catalog-slider__item_active',
        navigation: {
          nextEl: '.catalog-slider__next',
          prevEl: '.catalog-slider__prev'
        },
        breakpoints: {
          1200: {
            slidesPerView: 4,
            slidesPerGroup: 3,
            slideActiveClass: 'catalog-slider__item_active',
            slidePrevClass: 'catalog-slider__item_active',
            slideNextClass: 'catalog-slider__item_active'
          },
          900: {
            slidesPerView: 3,
            slidesPerGroup: 1,
          }
        }
      });
    }
    // initial slider spares
    var offset = -0.101;
    if (document.querySelector('.swiper-spares')) {
      var swiperSpares = new Swiper('.swiper-spares', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        initialSlide: 0,
        centeredSlides: true,
        loop: true,
        preloadImages: false,
        lazy: true,
        elementClass: 'swiper-lazy',
        loadingClass: 'swiper-lazy-loading',
        loadedClass: 'swiper-lazy-loaded',
        slideActiveClass: 'catalog-spares__item_active',
        navigation: {
          nextEl: '.catalog-spares__next',
          prevEl: '.catalog-spares__prev'
        },
        breakpoints: {
          1200: {
            initialSlide: 0,
            slidesPerView: 5,
            slidesPerGroup: 4,
            slidesOffsetBefore: window.innerWidth * offset,
            slidePrevClass: 'catalog-spares__item_active',
            slideNextClass: 'catalog-spares__item_next'
          },
          900: {
            slidesPerView: 3,
            slidesOffsetBefore: 0,
            initialSlide: 1,
          },
        }
      });
    }
    // initial slider advice
    if (document.querySelector('.swiper-advice')) {
      var swiperAdvice = new Swiper('.swiper-advice', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        initialSlide: 0,
        centeredSlides: true,
        loop: true,
        preloadImages: false,
        lazy: true,
        elementClass: 'swiper-lazy',
        loadingClass: 'swiper-lazy-loading',
        loadedClass: 'swiper-lazy-loaded',
        slideActiveClass: 'catalog-spares__item_active',
        navigation: {
          nextEl: '.catalog-spares__next',
          prevEl: '.catalog-spares__prev'
        },
        breakpoints: {
          1200: {
            initialSlide: 0,
            slidesPerView: 5,
            slidesPerGroup: 4,
            slidesOffsetBefore: window.innerWidth * offset,
            slidePrevClass: 'catalog-spares__item_active',
            slideNextClass: 'catalog-spares__item_next'
          },
          900: {
            slidesPerView: 3,
            slidesOffsetBefore: 0,
            initialSlide: 1,
          },
        }
      });
    }
  };
  window.addEventListener('load', initPage);
})();
