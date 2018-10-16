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
/******/ 	return __webpack_require__(__webpack_require__.s = 381);
/******/ })
/************************************************************************/
/******/ ({

/***/ 381:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(64)
)

/* script */
__vue_exports__ = __webpack_require__(65)

/* template */
var __vue_template__ = __webpack_require__(66)
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
__vue_options__.__file = "/Users/denya/Desktop/workspace/weex/h5/src/views/components/parkingModule/modalframe.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-621b5096"
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

/***/ 64:
/***/ (function(module, exports) {

module.exports = {
  "iframe_box": {
    "position": "fixed",
    "top": 0,
    "bottom": 0,
    "left": 0,
    "right": 0,
    "backgroundColor": "rgba(0,0,0,0.4)",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "common_modal": {
    "width": "560",
    "height": "400",
    "backgroundColor": "#ffffff",
    "borderRadius": "16",
    "paddingLeft": "40",
    "paddingTop": "32",
    "paddingRight": "40",
    "paddingBottom": "32",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "tel_main": {
    "marginTop": "72",
    "marginBottom": "72"
  },
  "tel_text": {
    "color": "#222222",
    "fontSize": "36",
    "lineHeight": "36",
    "marginBottom": "16",
    "fontWeight": "bold"
  },
  "opo_btn": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "width": "480"
  },
  "common_btn": {
    "width": "224",
    "height": "80",
    "textAlign": "center",
    "borderRadius": "40",
    "lineHeight": "80",
    "fontSize": "32"
  },
  "btn_left": {
    "color": "#555555",
    "backgroundColor": "#f6f6f6"
  },
  "btn_right": {
    "color": "#ffffff",
    "backgroundColor": "#07a5ff"
  },
  "btn_delete": {
    "backgroundColor": "#ff505c"
  },
  "normal_text": {
    "fontSize": "36",
    "color": "#222222",
    "fontWeight": "bold",
    "lineHeight": "36",
    "marginTop": "32"
  },
  "normal_main": {
    "flexDirection": "column",
    "justifyContent": "center",
    "alignItems": "center",
    "width": "480",
    "paddingLeft": "24",
    "paddingRight": "24",
    "flex": 1
  },
  "normal_main_text": {
    "color": "#222222",
    "fontSize": "32",
    "lineHeight": "44"
  },
  "common_modal_alert": {
    "width": "540",
    "height": "280",
    "borderRadius": "16",
    "backgroundColor": "#ffffff"
  },
  "alert_top": {
    "width": "540",
    "height": "190",
    "textAlign": "center",
    "lineHeight": "190",
    "fontSize": "34",
    "color": "#333333"
  },
  "alert_bottom": {
    "height": "88",
    "width": "540",
    "borderTopColor": "#EAEAEA",
    "borderTopWidth": "2",
    "flexDirection": "row"
  },
  "alertBtn": {
    "flex": 1,
    "textAlign": "center",
    "lineHeight": "88",
    "color": "#333333"
  },
  "alertBtnR": {
    "color": "#00BDFF",
    "borderLeftColor": "#EAEAEA",
    "borderLeftWidth": "1"
  },
  "alertBtnL": {
    "borderRightColor": "#EAEAEA",
    "borderRightWidth": "1"
  },
  "common_modal_alert2": {
    "width": "540",
    "height": "328",
    "borderRadius": "16",
    "backgroundColor": "#ffffff",
    "paddingTop": "28"
  },
  "alert2_top": {
    "height": "44",
    "marginBottom": "28",
    "textAlign": "center",
    "lineHeight": "44",
    "color": "#333333",
    "fontSize": "32"
  },
  "alertBtn2": {
    "width": "540",
    "borderTopWidth": "2",
    "borderTopColor": "rgba(234,234,234,1)",
    "height": "88",
    "color": "#00BDFF",
    "lineHeight": "88",
    "fontSize": "32",
    "textAlign": "center"
  },
  "alert2_content": {
    "flex": 1,
    "paddingTop": 0,
    "paddingRight": "28",
    "paddingBottom": 0,
    "paddingLeft": "28"
  },
  "alert2_content_text": {
    "color": "#666666",
    "fontSize": "28",
    "lineHeight": "30",
    "textAlign": "left"
  }
}

/***/ }),

/***/ 65:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var navigator = weex.requireModule('navigator');
exports.default = {
    name: 'modalIframe',
    props: {
        title: "",
        type: '', //弹框类型
        mainText: '', //内容文本
        sureText: {
            type: String,
            default: "确定"
        },
        tel: '',
        btnType: '' //按钮类型
    },
    components: {},
    methods: {
        // 点击取消
        cancel: function cancel() {
            this.$emit('cancel');
        },

        // 点击确定
        sure: function sure() {
            this.$emit('sure');
        },

        // 点击关闭
        close: function close() {
            this.$emit('close');
        }
    }
};

/***/ }),

/***/ 66:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["iframe_box"]
  }, [(_vm.type == 'noTitle') ? _c('div', {
    staticClass: ["common_modal"]
  }, [_c('div', {
    staticClass: ["normal_main"]
  }, [(_vm.tel) ? _c('text', {
    staticClass: ["tel_text"]
  }, [_vm._v("拨打返款人电话")]) : _vm._e(), _c('text', {
    staticClass: ["tel_text"]
  }, [_vm._v(_vm._s(_vm.mainText))])]), _c('div', {
    staticClass: ["opo_btn"]
  }, [_c('text', {
    staticClass: ["common_btn", "btn_left"],
    on: {
      "click": _vm.cancel
    }
  }, [_vm._v("取消")]), _c('text', {
    class: ['common_btn', 'btn_right', _vm.btnType == 'delete' ? 'btn_delete' : ''],
    on: {
      "click": _vm.sure
    }
  }, [_vm._v(_vm._s(_vm.sureText))])])]) : _vm._e(), (_vm.type == 'hasTitle') ? _c('div', {
    staticClass: ["common_modal"]
  }, [_c('text', {
    staticClass: ["normal_text"]
  }, [_vm._v(_vm._s(_vm.title))]), _c('div', {
    staticClass: ["normal_main"]
  }, [_c('text', {
    staticClass: ["normal_main_text"]
  }, [_vm._v(_vm._s(_vm.mainText))])]), _c('div', {
    staticClass: ["opo_btn"]
  }, [_c('text', {
    staticClass: ["common_btn", "btn_left"],
    on: {
      "click": _vm.cancel
    }
  }, [_vm._v("取消")]), _c('text', {
    class: ['common_btn', 'btn_right', _vm.btnType == 'delete' ? 'btn_delete' : ''],
    on: {
      "click": _vm.sure
    }
  }, [_vm._v(_vm._s(_vm.sureText))])])]) : _vm._e(), (_vm.type == 'alert') ? _c('div', {
    staticClass: ["common_modal_alert"]
  }, [_c('div', {
    staticClass: ["alert_top"]
  }, [_c('text', {
    staticClass: ["alert_top"]
  }, [_vm._v(_vm._s('确定删除该车牌吗？'))])]), _c('div', {
    staticClass: ["alert_bottom"]
  }, [_c('div', {
    staticClass: ["alertBtn", "alertBtnL"],
    on: {
      "click": _vm.cancel
    }
  }, [_c('text', {
    staticClass: ["alertBtn"]
  }, [_vm._v("取消")])]), _c('div', {
    staticClass: ["alertBtn", "alertBtnR"],
    on: {
      "click": _vm.sure
    }
  }, [_c('text', {
    staticClass: ["alertBtn", "alertBtnR"]
  }, [_vm._v("确定")])])])]) : _vm._e(), (_vm.type == 'alert2') ? _c('div', {
    staticClass: ["common_modal_alert2"]
  }, [_c('div', {
    staticClass: ["alert2_top"]
  }, [_c('text', {
    staticClass: ["alert2_top"]
  }, [_vm._v(_vm._s('申请说明'))])]), _c('div', {
    staticClass: ["alert2_content"]
  }, [_c('text', {
    staticClass: ["alert2_content_text"]
  }, [_vm._v(_vm._s('1、申请说明申请说明申请说明申请说明申请说明'))]), _c('text', {
    staticClass: ["alert2_content_text"]
  }, [_vm._v(_vm._s('2、申请说明申请说明申请说明申请说明申请说明申请说明'))])]), _c('div', {
    staticClass: ["alert2_bottom"]
  }, [_c('div', {
    staticClass: ["alertBtn2", "alertBtnL2"],
    on: {
      "click": _vm.close
    }
  }, [_c('text', {
    staticClass: ["alertBtn2"]
  }, [_vm._v("关闭")])])])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });