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
/******/ 	return __webpack_require__(__webpack_require__.s = 288);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getUrl = function getUrl(bundleUrl, filePath) {
  var nativeBase;
  // var isAndroidAssets = bundleUrl.indexOf('file://assets/') >= 0;
  // var isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;
  console.log(bundleUrl);
  nativeBase = bundleUrl.split('dist')[0] + 'dist/';

  if (WXEnvironment.platform == "Web") {
    var matches = /\/\/([^\/]+?)\//.exec(bundleUrl);
    return 'http:' + matches[0] + filePath.replace('.js', '.html');
  }

  return nativeBase + filePath;
};

var getParams = function getParams(bundleUrl) {
  var param = bundleUrl.split('?');
  var obj = {};
  if (param[1]) {
    var arr = param[1].split('&');
    for (var i in arr) {
      var item = arr[i].split('=');
      if (item[1]) obj[item[0]] = item[1];
    }
  }

  return obj;
};
var formatTime = function formatTime(date) {
  var symbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
  var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var date = new Date(date);

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  var ret = '';
  switch (format) {
    case 'yyyymm':
      ret = [year, month].map(formatNumber).join(symbol);
      break;
    case 'yyyymmdd':
      ret = [year, month, day].map(formatNumber).join(symbol);
      break;
    case 'yyyymmdd hhmm':
      ret = [year, month, day].map(formatNumber).join(symbol) + ' ' + [hour, minute].map(formatNumber).join(':');
      break;
    case 's':
      ret = minute * 60 + second;
      break;
    case 'ddhh':
      ret = [day].map(formatNumber).join(symbol) + '天' + [hour].map(formatNumber) + '小时';
      break;
    default:
      ret = [year, month, day].map(formatNumber).join(symbol) + ' ' + [hour, minute, second].map(formatNumber).join(':');
  }

  return ret;
  //return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

var formatNumber = function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
};
//8位数日期处理
var dateProcess = function dateProcess(date) {
  return date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2);
};

//获取当前星期往后七天
var getWeekDay = function getWeekDay() {
  var weekDayArray = [];
  var weekDay = new Date();
  var count = 0;
  weekDayArray.push(weekDay.getDay());
  for (var i = 0; i < 6; i++) {
    if (weekDay.getDay() + i + 1 < 7) {
      weekDayArray.push(weekDay.getDay() + i + 1);
      count = i + 1;
    } else {
      weekDayArray.push(i - count);
    }
  }
  return weekDayArray;
};

// 获取当天往后七天的日期
var getDay = function getDay(day) {
  var today = new Date();

  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

  today.setTime(targetday_milliseconds); //注意，这行是关键代码

  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear + "-" + tMonth + "-" + tDate;
};

function doHandleMonth(month) {
  var m = month;
  if (month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
}
// 获取两个经纬度之间的距离
var getFlatternDistance = function getFlatternDistance(lat1, lng1, lat2, lng2) {
  var f = getRad((lat1 + lat2) / 2);
  var g = getRad((lat1 - lat2) / 2);
  var l = getRad((lng1 - lng2) / 2);

  var sg = Math.sin(g);
  var sl = Math.sin(l);
  var sf = Math.sin(f);

  var s, c, w, r, d, h1, h2;
  var a = EARTH_RADIUS;
  var fl = 1 / 298.257;

  sg = sg * sg;
  sl = sl * sl;
  sf = sf * sf;

  s = sg * (1 - sl) + (1 - sf) * sl;
  c = (1 - sg) * (1 - sl) + sf * sl;

  w = Math.atan(Math.sqrt(s / c));
  r = Math.sqrt(s * c) / w;
  d = 2 * w * a;
  h1 = (3 * r - 1) / 2 / c;
  h2 = (3 * r + 1) / 2 / s;

  return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
};
// 距离计算
//传入当前经纬度和经纬度列表计算最近的距离
var address = function address(nowAddress, addressArr) {
  var nowAddresslat1 = nowAddress.latitude,
      nowAddresslng1 = nowAddress.longitude,
      //当前经纬度
  nowAddressId = addressArr[0].marketId,
      //距离最近id
  nowAddressIndex = 0,
      //距离最近id
  juli = GetDistance(addressArr[addressArr.length - 1].latitude, addressArr[addressArr.length - 1].longitude); //计算距离
  for (var i = addressArr.length; i--;) {
    // 使用myarray[i]做点什么
    if (juli > GetDistance(addressArr[i].latitude, addressArr[i].longitude)) {
      juli = GetDistance(addressArr[i].latitude, addressArr[i].longitude);
      nowAddressId = addressArr[i].marketId;
      nowAddressIndex = i;
    }
  }
  return {
    nowAddressId: nowAddressId,
    juli: juli,
    nowAddressIndex: nowAddressIndex
  };

  function Rad(d) {
    return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
  }

  function GetDistance(lat2, lng2) {
    var radLat1 = Rad(nowAddresslat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var b = Rad(nowAddresslng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; //输出为公里
    //s=s.toFixed(4);
    return s;
  }
};

//定义一个加法函数
var add = function add(arg1, arg2) {
  //  var r1,r2,m;

  //  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}

  //  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}

  //  m=Math.pow(10,Math.max(r1,r2))

  return (arg1 * 1000 + arg2 * 1000) / 1000;
};

var accSubtr = function accSubtr(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  //动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
};

exports.default = {
  getUrl: getUrl,
  getParams: getParams,
  formatTime: formatTime,
  getWeekDay: getWeekDay,
  getDay: getDay,
  address: address,
  add: add,
  formatNumber: formatNumber,
  accSubtr: accSubtr
};

/***/ }),

/***/ 288:
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
__vue_options__.__file = "/Users/denya/Desktop/workspace/weex/h5/src/views/components/VisitorReservationTitle.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-caa47ec0"
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
  "title": {
    "height": "88",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "paddingTop": 0,
    "paddingRight": "30",
    "paddingBottom": 0,
    "paddingLeft": "30"
  },
  "leftBox": {
    "height": "88",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "rightBox": {
    "height": "88",
    "lineHeight": "88",
    "color": "#1eb9ef",
    "fontSize": "28"
  },
  "banshou": {
    "width": "27",
    "height": "28",
    "marginRight": "20"
  },
  "h2": {
    "fontSize": "28",
    "color": "#333333"
  }
}

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _global = __webpack_require__(1);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navigator = weex.requireModule('navigator'); //
//
//
//
//
//
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
  name: 'App',
  props: {
    title: '',
    status: ''
  },
  data: function data() {
    return {};
  },
  created: function created() {
    this.config = JSON.stringify(weex.config);
  },

  methods: {}
};

/***/ }),

/***/ 66:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["title"]
  }, [_c('div', {
    staticClass: ["leftBox"]
  }, [_c('image', {
    staticClass: ["banshou"],
    attrs: {
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAArCAYAAADlqKH9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpENkZGMzg2QzhDMjMxMUU4QTRBMzkzREI4ODFFNjk0RiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpENkZGMzg2RDhDMjMxMUU4QTRBMzkzREI4ODFFNjk0RiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQ2RkYzODZBOEMyMzExRThBNEEzOTNEQjg4MUU2OTRGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQ2RkYzODZCOEMyMzExRThBNEEzOTNEQjg4MUU2OTRGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+hqwNqwAABORJREFUeNrMWQmIVVUYPvPmuTUuo6ljKm6UKJUbjituL4tCkRT3zIXESsQosxTcV8QRBAnUwdGhVNwQmaRFZzRKMSvMJUcbMo001CxNTSWXvt/5jvxzvPe+cd68uX7w8c459953v/efc/7//P9LMfn3jAe6g++APcH64DkwH8wCj5rEMAh8E+wEpoG/gTvBpfdi5nevB1IckSngEnCqzwvugO+Dy8sgrjL4CTjE5/p1cASE5sUTOR1cVIoXDgc3gRGwJfg0+BQtI/iL1i8Ez3IsBxwX53v/A3tA6Ld+IhuDRWBV9o+DsziWCS4EM3jtIngA7ANWj/NiEbsfHKzG5Nn5oExvDJwH1uC17yEy00/ke+Ay9cXP0yIWfcFdJnFcouUvSweCTEqB6Y3mHnXPcxj/yXYi6kIH1c5RAmUtzQbzAl4sFtkHfs4NdtCK8MCT3Hyv2gEI2ouPQ+qetvqBqGpXUe0r/JRfvA1s47zoKriZwveq+10045IYCr6kjCJLazuYCytOhMh/0f5TPVdiCWlLnlHtV8Besj4cgTJVH4INwfHgjgCBgtPgWn5fc3AVPYTFGJkBCG2Nzy5q/JTfmuxFq2h3k6r6ueAUCvVCBne44ALXtRfaUnh7n3fJj24A6970suRXzuJNVW5BXMfYAIGCt7muhB8E3HcY7Apme7xLsEgLdEUKJjv9G2A/cJ0pX9wCJ4ALnPEzjGomSOQM1b4rEaCc3I4fZoIrVL8pODpIpOy+Yao/lxsj2XgX/Eb1l2Ej1fYSaWO2xUFGmKQD6082zSguLUEdepCHRMq6a6fGJzmuItlCZS0u1u+HNdNdkRPUDZ+B35mKx3Llc9O4Hx6ITKeztVgRgkCx5lXHi4zUIl9U4VFC05cmPKxX7W52ykVkN3UhvyLXogd+AP9WBuxiGzo87Q9RoEz5XUdDGyuymRo8YcLHz6rdwh7V0tXghXJ60Wtg74DrEjRO+lz7Q7XrWpG11ODlchJZ177AB9XixPUS590ID7Ceh82QoE9Et63S6yoJqp3Al28EfyzlvacCrtVzM4QoH2jAQUlPvy6jyJMB6+xR0NI52d+fbr2jMx+D6e6o2oVW5D41+EKY6hBhmvNMWcJvRxhljMoO24eoc7i2Ipz7OStSjkm6rPFWSFaMMgO12OQe1dY4aWbDEHQOtRGGqUuuK/Jj8LwqEiytYCumOZnBFkz1aVfkTeY0+iw3sAJ1ZrGqYR34HL9ELNupx6xxfFayrDjK2QdZsOIJP5G3mRDdUtHnC/ULk4F+LI7pwsHceHm31CTfcApOUkt8NgkCR7JoVYl9OewOcasXXiIFn5riOrZFI6a445j6JoonwI+YKlTSlRIILPJ6wBVZizlOE48vzqHj71xGcRE6awl1E51rUedg4SvSCuzkWPUf1e/D6S8AX2ciHw8S6qZR3EYPAxhadCs20cuem4ulPy+BK/mLxcGuNsW1bRfidI+Axxi5rtEqNcFnGGKb+jwnqfNuU1yMraamvT+mvcAVmcpArgXmMETpvyakMC8F+NYJrsk8FsaOsB/jjGmhMQg9oKf7DneZxQZWNNx/obZyl/flon+UVONXRrFW4AAl0NBq/VUt6BfyoekWLOD6GV3K3DvK+lFHnp4y1An/EhOqQnqGooA01jr1GOtBMt0X9T3/CzAA2GI0DAnFRh8AAAAASUVORK5CYII="
    }
  }), _c('text', {
    staticClass: ["h2"]
  }, [_vm._v(_vm._s(_vm.title))])]), (_vm.status === 1) ? _c('text', {
    staticClass: ["rightBox"]
  }, [_vm._v("待确认")]) : _vm._e(), (_vm.status === 2) ? _c('text', {
    staticClass: ["rightBox"]
  }, [_vm._v("预约成功")]) : _vm._e(), (_vm.status === 3) ? _c('text', {
    staticClass: ["rightBox"]
  }, [_vm._v("预约失败")]) : _vm._e(), (_vm.status === 4) ? _c('text', {
    staticClass: ["rightBox", "four"]
  }, [_vm._v("已取消")]) : _vm._e(), (_vm.status === 5) ? _c('text', {
    staticClass: ["rightBox", "four"]
  }, [_vm._v("已结束")]) : _vm._e(), (_vm.status === 6) ? _c('text', {
    staticClass: ["rightBox", "four"]
  }, [_vm._v("已失效")]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });