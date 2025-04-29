module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "24fb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "499e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ addStylesClient; });

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "59d2":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".qkb-bot-ui{position:fixed;z-index:1000;bottom:1.5rem;right:1.5rem;display:flex;flex-direction:column;font-size:1rem}.qkb-bot-ui *{box-sizing:border-box}.qkb-preload-image{position:absolute;top:0;left:0;width:0;height:0;overflow:hidden}.qkb-bot-ui--animate .qkb-fadeUp-enter-active,.qkb-bot-ui--animate .qkb-fadeUp-leave-active{opacity:1;transform:translate(0);transition:opacity .15s linear,transform .2s ease-out}.qkb-bot-ui--animate .qkb-fadeUp-enter,.qkb-bot-ui--animate .qkb-fadeUp-leave-to{transform:translateY(20px);opacity:0}.qkb-bot-ui--animate .qkb-scaleUp-enter-active,.qkb-bot-ui--animate .qkb-scaleUp-leave-active{opacity:1;transform:scale(1);transition:opacity .1s linear,transform .2s ease-out}.qkb-bot-ui--animate .qkb-scaleUp-enter,.qkb-bot-ui--animate .qkb-scaleUp-leave-to{transform:scale(0);opacity:0}@-webkit-keyframes qkbJump{0%{transform:translateY(2px)}to{transform:translateY(-1px)}}@keyframes qkbJump{0%{transform:translateY(2px)}to{transform:translateY(-1px)}}.qkb-msg-bubble__typing-indicator:after,.qkb-msg-bubble__typing-indicator:before,.qkb-msg-bubble__typing-indicator span{transform:translateY(2px);-webkit-animation:qkbJump .35s ease infinite alternate;animation:qkbJump .35s ease infinite alternate}.qkb-msg-bubble__typing-indicator span{-webkit-animation-delay:.175s;animation-delay:.175s}.qkb-msg-bubble__typing-indicator:after{-webkit-animation-delay:.35s;animation-delay:.35s}.qkb-bot-bubble{align-self:flex-end}.qkb-bubble-btn{display:block;padding:0;outline:0;border:0;box-shadow:none;border-radius:50%;color:#fff;fill:#fff;cursor:pointer;box-shadow:0 3px 5px 0 rgba(0,0,0,.15);transition:opacity .2s linear}.qkb-bubble-btn:hover{opacity:.85}.qkb-bubble-btn-icon{display:block;position:absolute;top:50%;left:50%;width:27px;height:auto;margin:-11px 0 0 -13px;line-height:1em}.qkb-bubble-btn-icon.qkb-bubble-btn-icon--close{width:15px;margin:-7px 0 0 -7px}.qkb-board{display:flex;flex-direction:column;position:absolute;right:0;overflow:hidden;width:376px;height:80vh;margin-bottom:10px;border-radius:8px;background-color:#fff;box-shadow:0 3px 30px 0 rgba(0,0,0,.15)}.qkb-board-header{display:flex;flex:none;align-items:center;justify-content:space-between;height:50px;padding:5px 15px}.qkb-board-header__title{font-weight:700;font-size:.875rem}.qkb-board-content{flex-grow:1;overflow:hidden scroll}.qkb-board-content__bubbles{min-height:100%;padding:1.5rem 1.25rem 1rem}.qkb-msg-bubble{display:flex;position:relative}.qkb-msg-avatar{flex-grow:1;flex:none;position:relative;overflow:hidden;border-radius:50%}.qkb-msg-avatar__img{position:absolute;top:0;left:0;width:100%;height:100%;background-color:transparent;background-size:cover;background-repeat:no-repeat}.qkb-msg-bubble__time{display:none;position:absolute;right:0;top:0;padding:2px 5px;margin-top:-5px;border-radius:5px;font-size:.625rem;color:#fff;background-color:#222;transform:translateY(-100%);opacity:0;transition:opacity .1s linear 1s}.qkb-msg-bubble--user .qkb-msg-bubble__time{display:block}.qkb-msg-bubble-component{font-size:.875rem}.qkb-msg-bubble-component:hover~.qkb-msg-bubble__time{opacity:.8}.qkb-msg-bubble{padding-bottom:1rem}.qkb-msg-bubble.qkb-msg-bubble--bot .qkb-msg-bubble-component{margin-right:2.5rem;margin-left:.5rem}.qkb-msg-bubble.qkb-msg-bubble--user{justify-content:flex-end}.qkb-msg-bubble.qkb-msg-bubble--user .qkb-msg-bubble-component{margin-left:5rem}.qkb-msg-bubble-component__text{position:relative;padding:.75rem 1rem;border-radius:6px}.qkb-msg-bubble-component__options-wrapper{display:flex;flex-wrap:wrap}.qkb-mb-button-options__item{flex:0 0 auto}.qkb-mb-button-options__btn{display:block;overflow:hidden;position:relative;margin:.5rem .375rem 0 0;padding:.25rem 1rem;cursor:pointer;outline:0;border:1px solid transparent;border-radius:13px;color:inherit;font-size:.875rem;font-family:inherit;text-decoration:none;background-color:transparent;transition:background-color .15s linear,color .1s linear}.qkb-mb-button-options__btn span{position:relative;z-index:10}.qkb-msg-bubble__typing-indicator{position:relative;min-width:29px;opacity:.3}.qkb-msg-bubble__typing-indicator span{display:block;width:7px;height:7px;margin:0 auto;border-radius:50%}.qkb-msg-bubble__typing-indicator:after,.qkb-msg-bubble__typing-indicator:before{content:\"\";display:block;position:absolute;top:0;width:7px;height:7px;border-radius:50%}.qkb-msg-bubble__typing-indicator:before{left:0}.qkb-msg-bubble__typing-indicator:after{right:0}.qkb-board-action{position:relative;display:flex;flex:none;height:46px;padding:.45rem 1.25rem .5rem;border-top:1px solid #e6e6e6}.qkb-board-action--disabled:before{content:\"\";display:block;position:absolute;z-index:10;top:0;left:0;width:100%;height:100%;opacity:.2;cursor:not-allowed}.qkb-board-action__wrapper{display:flex;width:100%;background-color:#fff}.qkb-board-action__msg-box{position:relative;flex-grow:1;padding:0 1rem 0 0}.qkb-board-action__input{height:100%;width:100%;padding:0;font-size:.875rem;border:0;background-color:transparent;box-shadow:none;outline:0}.qkb-board-action__input[disabled=disabled]{pointer-events:none}.qkb-board-action__disable-text{display:flex;align-items:center;position:absolute;top:0;left:0;height:100%;width:100%;background-color:#fff;font-size:.875rem}.qkb-board-action__extra{display:flex;flex:none;justify-content:center}.qkb-action-item{display:block;padding:0;outline:0;border:0;line-height:1;box-shadow:none;background-color:transparent;cursor:pointer;opacity:.6;transition:opacity .1s linear}.qkb-action-item:hover{opacity:1}.qkb-action-icon{width:16px;height:16px;line-height:1;fill:#666;color:#666;vertical-align:middle;margin:5px}.qkb-board-aciton--typing .qkb-action-item--send{opacity:1}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "62e4":
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "98b8":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;

      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
( false ? undefined : _typeof(module)) === "object" ? module.exports : {});

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("62e4")(module)))

/***/ }),

/***/ "a34a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("98b8");

/***/ }),

/***/ "b4c3":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("59d2");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("7d102d35", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "de67":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_app_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b4c3");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_app_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_app_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_app_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "VueBotUI", function() { return /* reexport */ BotUI; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5daad578-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BotUI.vue?vue&type=template&id=28c2f457&lang=pug&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"qkb-bot-ui",class:_vm.uiClasses},[_c('transition',{attrs:{"name":"qkb-fadeUp"}},[(_vm.botActive)?_c('div',{staticClass:"qkb-board"},[_c('BoardHeader',{attrs:{"bot-title":_vm.optionsMain.botTitle},on:{"close-bot":_vm.botToggle},scopedSlots:_vm._u([{key:"header",fn:function(){return [_vm._t("header")]},proxy:true}],null,true)}),_c('BoardContent',{attrs:{"bot-typing":_vm.botTyping,"main-data":_vm.messages},scopedSlots:_vm._u([{key:"botTyping",fn:function(){return [_vm._t("botTyping")]},proxy:true}],null,true)}),_c('BoardAction',{ref:"boardAction",attrs:{"input-disable":_vm.inputDisable,"input-placeholder":_vm.optionsMain.inputPlaceholder,"input-disable-placeholder":_vm.optionsMain.inputDisablePlaceholder,"show-mic-button":_vm.optionsMain.showMicButton},on:{"msg-send":_vm.sendMessage,"mic-state":_vm.handleMicState},scopedSlots:_vm._u([{key:"actions",fn:function(){return [_vm._t("actions")]},proxy:true},{key:"sendButton",fn:function(){return [_vm._t("sendButton")]},proxy:true}],null,true)})],1):_vm._e()]),_c('div',{staticClass:"qkb-bot-bubble"},[_c('button',{staticClass:"qkb-bubble-btn",on:{"click":_vm.botToggle}},[_vm._t("bubbleButton",[_c('transition',{attrs:{"name":"qkb-scaleUp"}},[(!_vm.botActive)?_c('BubbleIcon',{key:"1",staticClass:"qkb-bubble-btn-icon"}):_c('CloseIcon',{key:"2",staticClass:"qkb-bubble-btn-icon qkb-bubble-btn-icon--close"})],1)])],2)]),_c('AppStyle',{attrs:{"options":_vm.optionsMain}}),_c('div',{staticClass:"qkb-preload-image"},[(_vm.optionsMain.botAvatarImg)?_c('div',{staticClass:"qkb-msg-avatar__img"}):_vm._e()])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/BotUI.vue?vue&type=template&id=28c2f457&lang=pug&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("a34a");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./src/helpers/event-bus.js

var EventBus = new external_commonjs_vue_commonjs2_vue_root_Vue_default.a();
/* harmony default export */ var event_bus = (EventBus);
// CONCATENATED MODULE: ./src/config/index.js
/* harmony default export */ var config = ({
  EVENT_OPEN: 'botui-open',
  EVENT_CLOSE: 'botui-close',
  EVENT_TOGGLE: 'botui-toggle'
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5daad578-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Board/Header.vue?vue&type=template&id=56e5bfa6&lang=pug&
var Headervue_type_template_id_56e5bfa6_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"qkb-board-header"},[_vm._t("header",[_c('div',{staticClass:"qkb-board-header__title"},[_vm._v(_vm._s(_vm.botTitle))])])],2)}
var Headervue_type_template_id_56e5bfa6_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Board/Header.vue?vue&type=template&id=56e5bfa6&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Board/Header.vue?vue&type=script&lang=js&
//
//
//
//
//
/* harmony default export */ var Headervue_type_script_lang_js_ = ({
  props: {
    botTitle: {
      type: String,
      "default": 'Chatbot'
    }
  }
});
// CONCATENATED MODULE: ./src/components/Board/Header.vue?vue&type=script&lang=js&
 /* harmony default export */ var Board_Headervue_type_script_lang_js_ = (Headervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/Board/Header.vue





/* normalize component */

var component = normalizeComponent(
  Board_Headervue_type_script_lang_js_,
  Headervue_type_template_id_56e5bfa6_lang_pug_render,
  Headervue_type_template_id_56e5bfa6_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Header = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5daad578-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Board/Content.vue?vue&type=template&id=bab1961c&lang=pug&
var Contentvue_type_template_id_bab1961c_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"boardContent",staticClass:"qkb-board-content"},[_c('div',{ref:"boardBubbles",staticClass:"qkb-board-content__bubbles"},[_vm._l((_vm.mainData),function(item,index){return _c('message-bubble',{key:index,attrs:{"message":item}})}),(_vm.botTyping)?_c('div',{staticClass:"qkb-board-content__bot-typing"},[_vm._t("botTyping",[_c('message-typing')])],2):_vm._e()],2)])}
var Contentvue_type_template_id_bab1961c_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Board/Content.vue?vue&type=template&id=bab1961c&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5daad578-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MessageBubble/Main.vue?vue&type=template&id=7e8c20e8&lang=pug&
var Mainvue_type_template_id_7e8c20e8_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"qkb-msg-bubble",class:_vm.bubbleClass},[(_vm.message.agent === 'bot')?_c('div',{staticClass:"qkb-msg-avatar"},[_c('div',{staticClass:"qkb-msg-avatar__img"})]):_vm._e(),(_vm.componentType)?_c(_vm.componentType,{tag:"component",attrs:{"main-data":_vm.message}}):_vm._e(),(_vm.message.createdAt)?_c('div',{staticClass:"qkb-msg-bubble__time"},[_vm._v(_vm._s(_vm.message.createdAt))]):_vm._e()],1)}
var Mainvue_type_template_id_7e8c20e8_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/MessageBubble/Main.vue?vue&type=template&id=7e8c20e8&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5daad578-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MessageBubble/SingleText.vue?vue&type=template&id=21d4313e&lang=pug&
var SingleTextvue_type_template_id_21d4313e_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"qkb-msg-bubble-component qkb-msg-bubble-component--single-text"},[_c('div',{staticClass:"qkb-msg-bubble-component__text"},[_vm._v(_vm._s(_vm.mainData.text)),(_vm.mainData.agent === 'bot')?_c('button',{staticClass:"qkb-msg-bubble-play-btn",staticStyle:{"margin-left":"8px","background":"none","border":"none","cursor":"pointer"},attrs:{"disabled":_vm.isPlaying},on:{"click":_vm.playAudio}},[(!_vm.isPlaying)?_c('span',[_vm._v("▶️")]):_c('span',[_vm._v("⏸️")])]):_vm._e()])])}
var SingleTextvue_type_template_id_21d4313e_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/MessageBubble/SingleText.vue?vue&type=template&id=21d4313e&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MessageBubble/SingleText.vue?vue&type=script&lang=js&


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
/* harmony default export */ var SingleTextvue_type_script_lang_js_ = ({
  props: {
    mainData: {
      type: Object
    }
  },
  data: function data() {
    return {
      isPlaying: false,
      audio: null
    };
  },
  methods: {
    playAudio: function playAudio() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
        var cacheKey, blob, response, url;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cacheKey = _this.mainData.text;
                if (!window._audioCache) window._audioCache = {};

                if (!_this.isPlaying) {
                  _context.next = 6;
                  break;
                }

                if (_this.audio) _this.audio.pause();
                _this.isPlaying = false;
                return _context.abrupt("return");

              case 6:
                _this.isPlaying = true;
                _context.prev = 7;

                if (!window._audioCache[cacheKey]) {
                  _context.next = 12;
                  break;
                }

                blob = window._audioCache[cacheKey];
                _context.next = 21;
                break;

              case 12:
                _context.next = 14;
                return fetch('https://api-aitext2speech.hayokmedicare.ng/api/text-to-speech/', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    text: _this.mainData.text
                  })
                });

              case 14:
                response = _context.sent;

                if (response.ok) {
                  _context.next = 17;
                  break;
                }

                throw new Error('TTS failed');

              case 17:
                _context.next = 19;
                return response.blob();

              case 19:
                blob = _context.sent;
                window._audioCache[cacheKey] = blob;

              case 21:
                url = URL.createObjectURL(blob);
                _this.audio = new Audio(url);

                _this.audio.onended = function () {
                  _this.isPlaying = false;
                  URL.revokeObjectURL(url);
                };

                _this.audio.onerror = function () {
                  _this.isPlaying = false;
                  URL.revokeObjectURL(url);
                };

                _this.audio.play();

                _context.next = 32;
                break;

              case 28:
                _context.prev = 28;
                _context.t0 = _context["catch"](7);
                _this.isPlaying = false;
                console.error('Text-to-speech failed', _context.t0);

              case 32:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[7, 28]]);
      }))();
    }
  }
});
// CONCATENATED MODULE: ./src/components/MessageBubble/SingleText.vue?vue&type=script&lang=js&
 /* harmony default export */ var MessageBubble_SingleTextvue_type_script_lang_js_ = (SingleTextvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/MessageBubble/SingleText.vue





/* normalize component */

var SingleText_component = normalizeComponent(
  MessageBubble_SingleTextvue_type_script_lang_js_,
  SingleTextvue_type_template_id_21d4313e_lang_pug_render,
  SingleTextvue_type_template_id_21d4313e_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SingleText = (SingleText_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5daad578-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MessageBubble/ButtonOptions.vue?vue&type=template&id=12602090&lang=pug&
var ButtonOptionsvue_type_template_id_12602090_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"qkb-msg-bubble-component qkb-msg-bubble-component--button-options"},[_c('div',{staticClass:"qkb-msg-bubble-component__text"},[_vm._v(_vm._s(_vm.mainData.text)),_c('button',{staticClass:"qkb-msg-bubble-play-btn",staticStyle:{"margin-left":"8px","background":"none","border":"none","cursor":"pointer"},attrs:{"disabled":_vm.isPlayingMain},on:{"click":_vm.playAllText}},[(!_vm.isPlayingMain)?_c('span',[_vm._v("▶️")]):_c('span',[_vm._v("⏸️")])])]),_c('div',{staticClass:"qkb-msg-bubble-component__options-wrapper"},_vm._l((_vm.mainData.options),function(item,index){return _c('div',{key:index,staticClass:"qkb-mb-button-options__item",class:{ active: _vm.selectedItem === item.value }},[(item.action === 'postback')?_c('button',{staticClass:"qkb-mb-button-options__btn",on:{"click":function($event){return _vm.selectOption(item)}}},[_c('span',[_vm._v(_vm._s(item.text))])]):_c('a',{staticClass:"qkb-mb-button-options__btn qkb-mb-button-options__url",attrs:{"target":"_blank","href":item.value}},[_c('span',[_vm._v(_vm._s(item.text))])])])}),0)])}
var ButtonOptionsvue_type_template_id_12602090_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/MessageBubble/ButtonOptions.vue?vue&type=template&id=12602090&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MessageBubble/ButtonOptions.vue?vue&type=script&lang=js&


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ButtonOptionsvue_type_script_lang_js_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function ButtonOptionsvue_type_script_lang_js_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { ButtonOptionsvue_type_script_lang_js_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { ButtonOptionsvue_type_script_lang_js_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ButtonOptionsvue_type_script_lang_js_ = ({
  props: {
    mainData: {
      type: Object
    }
  },
  data: function data() {
    return {
      selectedItem: null,
      isPlayingMain: false,
      isPlayingOption: null,
      audio: null
    };
  },
  methods: {
    selectOption: function selectOption(value) {
      this.selectedItem = value;
      event_bus.$emit('select-button-option', value);
    },
    playAllText: function playAllText() {
      var _this = this;

      return ButtonOptionsvue_type_script_lang_js_asyncToGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
        var texts, _loop, i, _ret;

        return regenerator_default.a.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!_this.isPlayingMain) {
                  _context2.next = 4;
                  break;
                }

                if (_this.audio) _this.audio.pause();
                _this.isPlayingMain = false;
                return _context2.abrupt("return");

              case 4:
                _this.isPlayingMain = true; // Gather all texts: main + options

                texts = [_this.mainData.text].concat(_toConsumableArray(_this.mainData.options ? _this.mainData.options.map(function (opt) {
                  return opt.text;
                }) : []));
                _context2.prev = 6;
                _loop = /*#__PURE__*/regenerator_default.a.mark(function _loop(i) {
                  var text, cacheKey, blob, response, url;
                  return regenerator_default.a.wrap(function _loop$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          text = texts[i];
                          cacheKey = text;
                          if (!window._audioCache) window._audioCache = {};
                          blob = void 0;

                          if (!window._audioCache[cacheKey]) {
                            _context.next = 8;
                            break;
                          }

                          blob = window._audioCache[cacheKey];
                          _context.next = 17;
                          break;

                        case 8:
                          _context.next = 10;
                          return fetch('https://api-aitext2speech.hayokmedicare.ng/api/text-to-speech/', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                              text: text
                            })
                          });

                        case 10:
                          response = _context.sent;

                          if (response.ok) {
                            _context.next = 13;
                            break;
                          }

                          throw new Error('TTS failed');

                        case 13:
                          _context.next = 15;
                          return response.blob();

                        case 15:
                          blob = _context.sent;
                          window._audioCache[cacheKey] = blob;

                        case 17:
                          url = URL.createObjectURL(blob);
                          _this.audio = new Audio(url);
                          _context.next = 21;
                          return new Promise(function (resolve) {
                            _this.audio.onended = function () {
                              URL.revokeObjectURL(url);
                              resolve();
                            };

                            _this.audio.onerror = function () {
                              URL.revokeObjectURL(url);
                              resolve();
                            };

                            _this.audio.play();
                          });

                        case 21:
                          if (_this.isPlayingMain) {
                            _context.next = 23;
                            break;
                          }

                          return _context.abrupt("return", "break");

                        case 23:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _loop);
                });
                i = 0;

              case 9:
                if (!(i < texts.length)) {
                  _context2.next = 17;
                  break;
                }

                return _context2.delegateYield(_loop(i), "t0", 11);

              case 11:
                _ret = _context2.t0;

                if (!(_ret === "break")) {
                  _context2.next = 14;
                  break;
                }

                return _context2.abrupt("break", 17);

              case 14:
                i++;
                _context2.next = 9;
                break;

              case 17:
                _context2.next = 22;
                break;

              case 19:
                _context2.prev = 19;
                _context2.t1 = _context2["catch"](6);
                // Optionally alert or log
                console.error('Text-to-speech failed', _context2.t1);

              case 22:
                _this.isPlayingMain = false;

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, null, [[6, 19]]);
      }))();
    }
  }
});
// CONCATENATED MODULE: ./src/components/MessageBubble/ButtonOptions.vue?vue&type=script&lang=js&
 /* harmony default export */ var MessageBubble_ButtonOptionsvue_type_script_lang_js_ = (ButtonOptionsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/MessageBubble/ButtonOptions.vue





/* normalize component */

var ButtonOptions_component = normalizeComponent(
  MessageBubble_ButtonOptionsvue_type_script_lang_js_,
  ButtonOptionsvue_type_template_id_12602090_lang_pug_render,
  ButtonOptionsvue_type_template_id_12602090_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ButtonOptions = (ButtonOptions_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MessageBubble/Main.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var Mainvue_type_script_lang_js_ = ({
  components: {
    SingleText: SingleText,
    ButtonOptions: ButtonOptions
  },
  props: {
    message: {
      type: Object
    }
  },
  computed: {
    bubbleClass: function bubbleClass() {
      return this.message.agent === 'bot' ? 'qkb-msg-bubble--bot' : 'qkb-msg-bubble--user';
    },
    // Define the message type and return the specific component
    componentType: function componentType() {
      var type = '';

      switch (this.message.type) {
        case 'button':
          type = 'ButtonOptions';
          break;

        default:
          type = 'SingleText';
      }

      return type;
    }
  }
});
// CONCATENATED MODULE: ./src/components/MessageBubble/Main.vue?vue&type=script&lang=js&
 /* harmony default export */ var MessageBubble_Mainvue_type_script_lang_js_ = (Mainvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/MessageBubble/Main.vue





/* normalize component */

var Main_component = normalizeComponent(
  MessageBubble_Mainvue_type_script_lang_js_,
  Mainvue_type_template_id_7e8c20e8_lang_pug_render,
  Mainvue_type_template_id_7e8c20e8_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Main = (Main_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5daad578-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MessageBubble/Typing.vue?vue&type=template&id=fee1d9ae&lang=pug&
var Typingvue_type_template_id_fee1d9ae_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
var Typingvue_type_template_id_fee1d9ae_lang_pug_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"qkb-msg-bubble qkb-msg-bubble--bot"},[_c('div',{staticClass:"qkb-msg-avatar"},[_c('div',{staticClass:"qkb-msg-avatar__img"})]),_c('div',{staticClass:"qkb-msg-bubble-component qkb-msg-bubble-component--typing"},[_c('div',{staticClass:"qkb-msg-bubble-component__text"},[_c('div',{staticClass:"qkb-msg-bubble__typing-indicator"},[_c('span')])])])])}]


// CONCATENATED MODULE: ./src/components/MessageBubble/Typing.vue?vue&type=template&id=fee1d9ae&lang=pug&

// CONCATENATED MODULE: ./src/components/MessageBubble/Typing.vue

var script = {}


/* normalize component */

var Typing_component = normalizeComponent(
  script,
  Typingvue_type_template_id_fee1d9ae_lang_pug_render,
  Typingvue_type_template_id_fee1d9ae_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Typing = (Typing_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Board/Content.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var Contentvue_type_script_lang_js_ = ({
  components: {
    MessageBubble: Main,
    MessageTyping: Typing
  },
  props: {
    mainData: {
      type: Array,
      required: true
    },
    botTyping: {
      type: Boolean,
      "default": false
    }
  },
  watch: {
    mainData: function mainData(newVal) {
      var _this = this;

      this.$nextTick(function () {
        _this.updateScroll();
      });
    }
  },
  methods: {
    updateScroll: function updateScroll() {
      var contentElm = this.$refs.boardContent;
      var offsetHeight = this.$refs.boardBubbles.offsetHeight;
      contentElm.scrollTop = offsetHeight;
    }
  }
});
// CONCATENATED MODULE: ./src/components/Board/Content.vue?vue&type=script&lang=js&
 /* harmony default export */ var Board_Contentvue_type_script_lang_js_ = (Contentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Board/Content.vue





/* normalize component */

var Content_component = normalizeComponent(
  Board_Contentvue_type_script_lang_js_,
  Contentvue_type_template_id_bab1961c_lang_pug_render,
  Contentvue_type_template_id_bab1961c_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Content = (Content_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5daad578-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Board/Action.vue?vue&type=template&id=f5809706&lang=pug&
var Actionvue_type_template_id_f5809706_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"qkb-board-action",class:_vm.actionClass},[_c('div',{staticClass:"qkb-board-action__wrapper"},[_c('div',{staticClass:"qkb-board-action__msg-box"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.messageText),expression:"messageText"}],ref:"qkbMessageInput",staticClass:"qkb-board-action__input",attrs:{"type":"text","disabled":_vm.inputDisable,"placeholder":_vm.inputPlaceholder},domProps:{"value":(_vm.messageText)},on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.sendMessage($event)},"input":function($event){if($event.target.composing){ return; }_vm.messageText=$event.target.value}}}),(_vm.inputDisablePlaceholder && _vm.inputDisable)?_c('div',{staticClass:"qkb-board-action__disable-text"},[_c('span',[_vm._v(_vm._s(_vm.inputDisablePlaceholder))])]):_vm._e()]),_c('div',{staticClass:"qkb-board-action__extra"},[_vm._t("actions"),(_vm.showMicButton)?_c('button',{staticClass:"qkb-action-item qkb-action-item--mic",attrs:{"disabled":_vm.inputDisable},on:{"click":_vm.toggleRecording}},[(!_vm.isRecording)?_c('MicOff',{staticClass:"qkb-action-icon qkb-action-icon--mic"}):_c('MicOn',{staticClass:"qkb-action-icon qkb-action-icon--mic"})],1):_vm._e(),_c('button',{staticClass:"qkb-action-item qkb-action-item--send",on:{"click":_vm.sendMessage}},[_vm._t("sendButton",[_c('IconSend',{staticClass:"qkb-action-icon qkb-action-icon--send"})])],2)],2)])])}
var Actionvue_type_template_id_f5809706_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Board/Action.vue?vue&type=template&id=f5809706&lang=pug&

// CONCATENATED MODULE: ./src/assets/icons/send.svg
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* harmony default export */ var send = ({
  functional: true,
  render: function render(_h, _vm) {
    var _c = _vm._c,
        _v = _vm._v,
        data = _vm.data,
        _vm$children = _vm.children,
        children = _vm$children === void 0 ? [] : _vm$children;

    var classNames = data["class"],
        staticClass = data.staticClass,
        style = data.style,
        staticStyle = data.staticStyle,
        _data$attrs = data.attrs,
        attrs = _data$attrs === void 0 ? {} : _data$attrs,
        rest = _objectWithoutProperties(data, ["class", "staticClass", "style", "staticStyle", "attrs"]);

    return _c('svg', _objectSpread({
      "class": [classNames, staticClass],
      style: [style, staticStyle],
      attrs: Object.assign({
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 488.721 488.721"
      }, attrs)
    }, rest), children.concat([_c('path', {
      attrs: {
        "d": "M483.589 222.024a51.197 51.197 0 00-23.762-23.762L73.522 11.331C48.074-.998 17.451 9.638 5.122 35.086A51.2 51.2 0 003.669 76.44l67.174 167.902L3.669 412.261c-10.463 26.341 2.409 56.177 28.75 66.639a51.314 51.314 0 0018.712 3.624c7.754 0 15.408-1.75 22.391-5.12l386.304-186.982c25.45-12.326 36.089-42.949 23.763-68.398zM58.657 446.633c-8.484 4.107-18.691.559-22.798-7.925a17.065 17.065 0 01-.481-13.784l65.399-163.516h340.668L58.657 446.633zm42.121-219.358L35.379 63.759a16.64 16.64 0 014.215-18.773 16.537 16.537 0 0119.063-2.884l382.788 185.173H100.778z"
      }
    })]));
  }
});
// CONCATENATED MODULE: ./src/assets/icons/mic-on.svg
function mic_on_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function mic_on_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { mic_on_ownKeys(Object(source), true).forEach(function (key) { mic_on_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { mic_on_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function mic_on_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function mic_on_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = mic_on_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function mic_on_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* harmony default export */ var mic_on = ({
  functional: true,
  render: function render(_h, _vm) {
    var _c = _vm._c,
        _v = _vm._v,
        data = _vm.data,
        _vm$children = _vm.children,
        children = _vm$children === void 0 ? [] : _vm$children;

    var classNames = data["class"],
        staticClass = data.staticClass,
        style = data.style,
        staticStyle = data.staticStyle,
        _data$attrs = data.attrs,
        attrs = _data$attrs === void 0 ? {} : _data$attrs,
        rest = mic_on_objectWithoutProperties(data, ["class", "staticClass", "style", "staticStyle", "attrs"]);

    return _c('svg', mic_on_objectSpread({
      "class": [classNames, staticClass],
      style: [style, staticStyle],
      attrs: Object.assign({
        "width": "32",
        "height": "32",
        "viewBox": "0 0 16 16",
        "fill": "none",
        "xmlns": "http://www.w3.org/2000/svg"
      }, attrs)
    }, rest), children.concat([_c('circle', {
      attrs: {
        "cx": "8",
        "cy": "5",
        "r": "6",
        "fill": "#007bff",
        "fill-opacity": ".45"
      }
    }, [_c('animate', {
      attrs: {
        "attributeName": "r",
        "values": "6;11;6",
        "dur": "0.8s",
        "repeatCount": "indefinite"
      }
    }), _c('animate', {
      attrs: {
        "attributeName": "opacity",
        "values": "0.45;0.10;0.45",
        "dur": "0.8s",
        "repeatCount": "indefinite"
      }
    })]), _c('path', {
      attrs: {
        "d": "M5 3a3 3 0 016 0v4a3 3 0 01-6 0V3z",
        "fill": "#007bff"
      }
    }), _c('path', {
      attrs: {
        "d": "M9 13.93V16H7v-2.07A7.001 7.001 0 011 7V6h2v1a5 5 0 0010 0V6h2v1a7.001 7.001 0 01-6 6.93z",
        "fill": "#0056b3"
      }
    })]));
  }
});
// CONCATENATED MODULE: ./src/assets/icons/mic-off.svg
function mic_off_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function mic_off_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { mic_off_ownKeys(Object(source), true).forEach(function (key) { mic_off_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { mic_off_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function mic_off_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function mic_off_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = mic_off_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function mic_off_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* harmony default export */ var mic_off = ({
  functional: true,
  render: function render(_h, _vm) {
    var _c = _vm._c,
        _v = _vm._v,
        data = _vm.data,
        _vm$children = _vm.children,
        children = _vm$children === void 0 ? [] : _vm$children;

    var classNames = data["class"],
        staticClass = data.staticClass,
        style = data.style,
        staticStyle = data.staticStyle,
        _data$attrs = data.attrs,
        attrs = _data$attrs === void 0 ? {} : _data$attrs,
        rest = mic_off_objectWithoutProperties(data, ["class", "staticClass", "style", "staticStyle", "attrs"]);

    return _c('svg', mic_off_objectSpread({
      "class": [classNames, staticClass],
      style: [style, staticStyle],
      attrs: Object.assign({
        "width": "800",
        "height": "800",
        "viewBox": "0 0 16 16",
        "fill": "none",
        "xmlns": "http://www.w3.org/2000/svg"
      }, attrs)
    }, rest), children.concat([_c('path', {
      attrs: {
        "d": "M16 16h-3l-2.125-2.616A6.947 6.947 0 019 13.93V16H7v-2.07A7.001 7.001 0 011 7V6h2v1a5 5 0 006.55 4.755L8.124 9.998 8 10a3 3 0 01-3-3v-.846L0 0h3l13 16zM11 6.154L6.384.472A3 3 0 0111 3v3.154zM12.808 8.379l1.443 1.776C14.73 9.207 15 8.135 15 7V6h-2v1c0 .478-.067.94-.192 1.379z",
        "fill": "#000"
      }
    })]));
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Board/Action.vue?vue&type=script&lang=js&


function Actionvue_type_script_lang_js_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function Actionvue_type_script_lang_js_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { Actionvue_type_script_lang_js_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { Actionvue_type_script_lang_js_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var Actionvue_type_script_lang_js_ = ({
  components: {
    IconSend: send,
    MicOn: mic_on,
    MicOff: mic_off
  },
  props: {
    inputPlaceholder: {
      type: String
    },
    inputDisablePlaceholder: {
      type: String
    },
    inputDisable: {
      type: Boolean,
      "default": false
    },
    showMicButton: {
      type: Boolean,
      "default": true
    }
  },
  data: function data() {
    return {
      messageText: null,
      isRecording: false,
      mediaRecorder: null,
      audioChunks: [],
      stream: null,
      recognition: null
    };
  },
  computed: {
    actionClass: function actionClass() {
      var actionClasses = [];

      if (this.inputDisable) {
        actionClasses.push('qkb-board-action--disabled');
      }

      if (this.messageText) {
        actionClasses.push('qkb-board-aciton--typing');
      } // TODO: sending


      return actionClasses;
    }
  },
  mounted: function mounted() {
    this.$refs.qkbMessageInput.focus();
  },
  methods: {
    sendMessage: function sendMessage() {
      if (this.messageText) {
        this.$emit('msg-send', {
          text: this.messageText
        });
        this.messageText = null;
      }
    },
    toggleRecording: function toggleRecording() {
      var _this = this;

      return Actionvue_type_script_lang_js_asyncToGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this.isRecording) {
                  _this.stopRecording();

                  _this.$emit('mic-state', false);
                } else {
                  _this.startRecording();

                  _this.$emit('mic-state', true);
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    startRecording: function startRecording() {
      var _this2 = this;

      return Actionvue_type_script_lang_js_asyncToGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
        var SpeechRecognition;
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // Try to use SpeechRecognition for silence detection
                SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

                if (!SpeechRecognition) {
                  _context2.next = 12;
                  break;
                }

                _this2.recognition = new SpeechRecognition();
                _this2.recognition.continuous = true;
                _this2.recognition.interimResults = false;
                _this2.recognition.lang = 'en-US';

                _this2.recognition.onresult = function (event) {
                  for (var i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                      var text = event.results[i][0].transcript.trim();

                      if (text) {
                        _this2.messageText = text;

                        _this2.sendMessage();
                      }
                    }
                  }
                };

                _this2.recognition.onerror = function (e) {
                  console.error('SpeechRecognition error', e);
                };

                _this2.recognition.onend = function () {
                  if (_this2.isRecording) {
                    try {
                      _this2.recognition.start();
                    } catch (e) {
                      if (e.name !== 'InvalidStateError') {
                        console.error('SpeechRecognition restart error occurred', e);
                      }
                    }
                  }
                };

                _this2.isRecording = true;

                _this2.recognition.start();

                return _context2.abrupt("return");

              case 12:
                if (!(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)) {
                  _context2.next = 15;
                  break;
                }

                console.error('Microphone not supported');
                return _context2.abrupt("return");

              case 15:
                _context2.prev = 15;
                _context2.next = 18;
                return navigator.mediaDevices.getUserMedia({
                  audio: true
                });

              case 18:
                _this2.stream = _context2.sent;
                _this2.isRecording = true;

                _this2.listenLoop();

                _context2.next = 26;
                break;

              case 23:
                _context2.prev = 23;
                _context2.t0 = _context2["catch"](15);
                console.error('Could not access microphone', _context2.t0);

              case 26:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[15, 23]]);
      }))();
    },
    stopRecording: function stopRecording() {
      this.isRecording = false;
      this.$emit('mic-state', false);

      if (this.recognition) {
        this.recognition.onresult = null;
        this.recognition.onerror = null;
        this.recognition.onend = null;

        try {
          this.recognition.stop();
        } catch (e) {
          console.error('SpeechRecognition stop error occurred', e);
        }

        this.recognition = null;
      }

      if (this.mediaRecorder) {
        this.mediaRecorder.onstop = null;
        this.mediaRecorder.ondataavailable = null;

        try {
          if (this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
          }
        } catch (e) {
          console.error('MediaRecorder stop error occurred', e);
        }

        this.mediaRecorder = null;
      }

      if (this.stream) {
        try {
          this.stream.getTracks().forEach(function (track) {
            return track.stop();
          });
        } catch (e) {
          console.error('Stream stop error occurred', e);
        }

        this.stream = null;
      }
    },
    listenLoop: function listenLoop() {
      var _this3 = this;

      return Actionvue_type_script_lang_js_asyncToGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee4() {
        return regenerator_default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(!_this3.isRecording || !_this3.stream)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                _this3.audioChunks = [];
                _this3.mediaRecorder = new window.MediaRecorder(_this3.stream);

                _this3.mediaRecorder.ondataavailable = function (e) {
                  if (e.data.size > 0) _this3.audioChunks.push(e.data);
                };

                _this3.mediaRecorder.onstop = /*#__PURE__*/Actionvue_type_script_lang_js_asyncToGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee3() {
                  var audioBlob, formData, response, data;
                  return regenerator_default.a.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          if (_this3.isRecording) {
                            _context3.next = 2;
                            break;
                          }

                          return _context3.abrupt("return");

                        case 2:
                          audioBlob = new Blob(_this3.audioChunks, {
                            type: 'audio/webm'
                          }); // Only send if the recording is at least 0.1 seconds and not more than 600KB

                          if (!(audioBlob.size < 1000 || audioBlob.size > 600 * 1024)) {
                            _context3.next = 6;
                            break;
                          }

                          // Too short or too large, skip sending
                          if (_this3.isRecording) {
                            setTimeout(function () {
                              return _this3.listenLoop();
                            }, 200);
                          }

                          return _context3.abrupt("return");

                        case 6:
                          formData = new FormData();
                          formData.append('audio', audioBlob, 'recording.webm');
                          _context3.prev = 8;
                          _context3.next = 11;
                          return fetch('https://api-aitext2speech.hayokmedicare.ng/api/speech-to-text/', {
                            method: 'POST',
                            body: formData
                          });

                        case 11:
                          response = _context3.sent;
                          _context3.next = 14;
                          return response.json();

                        case 14:
                          data = _context3.sent;

                          if (data && data.text) {
                            _this3.messageText = data.text;

                            _this3.sendMessage();
                          }

                          _context3.next = 21;
                          break;

                        case 18:
                          _context3.prev = 18;
                          _context3.t0 = _context3["catch"](8);
                          console.error('Speech-to-text error occurred', _context3.t0);

                        case 21:
                          if (_this3.isRecording) {
                            setTimeout(function () {
                              return _this3.listenLoop();
                            }, 200);
                          }

                        case 22:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3, null, [[8, 18]]);
                }));

                _this3.mediaRecorder.onerror = function (e) {
                  console.error('MediaRecorder error occurred', e);
                };

                _this3.mediaRecorder.start();

                setTimeout(function () {
                  if (_this3.mediaRecorder && _this3.mediaRecorder.state === 'recording') {
                    _this3.mediaRecorder.stop();
                  }
                }, 4000); // 4 seconds per chunk

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    }
  },
  watch: {
    inputDisable: function inputDisable(newVal) {
      if (newVal && this.isRecording) {
        this.stopRecording();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/Board/Action.vue?vue&type=script&lang=js&
 /* harmony default export */ var Board_Actionvue_type_script_lang_js_ = (Actionvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Board/Action.vue





/* normalize component */

var Action_component = normalizeComponent(
  Board_Actionvue_type_script_lang_js_,
  Actionvue_type_template_id_f5809706_lang_pug_render,
  Actionvue_type_template_id_f5809706_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Action = (Action_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5daad578-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/AppStyle.vue?vue&type=template&id=5e1e9a7a&lang=pug&
var AppStylevue_type_template_id_5e1e9a7a_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"qkb-bot-style",staticStyle:{"display":"none"},domProps:{"innerHTML":_vm._s(_vm.style)}})}
var AppStylevue_type_template_id_5e1e9a7a_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/AppStyle.vue?vue&type=template&id=5e1e9a7a&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/AppStyle.vue?vue&type=script&lang=js&
//
//
//
/* harmony default export */ var AppStylevue_type_script_lang_js_ = ({
  props: ['options'],
  computed: {
    style: function style() {
      if (!this.options) {
        return '';
      }

      var _this$options = this.options,
          colorScheme = _this$options.colorScheme,
          textColor = _this$options.textColor,
          boardContentBg = _this$options.boardContentBg,
          bubbleBtnSize = _this$options.bubbleBtnSize,
          botAvatarImg = _this$options.botAvatarImg,
          botAvatarSize = _this$options.botAvatarSize,
          inputDisableBg = _this$options.inputDisableBg,
          msgBubbleBgBot = _this$options.msgBubbleBgBot,
          msgBubbleColorBot = _this$options.msgBubbleColorBot,
          msgBubbleBgUser = _this$options.msgBubbleBgUser,
          msgBubbleColorUser = _this$options.msgBubbleColorUser;
      var styles = "\n<style type=\"text/css\" id=\"qkb-bot-style\">\n.qkb-bubble-btn {\n  background-color: ".concat(colorScheme, ";\n  width: ").concat(bubbleBtnSize, "px;\n  height: ").concat(bubbleBtnSize, "px;\n}\n.qkb-bubble-btn-icon {\n  fill: ").concat(textColor, ";\n  color: ").concat(textColor, ";\n}\n.qkb-board {\n  bottom: ").concat(bubbleBtnSize, "px;\n}\n.qkb-board-header {\n  background-color: ").concat(colorScheme, ";\n}\n.qkb-board-header__title {\n  color: ").concat(textColor, ";\n}\n.qkb-board-content {\n  background-color: ").concat(boardContentBg, ";\n}\n").concat(botAvatarImg ? ".qkb-msg-avatar {\n      width: ".concat(botAvatarSize, "px;\n      height: ").concat(botAvatarSize, "px;\n    }\n    .qkb-msg-avatar__img {\n      background-image: url(").concat(botAvatarImg, ");\n    }") : '', "\n.qkb-msg-bubble--bot .qkb-msg-bubble-component__text {\n  color: ").concat(msgBubbleColorBot, ";\n  background-color: ").concat(msgBubbleBgBot, ";\n}\n.qkb-msg-bubble__typing-indicator span,\n.qkb-msg-bubble__typing-indicator::before,\n.qkb-msg-bubble__typing-indicator::after {\n  background-color: ").concat(msgBubbleColorBot, ";\n}\n.qkb-mb-button-options__btn::before {\n  background-color: ").concat(msgBubbleBgUser, ";\n}\n.qkb-msg-bubble--user .qkb-msg-bubble-component__text {\n  color: ").concat(msgBubbleColorUser, ";\n  background-color: ").concat(msgBubbleBgUser, ";\n}\n.qkb-mb-button-options__btn {\n  color: ").concat(msgBubbleBgUser, ";\n  border-color: ").concat(msgBubbleBgUser, ";\n}\n.qkb-mb-button-options__btn:hover {\n  color: ").concat(msgBubbleColorUser, ";\n  background-color: ").concat(msgBubbleBgUser, ";\n}\n.qkb-board-action--disabled::before {\n  background-color: ").concat(inputDisableBg, ";\n}\n</style>\n      ");
      return styles;
    }
  }
});
// CONCATENATED MODULE: ./src/components/AppStyle.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_AppStylevue_type_script_lang_js_ = (AppStylevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/AppStyle.vue





/* normalize component */

var AppStyle_component = normalizeComponent(
  components_AppStylevue_type_script_lang_js_,
  AppStylevue_type_template_id_5e1e9a7a_lang_pug_render,
  AppStylevue_type_template_id_5e1e9a7a_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var AppStyle = (AppStyle_component.exports);
// CONCATENATED MODULE: ./src/assets/icons/bubble.svg
function bubble_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function bubble_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { bubble_ownKeys(Object(source), true).forEach(function (key) { bubble_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { bubble_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function bubble_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function bubble_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = bubble_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function bubble_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* harmony default export */ var bubble = ({
  functional: true,
  render: function render(_h, _vm) {
    var _c = _vm._c,
        _v = _vm._v,
        data = _vm.data,
        _vm$children = _vm.children,
        children = _vm$children === void 0 ? [] : _vm$children;

    var classNames = data["class"],
        staticClass = data.staticClass,
        style = data.style,
        staticStyle = data.staticStyle,
        _data$attrs = data.attrs,
        attrs = _data$attrs === void 0 ? {} : _data$attrs,
        rest = bubble_objectWithoutProperties(data, ["class", "staticClass", "style", "staticStyle", "attrs"]);

    return _c('svg', bubble_objectSpread({
      "class": [classNames, staticClass],
      style: [style, staticStyle],
      attrs: Object.assign({
        "height": "511pt",
        "viewBox": "1 -31 512 511",
        "width": "511pt",
        "xmlns": "http://www.w3.org/2000/svg"
      }, attrs)
    }, rest), children.concat([_c('path', {
      attrs: {
        "d": "M128 448.5c-8.836 0-16-7.164-16-16v-80H48c-26.512 0-48-21.492-48-48v-256C0 21.988 21.488.5 48 .5h416c26.512 0 48 21.488 48 48v256c0 26.508-21.488 48-48 48H230.625l-91.313 91.313c-3 3-7.07 4.687-11.312 4.687zm-80-416c-8.836 0-16 7.164-16 16v256c0 8.836 7.164 16 16 16h80c8.836 0 16 7.164 16 16v57.375l68.688-68.688c3-3 7.07-4.687 11.312-4.687h240c8.836 0 16-7.164 16-16v-256c0-8.836-7.164-16-16-16zm0 0"
      }
    }), _c('path', {
      attrs: {
        "d": "M160 144.5c-17.672 0-32-14.328-32-32s14.328-32 32-32 32 14.328 32 32-14.328 32-32 32zm0 0M352 144.5c-17.672 0-32-14.328-32-32s14.328-32 32-32 32 14.328 32 32-14.328 32-32 32zm0 0M256 288.5c-52.996-.05-95.945-43.004-96-96 0-8.836 7.164-16 16-16s16 7.164 16 16c0 35.348 28.652 64 64 64s64-28.652 64-64c0-8.836 7.164-16 16-16s16 7.164 16 16c-.055 52.996-43.004 95.945-96 96zm0 0"
      }
    })]));
  }
});
// CONCATENATED MODULE: ./src/assets/icons/close.svg
function close_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function close_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { close_ownKeys(Object(source), true).forEach(function (key) { close_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { close_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function close_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function close_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = close_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function close_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* harmony default export */ var icons_close = ({
  functional: true,
  render: function render(_h, _vm) {
    var _c = _vm._c,
        _v = _vm._v,
        data = _vm.data,
        _vm$children = _vm.children,
        children = _vm$children === void 0 ? [] : _vm$children;

    var classNames = data["class"],
        staticClass = data.staticClass,
        style = data.style,
        staticStyle = data.staticStyle,
        _data$attrs = data.attrs,
        attrs = _data$attrs === void 0 ? {} : _data$attrs,
        rest = close_objectWithoutProperties(data, ["class", "staticClass", "style", "staticStyle", "attrs"]);

    return _c('svg', close_objectSpread({
      "class": [classNames, staticClass],
      style: [style, staticStyle],
      attrs: Object.assign({
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 512.001 512.001"
      }, attrs)
    }, rest), children.concat([_c('path', {
      attrs: {
        "d": "M284.286 256.002L506.143 34.144c7.811-7.811 7.811-20.475 0-28.285-7.811-7.81-20.475-7.811-28.285 0L256 227.717 34.143 5.859c-7.811-7.811-20.475-7.811-28.285 0-7.81 7.811-7.811 20.475 0 28.285l221.857 221.857L5.858 477.859c-7.811 7.811-7.811 20.475 0 28.285a19.938 19.938 0 0014.143 5.857 19.94 19.94 0 0014.143-5.857L256 284.287l221.857 221.857c3.905 3.905 9.024 5.857 14.143 5.857s10.237-1.952 14.143-5.857c7.811-7.811 7.811-20.475 0-28.285L284.286 256.002z"
      }
    })]));
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BotUI.vue?vue&type=script&lang=js&


function BotUIvue_type_script_lang_js_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function BotUIvue_type_script_lang_js_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { BotUIvue_type_script_lang_js_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { BotUIvue_type_script_lang_js_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function BotUIvue_type_script_lang_js_toConsumableArray(arr) { return BotUIvue_type_script_lang_js_arrayWithoutHoles(arr) || BotUIvue_type_script_lang_js_iterableToArray(arr) || BotUIvue_type_script_lang_js_unsupportedIterableToArray(arr) || BotUIvue_type_script_lang_js_nonIterableSpread(); }

function BotUIvue_type_script_lang_js_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function BotUIvue_type_script_lang_js_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return BotUIvue_type_script_lang_js_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return BotUIvue_type_script_lang_js_arrayLikeToArray(o, minLen); }

function BotUIvue_type_script_lang_js_iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function BotUIvue_type_script_lang_js_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return BotUIvue_type_script_lang_js_arrayLikeToArray(arr); }

function BotUIvue_type_script_lang_js_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function BotUIvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function BotUIvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { BotUIvue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { BotUIvue_type_script_lang_js_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { BotUIvue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function BotUIvue_type_script_lang_js_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ var BotUIvue_type_script_lang_js_ = ({
  name: 'VueBotUI',
  components: {
    BoardHeader: Header,
    BoardContent: Content,
    BoardAction: Action,
    BubbleIcon: bubble,
    CloseIcon: icons_close,
    AppStyle: AppStyle
  },
  props: {
    options: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    messages: {
      type: Array
    },
    botTyping: {
      type: Boolean,
      "default": false
    },
    inputDisable: {
      type: Boolean,
      "default": false
    },
    isOpen: {
      type: Boolean,
      "default": false
    },
    openDelay: {
      type: Number
    }
  },
  data: function data() {
    return {
      botActive: false,
      defaultOptions: {
        botTitle: 'Chatbot',
        colorScheme: '#1b53d0',
        textColor: '#fff',
        bubbleBtnSize: 56,
        animation: true,
        boardContentBg: '#fff',
        botAvatarSize: 32,
        botAvatarImg: 'http://placehold.it/200x200',
        msgBubbleBgBot: '#f0f0f0',
        msgBubbleColorBot: '#000',
        msgBubbleBgUser: '#4356e0',
        msgBubbleColorUser: '#fff',
        inputPlaceholder: 'Message',
        inputDisableBg: '#fff',
        inputDisablePlaceholder: null
      },
      micOn: false,
      isBotAudioPlaying: false,
      micWasOnBeforeBotAudio: false
    };
  },
  watch: {
    messages: {
      handler: function handler() {
        this.autoPlayBotResponses();
      },
      deep: true
    }
  },
  computed: {
    optionsMain: function optionsMain() {
      return BotUIvue_type_script_lang_js_objectSpread({}, this.defaultOptions, {}, this.options);
    },
    // Add class to bot ui wrapper
    uiClasses: function uiClasses() {
      var classes = [];

      if (this.optionsMain.animation) {
        classes.push('qkb-bot-ui--animate');
      }

      return classes;
    }
  },
  created: function created() {
    if (this.isOpen) {
      if (this.openDelay) {
        setTimeout(this.botOpen, this.openDelay);
      } else {
        this.botToggle();
      }
    }
  },
  mounted: function mounted() {
    document.addEventListener(config.EVENT_OPEN, function () {
      this.botOpen();
    });
    document.addEventListener(config.EVENT_CLOSE, function () {
      this.botClose();
    });
    document.addEventListener(config.EVENT_TOGGLE, function () {
      this.botToggle();
    });
  },
  beforeDestroy: function beforeDestroy() {
    event_bus.$off('select-button-option');
  },
  methods: {
    botOpen: function botOpen() {
      if (!this.botActive) {
        this.botToggle();
      }
    },
    botClose: function botClose() {
      if (this.botActive) {
        this.botToggle();
      }
    },
    botToggle: function botToggle() {
      this.botActive = !this.botActive;

      if (this.botActive) {
        event_bus.$on('select-button-option', this.selectOption);
        this.$emit('init');
      } else {
        event_bus.$off('select-button-option');
        this.$emit('destroy');
      }
    },
    sendMessage: function sendMessage(value) {
      this.$emit('msg-send', value);
    },
    selectOption: function selectOption(value) {
      this.$emit('msg-send', value);
    },
    autoPlayBotResponses: function autoPlayBotResponses() {
      var _this = this;

      if (!this.micOn || this.isBotAudioPlaying) return; // Find next unplayed bot message

      var next = (this.messages || []).find(function (msg) {
        return msg.agent === 'bot' && !msg._audioPlayed && msg.text;
      });
      if (!next) return; // If mic is on, turn it off and remember to turn it back on after audio

      if (this.micOn) {
        this.micWasOnBeforeBotAudio = true;
        this.$refs.boardAction && this.$refs.boardAction.stopRecording && this.$refs.boardAction.stopRecording();
        this.micOn = false;
      }

      this.isBotAudioPlaying = true; // Gather all texts: main + options (if any)

      var texts = [next.text].concat(BotUIvue_type_script_lang_js_toConsumableArray(next.options ? next.options.map(function (opt) {
        return opt.text;
      }) : []));

      var playAll = /*#__PURE__*/function () {
        var _ref = BotUIvue_type_script_lang_js_asyncToGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
          var _loop, i;

          return regenerator_default.a.wrap(function _callee$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _loop = /*#__PURE__*/regenerator_default.a.mark(function _loop(i) {
                    var text, cacheKey, blob, response, url, audio;
                    return regenerator_default.a.wrap(function _loop$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            text = texts[i];
                            cacheKey = text;
                            if (!window._audioCache) window._audioCache = {};
                            blob = void 0;

                            if (!window._audioCache[cacheKey]) {
                              _context.next = 8;
                              break;
                            }

                            blob = window._audioCache[cacheKey];
                            _context.next = 17;
                            break;

                          case 8:
                            _context.next = 10;
                            return fetch('https://api-aitext2speech.hayokmedicare.ng/api/text-to-speech/', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                text: text
                              })
                            });

                          case 10:
                            response = _context.sent;

                            if (response.ok) {
                              _context.next = 13;
                              break;
                            }

                            throw new Error('TTS failed');

                          case 13:
                            _context.next = 15;
                            return response.blob();

                          case 15:
                            blob = _context.sent;
                            window._audioCache[cacheKey] = blob;

                          case 17:
                            url = URL.createObjectURL(blob);
                            audio = new Audio(url);
                            _context.next = 21;
                            return new Promise(function (resolve) {
                              audio.onended = function () {
                                URL.revokeObjectURL(url);
                                resolve();
                              };

                              audio.onerror = function () {
                                URL.revokeObjectURL(url);
                                resolve();
                              };

                              audio.play();
                            });

                          case 21:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _loop);
                  });
                  i = 0;

                case 3:
                  if (!(i < texts.length)) {
                    _context2.next = 8;
                    break;
                  }

                  return _context2.delegateYield(_loop(i), "t0", 5);

                case 5:
                  i++;
                  _context2.next = 3;
                  break;

                case 8:
                  _context2.next = 13;
                  break;

                case 10:
                  _context2.prev = 10;
                  _context2.t1 = _context2["catch"](0);
                  // Optionally log error
                  console.error('Text-to-speech failed', _context2.t1);

                case 13:
                  next._audioPlayed = true;
                  _this.isBotAudioPlaying = false;
                  setTimeout(function () {
                    if (_this.micWasOnBeforeBotAudio) {
                      _this.micOn = true;
                      _this.micWasOnBeforeBotAudio = false;
                      _this.$refs.boardAction && _this.$refs.boardAction.startRecording && _this.$refs.boardAction.startRecording();
                    }

                    _this.autoPlayBotResponses();
                  }, 100);

                case 16:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee, null, [[0, 10]]);
        }));

        return function playAll() {
          return _ref.apply(this, arguments);
        };
      }();

      playAll();
    },
    handleMicState: function handleMicState(state) {
      this.micOn = state;

      if (state) {
        // Mark all current bot messages as played so only new ones are auto-played
        if (Array.isArray(this.messages)) {
          this.messages.forEach(function (msg) {
            if (msg.agent === 'bot') msg._audioPlayed = true;
          });
        }

        this.autoPlayBotResponses();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/BotUI.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_BotUIvue_type_script_lang_js_ = (BotUIvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/assets/scss/_app.scss?vue&type=style&index=0&lang=scss&
var _appvue_type_style_index_0_lang_scss_ = __webpack_require__("de67");

// CONCATENATED MODULE: ./src/components/BotUI.vue






/* normalize component */

var BotUI_component = normalizeComponent(
  components_BotUIvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var BotUI = (BotUI_component.exports);
// CONCATENATED MODULE: ./src/vue-bot-ui.js

var Plugin = {
  install: function install(Vue, options) {
    Vue.component('VueBotUI', BotUI);

    if (options) {// console.log('options', options)
    }
  }
};
/* harmony default export */ var vue_bot_ui = (Plugin);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (vue_bot_ui);



/***/ })

/******/ });