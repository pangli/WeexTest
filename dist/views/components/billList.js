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
/******/ 	return __webpack_require__(__webpack_require__.s = 366);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var navigator = weex.requireModule('navigator');
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
// base64加密开始  
function encode64(input) {
  var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";
  var output = "";
  var chr1,
      chr2,
      chr3 = "";
  var enc1,
      enc2,
      enc3,
      enc4 = "";
  var i = 0;
  do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = (chr1 & 3) << 4 | chr2 >> 4;
    enc3 = (chr2 & 15) << 2 | chr3 >> 6;
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  } while (i < input.length);

  return output;
}
// base64加密结束 
// 跳转页面
var jump = function jump(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var animate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "true";

  var jumpPage = '' + url + params;
  var url = getUrl(weex.config.bundleUrl, jumpPage);
  navigator.push({
    url: url,
    animated: animate
  });
};
//获取当前日期往后几个月
function getNextMonthDay(currentDay, month) {
  var time = new Date(currentDay);
  time.setDate(time.getDate()); //获取Day天后的日期 
  var y = time.getFullYear();
  var m = time.getMonth() + month + 1; //获取当前月份的日期 
  var d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();

  if (m > 12) {
    y = y + 1;
    m = m - 12 > 9 ? m - 12 : '0' + (m - 12);
  }
  return y + "-" + m + "-" + d;
}
// 获取固定日期前后几天的日期
var getCrentDayNext = function getCrentDayNext(date, day) {
  var today = new Date(date);

  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

  today.setTime(targetday_milliseconds); //注意，这行是关键代码  

  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear + "-" + tMonth + "-" + tDate;
};
function getOffsetDays(time1, time2) {
  var offsetTime = Math.abs(time1 - time2);
  return Math.floor(offsetTime / (3600 * 24 * 1e3));
}
//当月剩余天数
function getLeftDays() {
  var today = new Date();
  var now = today.getDate();
  var year = today.getYear();
  if (year < 2000) year += 1900; // Y2K fix
  var month = today.getMonth();

  var monarr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

  // check for leap year
  if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) monarr[1] = "29";

  // display day left
  // document.write("这个月还剩 " + (monarr[month]-now) + " 天了");
  return monarr[month] - now;
}
exports.default = {
  getUrl: getUrl,
  getParams: getParams,
  formatTime: formatTime,
  getWeekDay: getWeekDay,
  getDay: getDay,
  address: address,
  add: add,
  formatNumber: formatNumber,
  accSubtr: accSubtr,
  encode64: encode64,
  jump: jump,
  getNextMonthDay: getNextMonthDay,
  getCrentDayNext: getCrentDayNext,
  getOffsetDays: getOffsetDays,
  getLeftDays: getLeftDays
};

/***/ }),

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(56)
)
__vue_styles__.push(__webpack_require__(57)
)

/* script */
__vue_exports__ = __webpack_require__(58)

/* template */
var __vue_template__ = __webpack_require__(59)
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
__vue_options__.__file = "/Users/denya/Desktop/workspace/weex/h5/src/views/components/billList.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-62277322"
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

/***/ 56:
/***/ (function(module, exports) {

module.exports = {
  "flex-dir-row": {
    "flexDirection": "row"
  },
  "justify-center": {
    "justifyContent": "center"
  },
  "align-center": {
    "alignContent": "center"
  },
  "flex-1": {
    "flex": 1
  },
  "bg-page": {
    "backgroundColor": "#F3F4F6"
  },
  "t-color-333": {
    "color": "#333333"
  },
  "t-color-666": {
    "color": "#666666"
  },
  "t-color-999": {
    "color": "#999999"
  },
  "t-color-fff": {
    "color": "#ffffff"
  },
  "f-size-20": {
    "fontSize": "20",
    "lineHeight": "20"
  },
  "f-size-22": {
    "fontSize": "22",
    "lineHeight": "22"
  },
  "f-size-24": {
    "fontSize": "24",
    "lineHeight": "24"
  },
  "f-size-26": {
    "fontSize": "26",
    "lineHeight": "26"
  },
  "f-size-28": {
    "fontSize": "28"
  },
  "f-size-30": {
    "fontSize": "30",
    "lineHeight": "30"
  },
  "f-size-32": {
    "fontSize": "32",
    "lineHeight": "32"
  },
  "f-size-40": {
    "fontSize": "40",
    "lineHeight": "40"
  },
  "m-left-10": {
    "marginLeft": "10"
  },
  "m-top-20": {
    "marginTop": "20"
  },
  "m-left-20": {
    "marginLeft": "20"
  },
  "m-left-22": {
    "marginLeft": "22"
  },
  "m-left-30": {
    "marginLeft": "30"
  },
  "m-top-27": {
    "marginTop": "27"
  },
  "m-top-30": {
    "marginTop": "30"
  },
  "m-tb-30": {
    "marginTop": "30",
    "marginBottom": "30"
  },
  "m-top-40": {
    "marginTop": "40"
  },
  "m-bottom-40": {
    "marginBottom": "40"
  },
  "m-tb-40": {
    "marginTop": "40",
    "marginBottom": "40"
  }
}

/***/ }),

/***/ 57:
/***/ (function(module, exports) {

module.exports = {
  "bill": {
    "flexDirection": "row",
    "alignItems": "center",
    "height": "80",
    "marginTop": "20",
    "paddingTop": 0,
    "paddingRight": "30",
    "paddingBottom": 0,
    "paddingLeft": "30",
    "borderColor": "rgb(243,244,246)",
    "borderBottomWidth": "1",
    "backgroundColor": "#ffffff"
  },
  "bill-text-name": {
    "flex": 1,
    "fontSize": "28",
    "color": "#333333"
  },
  "bill-text-money": {
    "fontSize": "28",
    "color": "rgb(0,189,255)"
  },
  "bill-detail": {
    "paddingLeft": "30",
    "borderColor": "rgb(243,244,246)",
    "borderBottomWidth": "1",
    "backgroundColor": "#ffffff"
  },
  "bill-detail-name": {
    "paddingTop": "33",
    "paddingRight": "30",
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderColor": "rgb(243,244,246)",
    "borderBottomWidth": "1",
    "backgroundColor": "#ffffff"
  },
  "bill-detail-money": {
    "paddingTop": "30",
    "paddingRight": "30",
    "paddingBottom": 0,
    "paddingLeft": 0
  },
  "tx-elp": {
    "flex": 1,
    "textOverflow": "ellipsis",
    "lines": 1
  },
  "mar-l47": {
    "marginLeft": "47"
  },
  "mar-l20": {
    "marginLeft": "20"
  },
  "mar-b30": {
    "marginBottom": "30"
  },
  "godetails": {
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "flex-end",
    "height": "88",
    "paddingTop": 0,
    "paddingRight": "30",
    "paddingBottom": 0,
    "paddingLeft": "30",
    "borderColor": "#efefef",
    "borderBottomWidth": "10"
  },
  "icon": {
    "width": "10",
    "height": "20"
  }
}

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _global = __webpack_require__(0);

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'billList',
  components: {},
  props: {
    type: {
      type: String,
      default: '待缴账单'
    },
    billList: []
  },
  filters: {
    formatTime: function formatTime(val) {
      return _global2.default.formatTime(new Date(val), '.', 'yyyymmdd');
    },
    formatYM: function formatYM(val) {
      return _global2.default.formatTime(new Date(val), '.', 'yyyymm');
    }
  },
  data: function data() {
    return {
      right: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAWCAYAAAD0OH0aAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc4QTE2RkJDNDZDRTExRThBMzUxQzgzODhGRTgyREFCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc4QTE2RkJENDZDRTExRThBMzUxQzgzODhGRTgyREFCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzhBMTZGQkE0NkNFMTFFOEEzNTFDODM4OEZFODJEQUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzhBMTZGQkI0NkNFMTFFOEEzNTFDODM4OEZFODJEQUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz734g1vAAABDklEQVR42oyTv07CYBTFKzExAQTDjG0V3kAMAZ1MmQyj8Qmc9MVcHTDGpHVk40+gFeoIBKzoI8i5ySHpwPd9nOSXdDi/NL339sD/6D5YlnUHHkFsGZIB96AFfFDdR3gCS1AGATg3CZ/gBqxS0plOkESUEmBTcnWCJExJDiVHJ0hGwKPkUrJ1gmTIqf3wW0Q61QmSAaU1pxZwIEpB0qf0CypbKWPYU4/SH5f6bBIkeXDE55JJuAYdkAUz0NYJVyznwJw7+lIJTZaPwYLlWDWlBssFHqWUp6o91MErKPIYpTxRbfoSvLH8zXKkuqUaeGc5YTlUXevFjvJY9z+8gBOWPV6sMod89T+45aVqsxFgALQSPR7FtXcOAAAAAElFTkSuQmCC',
      billList1: [{
        "endPayDate": 1391097600000, //最后缴款日期
        "reductionAmount": 0.0, //减免金额
        "amountPaid": 46460.12, //已缴金额
        "merchantId": 10,
        "contractNo": "五玠坊中久科技", //所属项目
        "actualAmount": 0.0, //待缴金额
        "project": "万科五玠坊", //合同名称
        "costAmount": 46460.12, //应缴金额
        "settleDate": 1388851200000, //结算期间
        "id": 9830,
        "projectId": 7,
        "merchantName": "张海占公司", //商户名称
        "arrearsNo": "HDAR-0104160922000119" //账单编号
      }, {
        "endPayDate": 1527696000000,
        "reductionAmount": 0.0,
        "amountPaid": 0.0,
        "merchantId": 10,
        "contractNo": "app营收测试",
        "actualAmount": 27641.33,
        "project": "虹桥万科中心",
        "costAmount": 28640.33,
        "settleDate": 1525104000000,
        "id": 15352,
        "projectId": 4,
        "merchantName": "张海占公司",
        "arrearsNo": "AR-021-00005277"
      }]
    };
  },
  created: function created() {
    if (WXEnvironment.platform == "Web") {
      this.billList = this.billList1;
    }
  },

  methods: {
    goPage: function goPage(name, id) {
      var url = url = _global2.default.getUrl(weex.config.bundleUrl, 'views/onlineBill/billDetails.js?id=' + id);
      navigator.push({
        url: url,
        animated: 'true'
      });
    }
  }
};

/***/ }),

/***/ 59:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', _vm._l((_vm.billList), function(item) {
    return (_vm.billList.length > 0) ? _c('div', {
      staticClass: ["billList"]
    }, [_c('div', {
      staticClass: ["bill"]
    }, [_c('text', {
      staticClass: ["bill-text-name"]
    }, [_vm._v(_vm._s(_vm.type))]), _c('text', {
      staticClass: ["bill-text-money"]
    }, [_vm._v(_vm._s(item.actualAmount.toFixed(2)) + "元")])]), _c('div', {
      staticClass: ["bill-detail"]
    }, [_c('div', {
      staticClass: ["bill-detail-name"]
    }, [_c('div', {
      staticClass: ["flex-dir-row", "mar-b30"]
    }, [_c('text', {
      staticClass: ["f-size-24", "t-color-999"]
    }, [_vm._v("商户名称")]), _c('text', {
      staticClass: ["f-size-24", "t-color-333", "mar-l20"]
    }, [_vm._v(_vm._s(item.merchantName))])]), _c('div', {
      staticClass: ["flex-dir-row", "mar-b30"]
    }, [_c('text', {
      staticClass: ["f-size-24", "t-color-999"]
    }, [_vm._v("合同名称")]), _c('text', {
      staticClass: ["f-size-24", "t-color-333", "mar-l20", "tx-elp"]
    }, [_vm._v(_vm._s(item.contractNo))])]), _c('div', {
      staticClass: ["flex-dir-row", "mar-b30"]
    }, [_c('text', {
      staticClass: ["f-size-24", "t-color-999"]
    }, [_vm._v("所属项目")]), _c('text', {
      staticClass: ["f-size-24", "t-color-333", "mar-l20", "flex-1"]
    }, [_vm._v(_vm._s(item.project))]), _c('text', {
      staticClass: ["f-size-24", "t-color-999"]
    }, [_vm._v("账单编号")]), _c('text', {
      staticClass: ["f-size-24", "t-color-333", "mar-l20", "flex-1"]
    }, [_vm._v(_vm._s(item.arrearsNo))])]), _c('div', {
      staticClass: ["flex-dir-row", "mar-b30"]
    }, [_c('text', {
      staticClass: ["f-size-24", "t-color-999"]
    }, [_vm._v("结算期间")]), _c('text', {
      staticClass: ["f-size-24", "t-color-333", "mar-l20", "flex-1"]
    }, [_vm._v(_vm._s(_vm._f("formatYM")(item.settleDate)))])])]), _c('div', {
      staticClass: ["bill-detail-money"]
    }, [_c('div', {
      staticClass: ["flex-dir-row", "mar-b30"]
    }, [_c('text', {
      staticClass: ["f-size-24", "t-color-999"]
    }, [_vm._v("应缴金额")]), _c('text', {
      staticClass: ["f-size-24", "t-color-333", "mar-l20", "flex-1"]
    }, [_vm._v(_vm._s(item.costAmount.toFixed(2)) + "元")]), _c('text', {
      staticClass: ["f-size-24", "t-color-999"]
    }, [_vm._v("已缴金额")]), _c('text', {
      staticClass: ["f-size-24", "t-color-333", "mar-l20", "flex-1"]
    }, [_vm._v(_vm._s(item.amountPaid.toFixed(2)) + "元")])]), _c('div', {
      staticClass: ["flex-dir-row", "mar-b30"]
    }, [_c('text', {
      staticClass: ["f-size-24", "t-color-999"]
    }, [_vm._v("减免金额")]), _c('text', {
      staticClass: ["f-size-24", "t-color-333", "mar-l20", "flex-1"]
    }, [_vm._v(_vm._s(item.reductionAmount.toFixed(2)) + "元")]), _c('text', {
      staticClass: ["f-size-24", "t-color-999"]
    }, [_vm._v("待缴金额")]), _c('text', {
      staticClass: ["f-size-24", "t-color-333", "mar-l20", "flex-1"]
    }, [_vm._v(_vm._s(item.actualAmount.toFixed(2)) + "元")])]), _c('div', {
      staticClass: ["flex-dir-row", "mar-b30"]
    }, [_c('text', {
      staticClass: ["f-size-24", "t-color-999"]
    }, [_vm._v("最后缴款日期")]), _c('text', {
      staticClass: ["f-size-24", "t-color-333", "mar-l20", "flex-1"]
    }, [_vm._v(_vm._s(_vm._f("formatTime")(item.endPayDate)))])])])]), _c('div', {
      staticClass: ["godetails"],
      on: {
        "click": function($event) {
          _vm.goPage('billDetails', item.arrearsNo)
        }
      }
    }, [_c('text', {
      staticClass: ["f-size-28"]
    }, [_vm._v("查看账单详情")]), _c('image', {
      staticClass: ["icon", "mar-l20"],
      attrs: {
        "src": _vm.right
      }
    })])]) : _vm._e()
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });