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

/***/ "./src/sections/scripts/countdown.js":
/*!*******************************************!*\
  !*** ./src/sections/scripts/countdown.js ***!
  \*******************************************/
/***/ (function() {

eval("(function ($) {\n  'use strict';\n\n  GSP.processCountdown = {\n    init: function () {\n      this._countdown();\n    },\n    _countdown: function () {\n      $('[data-countdown]').each(function () {\n        let $this = $(this),\n          countdownEndTime = $this.data('countdown'),\n          countDownDate = new Date().getTime();\n        if (countdownEndTime !== undefined) {\n          let dateMatch = countdownEndTime.match(/^(\\d+)\\-(\\d+)\\-(\\d+)$/);\n          if (dateMatch) {\n            countDownDate = new Date(dateMatch[3] + '-' + dateMatch[2] + '-' + dateMatch[1]).getTime();\n            if (isNaN(countDownDate)) {\n              countDownDate = new Date().getTime();\n            }\n          }\n        }\n        let currentInterval = setInterval(function () {\n          let now = new Date().getTime();\n          let distance = countDownDate - now;\n          let days = Math.floor(distance / (1000 * 60 * 60 * 24));\n          let hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));\n          let minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));\n          let seconds = Math.floor(distance % (1000 * 60) / 1000);\n          if (distance < 0) {\n            clearInterval(currentInterval);\n            return;\n          }\n          if (days < 10) {\n            days = '0' + days;\n          }\n          $this.find(\".day\").html(days);\n          $this.find(\".hour\").html(('0' + hours).slice(-2));\n          $this.find(\".minute\").html(('0' + minutes).slice(-2));\n          $this.find(\".second\").html(('0' + seconds).slice(-2));\n        });\n      });\n    }\n  };\n  $(document).ready(function () {\n    GSP.processCountdown.init();\n  });\n})(jQuery);\n\n//# sourceURL=webpack://shopify-glowing/./src/sections/scripts/countdown.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/sections/scripts/countdown.js"]();
/******/ 	
/******/ })()
;