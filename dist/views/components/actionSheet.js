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
/******/ 	return __webpack_require__(__webpack_require__.s = 361);
/******/ })
/************************************************************************/
/******/ ({

/***/ 25:
/***/ (function(module, exports) {

module.exports = {
  "wrapper": {
    "position": "absolute",
    "top": "0",
    "left": "0",
    "bottom": "0",
    "right": "0",
    "backgroundColor": "rgba(0,0,0,0.5)"
  },
  "menu": {
    "position": "absolute",
    "left": "30",
    "bottom": "10",
    "width": "690"
  },
  "list": {
    "backgroundColor": "#ffffff",
    "borderRadius": "20",
    "overflow": "hidden"
  },
  "cell": {
    "width": "690",
    "height": "100",
    "justifyContent": "center",
    "alignItems": "center",
    "backgroundColor:active": "#e0e0e0"
  },
  "cancel": {
    "justifyContent": "center",
    "alignItems": "center",
    "width": "690",
    "height": "100",
    "marginTop": "20",
    "backgroundColor": "#ffffff",
    "borderRadius": "20",
    "backgroundColor:active": "#e0e0e0"
  },
  "text": {
    "color": "rgb(0,189,255)",
    "fontSize": "36"
  }
}

/***/ }),

/***/ 26:
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
//
//
//
//
//

var animation = weex.requireModule('animation');
var general = weex.requireModule('general');

exports.default = {
  name: 'actionSheet',
  props: {
    def: String,
    menus: {
      type: [Array, Function],
      default: function _default() {
        return ['从相册选择照片', '拍照'];
      }
    },
    picLength: 0
  },
  data: function data() {
    return {
      show: false,
      menus2: ['打开相册', '拍照']
    };
  },
  created: function created() {},

  methods: {
    showPage: function showPage(flag) {
      this.show = flag;
    },
    clicknone: function clicknone() {},
    selected: function selected(val, i) {
      var _this = this;

      //   modal.toast({message:this.menus[i]});
      // this.$emit('selected', {
      //   key: val,
      //   index: i
      // })

      if (i === 0) {
        general.openImagePicker(9 - this.picLength, function (obj) {
          _this.$emit('selected', {
            key: val,
            index: i,
            src: obj.photos
          });
        });
      } else if (i === 1) {
        general.takePicture(function (obj) {
          _this.$emit('selected', {
            key: val,
            index: i,
            src: obj.photos
          });
        });
      }

      var testEl = this.$refs.menu;
      var y = "300px";
      animation.transition(testEl, {
        styles: {
          // backgroundColor: '#FF0000',
          transform: 'translateY(' + y + ')'
          // transform: 'scale(0)'
        },
        duration: 300, //ms
        timingFunction: 'ease',
        delay: 200 //ms
      }, function () {
        _this.show = false;
      });

      animation.transition(this.$refs.page, {
        styles: {
          backgroundColor: 'rgba(0,0,0,0);'
        },
        duration: 200, //ms
        timingFunction: 'ease',
        delay: 300 //ms
      }, function () {});
    }
  }
};

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', {
    ref: "page",
    staticClass: ["wrapper"],
    on: {
      "click": _vm.clicknone
    }
  }, [_c('div', {
    ref: "menu",
    staticClass: ["menu"]
  }, [_c('div', {
    staticClass: ["list"]
  }, _vm._l((_vm.menus), function(val, key) {
    return _c('div', {
      staticClass: ["cell"],
      on: {
        "click": function($event) {
          _vm.selected(val, key)
        }
      }
    }, [_c('text', {
      staticClass: ["text"]
    }, [_vm._v(_vm._s(val))])])
  })), _c('div', {
    staticClass: ["cancel"],
    on: {
      "click": function($event) {
        _vm.selected('取消', 9)
      }
    }
  }, [_c('text', {
    staticClass: ["text"]
  }, [_vm._v("取消")])])])]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(25)
)

/* script */
__vue_exports__ = __webpack_require__(26)

/* template */
var __vue_template__ = __webpack_require__(27)
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
__vue_options__.__file = "/Users/denya/Desktop/workspace/weex/h5/src/views/components/actionSheet.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-e91776e2"
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


/***/ })

/******/ });