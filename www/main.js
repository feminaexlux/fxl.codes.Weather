/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/color-schemes.ts":
/*!******************************!*\
  !*** ./src/color-schemes.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Analogous: () => (/* binding */ Analogous),
/* harmony export */   Monochromatic: () => (/* binding */ Monochromatic),
/* harmony export */   SplitComplementary: () => (/* binding */ SplitComplementary),
/* harmony export */   Square: () => (/* binding */ Square),
/* harmony export */   Tetradic: () => (/* binding */ Tetradic),
/* harmony export */   Triadic: () => (/* binding */ Triadic)
/* harmony export */ });
/* harmony import */ var _hsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hsl */ "./src/hsl.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/*
export enum Scheme {
    Analogous,
    Monochromatic,
    SplitComplementary,
    Triadic,
    Tetradic,
    Square
}
*/
var Scheme = /** @class */ (function () {
    function Scheme(initial) {
        this.primary = _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL.fromHex(initial);
    }
    return Scheme;
}());
var Analogous = /** @class */ (function (_super) {
    __extends(Analogous, _super);
    function Analogous(initial) {
        var _this = _super.call(this, initial) || this;
        var left1 = new _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL(_this.primary.hue - 60, _this.primary.saturation, _this.primary.lightness);
        var left2 = new _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL(_this.primary.hue - 30, _this.primary.saturation, _this.primary.lightness);
        var right1 = new _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL(_this.primary.hue + 30, _this.primary.saturation, _this.primary.lightness);
        var right2 = new _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL(_this.primary.hue + 60, _this.primary.saturation, _this.primary.lightness);
        _this.colors = [
            left1.toHex(),
            left2.toHex(),
            initial,
            right1.toHex(),
            right2.toHex()
        ];
        return _this;
    }
    return Analogous;
}(Scheme));

var Monochromatic = /** @class */ (function (_super) {
    __extends(Monochromatic, _super);
    function Monochromatic(initial) {
        var _this = _super.call(this, initial) || this;
        var delta = _this.primary.lightness / 6;
        _this.colors = [
            initial,
            new _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL(_this.primary.hue, _this.primary.saturation, _this.primary.lightness - delta).toHex(),
            new _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL(_this.primary.hue, _this.primary.saturation, _this.primary.lightness - delta * 2).toHex(),
            new _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL(_this.primary.hue, _this.primary.saturation, _this.primary.lightness - delta * 3).toHex(),
            new _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL(_this.primary.hue, _this.primary.saturation, _this.primary.lightness - delta * 4).toHex()
        ];
        return _this;
    }
    return Monochromatic;
}(Scheme));

var SplitComplementary = /** @class */ (function (_super) {
    __extends(SplitComplementary, _super);
    function SplitComplementary(initial) {
        var _this = _super.call(this, initial) || this;
        var complement = new _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL((_this.primary.hue + 180) % 360, _this.primary.saturation, _this.primary.lightness);
        _this.colors = [
            initial,
            new _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL(complement.hue - 30, complement.saturation, complement.lightness).toHex(),
            new _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL(complement.hue + 30, complement.saturation, complement.lightness).toHex()
        ];
        return _this;
    }
    return SplitComplementary;
}(Scheme));

var Triadic = /** @class */ (function (_super) {
    __extends(Triadic, _super);
    function Triadic(initial) {
        var _this = _super.call(this, initial) || this;
        _this.colors = [
            initial,
            new _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL(_this.primary.hue - 120, _this.primary.saturation, _this.primary.lightness).toHex(),
            new _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL(_this.primary.hue + 120, _this.primary.saturation, _this.primary.lightness).toHex()
        ];
        return _this;
    }
    return Triadic;
}(Scheme));

var Tetradic = /** @class */ (function (_super) {
    __extends(Tetradic, _super);
    function Tetradic(initial) {
        var _this = _super.call(this, initial) || this;
        var second = new _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL(_this.primary.hue + 45, _this.primary.saturation, _this.primary.lightness);
        var complement = new _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL(_this.primary.hue + 180, _this.primary.saturation, _this.primary.lightness);
        var secondComplement = new _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL(second.hue + 180, _this.primary.saturation, _this.primary.lightness);
        _this.colors = [
            initial,
            second.toHex(),
            complement.toHex(),
            secondComplement.toHex()
        ];
        return _this;
    }
    return Tetradic;
}(Scheme));

var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(initial) {
        var _this = _super.call(this, initial) || this;
        var second = new _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL(_this.primary.hue + 90, _this.primary.saturation, _this.primary.lightness);
        var third = new _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL(_this.primary.hue + 180, _this.primary.saturation, _this.primary.lightness);
        var fourth = new _hsl__WEBPACK_IMPORTED_MODULE_0__.HSL(second.hue + 270, _this.primary.saturation, _this.primary.lightness);
        _this.colors = [
            initial,
            second.toHex(),
            third.toHex(),
            fourth.toHex()
        ];
        return _this;
    }
    return Square;
}(Scheme));



/***/ }),

/***/ "./src/crack.ts":
/*!**********************!*\
  !*** ./src/crack.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sand_painter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sand-painter */ "./src/sand-painter.ts");

var Crack = /** @class */ (function () {
    function Crack(state, x, y, angle) {
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.state = state;
        this.painter = new _sand_painter__WEBPACK_IMPORTED_MODULE_0__["default"](this);
        this.start(x, y, angle);
    }
    Crack.prototype.start = function (x, y, angle) {
        this.x = x + .61 * Math.cos(angle * Math.PI / 180);
        this.y = y + .61 * Math.sin(angle * Math.PI / 180);
        var flip = Math.random() < 0.5;
        this.angle = angle + (90 + Math.floor(Math.random() * 4.1 - 2)) * (flip ? -1 : 1);
    };
    Crack.prototype.draw = function () {
        this.x += .42 * Math.cos(this.angle * Math.PI / 180);
        this.y += .42 * Math.sin(this.angle * Math.PI / 180);
        var fuzzX = this.x + (Math.random() * .66 - .33);
        var fuzzY = this.y + (Math.random() * .66 - .33);
        var context = this.state.canvas.getContext("2d");
        context.fillStyle = "#000";
        context.fillRect(fuzzX, fuzzY, 1, 1);
        this.painter.render();
        var x = Math.floor(this.x);
        var y = Math.floor(this.y);
        if (this.state.isWithinBoundary(x, y)) {
            var angle = this.state.grid[x][y];
            if (angle > 10000) {
                this.state.grid[x][y] = Math.floor(this.angle);
                this.state.seeds.push({ x: x, y: y });
            }
            else if (this.state.grid[x][y] != Math.floor(this.angle)) {
                var entry = this.state.getNewEntry();
                this.start(entry.x, entry.y, entry.angle);
            }
        }
        else {
            var entry = this.state.getNewEntry();
            this.start(entry.x, entry.y, entry.angle);
            this.state.addCrack();
        }
    };
    return Crack;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Crack);


/***/ }),

/***/ "./src/hsl.ts":
/*!********************!*\
  !*** ./src/hsl.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HSL: () => (/* binding */ HSL)
/* harmony export */ });
/* harmony import */ var _rgb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rgb */ "./src/rgb.ts");

var HSL = /** @class */ (function () {
    function HSL(hue, saturation, lightness) {
        this.hue = (hue + 360) % 360;
        this.saturation = saturation;
        this.lightness = lightness;
    }
    // https://en.wikipedia.org/wiki/RGB_color_model
    HSL.fromRgb = function (rgb) {
        var redValue = rgb.red / 255, greenValue = rgb.green / 255, blueValue = rgb.blue / 255, lightness = (redValue + greenValue + blueValue) / 3, saturation = 1 - (3 / (redValue + greenValue + blueValue)) * Math.min(redValue, greenValue, blueValue);
        var dividend = (redValue - greenValue) + (redValue - blueValue);
        var divisor = 2 * Math.sqrt((redValue - greenValue) ^ 2 + (redValue - blueValue) * (greenValue - blueValue));
        var hue = (1 / Math.cos(dividend / divisor));
        if (greenValue > blueValue)
            hue = 360 - hue;
        return new HSL(hue, saturation, lightness);
    };
    HSL.fromHex = function (color) {
        var red = color >> 16;
        var green = (color - (red << 16)) >> 8;
        var blue = color - (red << 16) - (green << 8);
        return HSL.fromRgb(new _rgb__WEBPACK_IMPORTED_MODULE_0__.RGB(red, green, blue));
    };
    HSL.prototype.toHex = function () {
        return _rgb__WEBPACK_IMPORTED_MODULE_0__.RGB.fromHsl(this).toHex();
    };
    return HSL;
}());



/***/ }),

/***/ "./src/rgb.ts":
/*!********************!*\
  !*** ./src/rgb.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RGB: () => (/* binding */ RGB)
/* harmony export */ });
var RGB = /** @class */ (function () {
    function RGB(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
    RGB.prototype.toHex = function () {
        return this.red << 16 + this.green << 8 + this.blue;
    };
    // https://en.wikipedia.org/wiki/HSL_and_HSV
    RGB.fromHsl = function (hsl) {
        var red = 0, green = 0, blue = 0;
        var saturationValue = hsl.saturation / 100, lightnessValue = hsl.lightness / 100, chroma = 1 - Math.abs(2 * hsl.lightness - 1) * saturationValue, range = hsl.hue / 60, intermediate = chroma * (1 - Math.abs(range % 2 - 1)), match = lightnessValue - chroma / 2;
        if (range >= 0 && range < 1) {
            red = chroma;
            green = intermediate;
        }
        else if (range >= 1 && range < 2) {
            red = intermediate;
            green = chroma;
        }
        else if (range >= 2 && range < 3) {
            green = chroma;
            blue = intermediate;
        }
        else if (range >= 3 && range < 4) {
            green = intermediate;
            blue = chroma;
        }
        else if (range >= 4 && range < 5) {
            red = intermediate;
            blue = chroma;
        }
        else if (range >= 5 && range < 6) {
            red = chroma;
            blue = intermediate;
        }
        return new RGB((red + match) * 255, (green + match) * 255, (blue + match) * 255);
    };
    return RGB;
}());



/***/ }),

/***/ "./src/sand-painter.ts":
/*!*****************************!*\
  !*** ./src/sand-painter.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var SandPainter = /** @class */ (function () {
    function SandPainter(crack) {
        this.crack = crack;
        this.color = this.crack.state.getRandomColor();
        this.gain = Math.random() / 10;
    }
    SandPainter.prototype.render = function () {
        var state = this.crack.state, x = this.crack.x, y = this.crack.y, angle = this.crack.angle;
        var open = true, endX = x, endY = y;
        while (open) {
            endX += .81 * Math.sin(angle * Math.PI / 180);
            endY -= .81 * Math.cos(angle * Math.PI / 180);
            var gridX = Math.floor(endX);
            var gridY = Math.floor(endY);
            if (state.isWithinBoundary(gridX, gridY)) {
                open = state.grid[gridX][gridY] > 10000;
            }
            else {
                open = false;
            }
        }
        this.gain += (Math.random() / 10 - .05);
        if (this.gain < 0)
            this.gain = 0;
        if (this.gain > 1)
            this.gain = 1;
        var grains = 64;
        var hex = this.color.toString(16);
        var w = this.gain / (grains - 1); // some kind of multiplier
        var context = state.canvas.getContext("2d");
        for (var i = 0; i < grains; i++) {
            var alpha = Math.floor((.1 - i / (grains * 10)) * 255);
            var paintX = x + (endX - x) * Math.sin(Math.sin(i * w));
            var paintY = y + (endY - y) * Math.sin(Math.sin(i * w));
            context.fillStyle = "#".concat(hex.padStart(6, "0")).concat(alpha.toString(16).padStart(2, "0"));
            context.fillRect(paintX, paintY, 1, 1);
        }
    };
    return SandPainter;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SandPainter);


/***/ }),

/***/ "./src/state.ts":
/*!**********************!*\
  !*** ./src/state.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _crack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crack */ "./src/crack.ts");

var State = /** @class */ (function () {
    function State(colors, maxCracks, canvas) {
        this.canvas = canvas;
        this.colors = colors;
        this.maxCracks = maxCracks;
        this.grid = [];
        this.cracks = [];
        this.seeds = [];
        this.init();
    }
    State.prototype.init = function (colors) {
        if (colors)
            this.colors = colors;
        this.cracks.length = 0;
        this.grid.length = 0;
        this.seeds.length = 0;
        var height = this.canvas.height;
        var width = this.canvas.width;
        var context = this.canvas.getContext("2d");
        context.fillStyle = "rgb(255 255 255 / 95%)";
        context.fillRect(0, 0, width, height);
        for (var x = 0; x < width; x++) {
            this.grid[x] = [];
            for (var y = 0; y < height; y++) {
                this.grid[x][y] = 10001;
            }
        }
        for (var i = 0; i < 3; i++) {
            var x = Math.floor(Math.random() * width);
            var y = Math.floor(Math.random() * height);
            var angle = Math.floor(Math.random() * 360);
            this.cracks.push(new _crack__WEBPACK_IMPORTED_MODULE_0__["default"](this, x, y, angle));
            this.grid[x][y] = angle;
        }
    };
    State.prototype.addCrack = function () {
        if (this.cracks.length >= this.maxCracks)
            return;
        var _a = this.getNewEntry(), x = _a.x, y = _a.y, angle = _a.angle;
        this.cracks.push(new _crack__WEBPACK_IMPORTED_MODULE_0__["default"](this, x, y, angle));
    };
    State.prototype.getRandomColor = function () {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    };
    State.prototype.isWithinBoundary = function (x, y) {
        return x >= 0 && x < this.canvas.width && y >= 0 && y < this.canvas.height;
    };
    State.prototype.getNewEntry = function () {
        if (!this.seeds.length) {
            var x = Math.floor(Math.random() * this.canvas.width);
            var y = Math.floor(Math.random() * this.canvas.height);
            var angle = this.grid[x][y];
            if (angle > 10000) {
                angle = Math.floor(Math.random() * 360);
                this.grid[x][y] = angle;
            }
            return { x: x, y: y, angle: angle };
        }
        var randomIndex = Math.floor(Math.random() * this.seeds.length);
        var entry = this.seeds.splice(randomIndex, 1)[0];
        return {
            x: entry.x,
            y: entry.y,
            angle: this.grid[entry.x][entry.y]
        };
    };
    return State;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (State);


/***/ }),

/***/ "./src/substrate.ts":
/*!**************************!*\
  !*** ./src/substrate.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.ts");
/* harmony import */ var _color_schemes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color-schemes */ "./src/color-schemes.ts");
// TS attempt of http://www.complexification.net/gallery/machines/substrate/index.php by laniaung.me


var Substrate = /** @class */ (function () {
    function Substrate(maxCracks, colors) {
        if (!(colors === null || colors === void 0 ? void 0 : colors.length))
            colors = [0x3a1e3e, 0x7c2d3b, 0xb94f3c, 0xf4a462, 0xf9c54e]; // https://colormagic.app/palette/671eeb6c42273fc4c1bb1ac7
        var canvas = document.createElement("canvas");
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        document.body.appendChild(canvas);
        this.state = new _state__WEBPACK_IMPORTED_MODULE_0__["default"](colors, maxCracks, canvas);
        this.init();
    }
    Substrate.prototype.init = function () {
        var me = this;
        var draw = function () {
            for (var _i = 0, _a = me.state.cracks; _i < _a.length; _i++) {
                var crack = _a[_i];
                crack.draw();
            }
            requestAnimationFrame(draw);
        };
        setInterval(function () { return me.state.init(me.getRandomColorScheme()); }, 30 * 1000);
        draw();
    };
    Substrate.prototype.getRandomColorScheme = function () {
        var color = Math.floor(Math.random() * Math.pow(256, 3));
        switch (Math.floor(Math.random() * 6)) {
            case 1:
                return new _color_schemes__WEBPACK_IMPORTED_MODULE_1__.Monochromatic(color).colors;
            case 2:
                return new _color_schemes__WEBPACK_IMPORTED_MODULE_1__.SplitComplementary(color).colors;
            case 3:
                return new _color_schemes__WEBPACK_IMPORTED_MODULE_1__.Triadic(color).colors;
            case 4:
                return new _color_schemes__WEBPACK_IMPORTED_MODULE_1__.Tetradic(color).colors;
            case 5:
                return new _color_schemes__WEBPACK_IMPORTED_MODULE_1__.Square(color).colors;
            default:
                return new _color_schemes__WEBPACK_IMPORTED_MODULE_1__.Analogous(color).colors;
        }
    };
    return Substrate;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Substrate);


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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/launch.ts ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _substrate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./substrate */ "./src/substrate.ts");

var ready = function (func) { return document.readyState !== "loading" ? func() : document.addEventListener("DOMContentLoaded", func); };
ready(function () {
    new _substrate__WEBPACK_IMPORTED_MODULE_0__["default"](20);
});
/*
let weather: Weather
navigator.geolocation.getCurrentPosition(position => {
    weather = new Weather(position.coords.latitude, position.coords.longitude)
}, () => {
    weather = new Weather()
})
 */ 

})();

/******/ })()
;
//# sourceMappingURL=main.js.map