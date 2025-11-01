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

/***/ "./src/sections/scripts/pickup-availability.js":
/*!*****************************************************!*\
  !*** ./src/sections/scripts/pickup-availability.js ***!
  \*****************************************************/
/***/ (function() {

eval("if (!customElements.get(\"pickup-availability\")) {\n  class PickupAvailability extends HTMLElement {\n    constructor() {\n      super();\n      if (this.dataset.initialized) return;\n      this.dataset.initialized = \"true\";\n      if (this.hasAttribute(\"available\")) {\n        this.errorMessageElement = this.querySelector(\"template\").content.firstElementChild.cloneNode(true);\n        this.handleRefreshClick = this.handleRefreshClick.bind(this);\n        this.fetchAvailability(this.dataset.variantId);\n      }\n    }\n    fetchAvailability(variantId) {\n      let baseUrl = this.dataset.baseUrl;\n      if (!baseUrl.endsWith(\"/\")) baseUrl += \"/\";\n      fetch(\"\".concat(baseUrl, \"variants/\").concat(variantId, \"/?section_id=fetch__pickup-availability\")).then(response => response.text()).then(htmlContent => {\n        const parsedDocument = new DOMParser().parseFromString(htmlContent, \"text/html\");\n        const availabilitySection = parsedDocument.querySelector(\".shopify-section\");\n        this.updateAvailabilityUI(availabilitySection);\n      }).catch(error => {\n        const refreshButton = this.querySelector(\"button\");\n        if (refreshButton) {\n          refreshButton.removeEventListener(\"click\", this.handleRefreshClick);\n        }\n        this.showErrorMessage();\n      });\n    }\n    handleRefreshClick() {\n      this.fetchAvailability(this.dataset.variantId);\n    }\n    showErrorMessage() {\n      this.innerHTML = \"\";\n      this.appendChild(this.errorMessageElement);\n      this.querySelector(\"button\").addEventListener(\"click\", this.handleRefreshClick);\n    }\n    updateAvailabilityUI(availabilitySection) {\n      const pickupDrawer = document.querySelector(\"#offcanvasPickupAvailability\");\n      if (pickupDrawer) pickupDrawer.remove();\n      const previewElement = availabilitySection.querySelector(\"pickup-availability-preview\");\n      if (!previewElement) {\n        this.innerHTML = \"\";\n        this.removeAttribute(\"available\");\n        return;\n      }\n      this.innerHTML = previewElement.outerHTML;\n      this.setAttribute(\"available\", \"\");\n      document.body.appendChild(availabilitySection.querySelector(\"#offcanvasPickupAvailability\"));\n\n      /*const viewDetailsButton = this.querySelector(\"button\");\n      if (viewDetailsButton) {\n      \tviewDetailsButton.addEventListener(\"click\", () => {\n      \t\tdocument.querySelector(\"#offcanvasPickupAvailability\").openDrawer();\n      \t});\n      }*/\n    }\n  }\n\n  customElements.define(\"pickup-availability\", PickupAvailability);\n}\n\n//# sourceURL=webpack://shopify-glowing/./src/sections/scripts/pickup-availability.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/sections/scripts/pickup-availability.js"]();
/******/ 	
/******/ })()
;