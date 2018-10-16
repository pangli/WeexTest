// { "framework": "Vue"} 

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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 367);
/******/ })
/************************************************************************/
/******/ ({

/***/ 367:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(47)
)

/* script */
__vue_exports__ = __webpack_require__(48)

/* template */
var __vue_template__ = __webpack_require__(49)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/denya/Desktop/workspace/weex/h5/src/views/components/cellBox.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-47f333cf"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__
module.exports.el = 'true'
new Vue(module.exports)


/***/ }),

/***/ 47:
/***/ (function(module, exports) {

module.exports = {
  "cell": {
    "height": "110",
    "alignItems": "center",
    "flexDirection": "row",
    "paddingTop": 0,
    "paddingRight": "30",
    "paddingBottom": 0,
    "paddingLeft": "30",
    "borderBottomWidth": "1",
    "borderBottomColor": "rgb(190,192,200)",
    "justifyContent": "space-between"
  },
  "leftBox": {
    "alignItems": "center",
    "flexDirection": "row"
  },
  "shop": {
    "width": "26",
    "height": "30",
    "marginRight": "30"
  },
  "label": {
    "fontSize": "28",
    "color": "rgb(102,102,102)"
  },
  "input": {
    "flex": 1,
    "height": "110",
    "textAlign": "right",
    "placeholderColor": "rgb(204,204,204)",
    "fontSize": "28"
  }
}

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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

exports.default = {
  name: 'cell',
  props: {
    set: '',
    label: '',
    getValue: '',
    placeholder: '',
    typeName: '',
    maxlength: '',
    danwei: ''
  },
  data: function data() {
    return {
      value: '',
      typeData: 'text'
    };
  },
  created: function created() {
    if (this.getValue) {
      this.value = this.getValue;
    }
    if (this.typeName) {
      this.typeData = this.typeName;
    }
  },

  methods: {
    changeValue: function changeValue() {
      this.$emit('changeValue');
    }
  },
  watch: {
    value: function value() {
      this.changeValue();
    }
  }
};

/***/ }),

/***/ 49:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["cell"]
  }, [_c('div', {
    staticClass: ["leftBox"]
  }, [(_vm.set) ? _c('image', {
    staticClass: ["shop"],
    attrs: {
      "src": _vm.set
    }
  }) : _vm._e(), _c('text', {
    staticClass: ["label"]
  }, [_vm._v(_vm._s(_vm.label))])]), _c('input', {
    staticClass: ["input"],
    attrs: {
      "type": _vm.typeData,
      "placeholder": _vm.placeholder,
      "maxlength": _vm.maxlength,
      "value": (_vm.value)
    },
    on: {
      "input": function($event) {
        _vm.value = $event.target.attr.value
      }
    }
  }), _vm._v(_vm._s(_vm.danwei) + "\n")])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });