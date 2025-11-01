/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sections/scripts/bullet-one-page-scroll.js":
/*!********************************************************!*\
  !*** ./src/sections/scripts/bullet-one-page-scroll.js ***!
  \********************************************************/
/***/ (function() {

eval("var APP = APP || {};\n(function ($) {\n  'use strict';\n\n  APP.fullPageScroll = {\n    $_dots: null,\n    _slides: [],\n    _isEnabled: true,\n    _tween: null,\n    _oldSlide: 0,\n    _activeSlide: 0,\n    init: function () {\n      this.fullPageScrollProcess();\n    },\n    fullPageScrollProcess: function () {\n      if (typeof gsap === \"undefined\") {\n        return;\n      }\n      this._slides = document.querySelectorAll('[data-full-page]');\n      this.$_dots = $('.full-page-dots');\n      if (this.$_dots.length === 0) {\n        this.$_dots = $('<div class=\"full-page-dots\"></div>');\n        $('body').append(this.$_dots);\n      }\n      if (this.$_dots.length) {\n        for (let i = 0; i < this._slides.length; i++) {\n          let $dot = $('<a href=\"#\" class=\"full-page-dots-nav\"></a>');\n          $dot.attr('title', $(this._slides[i]).data('full-page'));\n          $dot.attr('data-index', i);\n          this.$_dots.append($dot);\n        }\n        this.$_dots.find('.full-page-dots-nav').each(function (el) {\n          bootstrap.Tooltip.getOrCreateInstance(this, {\n            title: this.title,\n            container: this.parentNode\n          });\n        });\n        this.$_dots.find('.full-page-dots-nav').on('click', function () {\n          let index = $(this).attr('data-index');\n          APP.fullPageScroll._isEnabled = false;\n          APP.fullPageScroll.gotoSlide(index);\n        });\n      }\n      document.addEventListener('mousedown', function (event) {\n        if (event.target === document.querySelector('html')) {\n          if (APP.fullPageScroll._tween) {\n            APP.fullPageScroll._tween.pause();\n            APP.fullPageScroll._isEnabled = false;\n          }\n        }\n      });\n      document.addEventListener('mouseup', function (event) {\n        if (event.target === document.querySelector('html')) {\n          APP.fullPageScroll._isEnabled = true;\n        }\n      });\n      window.addEventListener('wheel', function (event) {\n        APP.fullPageScroll._oldSlide = APP.fullPageScroll._activeSlide;\n        APP.fullPageScroll._activeSlide += event.deltaY > 0 ? 1 : -1;\n        if (APP.fullPageScroll._activeSlide < 0) {\n          APP.fullPageScroll._activeSlide = 0;\n        }\n        if (APP.fullPageScroll._activeSlide > APP.fullPageScroll._slides.length) {\n          APP.fullPageScroll._activeSlide = APP.fullPageScroll._slides.length;\n        }\n        if (APP.fullPageScroll._activeSlide === APP.fullPageScroll._oldSlide) {\n          return;\n        }\n        APP.fullPageScroll.gotoSlide(APP.fullPageScroll._activeSlide);\n      });\n      window.addEventListener('scroll', function (event) {\n        APP.fullPageScroll.calculateSlideActive();\n      });\n      $(document).ready(function () {\n        APP.fullPageScroll.calculateSlideActive();\n      });\n    },\n    gotoSlide: function (slideIndex) {\n      if (slideIndex >= APP.fullPageScroll._slides.length) {\n        return;\n      }\n      $('html').css('scroll-behavior', 'auto');\n      let currentSlide = APP.fullPageScroll._slides[slideIndex];\n      APP.fullPageScroll._tween = gsap.to(window, {\n        scrollTo: {\n          y: currentSlide.offsetTop,\n          autoKill: false,\n          ease: \"Power3.easeInOut\"\n        },\n        duration: 0.85,\n        onComplete: function () {\n          APP.fullPageScroll._isEnabled = true;\n        }\n      });\n    },\n    calculateSlideActive: function () {\n      let scrollTop = window.scrollY;\n      let currentSlide = 0;\n      for (let i = 0; i < APP.fullPageScroll._slides.length; i++) {\n        let slideTop = APP.fullPageScroll._slides[i].offsetTop;\n        if (slideTop - scrollTop > window.innerHeight * 2 / 3) {\n          break;\n        }\n        currentSlide = i;\n      }\n      APP.fullPageScroll.activeDot(currentSlide);\n    },\n    activeDot: function (slideIndex) {\n      let currentSlide = APP.fullPageScroll._slides[slideIndex];\n      if (APP.fullPageScroll.$_dots.length) {\n        let dotsSkin = $(currentSlide).data('full-page-dots');\n        APP.fullPageScroll.$_dots.removeClass('dark light');\n        if (dotsSkin !== undefined) {\n          APP.fullPageScroll.$_dots.addClass(dotsSkin);\n        }\n        APP.fullPageScroll.$_dots.find('.full-page-dots-nav').removeClass('active');\n        let $curDot = APP.fullPageScroll.$_dots.find('.full-page-dots-nav[data-index=\"' + slideIndex + '\"]');\n        $curDot.addClass('active');\n      }\n    }\n  };\n  APP.fullPageScroll.init();\n})(jQuery);\n\n//# sourceURL=webpack://shopify-glowing/./src/sections/scripts/bullet-one-page-scroll.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/sections/scripts/bullet-one-page-scroll.js"]();
/******/ 	
/******/ })()
;