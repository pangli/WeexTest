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
/******/ 	return __webpack_require__(__webpack_require__.s = 380);
/******/ })
/************************************************************************/
/******/ ({

/***/ 137:
/***/ (function(module, exports) {

module.exports = {
  "bui-list": {
    "flex": 1
  },
  "bui-cell": {
    "flexDirection": "row",
    "alignItems": "center",
    "height": "100",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid"
  },
  "bui-cell-large": {
    "flexDirection": "row",
    "height": "120",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid"
  },
  "bui-cell-swipe-menu": {
    "lexDirection": "row",
    "height": "120",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid"
  },
  "bui-cell-xlarge": {
    "flexDirection": "row",
    "alignItems": "center",
    "height": "140",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid"
  },
  "bui-list-left": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "paddingLeft": "20"
  },
  "bui-list-main": {
    "paddingTop": "24",
    "paddingRight": "28",
    "paddingBottom": "24",
    "paddingLeft": "28",
    "flex": 1,
    "justifyContent": "center",
    "backgroundColor": "#ffffff"
  },
  "bui-list-right": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "paddingRight": "20"
  },
  "bui-list-title": {
    "fontSize": "34",
    "color": "#464c5b",
    "textOverflow": "ellipsis",
    "lines": 1
  },
  "bui-list-subtitle": {
    "fontSize": "30",
    "color": "#9ea7b4",
    "textOverflow": "ellipsis",
    "lines": 1
  },
  "bui-list-thumb": {
    "width": "80",
    "height": "80"
  },
  "bui-list-action": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "width": "300"
  },
  "bui-loading": {
    "width": "750",
    "height": "150",
    "flexDirection": "column",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "paddingTop": "10",
    "paddingBottom": "10"
  },
  "bui-refresh": {
    "justifyContent": "center",
    "flexDirection": "row",
    "width": "750",
    "height": "100",
    "display": "flex",
    "alignItems": "center",
    "paddingTop": "10",
    "paddingBottom": "10"
  },
  "bui-loading-indicator": {
    "fontSize": "30",
    "textAlign": "center",
    "color": "#9ea7b4"
  },
  "bui-indicator": {
    "height": "60",
    "width": "60",
    "color": "#9ea7b4"
  },
  "bui-list-swipe": {
    "position": "absolute",
    "left": "0",
    "right": "0",
    "top": "0",
    "bottom": "0",
    "flexDirection": "row",
    "justifyContent": "flex-end"
  },
  "bui-list-swipe-btn": {
    "flexDirection": "row",
    "width": "120",
    "alignItems": "center",
    "justifyContent": "center",
    "textAlign": "center",
    "backgroundColor": "#c6c7c8"
  },
  "bgRed": {
    "backgroundColor": "#fa3300"
  },
  "bui-list-swipe-btn-text": {
    "fontSize": "30",
    "color": "#ffffff"
  },
  "bui-list-swipe-main": {
    "flexDirection": "row",
    "justifyContent": "flex-start"
  },
  "bui-list-main-left": {
    "justifyContent": "center",
    "flex": 1
  },
  "bui-list-desc": {
    "fontSize": "25",
    "color": "#464c5b"
  }
}

/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var animation = weex.requireModule('animation');
var modal = weex.requireModule('modal');
var defaultAction = [{
    'title': '取消',
    'bgcolor': '#c6c7c8'
}, {
    'title': '删除',
    'bgcolor': '#fa3300'
}];

module.exports = {
    name: "buiSwipeCell",
    data: function data() {
        return {
            ss: ''
        };
    },
    props: {
        items: {
            type: Array,
            default: function _default() {
                return defaultAction;
            }
        },
        height: {
            type: String,
            default: '88px'
        },
        title: {
            type: String
        }
    },
    methods: {
        //操作点击事件
        _actionClick: function _actionClick(index) {
            var self = this;
            // this.close(()=>{
            //     this.$emit('actionClick', index);
            // });
            var obj = {
                'index': index,
                'dataKey': self.$refs.swipedom.children[0].attr.dataKey
            };
            this.$emit('actionClick', obj);
            // modal.alert({
            //   message:'qwe123'+JSON.stringify(self.$refs.swipedom)
            // })
            //  modal.alert({
            //   message:'qwe'+self.$refs.swipedom.children[0].attr.dataKey
            // })
        },
        _swipe: function _swipe(e) {
            var _this = this;

            switch (e.direction) {
                case 'left':
                    this.open(function () {
                        _this.$emit('swipeleft');
                    });
                    break;
                case 'right':
                    this.close(function () {
                        _this.$emit('swiperight');
                    });
                    break;
            }
        },
        _click: function _click() {
            this.$emit('click');
            this.close();
        },
        close: function close(fn) {
            var translate = 'translate(0px, 0px)';
            var el = this.$refs.swipedom;
            this._animationFn(el, 1, translate, 'ease-in', function () {
                fn && fn();
            });
        },
        open: function open(fn) {
            var swipeDom = this.$refs.swipeBox;
            var lenDom = void 0;

            if (swipeDom.hasOwnProperty('pureChildren')) lenDom = swipeDom.pureChildren;else lenDom = this.$refs.swipeBox.children;

            var len = lenDom && lenDom.length || 0;
            var translate = 'translate(-' + 120 * len + 'px, 0px)';
            var el = this.$refs.swipedom;
            this._animationFn(el, 1, translate, 'ease-in', function () {
                fn && fn();
            });
        },
        _animationFn: function _animationFn(el, opacity, translate, timing, fn) {
            animation.transition(el, {
                styles: {
                    opacity: opacity,
                    transform: translate,
                    transformOrigin: 'center center'
                },
                duration: 200,
                timingFunction: timing,
                delay: 0
            }, function () {
                fn && fn();
            });
        }
    }
};

/***/ }),

/***/ 139:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["bui-list-swipe-menu"]
  }, [_c('div', {
    staticClass: ["bui-cell-swipe-menu"],
    style: {
      'height': _vm.height
    }
  }, [_c('div', {
    ref: "swipeBox",
    staticClass: ["bui-list-swipe"]
  }, [_vm._t("action", _vm._l((_vm.items), function(item, index) {
    return _c('div', {
      key: index,
      ref: "clickItem",
      refInFor: true,
      staticClass: ["bui-list-swipe-btn"],
      style: {
        'background-color': item.bgcolor
      },
      on: {
        "click": function($event) {
          _vm._actionClick(index)
        }
      }
    }, [_c('text', {
      staticClass: ["bui-list-swipe-btn-text"]
    }, [_vm._v(_vm._s(item.title))])])
  }))], 2), _c('div', {
    ref: "swipedom",
    staticClass: ["bui-list-main", "bui-list-swipe-main"],
    on: {
      "click": _vm._click,
      "swipe": function($event) {
        _vm._swipe($event)
      }
    }
  }, [_vm._t("content")], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 380:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(137)
)

/* script */
__vue_exports__ = __webpack_require__(138)

/* template */
var __vue_template__ = __webpack_require__(139)
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
__vue_options__.__file = "/Users/denya/Desktop/workspace/weex/h5/src/views/components/parkingModule/bui-swipe-cell.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-6e04dfbe"
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