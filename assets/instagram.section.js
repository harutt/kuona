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

/***/ "./src/sections/scripts/instagram.js":
/*!*******************************************!*\
  !*** ./src/sections/scripts/instagram.js ***!
  \*******************************************/
/***/ (function() {

eval("const gspTheme = window.gspTheme || {};\nclass gspInstagram {\n  constructor(containerElement, options) {\n    const default_options = {\n      limit: 4,\n      hoverStyle: \"\",\n      aspectRatio: \"\"\n    };\n    options = {\n      ...default_options,\n      ...options\n    };\n    this.mediaAPI = \"https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username\";\n    this.container = containerElement;\n    this.imagesContainer = containerElement.querySelector(\"[data-gsp-instagram]\");\n    this.accessToken = window.gspSetting.access_token.instagram;\n    this.imagesCount = options.limit;\n    this.hoverStyle = options.hoverStyle;\n    this.aspectRatio = options.aspectRatio ? \"--aspect-ratio:\" + options.aspectRatio : \"--aspect-ratio: 1/1\";\n    this.hasAnimate = false;\n    if (window.__sfWindowLoaded) {\n      this.init().catch(console.error);\n    } else {\n      window.addEventListener(\"load\", () => this.init().catch(console.error));\n    }\n  }\n  lazyImage(imageData) {\n    const {\n      src,\n      alt\n    } = imageData;\n    const imageElement = document.createElement(\"IMG\");\n    imageElement.src = \"\".concat(src, \"&width=300\");\n    imageElement.setAttribute(\"loading\", \"lazy\");\n    imageElement.alt = alt;\n    return imageElement.outerHTML;\n  }\n  nodeString(mediaData) {\n    let class_item = \"gsp-instagram-link position-relative\";\n    if (this.hoverStyle) {\n      class_item = class_item + \" img-hover-\" + this.hoverStyle;\n    }\n    return \"\\n        <a class=\\\"\".concat(class_item, \"\\\" href=\\\"\").concat(mediaData.permalink, \"\\\" target=\\\"_blank\\\">\\n            <div class=\\\"gsp-instagram-item-content position-absolute z-index-10\\\">\\n                <div class=\\\"gsp-instagram-icon d-flex\\\">\\n                    \").concat(gspTheme.helper.getIconSvg('instagram'), \"\\n                </div>\\n            </div>\\n            <div class=\\\"gsp-image gsp-instagram-item-image\\\" style=\\\"\").concat(this.aspectRatio, \"\\\">\\n                \").concat(this.lazyImage({\n      src: mediaData.media_url,\n      alt: \"instagram-image-\".concat(mediaData.username, \"-\").concat(mediaData.id)\n    }), \"\\n            </div>\\n        </a>\");\n  }\n  async init() {\n    const response = await gspTheme.helper.fetchJsonCache(\"\".concat(this.mediaAPI, \"&access_token=\").concat(this.accessToken), {\n      cache: \"force-cache\"\n    });\n    if (response && !response.error) {\n      const promises = response.data.filter(media => media.media_type === \"IMAGE\" || media.media_type === \"CAROUSEL_ALBUM\").slice(0, this.imagesCount).map(async media => {\n        const mediaHtml = this.nodeString(media);\n        const mediaElement = document.createElement(\"DIV\");\n        if (this.imagesContainer.dataset.classesItemInner) {\n          const classList = this.addClassItem(this.imagesContainer.dataset.classesItemInner);\n          mediaElement.classList.add(...classList);\n        }\n        if (this.imagesContainer.dataset.animateItemInner) {\n          mediaElement.setAttribute('data-animate', this.imagesContainer.dataset.animateItemInner);\n          this.hasAnimate = true;\n        }\n        mediaElement.innerHTML = mediaHtml;\n        this.imagesContainer.append(mediaElement);\n      });\n      await Promise.all(promises);\n      if (this.hasAnimate) {\n        GSP.animation.init();\n      }\n      if (this.imagesContainer.classList.contains(\"slick-slider\")) {\n        GSP.slickSlider.slickInit(this.imagesContainer);\n      }\n    }\n  }\n  addClassItem($str_class) {\n    if (typeof $str_class === \"string\" && $str_class !== '') {\n      return $str_class.split(\" \").filter(function (v) {\n        return v !== \"\";\n      });\n    }\n    return [];\n  }\n}\ngspTheme.instagram = gspInstagram;\nif (!customElements.get(\"gsp-instagram\")) {\n  class gspInstagramElement extends HTMLElement {\n    constructor() {\n      super();\n      this.init();\n    }\n    init() {\n      const {\n        aspectRatio,\n        hoverStyle,\n        itemLimit\n      } = this.dataset;\n      const config = {\n        limit: itemLimit ? itemLimit : 6,\n        hoverStyle: hoverStyle,\n        aspectRatio: aspectRatio\n      };\n      new gspTheme.instagram(this, config);\n    }\n  }\n  customElements.define(\"gsp-instagram\", gspInstagramElement);\n}\n\n//# sourceURL=webpack://shopify-glowing/./src/sections/scripts/instagram.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/sections/scripts/instagram.js"]();
/******/ 	
/******/ })()
;