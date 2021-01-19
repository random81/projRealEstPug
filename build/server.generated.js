/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/controllers/index_es6.server.controller.js":
/*!********************************************************!*\
  !*** ./app/controllers/index_es6.server.controller.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n // make http calls. It supports HTTPS and follows redirects by default.\n\nvar restCallMap = function restCallMap(req, res) {\n  /*\n  Stage 1/2 of ajax request. Grab the map data from zillow.\n  */\n  var address = req.body.gajax;\n  var addressparsed = JSON.parse(address);\n  var street = addressparsed.address1;\n  var city = addressparsed.city1;\n  var state = addressparsed.state1; // replaced '' for api key from zillow here:\n\n  var apiKeyZillow = '';\n  var map = \"https://www.zillow.com/webservice/GetSearchResults.htm?zws-id=\".concat(apiKeyZillow, \"&address=\").concat(street, \"&citystatezip=\").concat(city, \"%2C\").concat(state);\n  axios__WEBPACK_IMPORTED_MODULE_0___default().get(map).then(function (response) {\n    // zillow server response\n    res.send(response.data);\n  })[\"catch\"](function (error) {\n    console.log(error);\n  });\n};\n\nvar restCall = function restCall(req, res) {\n  /*\n  Stage 2/2 of ajax request. get comparison data for real estate\n  */\n  // replaced '' for api key from zillow here:\n  var apiKeyZillow = '';\n  var zpid = req.body.gajax;\n  var url = \"https://www.zillow.com/webservice/GetComps.htm?zws-id=\".concat(apiKeyZillow, \"&zpid=\").concat(zpid, \"&count=25\");\n  axios__WEBPACK_IMPORTED_MODULE_0___default().get(url).then(function (response) {\n    // zillow server body of response\n    res.send(response.data);\n  })[\"catch\"](function (error) {\n    console.log(error);\n  });\n}; // Create a new 'render' controller method.\n\n\nvar getContent = function getContent(req, res) {\n  var page = '';\n\n  if (req.path === '/') {\n    page = '/index';\n  } else {\n    page = req.url; // allow for loading\n  }\n\n  page = page.replace('/', '');\n  res.render(\"\".concat(page, \".jade\"));\n}; // Create a render controller method for error page.\n\n\nvar Renderpage = function Renderpage(req, res) {\n  res.render('404.jade');\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  getContent: getContent,\n  restCall: restCall,\n  restCallMap: restCallMap,\n  Renderpage: Renderpage\n});\n\n//# sourceURL=webpack://RealEstate/./app/controllers/index_es6.server.controller.js?");

/***/ }),

/***/ "./app/routes/index_es6.routes.js":
/*!****************************************!*\
  !*** ./app/routes/index_es6.routes.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_index_es6_server_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/index_es6.server.controller */ \"./app/controllers/index_es6.server.controller.js\");\n/*\nA significant automatic part of the routing for the app functionality is as such:\nUser submits form->restCallMap->handelrequest->restmap->handleComp\n*/\n\n\nvar router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route('/').get(_controllers_index_es6_server_controller__WEBPACK_IMPORTED_MODULE_1__.default.getContent); // submit part A ajax request loads map\n\nrouter.route('/restmap').post(_controllers_index_es6_server_controller__WEBPACK_IMPORTED_MODULE_1__.default.restCallMap); // submit part B of ajax request from handelrequest\n\nrouter.route('/rest').post(_controllers_index_es6_server_controller__WEBPACK_IMPORTED_MODULE_1__.default.restCall); // false page request\n\nrouter.route('/*').get(_controllers_index_es6_server_controller__WEBPACK_IMPORTED_MODULE_1__.default.Renderpage);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://RealEstate/./app/routes/index_es6.routes.js?");

/***/ }),

/***/ "./config/express_es6.js":
/*!*******************************!*\
  !*** ./config/express_es6.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var jade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jade */ \"jade\");\n/* harmony import */ var jade__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jade__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _app_routes_index_es6_routes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../app/routes/index_es6.routes.js */ \"./app/routes/index_es6.routes.js\");\n\n\n\n\nvar app = express__WEBPACK_IMPORTED_MODULE_1___default()(); // changing to dist folder of webpack\n\napp.set('views', './dist'); // USE keyword means express is mediating between middleware logic and client. static file via get\n// changing to dist folder of webpack\n\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default().static('dist'));\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default().urlencoded({\n  extended: true\n}));\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default().json());\napp.set('view engine', 'jade');\napp.engine('jade', (jade__WEBPACK_IMPORTED_MODULE_0___default().__express)); // mount route\n\napp.use('/', _app_routes_index_es6_routes_js__WEBPACK_IMPORTED_MODULE_3__.default);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);\n\n//# sourceURL=webpack://RealEstate/./config/express_es6.js?");

/***/ }),

/***/ "./server_es6.js":
/*!***********************!*\
  !*** ./server_es6.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_express_es6_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/express_es6.js */ \"./config/express_es6.js\");\n\n_config_express_es6_js__WEBPACK_IMPORTED_MODULE_0__.default.listen(3000, function (err) {\n  if (err) {\n    console.log(err);\n  }\n\n  console.info('Server started on port %s.', 3000);\n});\n\n//# sourceURL=webpack://RealEstate/./server_es6.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");;

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "jade":
/*!***********************!*\
  !*** external "jade" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("jade");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 				() => module['default'] :
/******/ 				() => module;
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
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
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
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./server_es6.js");
/******/ })()
;