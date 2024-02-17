/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 436:
/***/ (() => {

document.addEventListener('DOMContentLoaded', () => {
    (function() {
        const hamburger = document.querySelector('.js-menu-hamburger');
        const menu = document.querySelector('.js-menu');
        const header = document.querySelector('.js-header');
        
        hamburger.addEventListener('click', (e) => {
            hamburger.classList.toggle('active');
            menu.classList.toggle('menu_active');
        });
        
        const menuLinks = document.querySelectorAll('.js-menu .link');
        menuLinks.forEach(link => {
          link.addEventListener('click', () => {
            menu.classList.remove('menu_active');
            hamburger.classList.toggle('active');
          });
        });
    
        window.addEventListener('scroll', () => {
            header.classList.toggle('sticky', window.scrollY > 0);
        });
    })();
});

/***/ }),

/***/ 857:
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
    const slider = tns({
        container: '.js-feedbacks-slider',
        items: 3,
        slideBy: 1,
        mouseDrag: true,
        loop: true,
        controlsContainer: '.js-feedbacks-slider-controls',
        nav: false,
        responsive: {
            1266: {
                items: 3,
            },
            780: {
                items: 2,
            },
            320: {
                items: 1,
            }
        }
    });
  });

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _modules_tiny_slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(857);
/* harmony import */ var _modules_tiny_slider_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_tiny_slider_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(436);
/* harmony import */ var _modules_main_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_main_js__WEBPACK_IMPORTED_MODULE_1__);



})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map