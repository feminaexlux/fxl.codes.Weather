/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/crack.ts":
/*!**********************!*\
  !*** ./src/crack.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _sand_painter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sand-painter */ \"./src/sand-painter.ts\");\n\nvar Crack = /** @class */ (function () {\n    function Crack(state, x, y, angle) {\n        this.x = 0;\n        this.y = 0;\n        this.angle = 0;\n        this.painter = new _sand_painter__WEBPACK_IMPORTED_MODULE_0__[\"default\"](state.getRandomColor());\n        this.state = state;\n        this.start(x, y, angle);\n    }\n    Crack.prototype.start = function (x, y, angle) {\n        this.x = x + .61 * Math.cos(angle * Math.PI / 180);\n        this.y = y + .61 * Math.sin(angle * Math.PI / 180);\n        var flip = Math.random() < 0.5;\n        this.angle = angle + (90 + Math.floor(Math.random() * 4.1 - 2)) * (flip ? -1 : 1);\n    };\n    Crack.prototype.draw = function () {\n        this.x += .42 * Math.cos(this.angle * Math.PI / 180);\n        this.y += .42 * Math.sin(this.angle * Math.PI / 180);\n        var context = this.state.canvas.getContext(\"2d\");\n        context.fillStyle = \"#000\";\n        context.fillRect(this.x, this.y, 1, 1);\n        var x = Math.floor(this.x);\n        var y = Math.floor(this.y);\n        if (this.state.isWithinBoundary(x, y)) {\n            var angle = this.state.grid[x][y];\n            if (angle > 10000) {\n                this.state.grid[x][y] = Math.floor(this.angle);\n                this.state.seeds.push({ x: x, y: y });\n            }\n            else if (this.state.grid[x][y] != Math.floor(this.angle)) {\n                var entry = this.state.getNewEntry();\n                this.start(entry.x, entry.y, entry.angle);\n            }\n        }\n        else {\n            var entry = this.state.getNewEntry();\n            this.start(entry.x, entry.y, entry.angle);\n            this.state.addCrack();\n        }\n    };\n    return Crack;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Crack);\n\n\n//# sourceURL=webpack:///./src/crack.ts?");

/***/ }),

/***/ "./src/launch.ts":
/*!***********************!*\
  !*** ./src/launch.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _substrate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./substrate */ \"./src/substrate.ts\");\n\nvar ready = function (func) { return document.readyState !== \"loading\" ? func() : document.addEventListener(\"DOMContentLoaded\", func); };\nready(function () {\n    new _substrate__WEBPACK_IMPORTED_MODULE_0__[\"default\"](20);\n});\n/*\nlet weather: Weather\nnavigator.geolocation.getCurrentPosition(position => {\n    weather = new Weather(position.coords.latitude, position.coords.longitude)\n}, () => {\n    weather = new Weather()\n})\n */ \n\n\n//# sourceURL=webpack:///./src/launch.ts?");

/***/ }),

/***/ "./src/sand-painter.ts":
/*!*****************************!*\
  !*** ./src/sand-painter.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar SandPainter = /** @class */ (function () {\n    function SandPainter(color) {\n        this.color = color;\n        this.gain = Math.random() / 10;\n    }\n    SandPainter.prototype.render = function (x, y, angle, state) {\n        var open = true, endX = x, endY = y;\n        while (open) {\n            endX += .81 * Math.sin(angle * Math.PI / 180);\n            endY -= .81 * Math.cos(angle * Math.PI / 180);\n            var gridX = Math.floor(endX);\n            var gridY = Math.floor(endY);\n            if (state.isWithinBoundary(gridX, gridY)) {\n                open = state.grid[gridX][gridY] > 10000;\n            }\n            else {\n                open = false;\n            }\n        }\n        var grains = 64;\n        var hex = this.color.toString(16);\n        var w = this.gain / (grains - 1);\n        var context = state.canvas.getContext(\"2d\");\n        for (var i = 0; i < grains; i++) {\n            var alpha = .1 - i / (grains * 10);\n            context.fillStyle = \"\";\n        }\n    };\n    return SandPainter;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SandPainter);\n\n\n//# sourceURL=webpack:///./src/sand-painter.ts?");

/***/ }),

/***/ "./src/state.ts":
/*!**********************!*\
  !*** ./src/state.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _crack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crack */ \"./src/crack.ts\");\n\nvar State = /** @class */ (function () {\n    function State(colors, maxCracks, canvas) {\n        this.canvas = canvas;\n        this.colors = colors;\n        this.maxCracks = maxCracks;\n        this.grid = [];\n        this.cracks = [];\n        this.seeds = [];\n        this.init();\n    }\n    State.prototype.init = function () {\n        this.cracks.length = 0;\n        this.grid.length = 0;\n        this.seeds.length = 0;\n        var height = this.canvas.height;\n        var width = this.canvas.width;\n        var context = this.canvas.getContext(\"2d\");\n        context.fillStyle = \"rgb(255 255 255 / 95%)\";\n        context.fillRect(0, 0, width, height);\n        for (var x = 0; x < width; x++) {\n            this.grid[x] = [];\n            for (var y = 0; y < height; y++) {\n                this.grid[x][y] = 10001;\n            }\n        }\n        for (var i = 0; i < 3; i++) {\n            var x = Math.floor(Math.random() * width);\n            var y = Math.floor(Math.random() * height);\n            var angle = Math.floor(Math.random() * 360);\n            this.cracks.push(new _crack__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this, x, y, angle));\n            this.grid[x][y] = angle;\n        }\n    };\n    State.prototype.addCrack = function () {\n        if (this.cracks.length >= this.maxCracks)\n            return;\n        var _a = this.getNewEntry(), x = _a.x, y = _a.y, angle = _a.angle;\n        this.cracks.push(new _crack__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this, x, y, angle));\n    };\n    State.prototype.getRandomColor = function () {\n        return this.colors[Math.floor(Math.random() * this.colors.length)];\n    };\n    State.prototype.isWithinBoundary = function (x, y) {\n        return x >= 0 && x < this.canvas.width && y >= 0 && y < this.canvas.height;\n    };\n    State.prototype.getNewEntry = function () {\n        if (!this.seeds.length) {\n            var x = Math.floor(Math.random() * this.canvas.width);\n            var y = Math.floor(Math.random() * this.canvas.height);\n            var angle = this.grid[x][y];\n            if (angle > 10000) {\n                angle = Math.floor(Math.random() * 360);\n                this.grid[x][y] = angle;\n            }\n            return { x: x, y: y, angle: angle };\n        }\n        var randomIndex = Math.floor(Math.random() * this.seeds.length);\n        var entry = this.seeds.splice(randomIndex, 1)[0];\n        return {\n            x: entry.x,\n            y: entry.y,\n            angle: this.grid[entry.x][entry.y]\n        };\n    };\n    return State;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (State);\n\n\n//# sourceURL=webpack:///./src/state.ts?");

/***/ }),

/***/ "./src/substrate.ts":
/*!**************************!*\
  !*** ./src/substrate.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ \"./src/state.ts\");\n// TS attempt of http://www.complexification.net/gallery/machines/substrate/index.php by laniaung.me\n\nvar Substrate = /** @class */ (function () {\n    function Substrate(maxCracks, colors) {\n        if (!(colors === null || colors === void 0 ? void 0 : colors.length))\n            colors = [0x3a1e3e, 0x7c2d3b, 0xb94f3c, 0xf4a462, 0xf9c54e]; // https://colormagic.app/palette/671eeb6c42273fc4c1bb1ac7\n        var canvas = document.createElement(\"canvas\");\n        canvas.width = document.body.clientWidth;\n        canvas.height = document.body.clientHeight;\n        document.body.appendChild(canvas);\n        this.state = new _state__WEBPACK_IMPORTED_MODULE_0__[\"default\"](colors, maxCracks, canvas);\n        this.init();\n    }\n    Substrate.prototype.init = function () {\n        var me = this;\n        var draw = function () {\n            for (var _i = 0, _a = me.state.cracks; _i < _a.length; _i++) {\n                var crack = _a[_i];\n                crack.draw();\n            }\n            requestAnimationFrame(draw);\n        };\n        setInterval(function () { return me.state.init(); }, 120 * 1000);\n        draw();\n    };\n    return Substrate;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Substrate);\n\n\n//# sourceURL=webpack:///./src/substrate.ts?");

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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/launch.ts");
/******/ 	
/******/ })()
;