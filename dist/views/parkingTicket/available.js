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
/******/ 	return __webpack_require__(__webpack_require__.s = 617);
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

/***/ 10:
/***/ (function(module, exports) {

module.exports = {
  "page": {
    "width": "750",
    "flex": 1,
    "backgroundColor": "#ffffff",
    "alignItems": "center"
  },
  "icon": {
    "width": "200",
    "height": "200",
    "marginBottom": "28",
    "marginTop": "200"
  },
  "text": {
    "fontSize": "28",
    "fontFamily": "PingFangSC-Regular",
    "fontWeight": "400",
    "color": "rgba(153,153,153,1)"
  }
}

/***/ }),

/***/ 11:
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

var navigator = weex.requireModule('navigator');
exports.default = {
  name: 'default',
  props: {
    text: {
      type: String,
      default: '暂无数据'
    }
  },
  created: function created() {},
  data: function data() {
    return {
      isAndroid: WXEnvironment.osName == 'android'
    };
  },

  methods: {
    reload: function reload() {
      this.$emit('reload');
    }
  }
};

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["page"],
    on: {
      "click": _vm.reload
    }
  }, [_c('image', {
    staticClass: ["icon"],
    attrs: {
      "src": "data:image/png;base64,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"
    }
  }), _c('text', {
    staticClass: ["text"]
  }, [_vm._v(_vm._s(_vm.text))])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(15)
)

/* script */
__vue_exports__ = __webpack_require__(16)

/* template */
var __vue_template__ = __webpack_require__(17)
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
__vue_options__.__file = "/Users/denya/Desktop/workspace/weex/h5/src/views/components/downLoading.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-18e8fd80"
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


/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports = {
  "refresh": {
    "width": 750,
    "alignItems": "center"
  },
  "thisWidth": {
    "width": 710
  },
  "indicator-text": {
    "color": "#888888",
    "fontSize": "32",
    "textAlign": "center",
    "marginTop": "16"
  },
  "indicator": {
    "marginTop": "16",
    "height": "40",
    "width": "40",
    "color": "#000000"
  }
}

/***/ }),

/***/ 16:
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

/*
（父组件调用）用法：
import upLoading from '../components/upLoading';
<upLoading ref="loading" @onloading="onloading"></upLoading>
复位：
const $loading = this.$refs.loading;
if($loading) $loading.update(false);
*/
exports.default = {
  name: 'downLoading',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    thisWidth: {
      type: Boolean,
      default: false
    }
  },
  filters: {},
  data: function data() {
    return {
      loadinging: false,
      loadingText: '下拉刷新'
    };
  },
  created: function created() {},

  methods: {
    onrefresh: function onrefresh(event) {
      this.loadinging = true;
      this.loadingText = '加载中';
      this.$emit('onrefresh', event);
    },
    onpullingdown: function onpullingdown() {
      this.$emit('onpullingdown', event);
    },
    update: function update(f) {
      this.loadingText = '下拉刷新';
      this.loadinging = f;
    },
    showView: function showView(f) {
      this.show = f;
    }
  }
};

/***/ }),

/***/ 163:
/***/ (function(module, exports) {

module.exports = {
  "wraper": {
    "flex": 1,
    "backgroundColor": "rgb(243,244,246)",
    "width": "750"
  },
  "scrollerList": {
    "flex": 1,
    "width": "750"
  },
  "list_wrap": {
    "width": "750",
    "overflow": "hidden",
    "paddingTop": 0,
    "paddingRight": "20",
    "paddingBottom": 0,
    "paddingLeft": "20"
  },
  "listItem": {
    "width": "710",
    "height": "272",
    "borderRadius": "16",
    "backgroundColor": "#ffffff",
    "position": "relative",
    "marginTop": "22"
  },
  "item_top": {
    "width": "710",
    "height": "180"
  },
  "item_top1": {
    "height": "120",
    "width": "710",
    "paddingTop": "16",
    "paddingRight": "16",
    "paddingBottom": "16",
    "paddingLeft": "16",
    "flexDirection": "row"
  },
  "item_top11": {
    "flex": 1,
    "height": "88",
    "paddingTop": "24",
    "paddingRight": 0,
    "paddingBottom": "24",
    "paddingLeft": "28",
    "flexDirection": "row"
  },
  "item_top11_icon": {
    "width": "16",
    "height": "16",
    "borderRadius": "8",
    "marginTop": "12",
    "marginRight": "14",
    "marginBottom": "12",
    "marginLeft": 0
  },
  "item_top11_text": {
    "height": "40",
    "lineHeight": "40",
    "color": "#333333",
    "fontSize": "28"
  },
  "item_top2": {
    "width": "710",
    "flexDirection": "row",
    "justifyContent": "center",
    "height": "12"
  },
  "line": {
    "width": "560",
    "height": "12",
    "borderRadius": "6",
    "backgroundColor": "#EAEAEA"
  },
  "line2": {
    "height": "12",
    "borderRadius": "6",
    "backgroundColor": "#C4F0FF"
  },
  "line3": {
    "height": "12",
    "borderRadius": "6",
    "backgroundColor": "#00BDFF"
  },
  "item_bottom": {
    "width": "710",
    "height": "88",
    "borderTopWidth": "2",
    "borderTopColor": "#DADADA",
    "borderTopStyle": "dashed",
    "paddingTop": "16",
    "paddingRight": "28",
    "paddingBottom": "16",
    "paddingLeft": "28",
    "flexDirection": "row"
  },
  "bottom1": {
    "height": "56"
  },
  "bottom1_text": {
    "height": "56",
    "lineHeight": "56",
    "color": "#333333",
    "fontSize": "28",
    "marginRight": "16",
    "textAlign": "left"
  },
  "bottom2": {
    "flex": 1
  },
  "bottom2_text": {
    "height": "56",
    "lineHeight": "56",
    "color": "#999999",
    "fontSize": "28",
    "marginRight": "16",
    "textAlign": "left",
    "flex": 1
  },
  "bottom3": {
    "width": "140",
    "height": "56",
    "textAlign": "center",
    "lineHeight": "56",
    "borderWidth": "1",
    "borderColor": "#00BDFF",
    "borderRadius": "28"
  },
  "bottom3_text": {
    "height": "56",
    "lineHeight": "56",
    "color": "#00BDFF",
    "fontSize": "24",
    "textAlign": "center"
  },
  "itemLeftM": {
    "position": "absolute",
    "bottom": "77",
    "width": "24",
    "backgroundColor": "rgb(243,244,246)",
    "height": "24",
    "borderRadius": "12",
    "left": "-12"
  },
  "itemRightM": {
    "position": "absolute",
    "bottom": "77",
    "width": "24",
    "backgroundColor": "rgb(243,244,246)",
    "height": "24",
    "borderRadius": "12",
    "right": "-12"
  },
  "tips": {
    "width": "694",
    "overflow": "hidden",
    "paddingTop": 0,
    "paddingRight": "8",
    "paddingBottom": 0,
    "paddingLeft": "8",
    "marginTop": "60"
  },
  "tips_text": {
    "fontSize": "24",
    "color": "#999999",
    "textAlign": "left"
  },
  "inpDiv": {
    "width": "710",
    "height": "196",
    "marginBottom": "80",
    "backgroundColor": "#ffffff",
    "marginTop": "20"
  },
  "inp1": {
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": "20",
    "height": "88",
    "flexDirection": "row"
  },
  "inp1_text": {
    "width": "140",
    "textAlign": "left",
    "height": "88",
    "lineHeight": "88",
    "color": "#333333",
    "fontSize": "28"
  },
  "inp2_text": {
    "textAlign": "left",
    "height": "88",
    "lineHeight": "88",
    "color": "#999999",
    "fontSize": "28"
  },
  "inp2_textActive": {
    "color": "#333333"
  },
  "inpBox": {
    "flex": 1,
    "height": "88",
    "borderBottomWidth": "2",
    "borderStyle": "solid",
    "borderBottomColor": "rgba(234,234,234,1)",
    "fontSize": "28",
    "lineHeight": "88",
    "color": "#333333",
    "flexDirection": "row"
  },
  "inp_text": {
    "flex": 1,
    "flexDirection": "row"
  },
  "inp4": {
    "width": "100",
    "height": "36",
    "borderRadius": "18",
    "backgroundColor": "#16BC84",
    "right": "23",
    "position": "absolute",
    "bottom": "26"
  },
  "inp4_text": {
    "width": "100",
    "height": "36",
    "fontSize": "24",
    "lineHeight": "36",
    "textAlign": "center",
    "color": "#ffffff"
  },
  "keyBoard_top": {
    "width": "750",
    "height": "368",
    "borderTopLeftRadius": "16",
    "borderTopRightRadius": "16",
    "backgroundColor": "#ffffff"
  },
  "keyBoard_top_title": {
    "width": "750",
    "height": "88",
    "flexDirection": "row",
    "paddingTop": "22",
    "paddingRight": "28",
    "paddingBottom": "22",
    "paddingLeft": "28",
    "marginBottom": "58"
  },
  "title_text1": {
    "width": "100",
    "height": "44",
    "lineHeight": "44",
    "textAlign": "left",
    "fontSize": "28"
  },
  "title_text2": {
    "height": "44",
    "lineHeight": "44",
    "textAlign": "center",
    "fontSize": "32",
    "color": "#333333",
    "flex": 1
  },
  "title_text3": {
    "width": "100",
    "height": "44",
    "lineHeight": "44",
    "textAlign": "right",
    "fontSize": "28"
  },
  "keyBoard": {
    "width": "750",
    "height": "432",
    "backgroundColor": "#E6E6E6"
  },
  "keyBoardX": {
    "height": "500",
    "paddingBottom": "68"
  },
  "keyLine": {
    "flexDirection": "row",
    "justifyContent": "center"
  },
  "keyItem": {
    "marginTop": "20",
    "marginRight": "6",
    "marginBottom": 0,
    "marginLeft": "6"
  },
  "keyItem_text": {
    "width": "62",
    "height": "84",
    "backgroundColor": "#ffffff",
    "borderRadius": "6",
    "lineHeight": "84",
    "textAlign": "center",
    "color": "#000000",
    "fontSize": "46"
  },
  "keyBoardCount": {
    "width": "750",
    "height": "432",
    "backgroundColor": "#E6E6E6"
  },
  "keyCountLine1": {
    "height": "84",
    "width": "750",
    "marginTop": "15",
    "flexDirection": "row",
    "justifyContent": "center"
  },
  "keyCountLine": {
    "height": "84",
    "width": "750",
    "marginTop": "24",
    "justifyContent": "center",
    "flexDirection": "row"
  },
  "keyCountLineItem": {
    "width": "62",
    "height": "84",
    "borderRadius": "10",
    "backgroundColor": "#FEFEFE",
    "marginTop": 0,
    "marginRight": "6",
    "marginBottom": 0,
    "marginLeft": "6"
  },
  "keyCountLineItem_text": {
    "fontSize": "46",
    "height": "84",
    "lineHeight": "84",
    "textAlign": "center",
    "color": "#000000",
    "borderRadius": "10"
  },
  "keyCountLineItem_textHui": {
    "color": "#dadada"
  },
  "keyCountLineItem_textActive": {
    "color": "#000000"
  },
  "toggleBgColor": {
    "backgroundColor": "#DADADA"
  },
  "deleteKeyCount_icon": {
    "width": "44",
    "height": "34",
    "marginTop": "22",
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": "18"
  },
  "deleteKeyCount": {
    "width": "84",
    "height": "84",
    "borderRadius": "10",
    "backgroundColor": "#C9C9C9",
    "marginTop": 0,
    "marginRight": "10",
    "marginBottom": 0,
    "marginLeft": "14"
  },
  "done": {
    "width": "174",
    "height": "84",
    "borderRadius": "10",
    "backgroundColor": "#C9C9C9",
    "marginTop": 0,
    "marginRight": "6",
    "marginBottom": 0,
    "marginLeft": "10"
  },
  "done_text": {
    "fontSize": "32",
    "lineHeight": "84",
    "width": "174",
    "height": "84",
    "textAlign": "center",
    "color": "#000000"
  },
  "deleteKeyCountBgColor": {
    "backgroundColor": "#ffffff"
  },
  "inpBox2": {
    "width": "4",
    "height": "36",
    "borderRadius": "2",
    "backgroundColor": "#446FEF",
    "marginTop": "26"
  },
  "coupon": {
    "width": "750",
    "height": "512",
    "backgroundColor": "#F8F8F8"
  },
  "couponX": {
    "height": "576",
    "paddingBottom": "64"
  },
  "coupon_title": {
    "width": "750",
    "height": "72",
    "flexDirection": "row",
    "paddingTop": "19",
    "paddingRight": "40",
    "paddingBottom": "19",
    "paddingLeft": "40"
  },
  "titleText": {
    "width": "140",
    "height": "34",
    "color": "#999999",
    "lineHeight": "34",
    "fontSize": "24",
    "textAlign": "right"
  },
  "titleIconBox": {
    "flex": 1,
    "flexDirection": "row",
    "justifyContent": "center"
  },
  "titleIcon": {
    "width": "20",
    "height": "10",
    "marginTop": "12"
  },
  "coupon_content": {
    "paddingTop": 0,
    "paddingRight": "10",
    "paddingBottom": 0,
    "paddingLeft": "10",
    "flexDirection": "row",
    "width": "750",
    "height": "420"
  },
  "contentItemBox": {
    "marginTop": 0,
    "marginRight": "10",
    "marginBottom": 0,
    "marginLeft": "10",
    "width": "344",
    "height": "420",
    "borderRadius": "16",
    "backgroundColor": "#ffffff",
    "paddingTop": "28",
    "paddingRight": "24",
    "paddingBottom": 0,
    "paddingLeft": "30"
  },
  "leftBox1": {
    "width": "290",
    "height": "44",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "marginBottom": "24"
  },
  "leftBox1_text": {
    "color": "#999999",
    "fontSize": "24",
    "lineHeight": "34",
    "textAlign": "left"
  },
  "leftBox1Icon": {
    "height": "44",
    "width": "50"
  },
  "leftBox2": {
    "width": "290",
    "height": "72",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "marginBottom": "48"
  },
  "leftBox2_text": {
    "color": "#F39800",
    "fontSize": "60",
    "lineHeight": "72",
    "textAlign": "left",
    "marginRight": "6"
  },
  "leftBox2_text2": {
    "fontSize": "24",
    "color": "#F39800",
    "lineHeight": "34",
    "textAlign": "left",
    "marginTop": "6"
  },
  "leftBox3": {
    "marginBottom": "18"
  },
  "leftBox3_text": {
    "color": "#333333",
    "fontSize": "28",
    "lineHeight": "34"
  },
  "leftBox4_text": {
    "color": "#999999",
    "fontSize": "24",
    "lineHeight": "30"
  },
  "rightBox1": {
    "width": "290",
    "height": "34",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "marginBottom": "24"
  },
  "rightBox1_text": {
    "color": "#999999",
    "fontSize": "24",
    "lineHeight": "34",
    "textAlign": "left"
  },
  "rightBox2": {
    "width": "290",
    "height": "26",
    "flexDirection": "row",
    "justifyContent": "center",
    "marginBottom": "14"
  },
  "rightBox2_text": {
    "width": "290",
    "color": "#00BDFF",
    "lineHeight": "26",
    "fontSize": "22",
    "textAlign": "center"
  },
  "rightBox3": {
    "width": "290",
    "height": "72",
    "flexDirection": "row",
    "justifyContent": "center",
    "marginBottom": "14"
  },
  "rightBox3_text": {
    "width": "290",
    "color": "#00BDFF",
    "lineHeight": "72",
    "fontSize": "60",
    "textAlign": "center"
  },
  "rightBox4": {
    "marginBottom": "40",
    "width": "290",
    "height": "10",
    "flexDirection": "row",
    "justifyContent": "center"
  },
  "rightBox5": {
    "width": "290",
    "height": "56",
    "flexDirection": "row",
    "justifyContent": "center",
    "marginBottom": "18"
  },
  "rightBox6": {
    "width": "290",
    "height": "56",
    "flexDirection": "row",
    "justifyContent": "center",
    "marginBottom": "18"
  },
  "rightBox5_text": {
    "width": "200",
    "height": "56",
    "color": "#ffffff",
    "lineHeight": "56",
    "textAlign": "center",
    "backgroundColor": "#00BDFF",
    "borderRadius": "28",
    "fontSize": "26"
  },
  "rightBox6_text": {
    "width": "200",
    "height": "56",
    "color": "#ffffff",
    "lineHeight": "56",
    "textAlign": "center",
    "backgroundColor": "#00BDFF",
    "borderRadius": "28",
    "fontSize": "26"
  },
  "thisDefault": {
    "flex": 1,
    "backgroundColor": "#ffffff",
    "width": "750"
  },
  "defauleList": {
    "flex": 1
  },
  "defauleCellItem": {
    "flex": 1,
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "defaultBox": {
    "marginTop": "200",
    "marginBottom": "200"
  },
  "thisDefault_icon": {
    "width": "200",
    "height": "200",
    "marginBottom": "32"
  },
  "thisDefault_text": {
    "fontSize": "28",
    "lineHeight": "40",
    "height": "40",
    "textAlign": "center",
    "color": "#999999"
  },
  "bottomBtn": {
    "width": "750",
    "height": "136",
    "backgroundColor": "#f8f8f8",
    "position": "fixed",
    "left": 0,
    "bottom": 0,
    "flexDirection": "column",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "bottomBtnX": {
    "height": "200",
    "paddingBottom": "64"
  },
  "bottomBtn_icon": {
    "width": "20",
    "height": "10",
    "marginTop": "28",
    "marginBottom": "26"
  },
  "bottomBtn_text": {
    "height": "44",
    "fontSize": "32",
    "color": "#00BDFF",
    "lineHeight": "44",
    "textAlign": "center"
  }
}

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _global = __webpack_require__(0);

var _global2 = _interopRequireDefault(_global);

var _api = __webpack_require__(2);

var _api2 = _interopRequireDefault(_api);

var _default = __webpack_require__(9);

var _default2 = _interopRequireDefault(_default);

var _downLoading = __webpack_require__(14);

var _downLoading2 = _interopRequireDefault(_downLoading);

var _index = __webpack_require__(97);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(28);

var _index4 = _interopRequireDefault(_index3);

var _modalframe = __webpack_require__(96);

var _modalframe2 = _interopRequireDefault(_modalframe);

var _base64ParkingTicket = __webpack_require__(46);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timePicker = weex.requireModule('timePicker'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
var navigator = weex.requireModule('navigator');
var toast = weex.requireModule('toast');
var weexParams = weex.config.params;
exports.default = {
  name: 'available',
  components: {
    WxcPopupMask: _index2.default,
    WxcPopup: _index4.default,
    modalframe: _modalframe2.default,
    downLoading: _downLoading2.default
  },
  props: {
    activeTab: 0,
    showParkId: '',
    showParkName: ""
  },
  data: function data() {
    return {
      isiOS7: false,
      isiPhoneX: false,
      iconBottom: (0, _base64ParkingTicket.iconBottom)(),
      iconTicket: (0, _base64ParkingTicket.iconTicket)(),
      defaultIcon: (0, _base64ParkingTicket.defaultIcon)(),
      iconTop: (0, _base64ParkingTicket.iconTop)(),
      // 自定义键盘相关
      showKeyBoard: true,
      keyBoardData: [['川', '鄂', '赣', '桂', '贵', '甘', '黑', '沪', '京', '津'], ['冀', '晋', '吉', '辽', '鲁', '蒙', '闽', '宁', '琼'], ['青', '苏', '陕', '晥', '湘', '新', '豫'], ['粤', '渝', '云', '浙', '藏']],
      keyBoardCountData1: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      keyBoardCountData2: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'O', 'I', 'P'],
      keyBoardCountData3: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z'],
      keyBoardCountData4: ['X', 'C', 'V', 'B', 'N', 'M'],
      isShow: false,
      showGuangBiao: false,
      inputText2: "请输入车牌号",
      carId: "",
      keyBoardClear: (0, _base64ParkingTicket.keyBoardClear)(),
      getCarIdType: "11111",
      getCarIdTypeIndex: "22222",
      deleteKeyCountIndex: "33333",
      // 自定义键盘结束
      //
      showBottomBtn: 0,
      // 优惠券
      isShowCoupon: true,
      // 
      showDialog: false,
      // 选择的年月
      selectMounth: "",
      selectYear: "",
      //使用统计列表
      couponList: "",
      //停车券信息
      parkCoupon: "",
      parkId: "",
      parkName: "",
      //指派月份
      zhipaiMounth: ""
    };
  },
  created: function created() {
    var self = this;
    var iPhoneXHeight = 2436;
    this.isiOS7 = WXEnvironment.osName == 'iOS';
    this.isiPhoneX = this.isiOS7 && WXEnvironment.deviceHeight == iPhoneXHeight;
    this.moveGuangBiao();
    var now = new Date();
    this.selectYear = now.getFullYear(); //得到年份
    this.selectMounth = now.getMonth() + 1; //得到月份
    if (this.selectMounth < 10) {
      this.selectMounth = '0' + this.selectMounth;
    }
    var weexParams = weex.config.params || {};
    this.mall = weexParams.company;

    var assignCoupon = new BroadcastChannel("assignCoupon");
    assignCoupon.onmessage = function (event) {
      if (event.data == '1') {
        self.myCompanyCoupon(self.parkId);
      } else if (event.data == '0') {}
    };
  },

  watch: {
    activeTab: function activeTab(val, oldVal) {
      this.showBottomBtn = val;
      this.isShowCoupon = false;
      this.showDialog = false;
      this.isShow = false;
    },
    showParkId: function showParkId(val, oldVal) {
      this.parkId = val;
      this.getParkCoupon(val); //获取停车券信息
      this.myCompanyCoupon(val); //停车券使用统计列表
    },
    showParkName: function showParkName(val, oldVal) {
      this.parkName = val;
    }
  },
  methods: {
    details: function details(sumCount, assignCount, useCount, couponDate) {
      var self = this;
      var url = _global2.default.getUrl(weex.config.bundleUrl, 'views/parkingTicket/details.js' + "?sumCount=" + sumCount + "&assignCount=" + assignCount + "&useCount=" + useCount + "&couponDate=" + couponDate + "&parkId=" + self.parkId);
      navigator.push({
        url: url,
        animated: 'true'
      });
    },
    evaluate: function evaluate(orderNo, id, marketId) {
      var url = _global2.default.getUrl(weex.config.bundleUrl, 'views/MyRevision/evaluate.js');
      navigator.push({
        url: url + '?come=meeting&orderNo=' + orderNo + '&id=' + id + '&marketId=' + marketId,
        animated: 'true'
      });
    },
    buttonClicked: function buttonClicked(couponDate) {
      var self = this;
      // 指派的月份
      this.zhipaiMounth = couponDate;
      this.isShow = true;
      this.isShowCoupon = false;
      this.showGuangBiao = true;
      if (self.inputText2 == '请输入车牌号') {
        self.inputText2 = '';
      } else if (self.inputText2 != '请输入车牌号' && self.inputText2.length > 1) {
        self.showKeyBoard = false;
      }
      this.$refs['input1'].blur();
    },
    overlayClicked: function overlayClicked() {
      var self = this;
      this.isShow = false;
      this.showGuangBiao = false;
      if (self.inputText2 == '') {
        self.inputText2 = '请输入车牌号';
      }
    },
    focusInput1: function focusInput1() {
      var self = this;
      showGuangBiao = false;
      if (self.inputText2 == '') {
        self.inputText2 = '请输入车牌号';
      }
    },
    moveGuangBiao: function moveGuangBiao() {
      var self = this;
      var inpBox2 = this.$refs.inpBoxK;
      animation.transition(inpBox2, {
        styles: {
          opacity: '1'
        },
        duration: 500, //ms
        timingFunction: 'ease',
        delay: 0 //ms
      }, function () {
        self.moveGuangBiaoBack();
      });
    },
    moveGuangBiaoBack: function moveGuangBiaoBack() {
      var self = this;
      var inpBox2 = this.$refs.inpBoxK;
      animation.transition(inpBox2, {
        styles: {
          opacity: '0'
        },
        duration: 500, //ms
        timingFunction: 'ease',
        delay: 0 //ms
      }, function () {
        self.moveGuangBiao();
      });
    },
    getCarId: function getCarId(index, keyIndex, type) {
      var self = this;

      self.getCarIdType = keyIndex;
      self.getCarIdTypeIndex = index;

      if (self.showKeyBoard) {
        //切换键盘
        self.showKeyBoard = false;
      }

      if (self.inputText2 != '请输入车牌号' && self.inputText2.length > 7) {
        //判断是否大于8位
        return;
      }

      if (type == '1') {
        this.carId = this.keyBoardData[index][keyIndex];
        this.inputText2 = this.keyBoardData[index][keyIndex];
      } else if (type == '2' && self.inputText2.length < 2) {
        this.inputText2 += keyIndex[index];
      } else if ((type == '2' || type == '3') && self.inputText2.length > 1) {
        this.inputText2 += keyIndex[index];
      }
      // 切换按钮底部颜色
      self.toggleBgColor = true;
      setTimeout(function () {
        self.toggleBgColor = false;
        self.getCarIdType = "11111";
        self.getCarIdTypeIndex = "22222";
      }, 100);
    },
    deleteKeyCount: function deleteKeyCount() {
      var self = this;
      self.deleteKeyCountIndex = 1;
      // 切换按钮底部颜色
      self.toggleBgColor2 = true;
      setTimeout(function () {
        self.toggleBgColor2 = false;
        self.getCarIdType = "11111";
        self.getCarIdTypeIndex = "22222";
        self.deleteKeyCountIndex = '33333';
      }, 100);
      if (self.inputText2 != '请输入车牌号' && self.inputText2.length != 0) {
        self.inputText2 = self.inputText2.substring(0, self.inputText2.length - 1);
      }
      if (self.inputText2 == '') {
        self.showKeyBoard = true;
      }
    },
    done: function done() {
      this.overlayClicked();
    },
    buttonClickedCoupon: function buttonClickedCoupon() {
      var self = this;
      this.isShowCoupon = true;
    },
    overlayClickedCoupon: function overlayClickedCoupon() {
      this.isShowCoupon = false;
    },
    goPage: function goPage() {
      var url = url = _global2.default.getUrl(weex.config.bundleUrl, 'views/parking/deadline/deadline.js');
      navigator.push({
        url: url,
        animated: 'true'
      });
    },
    showDialogBox: function showDialogBox() {
      this.showDialog = true;
    },
    closeModal: function closeModal() {
      this.showDialog = false;
    },

    // 选择日期
    timeSelect: function timeSelect() {
      var self = this;
      var param = _global2.default.getParams(weex.config.bundleUrl);
      var params = {
        "year": 1,
        "month": 1,
        "day": 0,
        "hours": 0,
        "minute": 0,
        "second": 0,
        "yearUnit": "年",
        "monthUnit": "月"
      };
      timePicker.openTimePicker(params, function (src) {
        self.selectMounth = src.split('-')[1];
        self.selectYear = src.split('-')[0];
      });
    },
    apply: function apply(count) {
      var self = this;
      var weexParams = weex.config.params || {};
      var params = {
        "mallId": weexParams.marketId,
        "parkId": self.parkId,
        "companyId": weexParams.companyId,
        "companyName": weexParams.company,
        "couponId": self.parkCoupon.id,
        "couponDate": self.selectYear + '' + self.selectMounth,
        "couponNumber": count,
        "userId": weexParams.userId,
        "userName": weexParams.userName
      };
      toast.showLoadingMessage("正在申请...");
      _api2.default.applyCoupon(params, function (ret) {
        toast.close();
        if (!ret.success) {
          toast.showErrorMessage(ret.message);
          return;
        }
        if (ret.code == '10000' && ret.success) {
          toast.showMessage(ret.message, 2);
          setTimeout(function () {
            self.myCompanyCoupon(self.parkId);
          }, 1500);
        } else {
          toast.showMessage(ret.message);
        }
      });
    },
    getParkCoupon: function getParkCoupon(parkId) {
      //获取停车券信息
      var self = this;
      var weexParams = weex.config.params || {};
      var params = {
        "mallId": weexParams.marketId,
        "parkId": parkId
      };
      _api2.default.getParkCoupon(params, function (ret) {
        toast.close();
        if (!ret.success) {
          toast.showErrorMessage(ret.message);
          return;
        }
        if (ret.code == '10000' && ret.success) {
          self.parkCoupon = ret.body.parkCoupon;
        } else {
          toast.showMessage(ret.message);
        }
      });
    },
    myCompanyCoupon: function myCompanyCoupon(parkId) {
      var _this = this;

      //停车券使用统计列表
      var self = this;
      var weexParams = weex.config.params || {};
      var params = {
        "companyId": weexParams.companyId,
        "parkId": parkId,
        "type": 1
      };
      _api2.default.myCompanyCoupon(params, function (ret) {
        toast.close();
        //下拉复位
        var $refresh = _this.$refs.refresh;
        if ($refresh) $refresh.update(false);
        if (!ret.success) {
          self.couponList = '';
          // toast.showErrorMessage(ret.message);
          return;
        }
        if (ret.code == '10000' && ret.success) {
          self.couponList = ret.body.couponList;
        } else {
          self.couponList = '';
          // toast.showMessage(ret.message);
        }
      });
    },
    assignCoupon: function assignCoupon(parkId) {
      //指派优惠券
      var self = this;

      if (self.inputText2 == '请输入车牌号') {
        //判断是否大于8位
        modal.alert({
          message: "请输入车牌号"
        });
        return;
      } else if (self.inputText2.length < 7) {
        modal.alert({
          message: "请输入合法车牌号"
        });
        return;
      }
      var weexParams = weex.config.params || {};
      toast.showLoadingMessage("正在指派...");
      var params = {
        "companyId": weexParams.companyId,
        "couponDate": self.zhipaiMounth,
        "plateNo": self.inputText2,
        "userId": weexParams.userId,
        "userName": weexParams.userName
      };
      _api2.default.AssignCoupon(params, function (ret) {
        toast.close();

        if (!ret.success) {
          toast.showErrorMessage(ret.message);
          return;
        }
        if (ret.code == '10000' && ret.success) {
          toast.showMessage(ret.message, 2);
          self.inputText2 = '请输入车牌号';
          self.isShow = false;
          self.myCompanyCoupon(self.parkId);
        } else {
          toast.showMessage(ret.message);
        }
      });
    },
    onrefresh: function onrefresh() {
      var self = this;
      this.myCompanyCoupon(self.parkId);
    }
  },
  filters: {}

};

/***/ }),

/***/ 165:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wraper"],
    on: {
      "click": _vm.overlayClicked
    }
  }, [(_vm.couponList.length == 0) ? _c('div', {
    staticClass: ["thisDefault"]
  }, [_c('list', {
    staticClass: ["defauleList"]
  }, [_c('cell', {
    staticClass: ["defauleCellItem"],
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    staticClass: ["defaultBox"],
    on: {
      "click": _vm.onrefresh
    }
  }, [_c('image', {
    staticClass: ["thisDefault_icon"],
    attrs: {
      "src": _vm.defaultIcon
    }
  }), _c('text', {
    staticClass: ["thisDefault_text"]
  }, [_vm._v("暂无可用")])])])])]) : _vm._e(), (_vm.couponList.length != 0) ? _c('list', {
    staticClass: ["scrollerList"]
  }, [_c('downLoading', {
    ref: "refresh",
    attrs: {
      "tipsColor": false
    },
    on: {
      "onrefresh": _vm.onrefresh
    }
  }), _c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    staticClass: ["list_wrap"]
  }, _vm._l((_vm.couponList), function(item, index) {
    return _c('div', {
      staticClass: ["listItem"],
      on: {
        "click": function($event) {
          _vm.details(item.sumCount, item.assignCount, item.useCount, item.couponDate)
        }
      }
    }, [_c('div', {
      staticClass: ["item_top"]
    }, [_c('div', {
      staticClass: ["item_top1"]
    }, [_c('div', {
      staticClass: ["item_top11"]
    }, [_c('text', {
      staticClass: ["item_top11_icon"],
      staticStyle: {
        backgroundColor: "#EAEAEA"
      }
    }), _c('text', {
      staticClass: ["item_top11_text"]
    }, [_vm._v("总券数：" + _vm._s(item.sumCount))])]), _c('div', {
      staticClass: ["item_top11"]
    }, [_c('text', {
      staticClass: ["item_top11_icon"],
      staticStyle: {
        backgroundColor: "#C4F0FF"
      }
    }), _c('text', {
      staticClass: ["item_top11_text"]
    }, [_vm._v("已指派：" + _vm._s(item.assignCount))])]), _c('div', {
      staticClass: ["item_top11"]
    }, [_c('text', {
      staticClass: ["item_top11_icon"],
      staticStyle: {
        backgroundColor: "#00BDFF"
      }
    }), _c('text', {
      staticClass: ["item_top11_text"]
    }, [_vm._v("已使用：" + _vm._s(item.useCount))])])]), _c('div', {
      staticClass: ["item_top2"]
    }, [_c('div', {
      staticClass: ["line"]
    }, [_c('div', {
      staticClass: ["line2"],
      style: {
        'width': (560 / item.sumCount) * item.assignCount + 'px'
      }
    }, [_c('div', {
      staticClass: ["line3"],
      style: {
        'width': (560 / item.sumCount) * item.useCount + 'px'
      }
    })])])])]), _c('div', {
      staticClass: ["item_bottom"]
    }, [_vm._m(0, true), _c('div', {
      staticClass: ["bottom2"]
    }, [_c('text', {
      staticClass: ["bottom2_text"]
    }, [_vm._v("（" + _vm._s(item.couponDate) + "）")])]), (item.sumCount > item.assignCount) ? _c('div', {
      staticClass: ["bottom3"],
      on: {
        "click": function($event) {
          _vm.buttonClicked(item.couponDate)
        }
      }
    }, [_c('text', {
      staticClass: ["bottom3_text"]
    }, [_vm._v("指派剩余")])]) : _vm._e()]), _c('div', {
      staticClass: ["itemLeftM"]
    }), _c('div', {
      staticClass: ["itemRightM"]
    })])
  }))])], 1) : _vm._e(), _c('WxcPopupMask', {
    attrs: {
      "width": "750",
      "height": [_vm.isiPhoneX ? '864' : '800'],
      "popupColor": "rgba(255, 255, 255,0)",
      "pos": "bottom",
      "show": _vm.isShow
    },
    on: {
      "wxcPopupOverlayClicked": _vm.overlayClicked
    }
  }, [_c('div', {
    staticClass: ["keyBoard_top"]
  }, [_c('div', {
    staticClass: ["keyBoard_top_title"]
  }, [_c('text', {
    staticClass: ["title_text1"],
    on: {
      "click": _vm.overlayClicked
    }
  }, [_vm._v("取消")]), _c('text', {
    staticClass: ["title_text2"]
  }, [_vm._v("指派车位")]), _c('text', {
    staticClass: ["title_text3"],
    on: {
      "click": _vm.assignCoupon
    }
  }, [_vm._v("确认")])]), _c('div', {
    staticClass: ["inpDiv"]
  }, [_c('div', {
    staticClass: ["inp1"]
  }, [_c('text', {
    staticClass: ["inp1_text"]
  }, [_vm._v("车牌号")]), _c('div', {
    staticClass: ["inpBox"]
  }, [_c('div', {
    staticClass: ["inpBox"]
  }, [_c('div', {
    staticClass: ["inp_text"]
  }, [_c('text', {
    class: ['inp2_text', _vm.inputText2 == '请输入车牌号' ? '' : 'inp2_textActive']
  }, [_vm._v(_vm._s(_vm.inputText2))]), (_vm.showGuangBiao) ? _c('text', {
    ref: "inpBoxK",
    staticClass: ["inpBox2"]
  }) : _vm._e()])])]), (_vm.inputText2.length > 7) ? _c('div', {
    staticClass: ["inp4"]
  }, [_c('text', {
    staticClass: ["inp4_text"]
  }, [_vm._v("新能源")])]) : _vm._e()])])]), _c('div', {
    class: ['keyBoard', _vm.isiPhoneX ? 'keyBoardX' : '']
  }, [_vm._l((_vm.keyBoardData), function(item, index) {
    return (_vm.showKeyBoard) ? _c('div', {
      staticClass: ["keyLine"]
    }, _vm._l((item), function(keyItem, keyIndex) {
      return _c('div', {
        staticClass: ["keyItem"]
      }, [_c('text', {
        class: ['keyItem_text', _vm.toggleBgColor && _vm.getCarIdType == keyIndex && _vm.getCarIdTypeIndex == index ? 'toggleBgColor' : ''],
        on: {
          "click": function($event) {
            _vm.getCarId(index, keyIndex, '1')
          }
        }
      }, [_vm._v(_vm._s(keyItem))])])
    })) : _vm._e()
  }), (!_vm.showKeyBoard) ? _c('div', {
    staticClass: ["keyBoardCount"]
  }, [_c('div', {
    staticClass: ["keyCountLine1"]
  }, _vm._l((_vm.keyBoardCountData1), function(item, index) {
    return _c('div', {
      staticClass: ["keyCountLineItem"],
      on: {
        "click": function($event) {
          _vm.getCarId(index, _vm.keyBoardCountData1, '3')
        }
      }
    }, [_c('text', {
      class: ['keyCountLineItem_text', 'keyCountLineItem_textHui', _vm.inputText2 != '请输入车牌号' && _vm.inputText2.length > 1 ? 'keyCountLineItem_textActive' : '', _vm.toggleBgColor && _vm.getCarIdType == _vm.keyBoardCountData1 && _vm.getCarIdTypeIndex == index && _vm.inputText2 != '请输入车牌号' && _vm.inputText2.length > 1 ? 'toggleBgColor' : '']
    }, [_vm._v(_vm._s(item))])])
  })), _c('div', {
    staticClass: ["keyCountLine"]
  }, _vm._l((_vm.keyBoardCountData2), function(item, index) {
    return _c('div', {
      staticClass: ["keyCountLineItem"],
      on: {
        "click": function($event) {
          _vm.getCarId(index, _vm.keyBoardCountData2, '2')
        }
      }
    }, [_c('text', {
      class: ['keyCountLineItem_text', _vm.toggleBgColor && _vm.getCarIdType == _vm.keyBoardCountData2 && _vm.getCarIdTypeIndex == index ? 'toggleBgColor' : '']
    }, [_vm._v(_vm._s(item))])])
  })), _c('div', {
    staticClass: ["keyCountLine"]
  }, _vm._l((_vm.keyBoardCountData3), function(item, index) {
    return _c('div', {
      staticClass: ["keyCountLineItem"],
      on: {
        "click": function($event) {
          _vm.getCarId(index, _vm.keyBoardCountData3, '2')
        }
      }
    }, [_c('text', {
      class: ['keyCountLineItem_text', _vm.toggleBgColor && _vm.getCarIdType == _vm.keyBoardCountData3 && _vm.getCarIdTypeIndex == index ? 'toggleBgColor' : '']
    }, [_vm._v(_vm._s(item))])])
  })), _c('div', {
    staticClass: ["keyCountLine"]
  }, [_vm._l((_vm.keyBoardCountData4), function(item, index) {
    return _c('div', {
      staticClass: ["keyCountLineItem"],
      on: {
        "click": function($event) {
          _vm.getCarId(index, _vm.keyBoardCountData4, '2')
        }
      }
    }, [_c('text', {
      class: ['keyCountLineItem_text', _vm.toggleBgColor && _vm.getCarIdType == _vm.keyBoardCountData4 && _vm.getCarIdTypeIndex == index ? 'toggleBgColor' : '']
    }, [_vm._v(_vm._s(item))])])
  }), _c('div', {
    class: ['deleteKeyCount', _vm.toggleBgColor2 && _vm.deleteKeyCountIndex == 1 && _vm.getCarIdType == '11111' && _vm.getCarIdTypeIndex == '22222' ? 'deleteKeyCountBgColor' : ''],
    on: {
      "click": function($event) {
        _vm.deleteKeyCount()
      }
    }
  }, [_c('image', {
    staticClass: ["deleteKeyCount_icon"],
    attrs: {
      "src": _vm.keyBoardClear
    }
  })]), _c('div', {
    staticClass: ["done"],
    on: {
      "click": function($event) {
        _vm.done()
      }
    }
  }, [_c('text', {
    staticClass: ["done_text"]
  }, [_vm._v("完成")])])], 2)]) : _vm._e()], 2)]), (_vm.showBottomBtn == 0) ? _c('div', {
    class: ['bottomBtn', _vm.isiPhoneX ? 'bottomBtnX' : ''],
    on: {
      "click": _vm.buttonClickedCoupon
    }
  }, [_c('image', {
    staticClass: ["bottomBtn_icon"],
    attrs: {
      "src": _vm.iconTop
    }
  }), _c('text', {
    staticClass: ["bottomBtn_text"]
  }, [_vm._v("申请优惠券")])]) : _vm._e(), _c('WxcPopup', {
    attrs: {
      "width": "750",
      "height": [_vm.isiPhoneX ? '576' : '512'],
      "popupColor": "rgba(255, 255, 255,0)",
      "pos": "bottom",
      "show": _vm.isShowCoupon
    },
    on: {
      "wxcPopupOverlayClicked": _vm.overlayClickedCoupon
    }
  }, [_c('div', {
    class: ['coupon', _vm.isiPhoneX ? 'couponX' : '']
  }, [_c('div', {
    staticClass: ["coupon_title"],
    on: {
      "click": _vm.overlayClickedCoupon
    }
  }, [_c('div', {
    staticClass: ["titleText"]
  }, [_c('text', {
    staticClass: ["titleText"]
  })]), _c('div', {
    staticClass: ["titleIconBox"]
  }, [_c('image', {
    staticClass: ["titleIcon"],
    attrs: {
      "src": _vm.iconBottom
    }
  })]), _c('div', {
    staticClass: ["titleText"],
    on: {
      "click": function($event) {
        _vm.showDialogBox()
      }
    }
  }, [_c('text', {
    staticClass: ["titleText"]
  }, [_vm._v("申请说明")])])]), _c('div', {
    staticClass: ["coupon_content"]
  }, [_c('div', {
    staticClass: ["contentItemBox"]
  }, [_c('div', {
    staticClass: ["leftBox1"]
  }, [_c('text', {
    staticClass: ["leftBox1_text"]
  }, [_vm._v("停车券")]), _c('image', {
    staticClass: ["leftBox1Icon"],
    attrs: {
      "src": _vm.iconTicket
    }
  })]), _c('div', {
    staticClass: ["leftBox2"]
  }, [_c('text', {
    staticClass: ["leftBox2_text"]
  }, [_vm._v(_vm._s(_vm.parkCoupon.price))]), _c('text', {
    staticClass: ["leftBox2_text2"]
  }, [_vm._v("元/张")])]), _c('div', {
    staticClass: ["leftBox3"]
  }, [_c('text', {
    staticClass: ["leftBox3_text"]
  }, [_vm._v(_vm._s(_vm.mall))])]), _c('div', {
    staticClass: ["leftBox4"]
  }, [_c('text', {
    staticClass: ["leftBox4_text"]
  }, [_vm._v(_vm._s(_vm.parkName))])])]), _c('div', {
    staticClass: ["contentItemBox"]
  }, [_c('div', {
    staticClass: ["rightBox1"]
  }, [_c('text', {
    staticClass: ["rightBox1_text"]
  }, [_vm._v("选择使用月份")])]), _c('div', {
    staticClass: ["rightBox2"],
    on: {
      "click": _vm.timeSelect
    }
  }, [_c('text', {
    staticClass: ["rightBox2_text"]
  }, [_vm._v(_vm._s(_vm.selectYear))])]), _c('div', {
    staticClass: ["rightBox3"],
    on: {
      "click": _vm.timeSelect
    }
  }, [_c('text', {
    staticClass: ["rightBox3_text"]
  }, [_vm._v(_vm._s(_vm.selectMounth))])]), _c('div', {
    staticClass: ["rightBox4"]
  }, [_c('image', {
    staticClass: ["titleIcon"],
    attrs: {
      "src": _vm.iconBottom
    }
  })]), _c('div', {
    staticClass: ["rightBox5"],
    on: {
      "click": function($event) {
        _vm.apply('10')
      }
    }
  }, [_c('text', {
    staticClass: ["rightBox5_text"]
  }, [_vm._v("申请10张")])]), _c('div', {
    staticClass: ["rightBox6"],
    on: {
      "click": function($event) {
        _vm.apply('50')
      }
    }
  }, [_c('text', {
    staticClass: ["rightBox6_text"]
  }, [_vm._v("申请50张")])])])])])]), (_vm.showDialog) ? _c('modalframe', {
    attrs: {
      "type": "alert2"
    },
    on: {
      "close": _vm.closeModal
    }
  }) : _vm._e()], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["bottom1"]
  }, [_c('text', {
    staticClass: ["bottom1_text"]
  }, [_vm._v("使用期间")])])
}]}
module.exports.render._withStripped = true

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('refresh', {
    class: ['refresh', _vm.thisWidth ? 'thisWidth' : ''],
    attrs: {
      "display": _vm.loadinging ? 'show' : 'hide'
    },
    on: {
      "refresh": _vm.onrefresh,
      "pullingdown": _vm.onpullingdown
    }
  }, [_c('text', {
    staticClass: ["indicator-text"]
  }, [_vm._v(_vm._s(_vm.loadingText))]), _c('loading-indicator', {
    staticClass: ["indicator"]
  })]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(23);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _service = __webpack_require__(4);

var _service2 = _interopRequireDefault(_service);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverIp = _config2.default.serverIp;
var IBPServer = 'http://rsttest.vanke.com/';
// 登录
var login = function login(params, callback) {
  var url = serverIp + 'servers.api/usersApi/userLogin';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 注册
var regist = function regist(params, callback) {
  var url = serverIp + 'servers.api/usersApi/insertUser';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 招商信息
var getParkInfo = function getParkInfo(params, callback) {
  var url = serverIp + 'servers.api/homeApi/getParkInfo';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 园区公告列表
var getNoticeListByMarketId = function getNoticeListByMarketId(params, callback) {
  var url = serverIp + 'servers.api/noticeApi/getNoticeListByMarketId';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 园区公告详情
var getNoticeDetailById = function getNoticeDetailById(params, callback) {
  var url = serverIp + 'servers.api/noticeApi/getNoticeDetailById';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//投诉类型
var getDictionaryByType = function getDictionaryByType(params, callback) {
  var url = serverIp + 'servers.api/dictionaryApi/getDictionaryByType';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//新增物业报修
var insertEstateRepair = function insertEstateRepair(params, callback) {
  var url = serverIp + 'servers.api/estateRepairApi/insertEstateRepair';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//报修详情
var getEstateRepairById = function getEstateRepairById(params, callback) {
  var url = serverIp + 'servers.api/estateRepairApi/getEstateRepairById';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 活动详情
var getActiveDetailById = function getActiveDetailById(params, callback) {
  var url = serverIp + 'servers.api/activeApi/getActiveDetailById';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 获取活动报名表字段
var getRegDictFromByActId = function getRegDictFromByActId(params, callback) {
  var url = serverIp + 'servers.api/regDictFormApi/getRegDictFromByActId';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 提交报名表信息
var insertActiviteRegistration = function insertActiviteRegistration(params, callback) {
  var url = serverIp + 'servers.api/activeRegistrationApi/insertActiviteRegistration';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 获取短信验证码
var sendMsgCode = function sendMsgCode(params, callback) {
  var url = serverIp + 'servers.api/sendMsgApi/sendMsgCode';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 更换手机号
var updateUserAccountById = function updateUserAccountById(params, callback) {
  var url = serverIp + 'servers.api/usersApi/updateUserAccountById';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 更换密码
var updateUserPassword = function updateUserPassword(params, callback) {
  var url = serverIp + 'servers.api/usersApi/updateUserPassword';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 更新用户信息
var updateUserInfo = function updateUserInfo(params, callback) {
  var url = serverIp + 'servers.api/usersApi/updateUserInfo';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//活动列表
var getActiveListByMarketId = function getActiveListByMarketId(params, callback) {
  var url = serverIp + 'servers.api/activeApi/getActiveListByMarketId';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 在线账单
var getOnlineBillingByParam = function getOnlineBillingByParam(params, callback) {
  var url = serverIp + 'servers.api/onlineBillingApi/getOnlineBillingByParam';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 在线账单详情
var geBillingDetailByParam = function geBillingDetailByParam(params, callback) {
  var url = serverIp + 'servers.api/onlineBillingApi/geBillingDetailByParam';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 历史账单列表
var geHistoryBillingByParam = function geHistoryBillingByParam(params, callback) {
  var url = serverIp + 'servers.api/onlineBillingApi/geHistoryBillingByParam';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 消息列表
var getMsgByUserId = function getMsgByUserId(params, callback) {
  var url = serverIp + 'servers.api/messageApi/getMsgByUserId';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 消息详情
var getMsgDetailById = function getMsgDetailById(params, callback) {
  var url = serverIp + 'servers.api/messageApi/getMsgDetailById';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 租户认证提交
var userTenant = function userTenant(params, callback) {
  var url = serverIp + 'servers.api/usersApi/userTenant';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 客服中心列表
var getServiceTelList = function getServiceTelList(params, callback) {
  var url = serverIp + 'servers.api/homeApi/getServiceTelList';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//投诉列表
var getComplaintListByUserId = function getComplaintListByUserId(params, callback) {
  var url = serverIp + 'servers.api/complaintApi/getComplaintListByUserId';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//新增投诉
var addComplaint = function addComplaint(params, callback) {
  var url = serverIp + 'servers.api/complaintApi/addComplaint';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//投诉详情
var getComplaintById = function getComplaintById(params, callback) {
  var url = serverIp + 'servers.api/complaintApi/getComplaintById';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//取消或确认投诉
var updateComStatusById = function updateComStatusById(params, callback) {
  var url = serverIp + 'servers.api/complaintApi/updateComStatusById';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//物业报修附言
var insertEstateRepairCommunicate = function insertEstateRepairCommunicate(params, callback) {
  var url = serverIp + 'servers.api/estateRepairApi/insertEstateRepairCommunicate';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//投诉增加附言
var addComplaintCommunicate = function addComplaintCommunicate(params, callback) {
  var url = serverIp + 'servers.api/complaintApi/addComplaintCommunicate';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 我的订单列表
var getActOrderListByUserId = function getActOrderListByUserId(params, callback) {
  var url = serverIp + 'servers.api/activeRegistrationApi/getActOrderListByUserId';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 订单支付详情
var getUnpaidOrderInfoByOrderId = function getUnpaidOrderInfoByOrderId(params, callback) {
  var url = serverIp + 'servers.api/activeRegistrationApi/getUnpaidOrderInfoByOrderId';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 成功支付报名活动详情
var getRegisteredActiveDetailById = function getRegisteredActiveDetailById(params, callback) {
  var url = serverIp + 'servers.api/activeRegistrationApi/getRegisteredActiveDetailById';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//获取评分列表
var getEvaluateList = function getEvaluateList(params, callback) {
  var url = serverIp + 'servers.api/evaluateApi/getEvaluateList';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 获取商铺列表
var getCompanyList = function getCompanyList(params, callback) {
  var url = serverIp + 'servers.api/companyApi/getCompanyList';
  return (0, _service2.default)(url, 'POST', params, callback);
};
//活动评价
var saveEvaluate = function saveEvaluate(params, callback) {
  var url = serverIp + 'servers.api/evaluateApi/saveEvaluate';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//获取用户商铺
var getCompanyIdByUserId = function getCompanyIdByUserId(params, callback) {
  var url = serverIp + 'servers.api/usersApi/getCompanyIdByUserId';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//获取合同列表
var getContractList = function getContractList(params, callback) {
  var url = serverIp + 'servers.api/contractApi/getContractList';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//营收填报列表
var getRevenueList = function getRevenueList(params, callback) {
  var url = serverIp + 'servers.api/revenueApi/getRevenueList';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//新增营收填报
var saveRevenue = function saveRevenue(params, callback) {
  var url = serverIp + 'servers.api/revenueApi/saveRevenue';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//营收填报详情
var getRevenueById = function getRevenueById(params, callback) {
  var url = serverIp + 'servers.api/revenueApi/getRevenueById';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 活动详情点击报名无需进入报名表页面直接生成订单ID
var insertActiviteOrder = function insertActiviteOrder(params, callback) {
  var url = serverIp + 'servers.api/activeRegistrationApi/insertActiviteOrder';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 点击确定支付生成支付订单
var getActivePayOrder = function getActivePayOrder(params, callback) {
  var url = serverIp + 'servers.api/activePayApi/getActivePayOrder';
  return (0, _service2.default)(url, 'POST', params, callback);
};

// 原生返回支付状态后跟后台再次取人支付状态
var getOrderStatusByOrderNo = function getOrderStatusByOrderNo(params, callback) {
  var url = serverIp + 'servers.api/activePayApi/getOrderStatusByOrderNo';
  return (0, _service2.default)(url, 'POST', params, callback);
};

/*会议室预定模块*/
// 会议室列表
var getMeetingRoomListByUserId = function getMeetingRoomListByUserId(params, callback) {
  var url = serverIp + 'servers.api/meetingRoomApi/getMeetingRoomListByUserId';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 会议室详情
var getMeetingRoomById = function getMeetingRoomById(params, callback) {
  var url = serverIp + 'servers.api/meetingRoomApi/getMeetingRoomById';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 会议室价格列表
var getMeetingPriceList = function getMeetingPriceList(params, callback) {
  var url = serverIp + 'servers.api/meetingPayApi/getMeetingPriceList';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 会议室创建订单
var insertMeetingOrder = function insertMeetingOrder(params, callback) {
  var url = serverIp + 'servers.api/meetingPayApi/insertMeetingOrder';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 会议室订单列表
var getMeetingOrderList = function getMeetingOrderList(params, callback) {
  var url = serverIp + 'servers.api/meetingOrderApi/getMeetingOrderList';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 会议室订单详情
var getMeetingOrderDetailById = function getMeetingOrderDetailById(params, callback) {
  var url = serverIp + 'servers.api/meetingOrderApi/getMeetingOrderDetailById';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 签到
var clockIn = function clockIn(params, callback) {
  var url = serverIp + 'servers.api/tenantSignApi/insertTenantSign';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 签到详情
var clockInHistoryList = function clockInHistoryList(params, callback) {
  var url = serverIp + 'servers.api/tenantSignApi/queryTenantSignDetail';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 订单退款
var getOrderRefundRequest = function getOrderRefundRequest(params, callback) {
  var url = serverIp + 'servers.api/activePayApi/getOrderRefundRequest';
  return (0, _service2.default)(url, 'POST', params, callback);
};
//获取企业认证列表
var getUserTenantList = function getUserTenantList(params, callback) {
  var url = serverIp + 'servers.api/usersApi/getUserTenantList';
  return (0, _service2.default)(url, 'POST', params, callback);
};
//企业认证审批接口
var enableUserTenant = function enableUserTenant(params, callback) {
  var url = serverIp + 'servers.api/usersApi/enableUserTenant';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//租户已认证列表接口
var getUserTenantListByUserId = function getUserTenantListByUserId(params, callback) {
  var url = serverIp + 'servers.api/usersApi/getUserTenantListByUserId';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//id为设置默认认证信息的编号
var updateUserTenant = function updateUserTenant(params, callback) {
  var url = serverIp + 'servers.api/usersApi/updateUserTenant';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//我的订单接口
var getSmallRoutineListByUserId = function getSmallRoutineListByUserId(params, callback) {
  var url = serverIp + 'servers.api/activeRegistrationApi/getSmallRoutineListByUserId';
  return (0, _service2.default)(url, 'POST', params, callback);
};
//开票申请
var addReceiptInvoice = function addReceiptInvoice(params, callback) {
  var url = serverIp + 'servers.api/receiptApi/addReceipt';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//取消会议室订单
var cancelMeetingOrder = function cancelMeetingOrder(params, callback) {
  var url = serverIp + 'servers.api/meetingPayApi/cancelMeetingOrder';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//获取通讯录
var getMailListByUserId = function getMailListByUserId(params, callback) {
  var url = serverIp + 'servers.api/usersApi/getMailListByUserId';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//获取来访表信息
var getVisitorRegByParams = function getVisitorRegByParams(params, callback) {
  var url = serverIp + 'servers.api/visitorApi/getVisitorRegByParams';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//受访人查询
var queryExamineTenant = function queryExamineTenant(params, callback) {
  var url = serverIp + 'servers.api/visitorApi/queryExamineTenant';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//新增访客
var insertVisitorReg = function insertVisitorReg(params, callback) {
  var url = serverIp + 'servers.api/visitorApi/insertVisitorReg';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//通讯录查询接口
var getMailListByWhere = function getMailListByWhere(params, callback) {
  var url = serverIp + 'servers.api/usersApi/getMailListByWhere';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//获取访客列表
var getVisitorListByMarketId = function getVisitorListByMarketId(params, callback) {
  var url = serverIp + 'servers.api/visitorApi/getVisitorListByMarketId';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//获取拜访详情
var getVisitorDetailById = function getVisitorDetailById(params, callback) {
  var url = serverIp + 'servers.api/visitorApi/getVisitorDetailById';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//取消预约
var cancelVisitorById = function cancelVisitorById(params, callback) {
  var url = serverIp + 'servers.api/visitorApi/cancelVisitorById';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//审批
var updateVisitorStatus = function updateVisitorStatus(params, callback) {
  var url = serverIp + 'servers.api/visitorApi/updateVisitorStatus';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//点赞
var savePraise = function savePraise(params, callback) {
  var url = serverIp + 'servers.api/userPraiseApi/savePraise';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//新增评论
var saveComment = function saveComment(params, callback) {
  var url = serverIp + 'servers.api/userCommentApi/saveComment';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//获取评论列表
var getCommentList = function getCommentList(params, callback) {
  var url = serverIp + 'servers.api/userCommentApi/getCommentList';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//获取企业列表
var queryCompanyTenant = function queryCompanyTenant(params, callback) {
  var url = serverIp + 'servers.api/visitorApi/queryCompanyTenant';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//获取兑换活动列表
var getMbActiveList = function getMbActiveList(params, callback) {
  var url = serverIp + 'member.api/mbActiveApi/getMbActiveList';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//根据兑换活动ID获取兑换活动详情
var getMbActiveById = function getMbActiveById(params, callback) {
  var url = serverIp + 'member.api/mbActiveApi/getMbActiveById';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//获取兑换记录列表
var getMbActiveTradeListByUserId = function getMbActiveTradeListByUserId(params, callback) {
  var url = serverIp + 'member.api/mbActiveTradeApi/getMbActiveTradeListByUserId';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//新增收货信息
var addMbUserRelationSendee = function addMbUserRelationSendee(params, callback) {
  var url = serverIp + 'member.api/mbUserRelationApi/addMbUserRelationSendee';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//新增兑换信息
var addMbActiveTrade = function addMbActiveTrade(params, callback) {
  var url = serverIp + 'member.api/mbActiveTradeApi/addMbActiveTrade';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//获取我的积分列表
var getMbUserIntegrationListByUserId = function getMbUserIntegrationListByUserId(params, callback) {
  var url = serverIp + 'member.api/mbUserIntegrationApi/getMbUserIntegrationListByUserId';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//获取铺位信息
var getStoreListByWhere = function getStoreListByWhere(params, callback) {
  var url = serverIp + 'servers.api/usersApi/getStoreListByWhere';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//获取优惠券类型
var getBondDict = function getBondDict(params, callback) {
  var url = serverIp + 'member.api/mbBondApi/getBondDict';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//获取优惠券类型
var getMbBondListByUserId = function getMbBondListByUserId(params, callback) {
  var url = serverIp + 'member.api/mbBondApi/getMbBondListByUserId';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//获取列表数量
var getMbBondCountByUserId = function getMbBondCountByUserId(params, callback) {
  var url = serverIp + 'member.api/mbBondApi/getMbBondCountByUserId';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//优惠券详情
var getMbBondTemplateById = function getMbBondTemplateById(params, callback) {
  var url = serverIp + 'member.api/mbBondApi/getMbBondTemplateById';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//领券中心列表
var getMbBondActiveList = function getMbBondActiveList(params, callback) {
  var url = serverIp + 'member.api/mbBondApi/getMbBondActiveList';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//领券
var addMbBond = function addMbBond(params, callback) {
  var url = serverIp + 'member.api/mbBondApi/addMbBond';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//解除、删除认证
var cancelUserTenant = function cancelUserTenant(params, callback) {
  var url = serverIp + 'servers.api/usersApi/cancelUserTenant';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//获取评价详情
var getEvaluateDetail = function getEvaluateDetail(params, callback) {
  var url = serverIp + 'servers.api/evaluateApi/getEvaluateDetail';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//创建账单预支付订单
var insertAccountOrder = function insertAccountOrder(params, callback) {
  var url = serverIp + 'servers.api/accountOrderApi/insertAccountOrder';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//积分商城确认收货
var updateTradeStatus = function updateTradeStatus(params, callback) {
  var url = serverIp + 'member.api/mbActiveTradeApi/updateTradeStatus';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//积分商城订单详情
var getMbActiveTradeById = function getMbActiveTradeById(params, callback) {
  var url = serverIp + 'member.api/mbActiveTradeApi/getMbActiveTradeById';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//会员中心积分
var getMbActiveTopThree = function getMbActiveTopThree(params, callback) {
  var url = serverIp + 'member.api/mbActiveApi/getMbActiveTopThree';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//IBP新增报修
var insertPropertyRepair = function insertPropertyRepair(params, callback) {
  var url = serverIp + 'ibp_app_api/propertyRepairApi/insertPropertyRepair';
  return (0, _service2.default)(url, 'POST', params, callback, true);
};

//IBP报修类型
var repairTypeList = function repairTypeList(params, callback) {
  var url = serverIp + 'ibp_app_api/PropertyRepairIbpApi/repairTypeList';
  return (0, _service2.default)(url, 'POST', params, callback, true);
};

//IBP报修列表
var getProRepairListByUserId = function getProRepairListByUserId(params, callback) {
  var url = serverIp + 'ibp_app_api/propertyRepairApi/getProRepairListByUserId';
  return (0, _service2.default)(url, 'POST', params, callback, true);
};

//IBP报修详情
var getProRepairById = function getProRepairById(params, callback) {
  var url = serverIp + 'ibp_app_api/propertyRepairApi/getProRepairById';
  return (0, _service2.default)(url, 'POST', params, callback, true);
};

//IBP上传图片
var uploadFile = function uploadFile(params, callback) {
  var url = serverIp + 'ibp_app_api/propertyRepairApi/uploadFile';
  return (0, _service2.default)(url, 'POST', params, callback, true);
};

//IBP签名结束
var repairComplete = function repairComplete(params, callback) {
  var url = serverIp + 'ibp_app_api/propertyRepairApi/repairComplete';
  return (0, _service2.default)(url, 'POST', params, callback, true);
};

//IBP保存评价
var IBPsaveEvaluate = function IBPsaveEvaluate(params, callback) {
  var url = serverIp + 'ibp_app_api/propertyRepairApi/saveEvaluate';
  return (0, _service2.default)(url, 'POST', params, callback, true);
};

//IBP换取图片
var starAppDownloadFile = function starAppDownloadFile(params, callback) {
  var url = serverIp + 'ibp_app_api/propertyRepairApi/starAppDownloadFile';
  return (0, _service2.default)(url, 'POST', params, callback, true);
};

//IBP换取图片
var starAppDownloadFileStr = function starAppDownloadFileStr(params, callback) {
  var url = serverIp + 'ibp_app_api/propertyRepairApi/starAppDownloadFileStr';
  return (0, _service2.default)(url, 'POST', params, callback, true);
};

//IBP换取维修时段
var getServiceTime = function getServiceTime(params, callback) {
  var url = serverIp + 'ibp_app_api/propertyRepairApi/getServiceTime';
  return (0, _service2.default)(url, 'POST', params, callback, true);
};
//获取服务商列表
var getProviderList = function getProviderList(params, callback) {
  var url = serverIp + 'servers.api/providerApi/getProviderList';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 点赞
var insertProviderGreat = function insertProviderGreat(params, callback) {
  var url = serverIp + 'servers.api/providerApi/insertProviderGreat';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 获取服务商详情
var getProviderData = function getProviderData(params, callback) {
  var url = serverIp + 'servers.api/providerApi/getProviderData';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 新增合作申请
var insertProviderDetail = function insertProviderDetail(params, callback) {
  var url = serverIp + 'servers.api/providerApi/insertProviderDetail';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 合作申请详情
var getProviderDetailData = function getProviderDetailData(params, callback) {
  var url = serverIp + 'servers.api/providerApi/getProviderDetailData';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 我的申请
var getProviderDetailList = function getProviderDetailList(params, callback) {
  var url = serverIp + 'servers.api/providerApi/getProviderDetailList';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 停车相关
// 获取用户对应的权限公司
var getParkCompanyList = function getParkCompanyList(params, callback) {
  var url = serverIp + 'servers.api/usersApi/getParkCompanyList';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 获取停车场列表
var getParkList = function getParkList(params, callback) {
  var url = IBPServer + 'parkmanager_web/app/parkapi/getParkList.htm';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 获取项目对应停车场id
var getParkDetail = function getParkDetail(params, callback) {
  var url = IBPServer + 'parkmanager_web/app/parkapi/getParkDetail.htm';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 获取公司停车位信息
var getParkCompanyDetail = function getParkCompanyDetail(params, callback) {
  var url = IBPServer + 'parkmanager_web/app/parkcompanyapi/getParkCompanyDetail.htm';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 新增绑定车牌号
var bindCompanyPlateNo = function bindCompanyPlateNo(params, callback) {
  var url = IBPServer + 'parkmanager_web/app/parkcompanyapi/bindCompanyPlateNo.htm';
  return (0, _service2.default)(url, 'POST', params, callback);
};
//编辑删除
var unbindCompanyPlateNo = function unbindCompanyPlateNo(params, callback) {
  var url = IBPServer + 'parkmanager_web/app/parkcompanyapi/unbindCompanyPlateNo.htm';
  return (0, _service2.default)(url, 'POST', params, callback);
};
//停车交费
//查看个人车位信息
var myBindPlateNoDetail = function myBindPlateNoDetail(params, callback) {
  var url = IBPServer + 'parkmanager_web/app/bindplatenoapi/myBindPlateNoDetail.htm';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 优惠申请
//根据停车场和停车类型获取收费标准
var getParkFeeDetail = function getParkFeeDetail(params, callback) {
  var url = IBPServer + 'parkmanager_web/app/parkapi/getParkFeeDetail.htm';
  return (0, _service2.default)(url, 'POST', params, callback);
};
//申请车位审批
var bindPlateNo = function bindPlateNo(params, callback) {
  var url = IBPServer + 'parkmanager_web/app/bindplatenoapi/bindPlateNo.htm';
  return (0, _service2.default)(url, 'POST', params, callback);
};
//充值缴费
var addMonthlyBill = function addMonthlyBill(params, callback) {
  var url = IBPServer + 'parkmanager_web/app/monthlybillapi/addMonthlyBill.htm';
  return (0, _service2.default)(url, 'POST', params, callback);
};
//创建停车缴费账单预支付订单
var insertRequestOrder = function insertRequestOrder(params, callback) {
  var url = serverIp + 'servers.api/requestOrderApi/insertRequestOrder';
  return (0, _service2.default)(url, 'POST', params, callback);
};
//查找历史缴费记录
var monthlyBillList = function monthlyBillList(params, callback) {
  var url = IBPServer + 'parkmanager_web/app/monthlybillapi/monthlyBillList.htm';
  return (0, _service2.default)(url, 'POST', params, callback);
};
//申请候补车位
var waitPlateNo = function waitPlateNo(params, callback) {
  var url = IBPServer + 'parkmanager_web/app/waitplatenoapi/waitPlateNo.htm';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 获取套餐优惠天数列表
var getFreeParkDayList = function getFreeParkDayList(params, callback) {
  var url = IBPServer + 'parkmanager_web/app/parkapi/getFreeParkDayList.htm';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 获取停车券信息
var getParkCoupon = function getParkCoupon(params, callback) {
  var url = IBPServer + 'parkmanager_web/app/parkcouponapi/getParkCoupon.htm';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 申请停车券
var applyCoupon = function applyCoupon(params, callback) {
  var url = IBPServer + 'parkmanager_web/app/parkcouponapi/applyCoupon.htm';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 停车券审批
var ApprovalCoupon = function ApprovalCoupon(params, callback) {
  var url = IBPServer + 'parkmanager_web/app/parkcouponapi/ApprovalCoupon.htm';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 停车券指派车牌
var AssignCoupon = function AssignCoupon(params, callback) {
  var url = IBPServer + 'parkmanager_web/app/parkcouponapi/AssignCoupon.htm';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 停车券统计使用列表
var myCompanyCoupon = function myCompanyCoupon(params, callback) {
  var url = IBPServer + 'parkmanager_web/app/parkcouponapi/myCompanyCoupon.htm';
  return (0, _service2.default)(url, 'POST', params, callback);
};
// 停车券使用详情
var myCompanyCouponDetail = function myCompanyCouponDetail(params, callback) {
  var url = IBPServer + 'parkmanager_web/app/parkcouponapi/myCompanyCouponDetail.htm';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//获取积分任务列表
var getMbIntegrationTask = function getMbIntegrationTask(params, callback) {
  var url = serverIp + 'member.api/mbIntegrationTaskApi/getMbIntegrationTask';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//获取会员基本信息
var getUserByRelationId = function getUserByRelationId(params, callback) {
  var url = serverIp + 'member.api/mbCenterApi/getUserByRelationId';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//根据会员ID查询收货地址
var getMbAddressByRelationId = function getMbAddressByRelationId(params, callback) {
  var url = serverIp + 'member.api/mbActiveApi/getMbAddressByRelationId';
  return (0, _service2.default)(url, 'POST', params, callback);
};

//新增或修改收货信息
var addMbAddress = function addMbAddress(params, callback) {
  var url = serverIp + 'member.api/mbActiveApi/addMbAddress';
  return (0, _service2.default)(url, 'POST', params, callback);
};
exports.default = {
  login: login,
  regist: regist,
  getParkInfo: getParkInfo,
  getNoticeListByMarketId: getNoticeListByMarketId,
  getNoticeDetailById: getNoticeDetailById,
  getDictionaryByType: getDictionaryByType,
  insertEstateRepair: insertEstateRepair,
  getEstateRepairById: getEstateRepairById,
  getActiveDetailById: getActiveDetailById,
  getRegDictFromByActId: getRegDictFromByActId,
  insertActiviteRegistration: insertActiviteRegistration,
  getActiveListByMarketId: getActiveListByMarketId,
  sendMsgCode: sendMsgCode,
  updateUserAccountById: updateUserAccountById,
  updateUserPassword: updateUserPassword,
  updateUserInfo: updateUserInfo,
  getOnlineBillingByParam: getOnlineBillingByParam,
  geBillingDetailByParam: geBillingDetailByParam,
  geHistoryBillingByParam: geHistoryBillingByParam,
  getMsgByUserId: getMsgByUserId,
  getMsgDetailById: getMsgDetailById,
  userTenant: userTenant,
  getServiceTelList: getServiceTelList,
  getComplaintListByUserId: getComplaintListByUserId,
  addComplaint: addComplaint,
  getComplaintById: getComplaintById,
  updateComStatusById: updateComStatusById,
  insertEstateRepairCommunicate: insertEstateRepairCommunicate,
  addComplaintCommunicate: addComplaintCommunicate,
  getActOrderListByUserId: getActOrderListByUserId,
  getUnpaidOrderInfoByOrderId: getUnpaidOrderInfoByOrderId,
  getRegisteredActiveDetailById: getRegisteredActiveDetailById,
  getEvaluateList: getEvaluateList,
  getCompanyList: getCompanyList,
  insertActiviteOrder: insertActiviteOrder,
  saveEvaluate: saveEvaluate,
  getCompanyIdByUserId: getCompanyIdByUserId,
  getContractList: getContractList,
  getRevenueList: getRevenueList,
  saveRevenue: saveRevenue,
  getActivePayOrder: getActivePayOrder,
  getRevenueById: getRevenueById,
  getOrderStatusByOrderNo: getOrderStatusByOrderNo,
  getMeetingRoomListByUserId: getMeetingRoomListByUserId,
  getMeetingRoomById: getMeetingRoomById,
  clockIn: clockIn,
  clockInHistoryList: clockInHistoryList,
  getMeetingPriceList: getMeetingPriceList,
  insertMeetingOrder: insertMeetingOrder,
  getMeetingOrderList: getMeetingOrderList,
  getMeetingOrderDetailById: getMeetingOrderDetailById,
  getOrderRefundRequest: getOrderRefundRequest,
  getUserTenantListByUserId: getUserTenantListByUserId,
  getUserTenantList: getUserTenantList,
  enableUserTenant: enableUserTenant,
  updateUserTenant: updateUserTenant,
  getSmallRoutineListByUserId: getSmallRoutineListByUserId,
  addReceiptInvoice: addReceiptInvoice,
  cancelMeetingOrder: cancelMeetingOrder,
  getMailListByUserId: getMailListByUserId,
  getVisitorRegByParams: getVisitorRegByParams,
  queryExamineTenant: queryExamineTenant,
  insertVisitorReg: insertVisitorReg,
  getMailListByWhere: getMailListByWhere,
  getVisitorListByMarketId: getVisitorListByMarketId,
  getVisitorDetailById: getVisitorDetailById,
  cancelVisitorById: cancelVisitorById,
  updateVisitorStatus: updateVisitorStatus,
  savePraise: savePraise,
  saveComment: saveComment,
  getCommentList: getCommentList,
  queryCompanyTenant: queryCompanyTenant,
  getMbActiveList: getMbActiveList,
  getMbActiveById: getMbActiveById,
  getMbActiveTradeListByUserId: getMbActiveTradeListByUserId,
  addMbUserRelationSendee: addMbUserRelationSendee,
  addMbActiveTrade: addMbActiveTrade,
  getMbUserIntegrationListByUserId: getMbUserIntegrationListByUserId,
  insertPropertyRepair: insertPropertyRepair,
  getStoreListByWhere: getStoreListByWhere,
  repairTypeList: repairTypeList,
  getProRepairListByUserId: getProRepairListByUserId,
  getProRepairById: getProRepairById,
  uploadFile: uploadFile,
  repairComplete: repairComplete,
  IBPsaveEvaluate: IBPsaveEvaluate,
  starAppDownloadFile: starAppDownloadFile,
  getBondDict: getBondDict,
  getMbBondListByUserId: getMbBondListByUserId,
  getMbBondCountByUserId: getMbBondCountByUserId,
  getMbBondTemplateById: getMbBondTemplateById,
  getMbBondActiveList: getMbBondActiveList,
  addMbBond: addMbBond,
  starAppDownloadFileStr: starAppDownloadFileStr,
  cancelUserTenant: cancelUserTenant,
  getEvaluateDetail: getEvaluateDetail,
  insertAccountOrder: insertAccountOrder,
  getServiceTime: getServiceTime,
  getMbIntegrationTask: getMbIntegrationTask,
  getUserByRelationId: getUserByRelationId,
  getMbAddressByRelationId: getMbAddressByRelationId,
  addMbAddress: addMbAddress,
  updateTradeStatus: updateTradeStatus,
  getMbActiveTradeById: getMbActiveTradeById,
  getProviderList: getProviderList,
  insertProviderGreat: insertProviderGreat,
  getProviderData: getProviderData,
  insertProviderDetail: insertProviderDetail,
  getProviderDetailData: getProviderDetailData,
  getProviderDetailList: getProviderDetailList,
  getParkCompanyDetail: getParkCompanyDetail,
  getParkDetail: getParkDetail,
  getParkCompanyList: getParkCompanyList,
  getParkList: getParkList,
  bindCompanyPlateNo: bindCompanyPlateNo,
  unbindCompanyPlateNo: unbindCompanyPlateNo,
  myBindPlateNoDetail: myBindPlateNoDetail,
  bindPlateNo: bindPlateNo,
  getParkFeeDetail: getParkFeeDetail,
  addMonthlyBill: addMonthlyBill,
  insertRequestOrder: insertRequestOrder,
  monthlyBillList: monthlyBillList,
  waitPlateNo: waitPlateNo,
  getFreeParkDayList: getFreeParkDayList,
  getParkCoupon: getParkCoupon,
  applyCoupon: applyCoupon,
  ApprovalCoupon: ApprovalCoupon,
  AssignCoupon: AssignCoupon,
  myCompanyCoupon: myCompanyCoupon,
  myCompanyCouponDetail: myCompanyCouponDetail,
  getMbActiveTopThree: getMbActiveTopThree
};

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

module.exports = {
  "wxc-overlay": {
    "width": "750",
    "position": "fixed",
    "left": 0,
    "top": 0,
    "bottom": 0,
    "right": 0
  }
}

/***/ }),

/***/ 21:
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

var animation = weex.requireModule('animation');
exports.default = {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    hasAnimation: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 300
    },
    timingFunction: {
      type: Array,
      default: function _default() {
        return ['ease-in', 'ease-out'];
      }
    },
    opacity: {
      type: [Number, String],
      default: 0.6
    },
    canAutoClose: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    overlayStyle: function overlayStyle() {
      return {
        opacity: this.hasAnimation ? 0 : 1,
        backgroundColor: 'rgba(0, 0, 0,' + this.opacity + ')'
      };
    },
    shouldShow: function shouldShow() {
      var _this = this;

      var show = this.show,
          hasAnimation = this.hasAnimation;

      hasAnimation && setTimeout(function () {
        _this.appearOverlay(show);
      }, 50);
      return show;
    }
  },
  methods: {
    overlayClicked: function overlayClicked(e) {
      this.canAutoClose ? this.appearOverlay(false) : this.$emit('wxcOverlayBodyClicked', {});
    },
    appearOverlay: function appearOverlay(bool) {
      var _this2 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.duration;
      var hasAnimation = this.hasAnimation,
          timingFunction = this.timingFunction,
          canAutoClose = this.canAutoClose;

      var needEmit = !bool && canAutoClose;
      needEmit && this.$emit('wxcOverlayBodyClicking', {});
      var overlayEl = this.$refs['wxc-overlay'];
      if (hasAnimation && overlayEl) {
        animation.transition(overlayEl, {
          styles: {
            opacity: bool ? 1 : 0
          },
          duration: duration,
          timingFunction: timingFunction[bool ? 0 : 1],
          delay: 0
        }, function () {
          needEmit && _this2.$emit('wxcOverlayBodyClicked', {});
        });
      } else {
        needEmit && this.$emit('wxcOverlayBodyClicked', {});
      }
    }
  }
};

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.show) ? _c('div', {
    ref: "wxc-overlay",
    staticClass: ["wxc-overlay"],
    style: _vm.overlayStyle,
    attrs: {
      "hack": _vm.shouldShow
    },
    on: {
      "click": _vm.overlayClicked
    }
  }) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(20)
)

/* script */
__vue_exports__ = __webpack_require__(21)

/* template */
var __vue_template__ = __webpack_require__(22)
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
__vue_options__.__file = "/Users/denya/Desktop/workspace/weex/h5/src/views/components/wxc-overlay/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-712119a4"
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


/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(33);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// const serverIp = 'http://192.168.137.1:8080/';
var serverIp = weex.config.serverIp ? weex.config.serverIp : 'http://ibp.vanke.com/';

exports.default = {
  serverIp: serverIp
};

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

module.exports = {
  "wxc-popup": {
    "position": "fixed",
    "width": "750",
    "backgroundColor": "#ffffff"
  },
  "top": {
    "left": 0,
    "right": 0
  },
  "bottom": {
    "left": 0,
    "right": 0
  },
  "left": {
    "bottom": 0,
    "top": 0
  },
  "right": {
    "bottom": 0,
    "top": 0
  }
}

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _wxcOverlay = __webpack_require__(19);

var _wxcOverlay2 = _interopRequireDefault(_wxcOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
var platform = weex.config.env.platform;

var isWeb = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && platform.toLowerCase() === 'web';
exports.default = {
  name: 'WxcPopup',
  components: { WxcOverlay: _wxcOverlay2.default },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    pos: {
      type: String,
      default: 'bottom'
    },
    popupColor: {
      type: String,
      default: '#FFFFFF'
    },
    overlayCfg: {
      type: Object,
      default: function _default() {
        return {
          hasAnimation: true,
          timingFunction: ['ease-in', 'ease-out'],
          duration: 150,
          opacity: 0.6
        };
      }
    },
    height: {
      type: [Number, String],
      default: 840
    },
    standOut: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: [Number, String],
      default: 750
    },
    animation: {
      type: Object,
      default: function _default() {
        return {
          timingFunction: 'ease-in'
        };
      }
    }
  },
  data: function data() {
    return {
      haveOverlay: true,
      isOverShow: true
    };
  },
  computed: {
    isNeedShow: function isNeedShow() {
      var _this = this;

      setTimeout(function () {
        _this.appearPopup(_this.show);
      }, 50);
      return this.show;
    },
    _height: function _height() {
      this.appearPopup(this.show, 150);
      return this.height;
    },
    padStyle: function padStyle() {
      var pos = this.pos,
          width = this.width,
          height = this.height,
          popupColor = this.popupColor,
          standOut = this.standOut;

      var style = {
        width: width + 'px',
        backgroundColor: popupColor
      };
      pos === 'top' && (style = _extends({}, style, {
        top: -height + standOut + 'px',
        height: height + 'px'
      }));
      pos === 'bottom' && (style = _extends({}, style, {
        bottom: -height + standOut + 'px',
        height: height + 'px'
      }));
      pos === 'left' && (style = _extends({}, style, {
        left: -width + standOut + 'px'
      }));
      pos === 'right' && (style = _extends({}, style, {
        right: -width + standOut + 'px'
      }));
      return style;
    }
  },
  methods: {
    handleTouchEnd: function handleTouchEnd(e) {
      // 在支付宝上面有点击穿透问题
      var platform = weex.config.env.platform;

      platform === 'Web' && e.preventDefault && e.preventDefault();
    },
    hide: function hide() {
      this.appearPopup(false);
      this.$refs.overlay.appearOverlay(false);
    },
    wxcOverlayBodyClicking: function wxcOverlayBodyClicking() {
      this.isShow && this.appearPopup(false);
    },
    appearPopup: function appearPopup(bool) {
      var _this2 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

      this.isShow = bool;
      var popupEl = this.$refs['wxc-popup'];
      if (!popupEl) {
        return;
      }
      animation.transition(popupEl, _extends({
        styles: {
          transform: this.getTransform(this.pos, this.width, this.height, !bool)
        },
        duration: duration,
        delay: 0
      }, this.animation), function () {
        if (!bool) {
          _this2.$emit('wxcPopupOverlayClicked', { pos: _this2.pos });
        }
      });
    },
    getTransform: function getTransform(pos, width, height, bool) {
      var _size = pos === 'top' || pos === 'bottom' ? height : width;
      bool && (_size = 0);
      var _transform = void 0;
      switch (pos) {
        case 'top':
          _transform = 'translateY(' + _size + 'px)';
          break;
        case 'bottom':
          _transform = 'translateY(-' + _size + 'px)';
          break;
        case 'left':
          _transform = 'translateX(' + _size + 'px)';
          break;
        case 'right':
          _transform = 'translateX(-' + _size + 'px)';
          break;
      }
      return _transform;
    }
  }
};

/***/ }),

/***/ 32:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    on: {
      "touchend": _vm.handleTouchEnd
    }
  }), (_vm.show) ? _c('div', {
    ref: "wxc-popup",
    class: ['wxc-popup', _vm.pos],
    style: _vm.padStyle,
    attrs: {
      "height": _vm._height,
      "hack": _vm.isNeedShow
    },
    on: {
      "click": function () {}
    }
  }, [_vm._t("default")], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(30)
)

/* script */
__vue_exports__ = __webpack_require__(31)

/* template */
var __vue_template__ = __webpack_require__(32)
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
__vue_options__.__file = "/Users/denya/Desktop/workspace/weex/h5/src/views/components/wxc-popup/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-54a0f14a"
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


/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var stream = weex.requireModule('stream');
//const clipboard = weex.requireModule('clipboard');
var weexParams = weex.config.params || {
  "userId": "32BE2B8F24894CF894C1F790FB0E44E8"
};
var fetch = function fetch(url) {
  var methed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'POST';
  var params = arguments[2];
  var callback = arguments[3];
  var ibp = arguments[4];

  var OSMap = {
    'Web': 0,
    'android': 1,
    'iOS': 2
  };
  var accessToken = weexParams.accessToken || 'public';
  var cityId = weexParams.cityId || '021';
  var body = void 0;
  var data = {};
  for (var key in params) {
    if (key == 'accessToken') continue;
    data[key] = params[key];
  }

  if (ibp) {
    body = {
      "header": {
        "channel": "starApp",
        'userId': weexParams.userId || 'F65F2621519F43D0BA7C307C41432D84',
        "accessToken": accessToken
      },
      "body": data
    };
  } else {
    body = {
      "head": {
        "accessToken": accessToken,
        "clientOSType": OSMap[WXEnvironment.platform],
        "cityId": cityId,
        "version": "1.1.0",
        'userId': weexParams.userId || 'F65F2621519F43D0BA7C307C41432D84'
      },
      "body": data
    };
  }

  stream.fetch({
    method: methed,
    url: url,
    body: 'data=' + JSON.stringify(body),
    type: 'json',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }, function (ret) {
    if (ret.data && ret.data.res && ret.data.res.code == '10004') {
      //no login or login expired, todo login again...
      var wxBack = weex.requireModule('wxBack');
      if (wxBack) wxBack.setParams({
        login: 1
      });
      // return;
    }
    callback(ret.data);
    //clipboard.setString(JSON.stringify(ret.data));
  }, function (response) {
    //callback(response);
  });
  return;
};
exports.default = fetch;

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var back = function back() {
  //header页返回
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAYBAMAAADT3mpnAAAAFVBMVEUzMzMzMzMzMzMzMzMzMzMzMzMzMzPS3IM/AAAABnRSTlMAK1d/gPxeSCeOAAAAJ0lEQVR4XmMAA0YGCFA1AFNMYQ4QbgpFXAidzAAVN6CigAOEZmQAAGn+C7L1mkwLAAAAAElFTkSuQmCC';
};
var keyBoardClear = function keyBoardClear() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAChElEQVRYR9XYz4uPURTH8dcgRGHBjhWxEn8CohQLG0RYkJ8lxQI1Y8OCBSUlP6JQJArFhoWytmGLhVj4sfBjNfkxo6Pn6vad55nvM/P9zui5u2nu/Zz399zznHvO6dHZ2oADWILpnUn9PT2An/iCV3iMy/iYtHs6MHIcvR2cr3v0G/bhZhwYLfBJHK5rsQv7BrEloEcDfBoHM4iH2I7PXQALnsmYg+U4hgWFbnh64UiAY+9Z7M/A7mMjfnQBtkxiJp5n0L11gWPfeezJVO9gM36NEWyS3YZrxR/P6gBPwCXsyMBuYSt+jzFsyM/Fu8LOh3bAE3EV8SvTul7EbBVsXON3xIdSZwXDDESMlq0p6C/+0T8ccMDewKZM5Qp2FfmyTDxuYideYg3etyGeh0dYjIstIZeOBmPk51gDVcCTiry3PjN4ociHVZ6bVST8dOR18aVXQQfsU8zPbIRGmaeTzcEy4Egrt7EuEzpXvGjDXXNovSi81Q66DDZuZWlFKP2z2woc8XIXazPYMzhUJxhRBtLq6Tp7Ws2VAk/FPazOdp/CkZqwadtwQOGg1jBoFzqhOwR4Gh5gZQZ3An0jhG0HHcB5zNaBHQIcVVY8r8syuHgSo7jpZJV5OterCzsEOEq4VZnSUURx041VBT0S2OYDNy4kwuWN+uhSrDYqrSXoRj0cCbpRT3OC7kbx86bI7SMpflJpWvU0lxY/afN4l5dRmu4uSf61ysscejwK+PDs14qXqnYBn843qkVK0P+zCY3eMdqyWLWa0Bz6f7f5fe2a0LKwGstBStiLmJ2NFSWDlEWjAQ7RRo2qktfHaxgYI4O9nQ4DE3S3x63RCsUM4hPe4knruPUPiUnUbWkGY+QAAAAASUVORK5CYII=';
};
var iconBottom = function iconBottom() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAA+ElEQVQ4T5WSPU6FQBSFzyFUugZdgLYkwxaMvXZPO4u3AxMrE3dAYfe0e66EC7Ta+1yDVoRjxgAZR+DFqebn3m84H8O6rs8kPQKQpDvn3DP+McxsRfIeAEnesKqqd0nHA0PSJk3TdZZlX0vcpmkO2rYtSF4PdSR3HriTdBQ1v0q6yPP8bQpaluUJyRcAp+E5yQ+a2TmALYDDqPkTwNo59xTum9kVgGKm/pK+eO5GfzYo8PM4YnDRmOgH6Id30nVdIWl0Ejb0818R/R7JTZIko/MRODQvRIp1Tir5A9ynoKfO/rRJ4JKCOGL82bPAQMEKwEO/vt338L8B5nR72mHdb94AAAAASUVORK5CYII=';
};
var iconTop = function iconTop() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAABCElEQVQ4T4WSMVLDMBBF98uu4AzkANB6Rr4CQw9dQkeRGzBDxQw3cEEX6MhJLEtt0hPOECrbnxGJM7Eix2o0mt39u/9pISPHGDMVkbd92rPW+vNcCYaCzrmLtm0Lko/HOQAWSql5lmW/sdqoYFmW1wCWInIz0HBF8j7P83UYPxE0xsxEpBCRyxEaWxGZa60/eg66h7dY13UBoGfRxwGs/E3yZGKSizRNDwj+JzxnsWPm82JM9wMdEMAYcyciXxGL2yRJfOeeJefcrGmaGBKP4AFVVW1IXgW8BqF3jpRSyxABgB8v+E1y0gmOrcUx8xABgA2stbck33fM+TK2uOHPW2unJF93f4enP5WJh9osblYKAAAAAElFTkSuQmCC';
};
var iconTicket = function iconTicket() {
  return 'data:image/png;base64,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';
};
var defaultIcon = function defaultIcon() {
  return 'data:image/png;base64,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';
};
var park = function park() {
  return 'data:image/png;base64,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';
};
var downIcon = function downIcon() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAYAAAC9vt6cAAAAlklEQVQoU6WSQQrCMBBFX4gn6MYDBga8gS6KFQU9gYsJOaCbnsAQCcTS2lYiZpfw/2PmEQMgIjvgAjT5XnH6lFLrvb8b51xjrX0Am4riOPKMMW7/B5QV9sD1xwkOqnoz75KIHIGuEtKp6ilnB0CZpAYylGeACsikvAj4ApmVVwEjsefipM3ClvxMHHwG8h/JbyGEfk3uC4rcN4GHbjmxAAAAAElFTkSuQmCC';
};
module.exports = {
  back: back,
  keyBoardClear: keyBoardClear,
  iconBottom: iconBottom,
  iconTicket: iconTicket,
  defaultIcon: defaultIcon,
  iconTop: iconTop,
  park: park,
  downIcon: downIcon
};

/***/ }),

/***/ 617:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(163)
)

/* script */
__vue_exports__ = __webpack_require__(164)

/* template */
var __vue_template__ = __webpack_require__(165)
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
__vue_options__.__file = "/Users/denya/Desktop/workspace/weex/h5/src/views/parkingTicket/available.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-6258bda2"
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

/***/ }),

/***/ 67:
/***/ (function(module, exports) {

module.exports = {
  "wxc-popup": {
    "position": "fixed",
    "width": "750",
    "backgroundColor": "#ffffff"
  },
  "top": {
    "left": 0,
    "right": 0
  },
  "bottom": {
    "left": 0,
    "right": 0
  },
  "left": {
    "bottom": 0,
    "top": 0
  },
  "right": {
    "bottom": 0,
    "top": 0
  }
}

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _wxcOverlay = __webpack_require__(19);

var _wxcOverlay2 = _interopRequireDefault(_wxcOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
var platform = weex.config.env.platform;

var isWeb = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && platform.toLowerCase() === 'web';
exports.default = {
  name: 'WxcPopup',
  components: { WxcOverlay: _wxcOverlay2.default },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    pos: {
      type: String,
      default: 'bottom'
    },
    popupColor: {
      type: String,
      default: '#FFFFFF'
    },
    overlayCfg: {
      type: Object,
      default: function _default() {
        return {
          hasAnimation: true,
          timingFunction: ['ease-in', 'ease-out'],
          duration: 150,
          opacity: 0.6
        };
      }
    },
    height: {
      type: [Number, String],
      default: 840
    },
    standOut: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: [Number, String],
      default: 750
    },
    animation: {
      type: Object,
      default: function _default() {
        return {
          timingFunction: 'ease-in'
        };
      }
    }
  },
  data: function data() {
    return {
      haveOverlay: true,
      isOverShow: true
    };
  },
  computed: {
    isNeedShow: function isNeedShow() {
      var _this = this;

      setTimeout(function () {
        _this.appearPopup(_this.show);
      }, 50);
      return this.show;
    },
    _height: function _height() {
      this.appearPopup(this.show, 150);
      return this.height;
    },
    padStyle: function padStyle() {
      var pos = this.pos,
          width = this.width,
          height = this.height,
          popupColor = this.popupColor,
          standOut = this.standOut;

      var style = {
        width: width + 'px',
        backgroundColor: popupColor
      };
      pos === 'top' && (style = _extends({}, style, {
        top: -height + standOut + 'px',
        height: height + 'px'
      }));
      pos === 'bottom' && (style = _extends({}, style, {
        bottom: -height + standOut + 'px',
        height: height + 'px'
      }));
      pos === 'left' && (style = _extends({}, style, {
        left: -width + standOut + 'px'
      }));
      pos === 'right' && (style = _extends({}, style, {
        right: -width + standOut + 'px'
      }));
      return style;
    }
  },
  methods: {
    handleTouchEnd: function handleTouchEnd(e) {
      // 在支付宝上面有点击穿透问题
      var platform = weex.config.env.platform;

      platform === 'Web' && e.preventDefault && e.preventDefault();
    },
    hide: function hide() {
      this.appearPopup(false);
      this.$refs.overlay.appearOverlay(false);
    },
    wxcOverlayBodyClicking: function wxcOverlayBodyClicking() {
      this.isShow && this.appearPopup(false);
    },
    appearPopup: function appearPopup(bool) {
      var _this2 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

      this.isShow = bool;
      var popupEl = this.$refs['wxc-popup'];
      if (!popupEl) {
        return;
      }
      animation.transition(popupEl, _extends({
        styles: {
          transform: this.getTransform(this.pos, this.width, this.height, !bool)
        },
        duration: duration,
        delay: 0
      }, this.animation), function () {
        if (!bool) {
          _this2.$emit('wxcPopupOverlayClicked', { pos: _this2.pos });
        }
      });
    },
    getTransform: function getTransform(pos, width, height, bool) {
      var _size = pos === 'top' || pos === 'bottom' ? height : width;
      bool && (_size = 0);
      var _transform = void 0;
      switch (pos) {
        case 'top':
          _transform = 'translateY(' + _size + 'px)';
          break;
        case 'bottom':
          _transform = 'translateY(-' + _size + 'px)';
          break;
        case 'left':
          _transform = 'translateX(' + _size + 'px)';
          break;
        case 'right':
          _transform = 'translateX(-' + _size + 'px)';
          break;
      }
      return _transform;
    }
  }
};

/***/ }),

/***/ 69:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    on: {
      "touchend": _vm.handleTouchEnd
    }
  }, [(_vm.show) ? _c('wxc-overlay', _vm._b({
    ref: "overlay",
    attrs: {
      "show": _vm.haveOverlay && _vm.isOverShow
    },
    on: {
      "wxcOverlayBodyClicking": _vm.wxcOverlayBodyClicking
    }
  }, 'wxc-overlay', _vm.overlayCfg, false)) : _vm._e()], 1), (_vm.show) ? _c('div', {
    ref: "wxc-popup",
    class: ['wxc-popup', _vm.pos],
    style: _vm.padStyle,
    attrs: {
      "height": _vm._height,
      "hack": _vm.isNeedShow
    },
    on: {
      "click": function () {}
    }
  }, [_vm._t("default")], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(10)
)

/* script */
__vue_exports__ = __webpack_require__(11)

/* template */
var __vue_template__ = __webpack_require__(12)
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
__vue_options__.__file = "/Users/denya/Desktop/workspace/weex/h5/src/views/components/default.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-71174507"
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


/***/ }),

/***/ 96:
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


/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(98);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(67)
)

/* script */
__vue_exports__ = __webpack_require__(68)

/* template */
var __vue_template__ = __webpack_require__(69)
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
__vue_options__.__file = "/Users/denya/Desktop/workspace/weex/h5/src/views/components/wxc-popupMask/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-77e15dd6"
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


/***/ })

/******/ });