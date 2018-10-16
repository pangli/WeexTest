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
/******/ 	return __webpack_require__(__webpack_require__.s = 456);
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

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var back = function back() {
  //header页返回
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAA8CAYAAADorNMqAAACkUlEQVRoQ8XXsYvTYBjH8d+TQF0cLiA4CPp3ODk4KupgEESPauVtHAre5uSqoHiHKNIQyu1VQXATtDid/4DQwUE47w6kUCepbd5Hcli4a5P2fZP3fZs5TT683zTvE4LDo16vr9VqNQGgBWAM4BWA1+TK0Gg0zvm+/xzAVQB+dl9m/ktED50goig6I6XcZuaLRDR7z2/WEUKIU0S0JaW8mQPIFuS7VYQQ4iwzbxFRlsDLST8hokfWEEsSZB4J4MN4PL5nBaGQIAPsSClvJEmyaxyRJQCwCeBaXgJmTonoDYCNOI73syUxilBNMJlM7nc6nb3pM2IMoZvg6ENqBFEmgVFE2QTGEFUSGEFUTVAZYSJBJYSpBKURJhOUQphOoI2wkUALkU1EnudtFm3HeXuB7rS28I1pM4HSSthOsBThIsFChKsEhQiXCXIRrhPMIVaR4BhiVQlmEdsAbqsOpbovIpXzSQhxAOB0wcl/iOhWu91+p3KxsudQFEV1KeULACcLpu/fnuddGgwGO91uNy17o0W/ozAMa0EQ3AHwBMBawckHRPSg3++/7fV6E9OQw72j1WqdGI1Gd4noJTPPfTMyMxPRnpRyPUmST1YQ04sKIZoAnrpOc2wXXVWaua18FWkK5wmXaQoRLtMsnKxcpVH6IG42m4KZn9n61yghbKdRQmi80H4CWI/j+LPOC00ZMb2ojTTaCBtptBE20pRCmE5TCWEqTSWEqTSVERpphp7nXc6b0IwhFNPsE9HG7IRmDFEljVFE2TRWELpprCA00uwy8xVrCNU0zPzeOkIhzQ/riGVpmPmjE8RMmsf/v/QYwK80Ta87RYRh6AdBcB7ABQApM38ZDodfnSKOTFvZfbOVODz+Af3IwZhqOVaOAAAAAElFTkSuQmCC';
};
var search = function search() {
  //搜索框搜索icon
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkzRjYzNTJENDQ0RTExRThBOTAyRTFGNTg5Q0UyNDMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkzRjYzNTJFNDQ0RTExRThBOTAyRTFGNTg5Q0UyNDMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTNGNjM1MkI0NDRFMTFFOEE5MDJFMUY1ODlDRTI0MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTNGNjM1MkM0NDRFMTFFOEE5MDJFMUY1ODlDRTI0MzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6eRgtrAAACxklEQVR42ryXXYiMURjH33lnSj5bdgoj319hkCafbW2+Lti4QMgFNxIXckE+Sm6sKyU3cmEvfC5RIiPlY1tlDJIrtqyVWrVhF5GvUTvj/9T/1JvOmffMx5mnfr3nPdN7nv885znnPCeSSqW8EPPBUrAaLAGTwHCQB19BJ3gE0iDrlWiRIgJiYDvYDyZajvcSNIOroGDzQczQnwSXwBy+fwLXQDvoAL2MzCgwCywH6/ndFbALbAXd5URgLbgMBoEP4Ag4B/6GjDWEjg+DYeAzWBM2Lb7G+XU6vwlmgjMWzsV+gOOMQgbUg/tgoa2AJP95FLSAdUyyUu09WAFuB/7I6DABkgsX+YFk805mebn2B2wEz8FIRrGoAMn2uZw3SZ5+r3L7BTaD36AJrDIJEA7yvbnMsJvsLTjB9iGTgGVgPJfaaa/6dpJJ3ACm6ASo0Mg6zzkQ0AfuyZLXTYMfWCYPPHfWxudinYBpbHc4FPCKT+0U1LH9xaEANXadTkDesCtW09TYed0PSl3coYC4Kco+z3MvcPK5MDV2p05Ahu2VDgWosR/rBKTZlvN8qAPn40Aj5z+tE5DlMpEzfJ8DAQfo5w7oMWXnUT73grFVdC7Vzg6WZ8eKLQ+p4R6CwaAVDKiC83qOJUf9eVNlpAQUeAz38tCQqmhgBc5HMOSyy74Be2wqom7WcD9ZgrezBC/V5oEnYD74yLG+2daET1nhSiQWBMpsm01KcucUeAamgi5Gs4vRnMET0epeMIZllDo+czwthdesln3WeknWgI3sk+m8AHaD78ynFyxwb4BNwSI3EnIzamK11GARAVnndxmxTKB/AngXeL8FNigREYurmdhkilnEW1KcDvu4vWa5yfQYvj8LtulE2Aqo1KJcilv+FxFNJBK1EFDg/UAKktnsmy454nu1s37uNa2BvlzMq60pEW3cIVv+CTAAAiKYXhHT9IEAAAAASUVORK5CYII=';
};
var xsj = function xsj() {
  //下箭头
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALBAMAAACNJ7BwAAAAElBMVEVmZmZmZmZmZmZmZmZmZmZmZmZygondAAAABnRSTlMAGjRMl5n17KTdAAAAP0lEQVR4Xi3IMQ0AIBBD0YazgAAGBLCcAEhQAP61kJZ2+c1DDHBsPdByomxx3AZ0cS6AbCQbxUYy0Uw0E83CBxJDCBujobsPAAAAAElFTkSuQmCC';
};
var shop = function shop() {
  //商城图标
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeBAMAAADA9RPrAAAAIVBMVEW+wMi+wMi+wMi+wMi+wMi+wMjg4eX8/Pz9/v7+/v7////47pbUAAAABXRSTlNJSuTm5/uA3x0AAABESURBVHheY2AORQADBlMkXjBDKDKgFi+sa9WqNjgvYtWqVctR5KaRaSYYrEgFmwkDpchyK1MHzEzCPJSQD2EQQeIpAgCEa5XIk5OmcQAAAABJRU5ErkJggg==';
};
var set = function set() {
  //扳子图标
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAA21BMVEW+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMi+wMgJrSoSAAAASHRSTlMAAfMieiTiyJKc5+Wb6pOdBwwhj/kNzlVOLvI99PyMVoJai67+olwmMcXhuhSjMLcnMpRTtYrkxomW9+MjBtwLNjuHkTjT8XwmAdFQAAAA3ElEQVR4Xn3SZ2+DMBCA4QNiXCC0QKBp02bv0bn3Hv7/vyhx7ItVncn7ydKjk0+W4V+THo8eo2nnEEjj/kDIwnpC7MoV63wPSO1muZ0fK3t6BtpcWcws9i5UIwPFBWJNY2Gw20Lc15gBxmKO6GocOto8X4SIAntw0ERuJrFLqdlMvpS5c1N1kdQjeeBmWxpu65xY8FRb1WJnW6zBlAUWax6UW0PbnsWuGbXghsf57d09/qHPFVTSytp2HcDMu71AajV4lZNvcnKHGHzovyONduSWGuqXMtr3z++f1ZanKlmuUOag3AAAAABJRU5ErkJggg==';
};
var add = function add() {
  //加号
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY3OUMwODZCNDZDRTExRTg5ODI5RUM4QUExNjEzRkFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY3OUMwODZDNDZDRTExRTg5ODI5RUM4QUExNjEzRkFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Njc5QzA4Njk0NkNFMTFFODk4MjlFQzhBQTE2MTNGQUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Njc5QzA4NkE0NkNFMTFFODk4MjlFQzhBQTE2MTNGQUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4W03vsAAABKElEQVR42uzdsWrCUBSA4dwi7vb9HF3dKi6+gJ26u/lcTg5OpqPgoic0BRGDQRyO8v1wwGS6fMg1ww2WzXZXJWwY8x0zbq/XMV8xx2wLHVQ5W8ZML66bz4eYebaFfiQFHN+4N8m40KyAnz3vAXz1AAIECBCgAAIECFAAAQIEKIAAAQIUQIAAAQogQIAABRAgQIACCBDgewI2B7p/YuqYU5LpKsv66tZs2Bwyvz7QrfuNWrND2Wx3+yrp+eMXqLYHPmEPXGN4uFWzB85iSvX3bsaISa9+2y/eoiR91avrl7h4DvQgLYAAAQIUQIAAAQogQIAAAQogQIAABRAgQIACCBAgQAEECBCgAAIE+FB1z3sAO7p18H2VcaFZ/83h8uD7P+gi40LPAgwA+X1kubjVZ9gAAAAASUVORK5CYII=';
};
var yjt = function yjt() {
  //右箭头
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAqCAYAAACpxZteAAADdklEQVRYR72Xy09USRSHf6fubUNMBuKD2c9q4m4SuPf2ypVxgomZMUYGARGdUaOyNdFdq8TXX2CUlY//AIbG1lEQ6G5yYUHCxhd08JGo4IqE4Nz6TYrQpKe5l37w6GV3V311vqo655Rgiz+Sn398fHxfEARxrbVYlvXCcZx3m8FeBoyNjf1CsgfAzwDMd++VUl2O4zzdKEQSiYRqamq6BODmyuT5OedItiaTyaeJREJXCxLf92Na66skrxRNQpJvRaTL87yBqgFmYCaTOSEidwHsLIaIyCcAHa7rPqsGsrwHmUymVkQeAzgEQBVPJCJfRaS1r6/vWaW6Vk9RNpvdIyK3zGpJ7iiOBMAbkl3xePxJJZGsAsyg0dHR3ZZl3SD5l4hYIZCPJE/E4/Hn5UL+BzCDViJ5SPLXKF1BEBwfGBj4pxxdawAG4vv+XpK3tNYdAGIhG/9aa210pUpFEgowg6ampnYvLCzcJPkngDBdH0Sk3XXdwfUgkYACXY9IHozQ9YVkS39//4soXesCDGRoaKi+pqbmNsn2MF0AXiulLkallZKAgkiMrtPr6GpzXXdozR0qtUn5383Ga63N6YrUpZT6o7e3d7BQV1kR5CETExP1S0tLd0SkLeJ0vQJwsTCtVATI6wJwG0BnlC4ArZ7nvTT/rxiQvydBEJjcdSDsdAH4LCLHHMd5WRXAQEZGRn60bfsOyTYRsUPSSlZEjlQNKIjE6DoZous7yf0bBdQFQWAq4dkQwL8AqgdsqSKTcQGYJuFwyMohIl+01u2e56UqVuT7fp3W2tSMc2HHVETmlFLNjY2NyzWjIsCWXjRT7Wzbvk/ytwgtpm53TE9PP2lubg7yx7asCFKpVF1tbW03gPNRWgC0hHUeJQErSc5cqM1P16W0AJgzlyyXyyULtRTe6sgITK9kWVZ3EAQXIjqMeaVUS6n+dfuL/uTk5K7FxcX7WuvfQ1ZuLpFpijtzuVx/lJZIRUYLgOumaERo+UbyeCXd3fa0jsPDwz/EYrEekkfDtACYF5HOmZmZv8vRskZROp1uU0rdC2vfAXyzbbu1oaGhqjdC/gFyjeTl4qq0KQ8Qksr3/ctaa5MKCo/tvNb61OzsbF+lWtYoymazjSQfAPhJZJlhEtcZ13WT5fZNUf9bXXE6nd5nWZZnohCRwU19xm50leuN/w/gsNFGcnfzOAAAAABJRU5ErkJggg==';
};
var inputSearch = function inputSearch() {
  //input框内的放大镜
  return 'data:image/png;base64,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';
};
var deleteIcon = function deleteIcon() {
  //input delete icon
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdDNDgxRUI5NDQ0RTExRThBMTAwRjQwOTY1NDA2MTIzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdDNDgxRUJBNDQ0RTExRThBMTAwRjQwOTY1NDA2MTIzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0M0ODFFQjc0NDRFMTFFOEExMDBGNDA5NjU0MDYxMjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0M0ODFFQjg0NDRFMTFFOEExMDBGNDA5NjU0MDYxMjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7uxsJuAAACBElEQVR42ryXvU4CQRSFF1BaNJGlN1EKOxILSwqht/Cn8AFAg76BxCdQovAAFv4U9GACliQGOxIMiQ/ASoQWQ+K95myyrszMzrrrSU7D3jnfkpm5OxNpPXUMD1ok58nb5E3yKnkJz8bkN/Iz+ZHcIH+qAhcUzzn8lFwkJwU1KXiLXCK/k6/JF3ipuYpKoPvkPvlMAp2nFYzpI8MzOEaukm/xT/wqhYwqMqVgLnggF4zgVEBmTAbmedkxghdnXorAe+RjIzwdgfEDzKu3YoSvir0NbTBvGVNQ3MHbWh6CLdSKmoMJ1jc4jn0q0g1WZlYBt1BTxRiRmBVncE6xT8vkDXJPArehPdSWJXnMytlgQ1HYksDd0JaHhpNncMbD3JkC+Dyo6SEvw7163eOK5MC2A5TF77pQ1hqDExrbIemCGz6grEQ0oP0Z0R3A4IlGvXtOVatdpAmDBz6hbdgPfMDgrk9o0jHnuvAXBjd9Qt0LTgfetMEjRecSQUXwsuKPNBg8JV9JCg/RX9uKjmTDCxgjEvfyaQSnTP5UvWruRT+y0LDGUccRtfQP3+OSffJ0NpB7HEvDEmffic5cJ+R6CNA6soWHvRl5l1wLEFpD5kx1rp5hFR+Qh38ADpFRdENVNwmejzT5XLHP3RphTNo5p7++KpqXtpzj0raMZx+OS1sTnqoCvwQYAKrDjUh9dT6DAAAAAElFTkSuQmCC';
};

var duihao = function duihao() {
  //对号
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAASCAYAAABFGc6jAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAA5UlEQVQ4y7XUPQrCMBjG8X86iKLQqedw0dGpfuDsHbyA1/ACboIHcBTUTG5ueg1XXVzi0Iam9jukL2R584YfDySBNkqqHlJtkcrXLa8VBI7ABjhrTLSELIzuHZi7S5SPAHSBjptExcgTmBKKl2cMB0i1Q6q+awT0ZZAqAC7AGjjVxoqRh4kACAMZGoM3YEkoPpbIzER0om+8zJqUJmuIRImig36cavy3n01mgSRQXcwSSUPV2Ao42CBZqBx7AwMbJB8qx6yQYqgaa4SUQwl2BUZGN/Xi3UBZzAqpX1L5SLWPfxGr+gFqPnrxnPg5PAAAAABJRU5ErkJggg==';
};

var lajitong = function lajitong() {
  //垃圾桶
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhGOUJCMzkwNDQ0RTExRThCMkREQzI1MTczRkQ1QzE1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhGOUJCMzkxNDQ0RTExRThCMkREQzI1MTczRkQ1QzE1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEY5QkIzOEU0NDRFMTFFOEIyRERDMjUxNzNGRDVDMTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEY5QkIzOEY0NDRFMTFFOEIyRERDMjUxNzNGRDVDMTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4j+sO6AAABG0lEQVR42uyYvw6CMBDGixB9CiccfREXnfUhnNycGUyY3NiVXRdfxE2dfAQnUYPX5EwaUhsph5TkvuSjhR70R9M/ab0kSURFDcAHTHU6g0eYWqsjqmtsgPz8yKRqJRSge/DFUC7LdhSgEfgOzi19AoeGOkKMsf2+ZIsk6ALcFe5Kss0laAzOHAZ9gNcBXJZop9URLVFrQeUMcMO0KWkZvMLK9AT7OLh6DYFqGYot6itTQlPSMrSmjwaW73ngKaYpriCU8WSgM/BGud8Sx5NNT30lP6whnid8BmVQBmVQBmVQBmVQBmXQf4JelfyxhniyPVP6JU8VTwaal9yglY3nwcSgv/TR3OUWfTnElplAV8KN83x5bh+rD94CDABiE0/8JY8rggAAAABJRU5ErkJggg==';
};

var banshou = function banshou() {
  //扳手
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAApCAYAAABdnotGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIwMENCRkI5NDkzOTExRThCMTJBQzc4RjFBOUM0N0IyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIwMENCRkJBNDkzOTExRThCMTJBQzc4RjFBOUM0N0IyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjAwQ0JGQjc0OTM5MTFFOEIxMkFDNzhGMUE5QzQ3QjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjAwQ0JGQjg0OTM5MTFFOEIxMkFDNzhGMUE5QzQ3QjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4t7+N1AAACp0lEQVR42uyYTUhUURiG70yj4iKEoCKE0EUgqAsd0EUto2yTIAZFIUG4ykWkQZKUpOQmqEVuihaakVhC9AM2JAQqKFhtWgShJRRRSSgF0o8/74F34Os0d+65956ZhdwXnmE495zzvXPu+c7PxJLJpJNFW8B10CbKYo4/rYvvN8AZsOpWOZ6loxLwRDMTVqqvp+zbl6FyMAUaHPs6yL7LTQ3tBdOg0smdKhljn5ehE2Ac7BBl7y0akX2pGM8Z8z9DaqL2gEFQJJ4/BLUWDdWyz7SKGLM3nSzKUDEYAV0ig/6CdtAEliwaWmKfZ8EfMRgX6KE4gY8XoE40+gSOgYkczR+1DFwDs+AeKGV5M9gd18ykQE0OzUhNMFZKlNUltEqHwJqTP31jzFW3LDMxs8tHQJO6a6YrtZve6KnqouOs60umhjrAT37fBu6AUW29kuuLejbEug7bnjMJFMPmum64cZYyO46IskXQDb4KM5fAdlHnPtP8o8kG7MdQWge4a+/xqPeOm2nKz4kgyBxSAarBRbCS4fkKR6na0Mw/SgRM11/cau6Cy2Any7/Q6HzQdSARch2ZN8w461mWN0WGIkObzlDQtD8KTnnUGQa3wxoqBL8N2pWB/R51Zg09FGZ7ZS95isuXanTjaoQe8DyrVAVmeAvoEwdxXermMOcR7G2WZwWgkxeLAlE+GuPdXs2JfnF+UXoNWoIcsjxUxauPfBPfwWk17+JiAqqKjzIMZ6eFPS/9Ns6zT2nmMWMP63PoM2gEJ8GyuMhdAZOgIoSZCvbRJy6iy4x1mLFd16EB3r3HRFk9eMWjrF+1s229KBvjqAxkOsK6Hm9BK7gKtlr6f+gHf9QtrdxoYVQNboJn4IOlCa1OkQtht44Fixnm2Ve0uUaGIkO51oYAAwDJuIGoOth/5gAAAABJRU5ErkJggg==';
};

var star = function star() {
  //星
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABHCAYAAACtUKHoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk5NkJBNDAyNDk0NTExRTg4Q0U1QTQ4MzlEOEJCOTg0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk5NkJBNDAzNDk0NTExRTg4Q0U1QTQ4MzlEOEJCOTg0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTk2QkE0MDA0OTQ1MTFFODhDRTVBNDgzOUQ4QkI5ODQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTk2QkE0MDE0OTQ1MTFFODhDRTVBNDgzOUQ4QkI5ODQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5hl+HiAAAEbElEQVR42uybW0gUURjHjxZYUUSFRGn3q6am3awsyoooUYroISooKwjCDIKiqKAHy5WCIIuKXiS64FP3iF6Seonofi8ou4hRaQRGaTf7f823pdvqzpmZnZmzM3/4w7I7e2b2t9/55sz5zomrrfsoXKIk+Byc2eK9a3ABXBetk/bp1UPq+HjhHp0KgUWaCFe66BpdA4yiaFwbn82Ap/vAWqs0wucBH9g/5cOjIhyTDU/1gWnaqfO4Mh+YEHlwus5jJ8E5XgdWKnl8mZeBzYUzJL+T43SUOQnMaLQEvAhsjkTuCtUUeLLXgJU5/H2lgM02kLvCRVm2V4CVuiRKlQBG0TXGoram8cN5TAMLuLw9VwGbBWdZ3OY0u3OZncDKFIlaVwCbYWHuCtV0eHysAQso3v5fdYxi233gZHi+DRFAEbwVvgjXsqOiOAuKIB2ENgE4QGhz8vR6CJwGd3JgqNQIP4RfwE/g2/Br+DH85b9/VbIIIgusJ4/Sh8EpnJeSGZDbVcN+AN+Hq+G7FI2A9sMssG4MIoWjZjDD6Qd3FbGj7/A7BvgUfsYRWQOINZGA0QzAIngkd6u+wrtqgh8xwBOAdzoUWAm8RfhqS3sAbX0QGI1jLvtMIioX0KpoHLbYZ6FLC4MD1y4+C7mR/lkfgy5VBoHRi/M+j3Z1APnrastnSSrXn/S5hFU5YK0J9/C9AK7w+bRSCWAVtzdbUUhEfU5/tBmwtoVL+qEiots9Dms1YAVkH76LPBptiwCr0uhsxRL4qEdA/YTzAOuSkdmKlsrzwLDjMzwTsK7rGbhG0gWhVWcaYxTWBzhHDyy9wEhXhLagrS7GYNFM7CTAuifzaKRXd4S20vl5jMCi2daxgCX1e2SrRq/gCfBNxWFRj5lopMcYKbPRXYJWz1QpCuu8mZxstC5JJ8uFzyg445BvpgGzhdx5Cj1/HhJazUI4CYx0WBFgB61oxApgcxQBNtstwLIUAZblBmDBZQIqKMUNwAbBAxUBNhxOdBoYRVecIsA6C62q7yiwTMXGYRlOA0tXDFi608AyFAOW6iQwWt0zVMEumeAUsNEKJfyguptN/PFO5gOHlOZkhPnAYjjhW3LdRoH1FtrCYBWVaib3xpsI64Qo/Jj38AZOzFSmr4/COfoLbZGz7cCsFNUKNsEj4N1CW9Fc0gLcWwvPFW9mwsAoMKumdKhiU8QzCbR561PI53UMjkButBDcKNUijECt5QjaD3+NcHwDvIvBbbYAXKadwBKF8bmlJxxRlHj3wT8kv0/gAgyOcl213Y9IRoARLNmFxFQ0LeQLpYj6ZjJCGjjXpfAfIAuO7vBJdgGTuTtStXwpd4EKuNnim0UT/wHUtdfBLyV+Q0e7gN3SESE34GV8czhmw9iKrmcvR1wxd/1IEf/GLmD13L3CiUrwtAGA9kcecWBQSgXmcga3QmjbAENF68BWwr+MnMDMfskCvtNReNPOr+PCnevIlsOreKaC9kzu4Aj7I+n9ks3NzcKXfv0WYAD/otPwnAFA4wAAAABJRU5ErkJggg==';
};

var starActive = function starActive() {
  //选中星
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABHCAYAAACtUKHoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlBMDQ5ODU2NDk0NTExRTg4NEM3ODg5RTA4NTg0M0I3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlBMDQ5ODU3NDk0NTExRTg4NEM3ODg5RTA4NTg0M0I3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUEwNDk4NTQ0OTQ1MTFFODg0Qzc4ODlFMDg1ODQzQjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUEwNDk4NTU0OTQ1MTFFODg0Qzc4ODlFMDg1ODQzQjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz76utUNAAAEcUlEQVR42uybaUgVURTHryZYUQRBRNn6Wl3TVsvChWhViuiDhNAKQbRAUBQVFFg+KQiyaPsigYWf2iP6ktSXiPbVAutlUlQaQVHaZv/jnFf6evpmezNz38wf/iC+eXdmfu/cM3fuuTeutW6ocIiS4AtwZrv/3YCL4MaondUX0HR4vHCOzoTAImXD1Q66RscAoyia2MlnBXCeB6yjyiJ87veA/VMhnBrhmCnwDA+Yoj0qjyv3gAkxD05XeexUOMftwMo0Hl/uZmBz4QyN38mxO8rsBKY3WvxuBDZHQ+4K1XR4mtuAldv8famAzdKRu8JF2RS3ACtzSJRKAYyia7xJbeXyy3lMA/M7vD1HAZsJZ5ncZq7VucxKYOWSRK0jgBWYmLtClQdPijVgfsnb/6uEKLY9AB4EL7QgAiiCt8OX4TfsqCjOhCJIN6FMAFJDmfz3CDgN7m7DUKkZfgy/gGvhu3A9/BT++t/RGosgWoH15VH6KDiZ89IgBuR0NbAfwQ/hl/D9tmj0BX4aBdabQSRz1PgYzmC4l4gd/YDfMcBn8HOOyAZAbIgEjGYAiuGx3K0GCveqBX7CAE8B3tlQYKXwNuGpM+0HtI1BYDSOueoxiah8QKuhcdgSj4UqLQ4OXHt6LLSN9M97GFSpOgiM/rjo8ehSh5G/rrd/l6Ry/WmPS1hVANaacC/fi+BKj08HlQLW+q5mK5a3EfVE2gpYO8Il/VAR0Z0uh7UasPydPSXDaRe8zqWwigHrWFfDis50EC5xEahf8GzAqo40DutKVfB8F8D60jb54AtcUTNwjaRLQqnONMcorA+CVgT5AjfVjvTV6JpQFrQ1xhis+rb78gUeaHk1Uqt7QlnpXBcjsGi2dQJgabofrVWjV/Bk+LbksKjHZOvpMXrKbB+FsnqmRlJYF43kZL11STpZPnxOwhmHQiMNGC3kLpDo/fOoUGoWwk5gpOOSADtiRiNmAJsjCbBZTgGWJQmwLCcACy4TkEHJTgA2HB4mCbDRcD+7gVF0xUkCrIdQqvq2AsuUbByWYTewdMmApdsNLEMyYCl2AqPVPSMl7JKJdgEbJ1HCD6qP0cQfb2c+sElpdkaYByyGE74p160XWH+hLAyWUSlGcm+8gbBOjMLNvIc3cWKmMn1TFM4xRCiLnC0HZqaoVrAFHgPvE8qK5tJ24N6aeK54IxMGeoGZNaVDFZu1PJNAm7c+hXzeyOAI5GYTwaXKFmEEah1H0CH4W4TjP8N7GdxWE8BlWgmsn9A/t1TLEUWJl9Zu/NT4fQLnZ3CU615a/YqkBxjB0rqQmIqmy/lCKaK+G4yQz5zrkvkH0AqOnvBJVgHT8nSkankJd4FKuNXkh0UL/wDUtTfAAQ33kGAVsDsqIuQWvJQfDlUWjK3oeg5wxK3nrh8p4l9bBayJu1c4UQmeNgDQ/sgTNgxKqcBcweBWCGUbYKhoHdhK+LeeExjZL1nETzoKb9r5dVI4c/n6MngVz1TQnsndHGGKNO+XbG0VntTrjwADALM1078Bykg5AAAAAElFTkSuQmCC';
};

var dun = function dun() {
  //投诉意见盾牌
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAqCAYAAADBNhlmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA4NThCRkFDNDkzNTExRTg4NTg2RjA3NUMxNjI0MjY1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA4NThCRkFENDkzNTExRTg4NTg2RjA3NUMxNjI0MjY1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDg1OEJGQUE0OTM1MTFFODg1ODZGMDc1QzE2MjQyNjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDg1OEJGQUI0OTM1MTFFODg1ODZGMDc1QzE2MjQyNjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4OZm4GAAADQUlEQVR42syZSWgUQRSGq9vRidEQlRg3AiriwaigYxS8uMctRhFcMDfP4oInTwa8eTBXBzToQeJ2SUDQUzy5jygiCWgCJjomOFGjMQsmjv/L/I2VcSbpnu4k9eCjq3u6q/6uqn716o2l3FseWANWgeVgKVgAisAc/p7Pe3tBP/gKEuAzaAXN4C14CQbcNGqNIWgr2AXWg7VgqgrGflPkU3AfNPKFxhQYBpWgCuzQekRsEDSxB96ANtAOOsA3NtrNewtBCMwG80EJWQlKif6y0uMPQB1oyNS78vBF0AWS5A94BqrZkzNUcDYdbAbn2YtDWrtd1FLi3BylYueGF+A059dEmfTySfBc0yGaLivtwg1QpibfItQyrMtiYawPZvQaI5GM12OxmB+hw7rsgN9+EQnMghS4ib6ulWXjBJaDaaTcRIH2eNRrK8PNphcXm2mQLmdRGLC5RIlNMUhgiMd+O8NFkwQOisCetG41aYh/6UMcNkhgWJ+DP7X4zxTL0+dgnxYCmWJOHNonAn/wZJZBAgt57BaB39MuGicwwZO5Bgks4jEhAjt5UmyQwHk8dorAT1os58d6s5RzjSvF4iHGb2LLfFZ6FWxjudZnXY6WlhA302KrGfYnc6w0zp2aX7OoRazZGeI2ZgfWGTD/yqjlg2hzgoXbPJ41QKCj4Y4esNZwYh8G2ydRXAU4RC01usA4Mwgy/td9uJx9JFfXcoUaqqlpRMh/CTwEC5kfyffYQBWfa2DZ69pbT5GN1PLfnmSIQ/wRbGAix0sQW5yl7CY4rWObkow6Qi0Zo+gvYA97UrJcd8FRlSU1lmZRTVjUQ1h1k23JkruXGkYN8yW1tlOl0mH7wT0ee1ysJOc89FwBh3WLSmW0drNt11ZKHymO+zVYHODXKnW9Yt3SxopcK1qiUknLJIegIiBXkmCdTUG8eAEduZPUrKWn92ryzDX1L913K+i9+Bl+LFK5pH2PKXcpO4tup4PPSh2nxsvTS475iRqZjT2QJYUi1w6CmHb/Iz/zzUu65Dj9pdPwe5XKN8vfFJLNvMDF3vm9nc9YagJNdoGSV27RhKTzDpzws2O0AurRjfSVlRRWzyXvMT+snO2vAAMAfIPK7qqsB1wAAAAASUVORK5CYII=';
};

//白色返回箭头
var backIcon = function backIcon() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAaCAYAAACHD21cAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFCOUFCMEJBNDc5NTExRThBNzE3RUNEOUJEODk3MTc4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFCOUFCMEJCNDc5NTExRThBNzE3RUNEOUJEODk3MTc4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUI5QUIwQjg0Nzk1MTFFOEE3MTdFQ0Q5QkQ4OTcxNzgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUI5QUIwQjk0Nzk1MTFFOEE3MTdFQ0Q5QkQ4OTcxNzgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5xWMuWAAAAxUlEQVR42rTUWwrCMBAF0MSqn65EfItLcYMi+KIUd+UbNxBvNIUYJ+1MigP3qz0QJpPRxhglrB7yVBYKskCuyFKC5sjDfGrNRTMPbZGMg6bI3UPtd18EaFeiOjhBbg7tkY7/PYbGrnu2Dkg3/IdCI+RShSho0dmhPIZCOPRQUYV8OEBODh3rUAn7UmTTwsBqlVLEUQvuUanm5NzmNLqORgNAjdzPnEqG/Otl/O1ZxR5yxoXh6thwVwe1rFbJ61GnLuSXAAMAaKsIWtKClo0AAAAASUVORK5CYII=';
};
//我的账单明细背景
var billImg = function billImg() {
  return 'data:image/png;base64,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';
};
//招商中心视频播放icon
var playIcon = function playIcon() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAYAAACuwEE+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFEQTE5RDNGNDQzRTExRTg4MkQ2QkY4MEJEOUU2RkEwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFEQTE5RDQwNDQzRTExRTg4MkQ2QkY4MEJEOUU2RkEwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QURBMTlEM0Q0NDNFMTFFODgyRDZCRjgwQkQ5RTZGQTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QURBMTlEM0U0NDNFMTFFODgyRDZCRjgwQkQ5RTZGQTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7f6fboAAAPPklEQVR42uxd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';
};
//园区公告天气icon
var weatherIcon = function weatherIcon() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY2OTdGOTAzNUZERjExRTg4NkUyOUM4MEUwOENBMTM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY2OTdGOTA0NUZERjExRTg4NkUyOUM4MEUwOENBMTM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjY5N0Y5MDE1RkRGMTFFODg2RTI5QzgwRTA4Q0ExMzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjY5N0Y5MDI1RkRGMTFFODg2RTI5QzgwRTA4Q0ExMzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz70eHjbAAAGjklEQVR42uxZ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';
};
//园区公告物业icon
var propertyIcon = function propertyIcon() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY1OEE1NUEwNUZERjExRThCMDRCQTczODMzQjFCQTQ5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY1OEE1NUExNUZERjExRThCMDRCQTczODMzQjFCQTQ5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjU4QTU1OUU1RkRGMTFFOEIwNEJBNzM4MzNCMUJBNDkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjU4QTU1OUY1RkRGMTFFOEIwNEJBNzM4MzNCMUJBNDkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6beGKOAAAGy0lEQVR42oRZ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';
};
//园区公告活动icon
var activityIcon = function activityIcon() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk2MTlDNEQ1NDM5OTExRThCM0QwRDM0OUM0N0U4NkMwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk2MTlDNEQ2NDM5OTExRThCM0QwRDM0OUM0N0U4NkMwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTYxOUM0RDM0Mzk5MTFFOEIzRDBEMzQ5QzQ3RTg2QzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTYxOUM0RDQ0Mzk5MTFFOEIzRDBEMzQ5QzQ3RTg2QzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6oHDSrAAADtElEQVR42sSYX2iNYRzHz/tnZztmDm3M2Myf2VgYMklcmChpuOCCorjQrly4dK2kKLkglJKQG6GEwmISSRFtbREb86/9MYZtzjmv76++b72d3vP+PefsqU9n7bzv83yf3+95fn+O0t7ZHQk5dFAHDoAScBo8ByNeXl5YO8v2/2ok/FApaAKIgUnZmFcP+b4CpoF9YCMoABp4BzqBEWa3YTe2hKLKwBSwCqyn9SLjIUyhkF20mjnXZLAdzKT18i6sECwGa9OsI+5cAFaD4nwLE2uVg520WvoQq+0G1Xw2b8LERY2gGUy0+b6I3zfRgnkRpjA8bAVxB4uIuHWgNMhZCyIsCubz9kVdnlsJNgQ5a6pPS8nOqxjlyz2cHzl/LcwMmp/zpnsQoxKNUV3cs4XudBvizgbGuV7wA/wDKQZfI1MQVpArFQos5GcBJ5SFp4O5YB6YzVsm8anSh7VFxDfwiUhyfk8+g37m1TGQAKPytymomuaWRWeAWlLF781UowY4l/J8BV2/jEJFQBJ8BR9AB+gBX5jOOnTGor0UV2ixXpSClEh2hnVT5qWJ0fqNFosNgBsiYj/PQSyS/6ET69qS3mKygzdgOEwlkMVhUEu7CDsBboG+cRYna/8EbeComLELHAGDYA9jjzoOon6BmzRUu864IjfhFA/9Nt4iJY+ixFv3wDHe0IQZYJOMK4f5UAsLv1xbLkX3XQYnJWSgB0ikR/4kA+F58Iflck0OxRnMBlfBOQm8EJXMlJJkBx/BGbr4IAOjnmVRSZ6pS+C4xC6ISrnlSnlgCFxhJD4EFmVZWC9dd01SEkQZXqsLg+niOmjNgRtfg7OSjuxEuZU9Bq0Xz4GwYnpLCVKPqZxgTg6ElREtiDDN0itme0hunOp0qVSXBFsWpgVzaf0qnRoV1eXlOn7mwmKNLEh9C5OXlju9HFJYA3+I8SVMoQuXeqjTzLRils6DDKBunZZUyKUdXT2qn2ZE4eGscWjRDAqQivM2uMvavYmNcIVDBayzIJRz9oqb8yRMY5iI21zpFIs5SV0vWao8pUAR+4xCpUpZwSamxGYtnY2OL4tpfElPEzTCruYBuMDdDjOvmhFcCoDv4AmoBzvAZjY5RZaNKk6/COkO52aIi8a4cDfd1cafMgfYahk2Lk6wh3wB3oI7YA3YxC4+yuZjKFPVnEmYTPyIlqlmi3URPAa/OamXMnyU1mulix+yI6un5e9z056FyaJ/yRjd008rpAKEhzEK6LNsbITz227wvwADAOP/3akqYCj0AAAAAElFTkSuQmCC';
};
//园区公告大事icon
var eventsIcon = function eventsIcon() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZFQUY5Q0VDNUZFNTExRTg4Nzk0QkIzRDY0RURCNTA0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZFQUY5Q0VENUZFNTExRTg4Nzk0QkIzRDY0RURCNTA0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkVBRjlDRUE1RkU1MTFFODg3OTRCQjNENjRFREI1MDQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkVBRjlDRUI1RkU1MTFFODg3OTRCQjNENjRFREI1MDQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6v98htAAAHhUlEQVR42oxZ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';
};
//在线账单详情-电费icon
var electricIcon = function electricIcon() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAyCAYAAAAweqkjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmZJREFUeNrMmEsoRFEcxu8wIY+yGTOkPLKzoMSGBTsbyiOxECkWCgulKFuNhRViQ81CHiFZWsjGRsmChYWy0TywoVBT0/gO/8XtdufOPefec+7867eYe88583XnO+d+//Gl02ntr259moTKB4Pg0PaMln89eZrcCoMmkYkyhQ2DeZDIJWHNYAcwf0RzRVgAnIFi+vyaC8L84AjU6K7FckHYGug0XIt7LWwczBqu/YBPL4W1gW2T61HRBd0QFgInoNDkXsIrYQXgGFRnuB/3StgGaLe474mwKTCZZYzyn7IDrNsYp9T81eSrAhtjlT2xInAKgjbHK/MYO6taOcbHVAibA2Oc67/KFtZF70GeegdJmcJqKRrnc64tbHw7woopWwUE1o47Eea3uMfS565oZkd9gXrOOawTef77cosuaQGsamprEV1S2Oqn7AYrikXtUVeV0WMNYF/A7E7qGkxYmb+MzF6uUNQT6DMeLXkGs0dAo0JRHyTqzeq4WKZBqioFhsCD6ZGg25V19NTs1iZtEtGaBluZ/rvQn2PPnAuXOhC1ZSrKpQQbFJx3AWZkRusqgTn35KuULGElBE+xnddPO1Fa5ud9Wkna8U+ymxFef03Q6S69SwpxjA3Te1BJ+1ZpcxxrXJZU9pUVNsbcgFHKWMqEZTP/CxgA36o7cSvzMzG9JE5TLSxkEY1HwJ3TN7zb5mdGP3cjeogI82Uwf0Qfjb0QFjDprq60/7+lNC+FhUyi8ZCTrtstYUFDNO4xi8ZeCKvSRWOWFh5l5G4nT4yFvUtZDYGox9azRWOn5ReYcwsOZLdQvwIMAPdkbYepXLrpAAAAAElFTkSuQmCC';
};
//在线账单详情-租金icon
var rentIcon = function rentIcon() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAyCAYAAAAweqkjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWdJREFUeNrsmTFLw1AUhZtaWhTskC7tUl1El6CLUkFE7KSgk4Mu4qCL4ObgVid1FZwUHMXJdqqLgor6U/wRLvE8OEMIaTTJe30R7oFvCE3Cx7157z6o4/t+IY8pFnIaERMx0yktfbV0vesMVMAxyLzUSxqEHHAJjnjdAHvg22YrR8BtQEplB/RB1ZZYGdyzOuG0wSurN1SxUdAFWzH3zIFPMD0ssXG2av0P906CD9AyLeaCJ7CS4JkaeAYbpsTq4AUspKjyGFu/r1usSSkv4wq+AR1dYlPgLe1HHJFTcE3R1GIepSY0T5wD8MAWJxabZ/vqhsbhJhdSLYnYMh9yDc/qRfDObeVXsTXwmHWkJMgMN+LZODG1k/fiem8oDX7Lq1Fiu5x9ZUtHsCo7tR089hyCKx5hbEYV5U5VUImdgHOLMs6gVXnBH8PImV/EREzEREzEREzEREzEROz/iznyX5KIiVjO8iPAAJseLdFAJ2/EAAAAAElFTkSuQmCC';
};
//在线账单详情-水费icon
var waterIcon = function waterIcon() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAyCAYAAAAweqkjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhJJREFUeNrsmc9LAkEUx3clQtQEz+VB+hNSiQj6cbSiPBQd6tQpCE9CxzwkZdeiW2Cn/oAobx0q8pJ3qTz1B3TxJOT2Hj7BYNN9uzNvJXzwBZmZ9+azM86+mVnTsixjGC1gDKmNwP4N2JhdofngKtY2uoJuuI7WskMwFxYHXdLvZ9DnMEwljlIZFCNdU5nvYDlQ72QsUZmvYNOgok15kep8AcPpugKFberCVGf6AbYPWuhTj3UH0mCToBMH7Y6prRjYOSjqoF2U2oqArYOyjPZZ8tEKFnE5Ahfkqw3skN7yXJsiXy1gCVDewyrOUwzlYCVQ0ANYkGIoBcN30qaC9IUxFlWCnSncapVUga2A0grB0hTTExjmuoKGDWphUB4dBJYBJTWAYcxVL2A6RqtrR27BZjWNVtdmqA82WM7Qbzku2ISbxOtyQxDhgOFyDgmAhf5aBIE+q1HKMhywlCBYkgOWEASLc8BMQbBxDtiXINgXB+xdEOyNA1YVBKtywO4Ewe45YI+gDwEo7OOJA4ZX2acCYNhHm5vEy6BXjVA16oO9u/gG7YKaGqAw5g714WqjWAdtgVoKoVoUs+71MFIBbSgauSbFqqg6vlUosdc8/qdSTqC4J/E6Hb32QA2GX4N80oOm71eytvvI5eCeHx9oHrQGmjM6962xntyHMC+gW6Nzvd7uF8zunt8cfX0bgWm2HwEGAI1hVRdTvzmgAAAAAElFTkSuQmCC';
};
//在线账单详情-其它icon
var otherIcon = function otherIcon() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAyCAYAAAAweqkjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGtJREFUeNrs2DEKwCAMBVBTemFP4pF1KRTaLUu1vr8IgvCIAYPRey8z5iiTBgwMDGx12PnaqTX7FMS15s63Fq4SDAwMDAzsl9PFPSVkE9tV7Jt57FFpzQ8GBgYGBrYoLPzzg4GBgW0GGwIMAHaoDGX1kNI7AAAAAElFTkSuQmCC';
};

var quanxian = function quanxian() {
  //权限感叹号
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI5OTg5QzZENTMzMTExRThCMkFDODM0RDkxMTYzNDlBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI5OTg5QzZFNTMzMTExRThCMkFDODM0RDkxMTYzNDlBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Mjk5ODlDNkI1MzMxMTFFOEIyQUM4MzREOTExNjM0OUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Mjk5ODlDNkM1MzMxMTFFOEIyQUM4MzREOTExNjM0OUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5A+WbsAAACQ0lEQVR42tSZSy8DURiGTyeiJMQKsRd2qkWKhbotkEgs+AWWfgB/ALta+w21REQk2LjEpWqn6V6q2oVLxCWO95OvMmqmyXSOzpk3eZLG1DlPMnOm3/lOQEopKkwtGAAjoAt0gDbQwNefwC1Ig2uwD47BW0WzkahDwmAd5KXzFPh/w07ndfLlENgGn9J9PnmskErROhAH71J9aMw1nsOVaDtIyv9PkueqSLQP3Mnq5R5E7XwCNqs+CvZMK7haoTfFODgtvWAl2g6OQLPwJjkwCDLmPxolX6oDCQ8lBc+dYBdb0RXQLbwPOSzb3foQOAc1LiY4AYf8uR/EXIz1AXr4V+3Xqt9SsHJXTeMtKRhvszhe8daHwaTQL1Ps9iO6QI+BhqIBdvsWDYJZoW/ILWjwy71JY1Fyi5LoqNA/owa/lnRPyODKXPd0kGirD0RbSbTRB6KNhvBJSPTRB56PJJr1gWjW4H237klTSZcCM4oGpNJukT/HFIqmqB4dMtWQumaYRIP8nOr6e/8AWujWv4INMK9gUJUVfjGJb0euoCOK9uaqK3xKj7nCvwS7Gt52croo3dzRzu/M5ebuAOwUFwCYcLm56+W30p+WTlzqk3i5lk49d0m83tunuEn8YteAoAtz3FbxKjneJ72U65QI7vlMg2cPJJ957oxV9WQV6qaNgXwVJfM856ldmSfKyNJzclUFSZpj0E7SatXbtcbXdG+NWx02qIryw4ZSInwEU3BxfBNxOm9A4YFYp7A+ELsRCg7EvgQYAOtq3+y3johrAAAAAElFTkSuQmCC';
};

var home = function home() {
  //投诉详情房子
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAArCAYAAAAKasrDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMwMEJEQTcxNThFRTExRThBNEY5QzM2MzkxNjc2NEQ3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMwMEJEQTcyNThFRTExRThBNEY5QzM2MzkxNjc2NEQ3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzAwQkRBNkY1OEVFMTFFOEE0RjlDMzYzOTE2NzY0RDciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzAwQkRBNzA1OEVFMTFFOEE0RjlDMzYzOTE2NzY0RDciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7E051kAAACsklEQVR42uyZXYhNURTHzzmuGWF8pPCgyWc+cu94QJNvwhORr5g8ULx5UZPySvEkXpUHpbxQyotG8mJGIpl7R8QDJV5IZGaMGZrrv/Q/07Ltvc88zT7prPrVuWfWvfd/1lp777XuxM0dXyJlk8BVsBM0RmNrP8AtcAx8T2+WDKcjYDM4zjeMpUlwLoE2cMUlcDXoAteiMHYQrNICE8OhArqjcFYDZX1DCxwPloGegAKrDFJiE7gENOQgglKL820CV4A+8CagwJdgkFr+EVhmeocDCvxFkWVXBGtReOt2RbDCIg1tPbYIzgazciJQIjgPTNUCJXr1wFuMjmCqaURgC1dvbw4EfgIfqOmvCOZhgej9sMWMYDVHAqs6xY08RWo5E7gcjBOBS3kO+yIYgxOgncehy/aCM2C6x2cDOA8WZaR4IlhYYnplcbz1vOEAuMAesc5r02RzvQE+88sPWXxmgjugH+xic2Kz12BAtCVqgdQ9AveD2+AyOOzwaWMWJNJ7QJPFZzcfcgszt9Jz5L0QbQkjmFV/a0EnuEf/GRafjeA+uCu1w1Satp4N8XPwjkJ9dTgSQV+LNZcnzUN+uDzdOsNnAlMsf5ch5xnYZPmsVvCI1w/Amow6rEgNTuHRstXh2Mq0yBMNgSdszfuVz2Iuni6+lkjuAB3K50/RK59OLijX9zaDyTGmulO4OJuxOiW123h9Gpyz+DxVNZWWhGmygObwgReAVywH15TXHnPsbGAn67IBNeUl6UHu8RGbxu1J26AeKZk9l0Bpnn+mU90QGY0Ns86y7OsofL5lOSRRzq1k6cWaAmvq1R11ybKl3ASPA4mTHw72+SKYbhHXAwnsMwXmvgYLgYXAQmAhsBBYCPy/BMbmdGk2C+85I3wMJHA7NTgFyj9SLoKjAbuZk/rGbwEGAPTejmR18FdFAAAAAElFTkSuQmCC';
};

var erji = function erji() {
  //投诉详情客服
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAArCAYAAAAKasrDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNFRTdFRjM0NThFRTExRTg5RUQ5RUUwQzM0QkUyMTYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNFRTdFRjM1NThFRTExRTg5RUQ5RUUwQzM0QkUyMTYzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0VFN0VGMzI1OEVFMTFFODlFRDlFRTBDMzRCRTIxNjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0VFN0VGMzM1OEVFMTFFODlFRDlFRTBDMzRCRTIxNjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7eTQS8AAADw0lEQVR42syZaUhUURTHr89JylIiNEJTW6CpKJIiKKWMghbaiCLaoM2goKKy+hBWWB/6EEFJHzRCKhTbqaBFQVughTZIEStwTC0KLNqNnLH6n+Y/8JrejG/GeeM78MPB+7zn7333nnvOmZj0io8qDNPAeDAVjAPDQCrozfHv4A14CZ6AavAI/ArVUUyIAgeCjWAFBbnAA1BPQd/4XB+OjwATwBCOl4Kj4LVZhw6TzyWB/WANJy8GZRRoxkTgcrAKbAUlYDd4b+ZVdWbLuEKzwFrgpFhXCCvv4t84OYfM9Zxzhy2wByjiazkJRvKzR4VvHs4hr/4EPxfRV0ivOB6cBxPBbHBdRdZ+gO08PLJV0sEi0GZmBePAOZAJciwQp7dr9JFJn3FmBMopywYzQI2y3mroK5u+gwqUk5YLloBaFT2rpc9chjBDgcngCDgIbqjom/g8BA5Ty38CJQx8AQWq+2wv+Eot/whMA6sZPNu6UaD4zqeWNL3ATaAFnFHdb6KhmVfqX4GxPBwlXQzCkTIPg7ho0jQG4xRQruxj5Uw2sjSmTHJXNtpIoOhpEG0icAy4pzs0SUYRPQoWR9++c3FftGlMNmX1CsEH0MpwcxEMjYIwScUu0GcrNRRyFZ0O7r+VPCy7wFMwGOSBh7IPwAuLxDn59lzMFRuZoYuODpAgGbWHwXG0X6YrS14F3NynVlg1U61poN0vc5frL1GjuGKDNLydQXMKVznSlsK58/3EKV3W/lkEJnBDGlmd1C3M1yJt6Zy7LsC4aEp0cO8FCtBufWLbNL1vRJRlVH7SJ8vuIAE7VlM2N0cY/7kpi9Rq+1Ywwa4r6BM43O4C4+0usJ/dBabZXeCoQM2lKGow9K0xe0hhO8LfBvHnWwuE+ebMCBTVwDsReIl34TqDh7axydNggcAGZkl5BmM9wQZwVWOZ2c7CKUd39xaz+7TFwte7GSylrwz6HsuWSH+wT2M1N1l5u5+3+LMJzARzQYWFAivpQ3y9om/pyPaipmZ9h1W6S6dZG1fxwY5IKdFffQZXZiwT1WQmr/VGd7G0204pbwf0cgjiBgQI9C1BMhV/62D23mmysB5cAXfAHOXtPweyVBbZ2QHGpcbYAY51JZHQDLLo+eAmuA12Bsl4zgYRJ5aovN3TSZEOkj/BYorbA56Bhdwn+nQ9y8T8cioXWBHFfytvK0760o9Z6cspO0BhHj5jxtxWCPRZM0tSqY+Pc1/eZXloJnuVLVNmpUD9iSxgaSoBVb5KKOXvjb49+sWycZ7qYhv5jwADANcO39eVYkyvAAAAAElFTkSuQmCC';
};

var liuyan = function liuyan() {
  //留言
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAArCAYAAAA3+KulAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc2QjFBNjQ1NUQ5NzExRTg4RThCQUQzRjNCQjVFM0U2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc2QjFBNjQ2NUQ5NzExRTg4RThCQUQzRjNCQjVFM0U2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzZCMUE2NDM1RDk3MTFFODhFOEJBRDNGM0JCNUUzRTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzZCMUE2NDQ1RDk3MTFFODhFOEJBRDNGM0JCNUUzRTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7o1jdNAAADGUlEQVR42uyZXUgUURTHr+uIWRFZWxAVsmFp9WIfJkXfEtRDDxERRPaBBb1UYPRQgb1ICH2hUCH0FGLUS0WULy1BYaBBQUVJFBVL9GmFFFpbO/2P/QcuS+PsbDuwN+bAz525c2bu+Xvv3Tlnr6XitqJFwBawA8wCpSq/7TN4DM6CcyAljQUUNB5cAkuUmXYbrAN9MiqFmpgEqAPRIbH5TZSxJhi7aLAs/NnOhtegGrwzZFT6QDuIg7vUsE1GaCsdDhgkRrc34CCPhwTN5cl1Za5d42eVCBqpDaGp5sQ+KqL+MwsFhYJCQaGgUJBRZvn0l6RwA1gFPoI28NLjnoVgE4/Pgzse/mVgF5PPG+AisDMPMG7bWrBe1gL2aOdfwCLwxMV/I+jQZkKK4i64+M+k4LFaWyvYm0Fstt8pFwO7wSDYDzrZceMw9xxjH60kwjY3a+QzO9nHIPuMBbGGyjmKPQyqie3TXfxLwBSQBA0kybYSl3ucZzWxjx72WR7EGnrEgBZz7VSz/b6L/wDoBZXgMqdEEdsGXO6RZ80Dp0A3+0qy70DW0D5wVPN9oRWHf7MV4KpkwTz/BtaCmy7+k1lOx7R1IVPveKZryK8gxfqpFnzi4v7q4T+V9b5imZzw8B/NL5NxrEbvZRhX1oLy1Xx/y4WZQigoFBQKMlPQLx6PMFiHE/tPEfSMJwsMFuSkYc8jzLOcTLfQQDES82EeX4kwT/rAdKadhZUpFmXMtdRwwtkfWsokcgwz4W46ZGNvwUkmrsPZNBZuk7LsZwKoYSnSz6T3VoG2gzdDFII1Ofj2k9215eCBy/X5LOL+dTak+ByptZ46yWm600Qwh6Pl1yTBlf2m1eAVqGKZrlsp654yrt+OLMX08znv0+uhXM/rYtDFQk32P3emXZf90Dr+diD10o98f7F+5yhJoPVgmXZtJdhMn/pciwkyU3gImjkF2/jik5E7zbYjLMVzbpYKziTo9WA2OMTfBirUn6345qA6DWIN6VbD9ZQiRXxFdJmanMr7rIVCZMqdCVJM0FPOMdldr+Q/ryHozn4LMACQKbGXL1hXogAAAABJRU5ErkJggg==';
};

var imageDelete = function imageDelete() {
  //长按图片删除
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACqklEQVRIS7XXTahVVRTA8d9WSiGoYY78mgRWaAiKYIoPxTB8g0ZvkINqUPJATCcOVPIDJWjSIAm1iTqxgSKKQh+G1sCHFGoKgqEEISKICCqo5ZH17jmP0333fOh7b8Gd3L32+u+19lprr5O0kIxXsAQrsBCv57/JuI2buIQf8VPiXpPZVKeQ8TLWY6sOvI08wSHsSvxVtaESnNGHfZjdhtZD5ym+weeJ/7rXR4EzInzh4WZMekFoedsv6E/cL//5P3DWAR3HqnEAlk38jkWJuIZh6QZ/jXXjDC3M7U18Ogqc8SEOThC0MDuQODzicZ69f2PaBIOj9GYnHgyHOmMt9tRAhzAXUxsO9gBXMb9Gb2diSwEO5TcqlC8m5mUsjuaAKRV6kbXLE0MZl/Fmhd5DvJYyZuJGzQkfRZYnTue1fbIHvAxdjaM6ZVklfQHeiK8aQhjw8Oa3HH5Kp6uFhAd9uafv4VhprcrslwGOTI6MbpIArMzhBeDf0n/R6coHqrN3NsDR2Jc3UXt4FyG9W4pCryuoMnstwH/irZbgUIv7XJr4I6+I8PR5oLHtSYAv5KXSlj2SSDm4Kdt72b0f4LiXuLM2Uk6k93FvLKH+Dh+3oI5ncp0Jjz/B/gZwGdqdvS9STtsDPB3Rp6uku4abGkg/jjQ0kAVFy7yCORXkc4lFLVvmcLZnXMesCnv/YHoBXoMDNV6fwzs1fbrY2uaRGEzsKcAxeURZvd0iycaicgszEo9HJpCsM7b+ipfGYrlh7wep84CMGn0mcgr5IrGtOFivKXMTdo+z13Gng2WbPefqjIE82cYa9qjxjxLfdztSN9C/i29ryqwpKD/js6qviaZPmFiP52+DzuhTN1Xkb4bz2JE4UXeyWnB5Y8arWIYFFR9t8bz+kLjTFIpYfwaRp8O5CHMA4gAAAABJRU5ErkJggg==';
};

var call = function call() {
  //电话咨询
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABblBMVEUAvf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf/OUPcTAAAAeXRSTlMA+Wk8/rTPAYQwEf33T769CaoCnvDr8Rxd9gTqgmT6YVM4JOZE2gPfFJUaUtIomsvMO7rlGwWk7E22hQjFMdzvVO581InIo4BsOSFujVh+jLfElpdf6Uy8LC9H0St4ZW1xKntbgVkyXOEgY6ut/MY3HT6PLc1eV8dFIZkI4gAAAXtJREFUeF6t0EWP40AYhOFqx2MnsR1kmDAMMjMzwzIzM9a/X7WUSDHkts+lXrX69MEhEkFPzfqgZpKmNlhvwk1/0SCToWg0lCQbb3Q4zISYOqnEZMYq5ymGZmBzd5rxAXRgIM7pH+hSzYsMbDIiX0UHlkeMMhzKxsgyOvwswKVAfyeHstuzcJndzg618yWH4WGY++1aq+XgIVdbg4R3HIOnMR5BstgPT/20IB1wKw0P6S0ey7XypBqPwCESV8lbFnAoEkvKCufgsMcV5SwhJrFYDACxsDoKm1E1HAMCxTDWwwBwyhJsSvwt5zIL9snwUYGNQp+cPv6HD+JCxoLzWI+5IOeOgJYIAriiDzaTvAYQTGm44fjtwI66q8NG31V37t0fZwnwGyQfuI6dIUmjIPPhI/9GDg6KSDxZevoMdvrzeZKtV3g9xbercHvP1ofox+Snz1TngvAwZcrnVRajX+BpUXwF8I3f0cMG1ycmfpoigF5+aZub83/+oss/skFGF7IBPWAAAAAASUVORK5CYII=';
};
var timeIcon = function timeIcon() {
  //时间icon
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAA0lBMVEUzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMz3o8oAAAARXRSTlMAAQIDBAUGCgsOEBkeNzk8PT9AQURKS1JTVWRmZ2h8fX5/j5CRkpSVqKmqtMDBwsTFxtHS2N7m5+jp6u3u7/P19vf4+fqhqUkkAAABNElEQVR4XnWT6VbCMBBGp9YUoVILCBRFjBBxBS1oN1Rk+d7/lTz0hMZ0uT/n9iTTzDeUwboTP9puI3/SZZSnPoqREY/quu0HwJJ3bMuyO3wJBH1SmGNg7qqCOwPGZmafsBkaqbAoxRhu8Hj0At8OpZwlU1lzviDkvfhtyuI5XkjSXMNLew5wQ0VN1wgO/d9ibpRpYw5OxGK4VKbJRcyoiwWVa1qgRwJ3VZrjnt7QqdJtvFMCu0rbSGgHq0pb2OX156Cmae3w0w9g/TyoqcO11uikNQ0PX1weWxPgpGG2H0L8yB+Tz6JjttrHZ2ExLqgUFwk7jOTV0IUaiRpogSuEaSC9LA4KFQcigZWTt84KohhF0qOogjwrBlnhyTVgTK6BRxoN/n+JeIPysJ7wo/0+8kWPZeIPKbg3YS8BSXUAAAAASUVORK5CYII=';
};
var adressIcon = function adressIcon() {
  //位置icon
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAjCAMAAAC94eqZAAAB1FBMVEUzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzPQ5Q5iAAAAm3RSTlMAAwH+BN8CD9L0SAoGPfvwI70Q3RznFX4FBxST7vaL6hHbhULc4rzPCCt2uFXJ5Ov4TuWxuXkNdUrhe9hG+QnaYk1eboSot58LWXPZMTiIOyLBH/VLDC2CMOzoavNyLmkk5sBQjzNEdFKZxeOuINfpmjIa8tRxGDQ2s7uHFvF3DizTXdX3Jz+kxMec4En6NTep3orMlsoh7zxRxrsK/FQAAAHASURBVHhebZJlkyIxFEVf08DgA4sMDM6Ou9uOrbu7u7u7u7ueP7t0GoqG4XzJuXXzUklVpITTn9k6t32gL7R7j1RhW3uJMvR6LE3zCLRumg56E9uWJvthZUO5eTLJvnl7OXnXXedGxPRgllBMLGxx4VJz8XZGfFJFg4tVtqI8oqV8tHe2JJG9PBNZk8K8kf1gC7jmbSocxmGXZfSq4OsGdxpWq04Ls0O+sFxVKxiadtp7GtmvYoErsp4NaqiRjcbawxJVbaZd3OQM7SQvBlqaMUNipGSGnYbuKu12ullkyGNmJMpFQzsO6IeMdYKwGBzhqBzjuPIThE+KnMpyWsUzhKTAWeXec3A+Chc0FX8wKn4um6Gj0A9942bQhrgqzlY8YqJFrtlKOkG+qE20yQK6uVmUW2lu1zZ3cKsnJLlbW93jvpIHD1lc3QySypk2xVO7tUnM0VXSWQej1qqJ5/Gye3jxstJ0DuivKuk1b7Sya295Z/2IUaYqx70fEwsf9I+fTPsc0Gvum+SremTOwTepJvGdYZuIbZifPqnh12/GRbpoDMoCBvXAH39A/yt1yDCZJSP1iP+DNk3qEss7mi3xP0zrcmMeiBtfAAAAAElFTkSuQmCC';
};
var priceIcon = function priceIcon() {
  //价钱icon
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAA6lBMVEUzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzPGRm3NAAAATXRSTlMAAQMFBgsMDg8QEhkaIiQrLDc5PD1AQUpLUlNhZGZnaG98fX5/gYOPkJGSmaiprrO0wMHCw8TFxszR0tbi5ufo6ert7u/w9fb3+Pn6/uve/hYAAAFwSURBVHhehZNtU4JAFIUvLqmFWhb5mmaRBVlWmikqAWZl2Pn/fycWd8Gwmc6Xs8szs/eyey7FYlVz7H59uWOzyiit3IWHWN5F7jetO8DUqGiqqlWMKeDUt2DmBhjqyV4fADeZmN5j1VZoS0p7hTvJLSyPKaXjN1iiLj7LoWlHEh1qoZU/0Ih6dnDO3Q4qG1oJbG4tOLz/Swyjutfwi9yLPq65K0MYRMyDvmnwEdMs0d4UD5umdHiMqrBFyfwMfUXpY5YXH2zUyMIVCZXe0e1iWZJ7A7c0QtRRwez1ehN8f2MSLswCx6d4IR8axx38UodjDT4FUDnONltcQGTNLMcqAoGlALEQWB6exuJw2VroWxqRbM2CsYuf5Y/Ja0nXltfCPJz8jXX4jD/Jk5LG8kniB93FZ3jNcW/wOAjN55GJOMgwLWSYDg5kmBaw/o1iEuTBbpATNcQYMCbGQNSV2je2h8jYp7RYzRq767U7tmosBj9MHFBY0b9I/gAAAABJRU5ErkJggg==';
};
var weChatImg = function weChatImg() {
  //微信图标
  return 'data:image/png;base64,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';
};
var alipayImg = function alipayImg() {
  return 'data:image/png;base64,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';
};
var choosePay = function choosePay() {
  return 'data:image/png;base64,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';
};
var payResult = function payResult() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkY3QTRFMjE1NEFBNTExRThBOEZDQTIzNTMzNDlDQTc2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkY3QTRFMjE2NEFBNTExRThBOEZDQTIzNTMzNDlDQTc2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjdBNEUyMTM0QUE1MTFFOEE4RkNBMjM1MzM0OUNBNzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjdBNEUyMTQ0QUE1MTFFOEE4RkNBMjM1MzM0OUNBNzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5nUOu7AAAOBElEQVR42uxd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';
};
var payResultTimeIcon = function payResultTimeIcon() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZFMDc5NEQ5NEEwMDExRThCRjcyODI4NzgwRjMzRENEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZFMDc5NERBNEEwMDExRThCRjcyODI4NzgwRjMzRENEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkUwNzk0RDc0QTAwMTFFOEJGNzI4Mjg3ODBGMzNEQ0QiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkUwNzk0RDg0QTAwMTFFOEJGNzI4Mjg3ODBGMzNEQ0QiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5VjyjUAAAD10lEQVR42syZS0hUURjH71zNSJ1NKilppIIWWRsVAkHzUZvEiKQHBZW9tNeq16La1KLCXQW9FBeVFUEg9FhUYrVK26RRCmpQYtK4UlsMjfZ99L/yzXEe584dZ/zgB+eee+85/znn3O+c7xtXcXGxEYGZRClRSZQQBcRyIgX3p4gRYoDoITqJbmLabkeJNp/PJo4Ru4mcEM8tJpYSa4ltqPtBPCBuEj/tjISOpaHhQeJcGHHBLAfvDqKttGiN4HY0mK7UT2Hquog+YoiYxL1UIo8oIiqIamIJ7iURR9HuceJxqM5dIdYgi79ONCr1X4lmNDylOXqpEHSKWK3cu0WcIP7ameJk4pkizkMcxKi02hBnYGRb8e4BtGVZI/pK1hXII9dO1Iq6Tiz4lki+RGHTEMptvRX1tegzUUfgDaJOXLOojcQvDQFrMErhjNvahLYtq0PfIQXuII6I6zvEIcKn0elmopf4jHI486Ht26KO+94VTGCa8gve4Gub0Zy+Mv7oQJnmOzPwq6+VGcwIJPCycCUeOGOfjfXlClLWGck9xG9cs4O/pApcga/LsrPEmBE7G4MTt6wBmmYFNhGLUP5GtBmxtzb0bUBLkyXQxBBb1uzQlThxQdfENWsyrVNJNir/EE+M+NlTsQGwplIWWCUeYOc5EUeBE9gULKtkgXIz7jLib1JDCQssFBV9C0DgF1Eu5L0vS1R8j1InG4grGk76PfFCqR8S5SwW6FbWQDRsPQhn7G/XKTMnNbjNKE7NcITvucKdqCfE8dvtQKB1MsmzsQ9/wAFDmt+MssBRIXCl8OZ2zYfTj1PLFeVRnuJ+UVG0AL5iqaGfBX4SFRULQGC5KPeYqud2uA6dmlvZ2TpZ4EcRSHNmoD6OAutFdoI1dZs4RdwXD52xEdBH07jP0+KaNU1bQjgw96K8itgXB4F7RczshabZkeLhvCce5m1qWQzFcV9XxXWrtezkVF4kxlHOQKInIQbiEjCdVqDEGs4HCprGkSuxrBrD7JpHcS5EcTWi7qQYqDkfw6MAcerdeRrJBORlGpU4/GG4zAL/gg5xzdHeKyIziuIyccw6LOo6kEQKm/rwIrp/KepqsKk3OHRBJtroRerDsufo06ub3eLgaYsy3ek4sfDZbX+wbFSI9FsD3m0x/HON3MdW9Dl3kWrkqHca//OEgRKYnLJ4h2P6sOGfwMxFMqkcM5CivO/BcmoP+RVpJtHTkY7gUUhyuP688HMXDP88YdA1oWMeRPr5cKgjEQgbwbv5aMuj5Ycc/g1RhbC1AIF2Ku5PYicYwHGO4+2I/ob4J8AAfMHHya5dLOQAAAAASUVORK5CYII=';
};
var paySuccess = function paySuccess() {
  return 'data:image/png;base64,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';
};
var writeDui = function writeDui() {
  //白色对号
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABOElEQVRYR+2VMUoEMRSGv/8IdhaC4jXEY1jZiLXFWsoWdmKn4AEsbLyHgh7CZgvBK1gsT0YyMBsz+jKZ7FpMuoEh3/f+95KIDS9tmM8kMCWwtgTMbA94AI4kfbTDvxaBAH8CdoA34LCVqC4QwdvCTyXdNx9VBXrg55Juq7fAA6+WgJk1vX4JPW+LXam8WgIB/gzsdq75JHz0BHLhPwTCBo/AsaRFzkM1BL4iYGbbwGuI7h048EoMhccCJ8D32QzLJVECT7XgDLjzSpTCk0NoZi6JHviFpOuc2UnehH9JjAX/9Rj2SQBLID7n2ZW7LqIeiU9gvxPzYLjrIkpIdFtcBHcJND+Z2Qy4iYZrLukqZ+BS/7qf40iiuHLXDMTGQWJL0mVp5YMExoJ293G3oAbcPYS14JPAv0jgC3imjCEUudsoAAAAAElFTkSuQmCC';
};
var VListIcon = function VListIcon() {
  //处理审批认证icon
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAClUlEQVRYhe2ZXU/TcBSHn3aDCczxIoiiMkEGY7zcyp3RGD+An8aEe+Kn8QMY40uMCSZe4WSTjqwkDCIjWAcjI1tbL5bU1bDy7/ofYwnPXc/W33nSne00q/L+4zpAAngNPAdiXC1KwDvgFaCFgTlgHRjqpJUHMeAl8AxYUYE1rq5sI0PAmkp9DLqFFypXb2a9iKqdNvDLtXC76TrhsMibnj553PS1Ws3k85dvwg1VRWF5Ocnw0Pnf9Q+fvnqfL9xJErOzU01lRbhU4fjkBHfvjAXKuDTh0VvDTD28HzhHaIYb58prnpsRjfaTSs2gKIpT29s/4OdW3ndW269wJNLL8uIcIfVfK8MooWl6S3ltFQ6pKoupBJFIr1OrVM5Ib+awbLulTN/C9n+NQqHmEfPJR8RiUefYtCw20ltUq1W/bR18C5um5TpunMtGpqceMDY24qplstuUy6d+W7poy0iM3x4lPjnhquk7BYrFo8DZ0oUHYzdJJqddteLhEXl9V0q+VOG+vhssLSZQG8akXD4lk9mW1kOacDgcYmkhQU9Pj1OrVqtspLcwLcvjTH9IEVYUhYX5BAMD/U7Nsm3SmzkqlTMZLRykCCdm4oyMDLpqmqZjGCUZ8S58C1vnfLz3JsZdx4W9A/b2D1q38sC/8AUbyjBK5HJ6qz4XIvVXIujaFUGasGkGX7siSBPOZHOB164IUoTz+i7Fw98yoi4ksHCxeIS+U5DhIkQg4ZPyKZmsvLUrgv/by1oNqK/d75LXrggtXWHLtkn/0KSvXRFaEtY0HePPsWwXIXwL7xZ+tW3tiuBbuJOy0IV/Bl4LtxuV+nOwbuFEpf7Qrlt4qwKrgNFpEwEMYFUFssAK8AbozDbw5pi62wqQ/QvU79ComHGHtAAAAABJRU5ErkJggg==';
};

var compangLogo = function compangLogo() {
  //公司logo
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAYAAACKAxD9AAAKhElEQVR4nO3de4xdVRXH8c/cDrTQUlHACPQxBRoeBgiU0giCJioUCsQHqBgEg4CKgGBA/zAkmug/AgEs5RFAnopRNEZSKVH/EBEEWhQVKgrTx5SHKWCElnYsM+Mfe6ZzO9w7c+/cc84+d2Z/kxuGuXP2WWfvX/fZj7XX6vD7AROQCubhYOyHLszGXthj8DMNndht8Jo38Ta24rXBz0b0YC26sRpr0F/IUxRIZ2wDMmIOjsMxOAqHYEaTZexW9fPeo/zdJjyLlXgMD2N9k/cqHR1t2iPMwEewePDTFdWa0GOsGPz8ThBLW9FOQpiOU3EGTsIucc2pyxZBED/FA9gc15zGaAchHIXz8VnMjGxLs7yJ+3Cr8CopLWUVQidOx+VYENmWrFiFq3G/MCgtFWUTws64QBDA3Mi25MU6QRC3ojeyLdupxDZgkE5BAM9jqYkrAsKzLcW/hGcuxcytDEJYjKdxizDXnyzMFp75aaEOohJTCF1YjgeFef9k5RChDpaLOA2OIYQKLsXfcHKE+5eVk/F3oW4Kb5eiB4td+JGwApioz6P4vLCsXQhFKu8s4X2YRDA2x+DPghgKoQghTBWmSvdovwWhmMzE3bhNqMNcyVsIs/EHnJfzfSYyXxTqMNcZVZ5CWIDHsTDHe0wWFuIJOa6y5iWEU/B7o2/nJprjfUKdnpJH4XkI4Rz8UtgtTGTLdKFuz8q64KyF8BXcgSkZl5sYZgruwpeyLDRLIVyIZejIsMxEbSq4SajzzArMgnNwgySCIukQ6vycLArLQgin4XZJBDHoEOr+tFYLalUIiwQPnDQmiMcUoQ0WtVJIK0KYhZ9j11YMSGTCroLn06zxFjBeIUzFL7DveG+cyJxZQpvsPJ6LxyuEZdKKYRlZiBvHc+F4hHCWsP6dKCdfNI4Fp2b9EebhL9IuYtl5A4cLB28aopkeYQrulUTQDswUHIAans01I4SLJaeSduIYoc0aotFXQ5fgY9jswdJEXDbhUA28IhrtEW6QRNCOzBDabkwaEcKJWNKSOYmYLBHacFTGEkInrsvEnERMrjPGiaqxhHAuDsrMnEQsDhLasi6jDRan4p9CNJJieA/rDmTOToXdsSHWb2Puc3g9tiUt0YP56hy8Ha1HOF+RIlBOERBsWndgbCtaZrbQpjWpJ4ROXJGLOaNQRhEMUWbbmuAKdcYK9QYQn1JwbzCSjodj3n2YgeNjW5Apc/BJIazPDtTrEb6RqzmJmHyz1i9rCWEhjszXlkREjhTiUu1ALSGk42kTn3cMGkcKYTrOLMaWRETONOIA0kghLLFjBNLExGQ3IWbldkYK4TPF2ZKIzKer/6daCDOkUDaTiZNU7ShXC+GjQsTyxORgmtDm2FEIJxRvSyIy27enq4WQXguTj5OGfhgSwlwTO9ppojZzDcZ2HNprODaaKU1y/n78YB+mNeF229vPZS9z0wv52dXGHIu1Q9X5wZiWNMP1TYoApla4NoMgPssOMRFXWY5l+NXQNqHwv/UK25qMEbptIFzXKhfuycAR/ORQ7N56eSVhAcFDqSKcjIke86h6y7cdtqEfepPF64U0YO3LZsysCFnQoougHVi6kb6q3ujE3Rh4P39agPdq11Ah07FfRXJObZhLVtO5km//m61VCf8WTWfgIFYvZN4+ypH8oDkOHsqPmGiULXznOXZ5kkte5L99w18dNI3uA+hZxAlzlCQlR0N0VcRPldee9LL0BXZ/gjPW8UpVlqZZO/FQFxsXcfY8lN/fsasiLSS1xjbuX8fej7Oom+4qZ/E9p3DXbN48msvnK/NOztyKkB430Sp9PLGB/Z+k45/8bcvwVzOmcNXe9C7k54cxvXyBifeoYM/YVkwo+vEKh62kYzWPVOWE3bmDT+7OpvmcXq5+eK9ObSaEL8zj5n3DamEW9PZz8UvcmnWulAFs5LiNeDe/msOp7xr++sZ9wyulJOxRUd7UujW5MUMREMq6fp/syqvJfzjtaTqeGv7VXuWaUexS0Waz3oteDP+Ks+J/A1z6UnbljUp5U4dP6dRm2yg/XBM+iUyZ0Va9QSI/KkJG88TkZlNFmPAkJjd9FWwZ888SE50tFe2+m57Igtcq2BjbikR0NqYeIQGvd6I8C50NcO48bpoV1u2zYGhBaZJ7OK+raCKCdxm4Yd/sREAo65ry7QYWzZq2E8IFL+7oJtYqvf1h2XqSs7YTq2Nb0Qz3rgmfRKasrqBbcGlOTE42o3toZfGZyMYk4vEM+oc2nVbFtCQRlVUM+yL8MaIhibg8ShJCgkcYFsJabbawlMiE9QaXD6odUx6MYkoiJtvbvFoID0UwJBGXFUM/VAvht9havC2JSGwV2hw7CmETfl24OYlYPKjKr3qk8+rPirUlEZEdcjaMFMIDkjPrZGCT0NbbGSmEzbivMHMSsfixEftLtc413FaMLYmIvKONawnhSfw5f1sSkXhKaOMdqHfS6fv52pKIyFW1flkvAWgnXlBwprcJllFtVLb0s+sjhd92PfbH2yO/qNcjvI2r87SoFuu3FX3HeNwVJ6vs1WqIgLFTAv9LyCBaDO+h58AQjKpMbO6ns4OpGTjNbunnxle5/Hl1miQ3NuAAdVICjxauoRffw805GFWb15n9WGF3m2x8Vx0RMHqPQAgM91cpKGe78w8chrov37HiI2zDZVlalIjCZUYRAY2FzVmB5ZmYk4jBclXbzfVoNGLKRcocAShRj01C241Jo0JYiyvHa00iGldq8CTbWIPFaqbgYRwzPpsSBfMojkffWH9Ic6H1+vB5IclHoty8gbM0KAKaj7HYrcF3TiIqX0VTJ0THE17vHtw+jusSxXA77m32ombGCNVMFQ5GHDWeixO5sVLI2Fd3BbEe4w242YtPIIPcaYmMeFlok6ZFQGtxmDfg43irhTIS2fCWIIIN4y2g1RC8j+NMTYxOE5nTJ7TB460UkkUs5l/hPCFDQaJYBnC+0AYtkVVQ7jtxsSSGIhkQpvJ3ZFFYlukjlg3+d6l2TYXZPvQLawWZ+YpkHaZ/Gc6Vxgx50ocvyNhhKI98DXcKI9gUoCt7Ngt1e0/WBeeVuOMBfEhaZ8iSV/BhI46qZUWeGVxW4WhhtSvRGivlXJd5p/LpwXHS3kQr3C7UYU+eNykip9NWYZ3hbGkLuxnewDlC3eUewKTI5F734AiD4dwSo/KoUFd3F3XDorO8dQteM5dJs4pabMbXhTrKOjftqMRI99eH63CoFKqnml8LdXKtCOswMfM+rsESnIRnI9oRm2eFOliiSa+iLClDAtAVOBxflvPIuGRsEJ75cA2cO8ibMgiBcBz0FszH10xsQfQIz3iA8MzFHoWtw3hd1fJmJ3wKl2NBZFuyYhWuwf3GOH4Wg7IKoZqFwlz6c5gR2ZZm2SQErrpNjXA1ZaIdhDDEdJyKTwuDq2lxzanLViGY5U+FfYG2mCa3kxCqmYmPYTFOVGQwj9r0CLGsV+A32nAFtV2FMJJ5OBYfEF4lhwg9SB68JaS/eRKPCauAhS7+5MFEEcJIKtgPBwsi6RJ6jb2wJ/YQzmZMxa6D17wluIL3CtlxXxXSJfcIB0nXCBnxugUPoQnF/wFxqg9tN6uARgAAAABJRU5ErkJggg==';
};

var like = function like() {
  //赞
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAYAAAD9yHLdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAJJZJREFUeNrt3WlgVdW1wPH/OkkIMsiMAyKIBQVEZkQFawZAfFUUytAiimKrgoJgHREtCvocagvqs1alKNpWnEUtAkkUEAEHKKDIoFWGCggok4w5630494KV0iSwb/bNzfp9CZCwz16XkHXPPnuvBcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxivxPQFj/ChQ1YoVYR/QsSMEJ0LLlkALtEED4H2kcmXgNfj+e2ASbNwIwXxYsgQKh8Ps2ZA7UGTTJt/RGOODJRBTThSoaseOoHVg2DDQi6FHD6AfHHXUYQyYB6ogj8DcucAz8OSTsG8UPP88dF0ssmOH76iNSSRLICZF5fdXPeUU0MkwdixwI/TsCeSAJPL7/h745huQ8eiYMbBxCfzxj9CnrwR79vh+VYxxyRKISTEzRqr27w/SMrojoBZUrOhxQq1h+XIIasBll0GWiMyd6/tVMsYFSyCmjFNVFYH8p+Gee4D6cMstvmf1H3wP+/aBLIjm+e4oGD0aRotIGPqenDGHwxKIKePyb1IdNQq0G9x1l+/ZlEAT9O9/h8yK0LcvdKojwbZtvidlTEkEvidgzOGZsU3Dn/8cND16J1/mLEe6d4fd45CCApi6SrVmTd+TMqYk7A7ElDEFqmHt2hB+gaxcCXwJ1ar5npUDt6ILF8LeF5GcHDjvRJHNm31Pypj/xu5ATBkTXorccQepkzji7kVatYKMjuibb8L79VQPa3uxMaXGEogpIwpUtWFDoCZcfbXv2STQJKRjR9i5GyZMOLBJwJjkk+57AsYUT9gjetjMMMjISMAFmqI7dgANkKlTgdboF18AZyJVqgCtITsbqA+nnJL4ePV56NcP8pbD4sXRn91zT+Kva0zx2TsbU0bkzVadNw/YDR06OBz4OJgyBQr7oldeCV0XS7Bhw6G/PL+5hl27gr6CPPAAsBpOPz2Bgce3/zZCO3WC7OYSzJuXwOsZU2y2hGWS3LQWGtatC7wF7ds7HPgxePddCJqiPXsWnTjisj+RYNo02LQAbd8eyIA//CGBL0AlSE8HrkImTYJpLVQrV07g9YwpNksgJsmlf4WcdhruS5CsQocOhSyRYN++kv/1eGmSnHNEhg8H+T2MGAFyOyTiYKCOhsaNIf1GtEyddzEpzBKISXJ6Knr88Q4HXA3LlkHOfAkWLXI3bPYbIr//PYTZcOmlCUwkHyHXXQcztqk2a+Z+fGOKzxKISXYfIE636+bEHo4nSO5YkeeeA30TvfPOBFzgwmgTgexFE7p0ZkyRLIGYJCdXw9FHOxzwRqQ0SoZk10DGjgWZEZV3d24B0qUL5G3W8JxzEh+PMQezBGKS3U+gShV3w0lV2Lkz8dMWEVEFuSfa3cUj6GefJeA6/WHUqMTHY8zBLIGYJKcLoWpVh+NVinUYLCVZIsH27RC8jVx7rfvx9TdIbi7kTdTQ6fZmY4pkCcQku2WOS5acCD5a0GZ9L5KXByj6wgsJuMAlyDXXlH5cpjyzBGKS3YnQoIHD8Wqh69f7CyfIibb7shq2b3c48DXRSf0CVa1e3V98pjyxBGKSnOyCRo0cjrcKKc6BwUTJEgnWrIl+/cgjDgeO9XYP749KoBiTeJZATJJ6a7mGmZnAJqhXz+HAV8Hatb6jg+AyGDcuim/XLocDV4KLL/YdnSkfLIGYJFVxNNKwIegYCBx+n+oF6MqVvqOLeqOvWwdyKbz4ortx5c9w7rlRAna6/dmYg1gCMUkqHA5Nm7obT34NW7dGJ9B9PgM5SAX485/dDacPQIUKkLkKunXzHZxJbZZATJKStejZZ7sbTzPQ5ct9R3WwrC1QUADcCl9/7TDe05BOnXxHZ1KbJRCTrPKhc2eH461HPv7Yd1AHix84ZGrUidDZuCuhY0ff0ZnUZgnEJJl4K1eZhbRu7W5cXYQmYwLZP78MePttd+PJUGjVKtrWW7Gi7+hMarIEYpLMzi+jhlHxtXxnbodkTiCF14HLRlHx10/vhpNP9h2dSU2WQEyS0eqQk+NwwKdg2zaofi0sXOg7ukPrNlGC1atx/ywkRF2eozHmAEsgJtksg1693A0nK6LOg+3aS7B3r+/giuFmWLHC4XhPIZZATGJYAjFJokBVTz0VWAYuGyXpaMjL8x1dCfQAl/1KZCQ4bchlzH6WQEySCJ+Gyy5zP27QHaZO9R1dCTwL69a5Gy78ldty+MYcYAnEeFagGqangwyOWsE6cy8sWRKd+E5EH45EkU/dlpsProbKlX1HZVKTJRDjWeF2uOgi0CmOl1o6uC0RUlr0HbcJRPuilSr5jsqkJksgxjO5D7nlFvfj6q2QkL4bCab/C2lpvmdhTHFYAjGeFByrYbduQBa0betw4H0wZw7kVhX59FPfUR6GepCe7m446YcUFvoOyqQmSyCmlN2pqkEA4ZXI2LEJuMAo9LHHfEd5+KSJ4wOU/cESiEkMSyCmlP30NRg4EPd3HnWjVrXBPKQsPvuIk4cgI8PdePq+JRCTKJZATCmZukq1Zk3Qe2DMGPfjyyvw6KPRriunDZpKW2W3S1h2B2ISxxKIKSUZv4aHHwbuheOOczduvM/HnoGxDn9lnDZzu4QlU9zu6jLmAEsgJsHyh6n27AncCL/8ZQIu8E2UmM47UWTzZt/ROlDN8R3Iz2HHDt9BmdRkCcQkyIyJGjZpAjoUJkxwP75cCps3w54l8NBDvqN1GNcjULWqu/HC/pZATKK4fKdjDDD7Gw2rVoXdu5FXXgGWQbVq7q+jQ2HkyBS684jH1RDq1HE44EuwfbvvqExqsjsQ48hbyzXMzITdafDSSzgvirhfzaivx6aT4IknfEedAD+F2rXdDScXot984zsok5osgZgj9OEHGmZkQOY+5IUXgAVIly4JuNBZ0W4iqYAOHgx9+khqHpCbASee6G644ATkX//yHZRJTZZAzGGKt57dOhCZPBn4Gi64IHHXkwdg7FjIbi6By859ySK+9EdnOPZYhwPvgLVrfUdnUpMlEFNCsyprWKcO7NwW9dnQ8VExxIQZgM6dCzIKvftu39Enzp7FSJMmDgfMA1UAdM0a39GZ1GQJxBRTgaq2agV7JsL774O+AmeemcALLoPvvgOpgVxyCWSJBPv2+X4VEidsjLZr5248uRdWr45eN3uIbhLDEog5BFVVEcirrzpsGITfwty5QE3k5JMTeOHvYd8+YCLapw9kfyLy+ee+X43Ek+OQjh0dDtgOFi3yHZVJbbaN1/zItI81bNwY8r9FH30UmBh7KL6glCbwKVx3HeTMl2D6dN+vRinaCmed5W443YguXuw7KJPaxPcEEi++vbTCY0hWFsgw6NED6IN27AgMRn7yE6B+krT+fAq2bQMawfLlIE3Qd9+FwmPhlVdgdhdkzhwYLSJheOSXK1ANq1SB8Glk5EiQ8TBiBOgDjqvCFmU7+uCDkNNDghtvLMXrepa3WcMGDYAFyJdfOhw4VlySzNhD9Gdg716QJyEMgdboli0/+PqNyK5doPeiO3f+4M/bwJYtwMlIGIK0jcZh2Y/Ol/wiOrCon8GePaDXR89gAqKlyLhwFezeDXIC+sMSK8ElUUmawpNju+0WRmXoZUr053GF46PSLGF1dPt2KLwtmt/5TST44deZ0pCCCWT6NA2rVYPgKrj5ZpAAGTIE9E9w9NG+Z+dAWvQDQW6H++6DXRPQP/0p+g+0e3fRfz2+e2rnNPRXvwLaIzffnICOgMWVAX/4A2R3jhKXiEjs4W+5kDdMwyuvBC5EUvJcS2kbB99+C1wdSzw/iRKMjI5+rx/GEuL/Rr+X+2DDBqA2fPUVyCZYtQqYg371FQASb41cpot0JkQKJZC8+1Svvho4P1btdQPUquV7VoknubFv+F9GSz/Zz4m8/vqBz8cTxvdPwFVXAb+Fm27CeVHDEs97ZFT8MOt9GD68/CWOuLyrNXzpJaA30rOn79mYg8SfyX0Kn3wC9I02kdAHffllCOZBQUHqb/L4z8pwApn8vIYVKkCtkfDYY8DjyBVX+J6VR7Ftm5IP48ez/x2V3hHdibENjjnG//yoFTvPMQLuuKP8Jo4pbVQrVYJKb6AbNgBLkcqVfc/KlFhsRYDnop9Dmfeg48dDpzoSbNvme3KJVgYTSIGqVqwI2gv9+99BhyDnnut7VuaQNsGuXaD/gCuvhNyxIs8953tS/uVNVL34YqA+vPyy79kYZ26Fr78GToTbboOZL8Azz7h7ZplcyuA2Xj0qqoFkiSPJzYJ16yDoDVlZljh+TBZAr16+Z2Gciy8NXwN//jOc81605FWgqg0b+p6ca2UogeR1UL3hBtA34ZJLfM/GHNI0eP11KHwJbdkyevg4d67vSSWP+NKrDoWf/cz3bEzC7YYOHSDMhfnzo00+nTr5npQrZWAJa+ZDqscdB3v7oStWYGvFyWZ1bDvnAnT4cMgZJ8GTT/qeVPLKG6DavTswEN56y/dsTGmTG6NtzpIZNVjLel/kpZd8z+pwlYE7kL13w29/iyWOZBO709AnoGVLSxzFJaEtXZVn8fNV4XB49lnIX6969tm+Z3W4kvgOJK+DhsccA4xC1qwBKjlu9WlKRIbC4sXRAa4RIyD3PQlmzPA9q7KjQDVMT4fwwdhD1jaIy74fpoz6GN24EfRV5IwzIPc9kS++8D2p4kriH8j6O+RnPwPZk5jEIRNg9mzQy6Ntd0EOLFgA6bORTZtKP95dO9GqVSF9MNKiBYR/gUGDgG1w8cWlPx/ORr/4AmQOct99sPFOeOop6NNHgpTsw5Fg7xCd5M7tCD+surunOXr00aAXIGlppTcf2YtWqQLyv0hGRgLGz4KMDCjsFF0nLmiIVKoU/b/LzPzBX5gSda6UHkgQANdBWhroyT86AHwaVKwIMgmOOuoHf35KVElCP4quSzeoXh34P7RGDZBmSPXqoA+jNWsCitSrB9SKxvMm9kZCpkcHggFycz3Op0SS+Q7kU9XXX8d5nwlZCPfcA1kj4Pbbk/8cQn666uWXg94U/QAnByQB/27yK3TBAtDtyP33w6ZH4IUXUrhxkzH84BnrKDj1VJAh0KkTaP3oI1VjNcpKq9TRreiAAVEtuGef9f3qFCWJE0j+yapbtrgrQSK3wBtvQPYHIolsfJQoeedr+NBDwA3I8OFHMFDsXIYMhldfBW2ETphQDosXGlMM+2vp3YxcdBFIjajiA/0hIc8uYgcTq1VGTzoJ2rWXYO9e36/CoSRhAtn/7ONeZN06hwNXjf7BczqIzJnjO8ojeF3eRdauBeZEt/jF9gRMngzBX9EhQ6LSCxs3+o7KmLIl3uag4DS4+mrQ3KgkDxfGls4ckfegb1/IvkOijp9JKQl3YQXzkBo1HA4Yq2Wz6Usoy61Qc+ZLsH498MvYdubiWhIdaJr5V/jFLyxxGHMk4kve2Z+IPPZY9B68X7+ouKnLk+a6CAYP9h1tUZIwgYDbh1oSq8qZMmv5VyObNxcj7j5RldFgKDp0aKqWUjDGr+xxIi+/DFSO1eRzZVL0DCZeXTw5JWkCMQ6MhYkTraWpMaUh/fyoSGj8oOARiy1Ry7+gc2ff0R2KJZCUpX3QJUt8z8KY8uGcESJffw06I2oA54pchrRr5zu6Q7EEkrqGIfasw5jSJZORBQ7bP8vFcOyxvqM6FEsgxhjjzhtRFWpX9Fi0Th3fQR2KJRBjjHEm/Lnjg75XIIk4OOyGJRBjjHFGLkQrVXI44Nro4G9ysgSSsuTrxJQ8McYcmjREnNbWWmUJxBhjygVdBLVquRtP/oQW59yXH5ZAUpYeB8lcJNKYVCQj4bTT3I2nW5HVq31HdSiWQFKWLWEZU3pmVdawTh3Qh6F9e4cD3w2rVvmO7lAsgRhjzBHbWxO54QZgAfxbn5MjFFyGLl7sO7pDzs73BIwxpuzKb65h166gy+E3v3E48Gb088+jUkQrV/qO8lAsgRhjTLHFWxPnieqQIUAmMmUKJW+vUAR5HJk61Xe0RUnilrbmyMiX9gzEmCOVf5dq8+ZALzQnB8JvkSFDgBlRa+JE7VMJ66FPP+07+qJYAjHGJLFpLVQrV4bgRRg2DIKJcPrpoDlo4GIF5cXYncNGpFYt4LvYNtxu6LHHgraB2rWBdbH2ey6b3P0nn8K0aZD7tAQffJDgax0xSyDGmCSWfgL66quga5Dc3KgDYIyb++veh/yMn/v3/ujYscB1Xq5eQpZAjDFJKG+iar16oPUhN/fIx0t6q2HSJMjJkWDmTN+TKS57iG6MSULh8ej27cBZkBKdRA9B7oQVKyC4DIYO9T2bkrIEYoxJQl26SrBlS/QDdvRoIC9FKyusRB94ALJE5LvvfE+mpGwJyxiTxLLvF7n7bsjroOFrr4Hcj7RtC0yDjAx319EGULMm8Ato2hRkSbR0plPg+OMTGOBGZMCA6JdPPJHA6ySEJZCUVXg7KgIM9D0TY45cznwJFi2Kfr1oEZCd2OvdqapBAJ17Qu/eIFvh4YeB28Blgyd9O+p5PqOvauvWkLtRnHY0TCxbwjLGmIOMFpEwhNxXRJ5/HhgArVuDDIVElBYJHkIvucR31CWete8JGGNM8ssZKLJ2LeybhPbqBfJr2LrV3fjaAjn3XN9RlpQlEGOMKbaubSRYsQJ0MIwf725cGQytWsGsWao1aviOsrgsgRhjTIkFI9DHH3c3no6BIIDddVGX/UQS/Cr4noAxxpQ9WSLBmjXARHBZLTdtIFK3ru/oissSiDHGHDZZ5TaB6FawBGK8s2q8xiSezoEdOxwOeBJUrOg7quKyBGKMMYdve+wAoit90E2bfAdVXJZAUpY2TNHSD8Ykk/PB5UNvnY58843voIrLEkjKsiUsYxJnWgvVk07C+cl0lqFr1/qOrrgsgRhjTImlj4MuXRwOuAl27YJqj8LSpb6jKy5LIMYYU2L6CfTq5XDA69GFC6Fdewn27vUdXXFZAjHGmGKbcbZqo0Ygf3Hc6CoTCgp8R1dSVo03ZckKxJ6BGONW8FHUn0TfjE6OuyLLkbffBhyWqC+FV8P3BIwxJvnlbdbwnHNAR0D//g4Hrgrr14Oko++95zvKkrIEYowxhzTtYw0bNwaegpdeAnIc727cBX/9a1QaZd8+39GWlCUQY4w5yHRVPfdcSPsrkp8PtEFq13Y3vtwOYQjyOPzxj76jPVyWQIwxhrzNGjZoAHkDVMePh7SzIC8POA9OOMH99fRzmDIFsp8TWbbMd/SHyx6iG2M8KlAN27UDfQ05/XTgaEhP4M+lcBVUqQLBs9CoEbAEOnQAfRDatQMGRktUCSvi8D3s2wdyLYwcCdyRuFgTzxKIMcaD/OYaPvgghPnIDTcAVWOfSHD5Hakfu8ytfuKWsfDoo5A9V+STT/zMwR1LIClLllgpE5N88iaq1qsHuhxGjPA9m1LUGpYvhx174LbbfE/GFUsgxphSpL2gWjWQ+eXkDU5d2LQJghrQowdc8LHI99/7npQr9hDdGFOKZlWBzz4DBqBz5/qeTQL9DXbuBKkbJY4sEfnsM9+Tcs3uQIwxpWi0iIQhvLVcw27dIHMiDB8OfAHNmgFXoi7uTGQYkpEB+nF0x8NwOOkkoDo0aID78xw/vv4/YcIEyD5GpOwdECwuSyDGGA/ObyLB1q3Rr0eP/sEn/ub4Qpn//tu3B2pYvz6kt4bLLgOuRW66CRgEVasezgX+MwV++lPnL1uSsSUsY0w50m2iBKtXQ05NCcaMgcLfoG3bAlNhzRqHF7o1ajQVL76YmiyBGGPKsa5tJFixAqiMDh7sfvzgKrRTJ99RJoolkJRV+FQ52eVijAM5v5VgyhSQobB4sbtx9U449VTf0SWKJZCUlTbIeqIbU2KNYc4ch+OlwTHH+A4qUSyBpCy7AzGm5HQC6vJZiPRGKlf2HVWiWAIxxpgDHkTS0hyOF6t9lZosgRhjzH7yFdSv7248vQK+/dZ3VIliCcQYY/bT2uhppzkcryJ8/bXvqBLFEogxxjD7Gw1jBwmlTRt348r7sHSp7+gSxRJIyrJqvMYU357HkO7dgQshI8PduIW/g4ULfUeXKJZAUpaeZtt4jSkuPQ/69XM4YBqsXQtdF4v885++o0sUSyDGmHJs/9LVE3DeeQ4H/gdMm+Y7ukSzBJKybAnLmKLtToOLLgL6wVFHuRs3+Bu8+abv6BLNEogxphxS1ahs/BOxlrquNEV37IC922HqVN9RJpolEGNMOZTfO1bOvR20bOluXHkYeeON6NnHjh2+o0w06wdijClHClTD006D8Gv0kUeApThd6NU18PTTvqMsLXYHYowpB/Iqq2ZlgdZG8vKApY5rVK2GZctg5jPw9tu+oy0tlkBSliywh+im/CpQDdu1g7xXVP/yF5DTYcYM0MlQt67768mJ8NBDB1r2lg+2hOVMgapWrw7vAFu3lrdvJGP+Xfwh9ezZUL364Y+zczCakQE8HfU2z2gdfSzsFI0b3I00agS6GDp2BHrBGWdAmB/rsX50bD5jEhToLFi3Do56AiZNKs1XOBlYAim2yc9rWKEC1L4LGTQIaAW//CWwFDp0iL5hK1SAc2LVN/Mbabh4MdANeeEFqHBXtObaqY4E27b5jsaYxMjbrOGAAZDfA8aNA4ZBjRqHP17aH2LPKGIFCcP86KPcFX3cf1g2Xr9qWenGK43Qm2+GM9dKsHNn6V7bP0sgRZqxTbVZM5CX4OWXQcfDKaf8l79QCdLTQZ9AWreO/qh1a9j9T2TYMJiuqv36QRcReecd39EZ48bbAzWsXx8kF3nySdAHojdUKas1On06ZGUjkyYBl/qekA/2DOSQClT11FNB+ke34dQvInEUZVvUmSy4PjqhWlBJNSfHd5TGuFFharRklPKJ49ZYdd3zYMAAEBEpvyWDLIEcZPJk1bQ0CLvACy9wxLfgB4kVawvnwfPPw6xZqk7HN8aDvXVgwQJgNWzf7ns2CdAQtmyBYB564YWQM1+C9et9T8o3SyAHqb0L7d8fuBVc9gU4yAaoVQv2/g84PQkbI/NtF5YpPV0XS7BhA/B/aM+eQH1YtAg4CwoLfc/uCCyD774DnQXdu0OWSPDhh74nlSwsgRxEVyN9+xb9dXIB/OtfwK1o166wuz5asWL0Q7tdO5ChsHhxMa73FOq0CqgxHuXMl2D6dMhpItKyJeQcJZKeDjk5IiIl/7hpI5qZCUE22rgxMBCuvx7k97B6dQIDuReWLIHCjmiHDpA7UOT9932/usnGEsjBukDbtkV/WTgThgw58B/m/CYS7N4N2dkiH30EhY2hOImImsjJJx/YBmyMOaBPXwn27Ine+a9cCTmrRcaNg31foe3aceBOx7VL0EGDoGsbCVas8P0qJCtLIAdbHy0tFUW7wvz5h/58l1dFli5l/9ppMWjt2u7C0HHRQ3tjUtH+JbNL0AEDcL5UpiBNm/qOMtlZAjnYMbBpU9FfJtOi8x+HMv0i1aZNgS+jg0/FIBs3OozjcujSJZEvlDH+5cyXYNEi4C147z1348r/oc2b+44u2VkCOdh0+Oijor8sOAcefRRmnK1hbu6Bg4b5+apt20LaimiXVZE2o59/Dlki8t137sLQHtCjB+QP0+ihpjEpTK4Hp88ozj+yE/TlgyWQg12D/u1vRX+ZToHjjwe5C5k+HWrVRnbvjk7GfvhhdOCwRYuix5FBSHGuV2I50QN9zY0SWf7RqmPGRDWCXC6VGZMMwqdh82Z348m3SKVKvqNKdpZADrJpBvKXvxR/F9Vh+xjduBEy3oTf/S6B14mfjH8FRo6E8NfIqlWQ96nq669D3luq118P+c9o2LLlDxrtGFOGyC1unyGyEXbt8h1VsrMEcpA+fUQKC4FW0Ls3MA6+/dbhBV6HvXtB7o62C3fuLOJ0/KLEW3d+DRdcAGTC738PWg9ZuBDyc2H9esiboeHkyZA3UcNrr412ibVqdeCgpTFJpSuSne1uOG0TO3Fu/gtLIIeU/ZzIsmUQBnD22cAj6GefHcGAsaqd8mD0cDt7q0h+vu8o/4PboE4dQJDevYH6yMMPR0XsFiyA2rdGSwX5P1X9+98h/ybVUaOiGl/nngtT2qjarb8pLfFadWQVb/t9cWktWLnSd3TJzoopFim+HffDDzQ8/XTYkg+DBoGMjKrx6obYbqwFkJkJxKrxckJsf/rRUUmUIDuqxpslEpTlUg/6Jzg6ViL7vPMOfAxiybBS5+gOK6+zhh9/DNI22h0TNkNmzYLwcnTOnB9swzTmCATN4NJLQSe6HTc8Pfo+Nf9NEq5159+l2rw56NnRSdAjtilay8zuDZUqJa74WWn1A8lbrvqPfwCr4fTT3Y9famId3BiDvvce0CpKMPqz6D9u7kAJli/3PUmTrKa1UK1cGdIuRb/8EmiDuHgGInfCihWQPVukSRPfUSa7JLwD2fsFunUrpJ/tKL3VgooVoeASiH9DLEtAzwDX23B/bP/S0APQuDFQ1sufxKsbP47EqxxfcQVI7G1N3nzV9euBCVGCkTXI7NmgP49+X615tKTWrr0Ee/f6DsaUtrRHYcwYYK+bxBGnr6PPPAPU9B1hWZCEdyDxh7S1iFX1jCWAIw51ZNTgJnuuyPXX+46y5PJEdcgQYAY88ojv2SSB2J0l16MLFwI5yAcfgExHFy8G8qIlxAp14dNPrZFXqsj7uerAgUATmDCB/dvVj5TcDmEI+ibaqBHk1JTgq698R5vskjCBxOVdoTp7NtA/9hD7SMVKHciV0LNn9JD89dd9R1mM12GYaps2wDfwzjvAIKha1fesypC86GyOzIcvvwRtG9uePRn95BPgI1i6FFiJfP45cG10sNPKdSeH9+upHnUU7AzgzjtBB8BNN+EscezXCQoKICdTnO7mSm1JnEBm5KvedBOIwn33ORw4XjPnp+hDD0EwD8aPjx5ur1njO2qYMVG1Vi2QZujllwMnwG9/CyxFKlf2PbtyJN7X4tko8fBndPVqoDKsXQs8iKxZA9od1qwByUM3bAC5Btm8GQqvinarBf9CN2+Gao9Gv7clt/8s3hdnVydo2RLSHo/Kp2sbuOwy9jdkSxR5HXr1guxxIi+/7PvVKCuSOIHk91c95RTQK+CIts8WJfYOlRnRNltmol56G89FMjOBM+DYY4E5YOctUlD8DUzfaLNFnIRRwtIX0XKRYPKRtDTgWahZE3931rGy7TOnR4krUZtfUlMSJ5C4vA6qU6cC90K3br5nkwKGoB9+CNIs9gPrSeTMMzmwDdmYciD+zCO8Cjp1sn4fh6cMHCQM5sEttxz4BzeHR26EPXsgWAq/+AVkvyxBVhYENaKicXoCes45IC/CbbcBc+Gtt9jfkc2YlKLw8MOWOI5MGbgDicvvr/rkk9GS1qBBvmdTBi2Mtj3m3CAyalTx/9qdqhoE0Gl6VN46rTrSuTPoHdHmBkmHzp1Bh0P9+r6DNKYIj8G778Km3lEn0XjDKnM4ylACie/G+L4qOnMm8CjSrp3vWSU/6QazZoHsRbOzo80C+/a5v870aRqeeCLIu1GCke2x3XOfRAlGdkCzZqBjICgDd74mtchN0W67Pa9ES1bnnSjisnpv+VSGEkhc3kTVevWAhjBvHlAI9er5nlUSOiU6/1DYHc3K8l86JL7LZt/lcNZZEN4e/UeW6dFHfRjat8eexRi39sGcORB0RXv0iN5AOW3cVq6VwQQSV6AannAChAuR114DNkObNr5nlQRujQ7WBfOQ7t2jE/Lr1vmeVNHeWq5hZiZkfBklkuBkpFMnkH7RnYz2QTt2xFnJCpOi4rsqf4M+9RQENZDrrov+H1h5dtfKcAKJi5f4qJQOjz0G5MKAAbg/aJTsrkInTIBKO5Frr4Uz14p42Y6cYAWq2rAhhHlo+/YgK6OlTP0ftEULYDHSrBmQCQ0a+J6tKTXx2mpD4JprIGeHSEGB70mluhT8AZv/iYZnnAH6GXL//UB1OOcc37NKgEyYPx9oht54Y1R6YeZM35NKHrO/0bBqVdj9JjRtCnoy0qIFBFcT9aqvjTRvDloTbdgw+n2DBhzol2KSmkyA2bOB2lE/m3f/AK++auc4SlcKJpAfi/co1wVw0UXABXDhhSR/Ndt4CY63o4OU2ilWyqQ1OnEi5AyUYP5835NMPfGWv4V1kPr1IegW2132VXRHo3vQ+vVBvog+rxdGn5flULcuaGasl/b1UKMG+ztCmmKKN1ybHfXj0PvQJUtAAmTGDJAs9K23kqdyRPlWDhLIoRSohlWqQHgGNGoE8h5SowaE56IZGaU/H5kSndPQDGTjRshcGHVEK/WOhcap+J3QzgVRQknvAhUqgBYg1aod+DqtEm0e0OGUi4ZcwctES6xvo9u3gwxAtmyBqh+ia9dayRdjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjCn7/h/I8DLAdT7i9wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNy0zMFQxMToyMzoyOCswODowMJ0i8sQAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDctMzBUMTE6MjM6MjgrMDg6MDDsf0p4AAAATHRFWHRzdmc6YmFzZS11cmkAZmlsZTovLy9ob21lL2FkbWluL2ljb24tZm9udC90bXAvaWNvbl9vaTV4Zjd1ZWk3Zi8lRTglQjUlOUUuc3ZnVNcLmAAAAABJRU5ErkJggg==';
};

var shopJ = function shopJ() {
  //商城减号
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAGCAYAAACrZDylAAAAc0lEQVQ4T2MsLCzk/Pr1axIDA0MxAwODIsPAgMcMDAwzWVhYJjKmpaWBHNLGwMDANjBugdv6h5GRsRHkoHsDGDLoYfAQ5KBHDAwMsgMcOjDrnw6+KMvKyuL58+dPJgMDQzYDA4P8AIXUUwYGhgW/fv3qAQCKyh8L+BOVgQAAAABJRU5ErkJggg==';
};

var shopAdd = function shopAdd() {
  //商城减号
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABCUlEQVRYR+1YuwrCMBQ9gSIIfoKi/ppDwDoVv0AQJxeXQu7ULxNUujvYpQSUlHYJ1dCkYAs3a3LPPffkdRKBgJYkybQoig2APYAIgIqi6JKm6csXVvgGmjgppSFyAjCpcbQQ4qCUOvrihhK6AlhbyW9EtPoXoXdbYiLyLtQ7sJ4yJvRzKUgpWSFWiHeZ68BkhcankGUh7IvSVVBf/Y/GuogWC9FXkq44lXUxhNosRFewvsbfDKE7gEVfiIE4+fCmLI7jmdZ6C2AHYBlYoW94DiAry/LMB6NLQlaIFTIK8DOoWQf86nDtCFZojAq1WZeciOauYr71h14dw/qwsqyL+dKrLESWZU9fhT50QaoplwDVMQAAAABJRU5ErkJggg==';
};

var addressIcon = function addressIcon() {
  //定位图标
  return 'data:image/png;base64,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';
};

var addressMsg = function addressMsg() {
  //我的兑换下三角
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAPCAYAAAD+pA/bAAABY0lEQVQ4T7WUzUoCURTHz/+qg83kohfwAXKpDIO4cdGihW/Rtg+iD4KgMhJ3RS9QrQqhTS8gtBAUt0LvMTNZk+M/RsZIcnAUO8vDPefH/d1zD0REut1uiuQmySrJdRFJBfkF4gvA23A4rGYymZdcLuchaNLpdCokH0RkbYGm00pckjuWZd2h1+tptm3XAOyLyAi4hKCIPPq+vzUCOI5TF5G9JQOeEonE1r8pArBtmub9CNBsNtOGYRyRvFiCHiFZTyaTl4VC4X3CebvdPiN5DGBlQdAngGvTNE/G9ROA4Ca6ru+SPAWwOg+E5IdS6sZ13atyuexMBYR/Qvd9/1BEzucBAKh7nlcrlUr277rIsZxD1x8tsQBxdEVpiQWIoytKS2zA+GCo6wCAEeb6JG8ty/qZlqj3irUaGo2Gls1mKwA2SCql1OtgMHguFov9WYMQCxA2QavVSmuahnw+3wcQ7JuZ8Q388K/beCeBTwAAAABJRU5ErkJggg==';
};

var addressSMsg = function addressSMsg() {
  //我的兑换上三角
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAPCAYAAAD+pA/bAAABWklEQVQ4T62UPUvDUBiFz3uDVUIQJXtHl6xNA9k6OHbwP3T1AweF4lAFP1AQ/4Efi1J07Vpwa+jaqf/CJCqSyys3ZGhrb3ur3vWe+z55D+eEsMAZDAYlJfc878v0GZkI2+12qVwu14lok5mFEOI1y7KXMAw/5r03AvR6vUMABwDWi4FvRHRdrVZP/gTodDrLruvuAbjQDGpJKS9nbaLdoNvtrti2vcvMR0TkTAMw86cQ4iZN09NarZZM02gBhS1NAKtzbEgBXAVBcGwEMLBFx5tq19gGJrbopuvsGgMsYIuO88OuHNDv95eklPsz0jIvjZP3LcdxzlUhc0AURXVmvh/J+aIDJ/UpM+8EQXBLqv5xHJ8RkdrAqHgGdAbwKKVs5IAkSVSRVKH+E/BkWVZj1KIHAGsGX2ciSYlo2/f9uxxQxHMLQJOINpg5/2v+4mQAhioslmU9VyqV928Co5DV4F2csAAAAABJRU5ErkJggg==';
};

var memberRight = function memberRight() {
  //积分中心右箭头
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAYAAACjkdXHAAABMUlEQVQ4T6XUvU5UURTF8d8KMXbSWpHoE1BRwGtZaEdhaYSEhJKCBkLIGDUaC30DEzNTjJ0NBV8RtYAQFC45ZCYhk5nxzr2n3v919j5nrxUtTlqw7uCqqh5hEXPoJjmrI5qqqh7jBZ4OgEOs43uSappIgZ9jZaToF3bwJcnVJIEC7+PhmIJzvEEnyd9xAgV+P6W1f9jGh3Ed/A8uujf4jN0kp/cvqgOX+mt8xUaSP0OBuvCwvodXScqDmhUuzA9sodcELn9/gJdN4OEIH9vA/TbwpyZwmfkEq03gxq/dxxqOi+Pq3lxWtIvXSX7PsmGNd7u4ag9vk1yMuq+03cGDMba8xLuBmyb6uUTQctMkWcAzPBkIHGFzEIRl3olnmJ7zWCpBim9JftZKzzpFEwOwDXwLpVaRm+qf6OgAAAAASUVORK5CYII=';
};

var Shape = function Shape() {
  //成长类icon
  return 'data:image/png;base64,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';
};

var taskGrow = function taskGrow() {
  //交易类icon
  return 'data:image/png;base64,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';
};

module.exports = {
  back: back,
  call: call,
  timeIcon: timeIcon,
  adressIcon: adressIcon,
  priceIcon: priceIcon,
  search: search,
  xsj: xsj,
  shop: shop,
  set: set,
  add: add,
  yjt: yjt,
  inputSearch: inputSearch,
  deleteIcon: deleteIcon,
  duihao: duihao,
  lajitong: lajitong,
  banshou: banshou,
  star: star,
  starActive: starActive,
  dun: dun,
  backIcon: backIcon,
  billImg: billImg,
  playIcon: playIcon,
  weatherIcon: weatherIcon,
  propertyIcon: propertyIcon,
  activityIcon: activityIcon,
  eventsIcon: eventsIcon,
  electricIcon: electricIcon,
  rentIcon: rentIcon,
  waterIcon: waterIcon,
  otherIcon: otherIcon,
  quanxian: quanxian,
  home: home,
  erji: erji,
  liuyan: liuyan,
  imageDelete: imageDelete,
  weChatImg: weChatImg,
  alipayImg: alipayImg,
  choosePay: choosePay,
  payResult: payResult,
  payResultTimeIcon: payResultTimeIcon,
  paySuccess: paySuccess,
  writeDui: writeDui,
  VListIcon: VListIcon,
  compangLogo: compangLogo,
  like: like,
  shopJ: shopJ,
  shopAdd: shopAdd,
  addressIcon: addressIcon,
  addressMsg: addressMsg,
  addressSMsg: addressSMsg,
  memberRight: memberRight,
  Shape: Shape,
  taskGrow: taskGrow
};

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
引入页面弹出框module ：toast
var toast = weex.requireModule('toast');

1.弹出普通提示框，只显示文字，2秒后自动消失
toast. showMessage(“提示信息”, ms); // ms=2（s）

2.弹出loading框,不会自动消失，在请求结束后需要手动调用close
//开始网络请求时
toast. showLoadingMessage(“加载中…”);
//请求成功或失败
toast. close();

3.加请求成功的提示框,2秒后自动消失
toast. showSuccessMessage(“提交成功”, ms);

4.请求失败的提示框,2秒后自动消失
toast. showErrorMessage (“提交失败”, ms);
*/
var toast = weex.requireModule('toast');

var showMessage = function showMessage() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (toast) toast.showMessage(msg);
};
var showLoadingMessage = function showLoadingMessage() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '加载中…';
  var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (toast) toast.showLoadingMessage(msg);
};
var showSuccessMessage = function showSuccessMessage() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (toast) toast.showSuccessMessage(msg);
};
var showErrorMessage = function showErrorMessage() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (toast) toast.showErrorMessage(msg);
};
var close = function close() {
  if (toast) toast.close();
};

exports.default = {
  showMessage: showMessage,
  showLoadingMessage: showLoadingMessage,
  showSuccessMessage: showSuccessMessage,
  showErrorMessage: showErrorMessage,
  close: close
};

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tenementBC = new BroadcastChannel('tenementSendMsg'); //企业认证通知
var evaluateBC = new BroadcastChannel('evaluateSendMsg'); //评价成功通知
var unitBC = new BroadcastChannel('unitSendMsg'); //选择单元通知
var addressBC = new BroadcastChannel('addressSendMsg'); //改变地址通知
var shoppingBC = new BroadcastChannel('shoppingSendMsg'); //改变地址通知

var meetingRoom = function meetingRoom(sendMsg) {
  var meetingRoomBC = new BroadcastChannel('RMsendMsg');
  meetingRoomBC.postMessage(sendMsg);
};

var coupon = function coupon(sendMsg) {
  var couponBC = new BroadcastChannel('couponSendMsg');
  couponBC.postMessage(sendMsg);
};

var tenementSend = function tenementSend(sendMsg) {
  tenementBC.postMessage(sendMsg);
};

var tenementGet = function tenementGet(callback) {
  tenementBC.onmessage = function (event) {
    callback(event);
  };
};

var evaluateSend = function evaluateSend(sendMsg) {
  evaluateBC.postMessage(sendMsg);
};

var evaluateGet = function evaluateGet(callback) {
  evaluateBC.onmessage = function (event) {
    callback(event);
  };
};

var unitSend = function unitSend(sendMsg) {
  unitBC.postMessage(sendMsg);
};

var unitGet = function unitGet(callback) {
  unitBC.onmessage = function (event) {
    callback(event);
  };
};

var addressSend = function addressSend(sendMsg) {
  addressBC.postMessage(sendMsg);
};

var addressGet = function addressGet(callback) {
  addressBC.onmessage = function (event) {
    callback(event);
  };
};

var shoppingSend = function shoppingSend(sendMsg) {
  shoppingBC.postMessage(sendMsg);
};

var shoppingGet = function shoppingGet(callback) {
  shoppingBC.onmessage = function (event) {
    callback(event);
  };
};

exports.default = {
  meetingRoom: meetingRoom,
  coupon: coupon,
  tenementSend: tenementSend,
  tenementGet: tenementGet,
  evaluateSend: evaluateSend,
  evaluateGet: evaluateGet,
  unitSend: unitSend,
  unitGet: unitGet,
  addressSend: addressSend,
  addressGet: addressGet,
  shoppingSend: shoppingSend,
  shoppingGet: shoppingGet
};

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

/***/ 456:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(457)
)

/* script */
__vue_exports__ = __webpack_require__(458)

/* template */
var __vue_template__ = __webpack_require__(459)
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
__vue_options__.__file = "/Users/denya/Desktop/workspace/weex/h5/src/views/mall/shopDetail.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-708f0ada"
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

/***/ 457:
/***/ (function(module, exports) {

module.exports = {
  "wrapper": {
    "minHeight": 100,
    "backgroundColor": "#f3f4f6"
  },
  "scroller": {
    "flex": 1
  },
  "mineBox": {
    "width": "750",
    "height": "88",
    "backgroundColor": "rgba(255,255,255,1)",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "paddingLeft": "28",
    "borderBottomWidth": "1",
    "borderBottomColor": "#eaeaea"
  },
  "leftMine": {
    "height": "88",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "integration": {
    "fontSize": "28",
    "fontFamily": "PingFangSC-Regular",
    "color": "rgba(51,51,51,1)"
  },
  "nub": {
    "fontSize": "28",
    "fontFamily": "PingFangSC-Regular",
    "color": "#F39800",
    "paddingLeft": "10"
  },
  "rightMine": {
    "height": "88",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "exchange": {
    "fontSize": "28",
    "fontFamily": "PingFangSC-Regular",
    "color": "rgba(153,153,153,1)"
  },
  "image": {
    "width": "750",
    "height": "562"
  },
  "coupon": {
    "width": "750",
    "height": "308",
    "backgroundColor": "rgba(255,255,255,1)",
    "marginBottom": "14",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "couponHead": {
    "width": "316",
    "height": "188"
  },
  "slider": {
    "width": "750",
    "height": "562"
  },
  "indicator": {
    "width": "750",
    "height": "562",
    "itemColor": "rgba(0,0,0,0.3)",
    "itemSelectedColor": "rgba(255,255,255,1)",
    "itemSize": "12",
    "position": "absolute",
    "top": "200",
    "left": 0,
    "right": 0
  },
  "titleBox": {
    "paddingTop": "28",
    "paddingRight": "28",
    "paddingBottom": "28",
    "paddingLeft": "28",
    "backgroundColor": "#ffffff",
    "height": "164",
    "justifyContent": "space-between",
    "marginBottom": "14"
  },
  "title": {
    "fontSize": "34",
    "fontFamily": "PingFangSC-Medium",
    "color": "rgba(51,51,51,1)"
  },
  "titleBottom": {
    "flexDirection": "row",
    "justifyContent": "space-between"
  },
  "titleBottomLeft": {
    "flexDirection": "row",
    "alignItems": "flex-end"
  },
  "indicatorNub": {
    "fontSize": "40",
    "fontFamily": "SFProDisplay-Medium",
    "color": "rgba(243,152,0,1)",
    "lineHeight": "40"
  },
  "indicatorText": {
    "fontSize": "28",
    "fontFamily": "SFProDisplay-Medium",
    "color": "rgba(243,152,0,1)",
    "paddingLeft": "10",
    "lineHeight": "28"
  },
  "titleBottomRight": {
    "paddingTop": 0,
    "paddingRight": "10",
    "paddingBottom": 0,
    "paddingLeft": "10",
    "height": "36",
    "backgroundColor": "rgba(252,63,86,1)",
    "borderRadius": "22",
    "fontSize": "22",
    "fontFamily": "PingFangSC-Regular",
    "color": "rgba(255,255,255,1)",
    "lineHeight": "36",
    "textAlign": "center"
  },
  "mainBox": {
    "backgroundColor": "rgba(255,255,255,1)",
    "paddingTop": "40",
    "paddingRight": "28",
    "paddingBottom": "40",
    "paddingLeft": "28"
  },
  "ruleText": {
    "fontSize": "32",
    "fontFamily": "PingFangSC-Regular",
    "fontWeight": "400",
    "color": "rgba(51,51,51,1)",
    "paddingBottom": "14"
  },
  "rules": {
    "fontSize": "28",
    "fontFamily": "PingFangSC-Regular",
    "fontWeight": "400",
    "color": "rgba(153,153,153,1)",
    "lineHeight": "36",
    "paddingBottom": "28"
  },
  "illustrateBox": {
    "paddingTop": "28",
    "paddingRight": "28",
    "paddingBottom": "28",
    "paddingLeft": "28"
  },
  "illustrateTitle": {
    "fontSize": "28",
    "fontFamily": "PingFangSC-Regular",
    "color": "rgba(51,51,51,1)"
  },
  "illustrateMain": {
    "marginTop": "28"
  },
  "buttonBox": {
    "width": "750",
    "height": "108",
    "backgroundColor": "rgba(255,255,255,1)",
    "position": "relative"
  },
  "button": {
    "fontSize": "34",
    "fontFamily": "SFProDisplay-Medium",
    "color": "rgba(255,255,255,1)",
    "lineHeight": "76",
    "textAlign": "center",
    "width": "630",
    "height": "76",
    "backgroundImage": "linear-gradient(270deg, rgba(0, 189, 255, 1), rgba(0, 154, 255, 1))",
    "borderRadius": "44",
    "position": "absolute",
    "left": "60",
    "top": "16"
  },
  "noneIntegrationSum": {
    "width": "630",
    "height": "76",
    "backgroundColor": "rgba(218,218,218,1)",
    "borderRadius": "44",
    "fontSize": "34",
    "fontFamily": "PingFangSC-Medium",
    "fontWeight": "500",
    "color": "rgba(255,255,255,1)",
    "lineHeight": "76",
    "textAlign": "center",
    "position": "absolute",
    "left": "60",
    "top": "16"
  },
  "orderBg": {
    "position": "absolute",
    "top": 0,
    "bottom": 0,
    "left": 0,
    "right": 0,
    "backgroundColor": "rgba(0,0,0,0.5)"
  },
  "orderBox": {
    "height": "780",
    "backgroundColor": "rgba(255,255,255,1)",
    "borderTopLeftRadius": "16",
    "borderTopRightRadius": "16",
    "position": "absolute",
    "bottom": "-780"
  },
  "orderTitleBox": {
    "width": "750",
    "height": "88",
    "backgroundColor": "rgba(255,255,255,1)",
    "borderTopLeftRadius": "16",
    "borderTopRightRadius": "16",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "position": "relative"
  },
  "orderTitle": {
    "fontSize": "36",
    "fontFamily": "PingFangSC-Medium",
    "color": "rgba(51,51,51,1)"
  },
  "cancel": {
    "fontSize": "32",
    "fontFamily": "PingFangSC-Regular",
    "color": "rgba(51,51,51,1)",
    "position": "absolute",
    "right": "28",
    "height": "88",
    "lineHeight": "88"
  },
  "pickUpType": {
    "width": "750",
    "height": "88",
    "flexDirection": "row",
    "alignItems": "center",
    "borderBottomWidth": "2",
    "borderBottomColor": "rgba(234,234,234,1)"
  },
  "pickUp": {
    "height": "48",
    "borderRadius": "28",
    "paddingTop": 0,
    "paddingRight": "34",
    "paddingBottom": 0,
    "paddingLeft": "34",
    "marginTop": 0,
    "marginRight": "28",
    "marginBottom": 0,
    "marginLeft": "28",
    "fontSize": "28",
    "fontFamily": "PingFangSC-Regular",
    "fontWeight": "400",
    "color": "rgba(51,51,51,1)",
    "lineHeight": "48",
    "textAlign": "center"
  },
  "pickUpActive": {
    "backgroundColor": "rgba(0,189,255,1)",
    "color": "rgba(255,255,255,1)"
  },
  "inviteBox": {
    "width": "750",
    "height": "164",
    "backgroundColor": "rgba(255,255,255,1)",
    "flexDirection": "row",
    "paddingTop": 0,
    "paddingRight": "30",
    "paddingBottom": 0,
    "paddingLeft": "30"
  },
  "addressBox": {
    "width": "750",
    "paddingTop": "28",
    "paddingRight": "28",
    "paddingBottom": "28",
    "paddingLeft": "28",
    "flexDirection": "row",
    "justifyContent": "space-between"
  },
  "addressTop": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "height": "32"
  },
  "addressTopLeft": {
    "flexDirection": "row"
  },
  "addressBoxName": {
    "fontSize": "28",
    "fontFamily": "PingFangSC-Regular",
    "color": "rgba(51,51,51,1)"
  },
  "addressBoxPhone": {
    "fontSize": "28",
    "fontFamily": "PingFangSC-Regular",
    "color": "rgba(51,51,51,1)",
    "paddingRight": "44"
  },
  "addressBoxText": {
    "width": "620",
    "height": "64",
    "fontSize": "28",
    "fontFamily": "PingFangSC-Regular",
    "color": "rgba(153,153,153,1)",
    "lineHeight": "32",
    "marginTop": "4"
  },
  "noneAddressBox": {
    "width": "750",
    "height": "178",
    "backgroundColor": "rgba(255,255,255,1)",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "borderBottomColor": "#f3f4f7",
    "borderBottomWidth": "14"
  },
  "noneAddressLeft": {
    "paddingTop": "34",
    "paddingRight": "30",
    "paddingBottom": "34",
    "paddingLeft": "30",
    "flexDirection": "row",
    "alignItems": "flex-start"
  },
  "addressIcon": {
    "width": "24",
    "height": "32",
    "marginRight": "14"
  },
  "addressCenter": {
    "flex": 1
  },
  "noneAddressText": {
    "fontSize": "28",
    "fontFamily": "PingFangSC-Regular",
    "color": "rgba(201,201,201,1)"
  },
  "noneAddressRight": {
    "height": "164",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "flex-end"
  },
  "addAddress": {
    "fontSize": "28",
    "fontFamily": "PingFangSC-Regular",
    "color": "rgba(0,189,255,1)",
    "paddingRight": "6"
  },
  "yjt": {
    "width": "15",
    "height": "26",
    "marginRight": "30",
    "marginLeft": "19"
  },
  "orderMainBox": {
    "flexDirection": "row",
    "paddingTop": "28",
    "paddingRight": "28",
    "paddingBottom": "28",
    "paddingLeft": "28",
    "width": "750",
    "height": "216",
    "backgroundColor": "rgba(255,255,255,1)",
    "borderBottomColor": "#f3f4f7",
    "borderBottomWidth": "1"
  },
  "orderMainImg": {
    "width": "160",
    "height": "160"
  },
  "orderMainRight": {
    "flexDirection": "column",
    "justifyContent": "space-between",
    "marginLeft": "28"
  },
  "orderMainTitle": {
    "height": "40",
    "fontSize": "28",
    "fontFamily": "PingFangSC-Regular",
    "color": "rgba(51,51,51,1)",
    "lineHeight": "40"
  },
  "orderMainNub": {
    "height": "40",
    "fontSize": "28",
    "fontFamily": "SFProDisplay-Medium",
    "color": "rgba(245,153,0,1)",
    "lineHeight": "40"
  },
  "exchangeBox": {
    "width": "750",
    "height": "114",
    "backgroundColor": "rgba(255,255,255,1)",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "paddingTop": 0,
    "paddingRight": "28",
    "paddingBottom": 0,
    "paddingLeft": "28",
    "borderBottomColor": "#f3f4f7",
    "borderBottomWidth": "14"
  },
  "exchangeLeft": {
    "fontSize": "28",
    "fontFamily": "PingFangSC-Regular",
    "color": "rgba(51,51,51,1)"
  },
  "exchangeRight": {
    "width": "240",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  "shopJBox": {
    "width": "56",
    "height": "56",
    "backgroundColor": "rgba(238,238,238,1)",
    "borderRadius": "8",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "shopJ": {
    "width": "24",
    "height": "4"
  },
  "shopAdd": {
    "width": "24",
    "height": "24"
  },
  "exchangeNub": {
    "width": "108",
    "height": "56",
    "backgroundColor": "rgba(248,248,248,1)",
    "borderRadius": "8",
    "fontSize": "28",
    "fontFamily": "PingFangSC-Regular",
    "color": "rgba(51,51,51,1)",
    "lineHeight": "56",
    "textAlign": "center"
  },
  "btnBox": {
    "width": "750",
    "height": "108",
    "backgroundColor": "rgba(255,255,255,1)",
    "flexDirection": "row",
    "justifyContent": "flex-end",
    "alignItems": "center",
    "paddingRight": "28",
    "bottom": 0
  },
  "heji": {
    "fontSize": "28",
    "fontFamily": "PingFangSC-Medium",
    "color": "#333333"
  },
  "hejiNub": {
    "fontSize": "28",
    "fontFamily": "PingFangSC-Medium",
    "color": "#F59900",
    "paddingLeft": "10"
  },
  "btn": {
    "width": "192",
    "height": "68",
    "backgroundColor": "rgba(0,189,255,1)",
    "borderRadius": "38",
    "fontSize": "34",
    "fontFamily": "PingFangSC-Medium",
    "color": "rgba(255,255,255,1)",
    "lineHeight": "68",
    "textAlign": "center",
    "marginLeft": "28"
  },
  "yjtBox": {
    "height": 100,
    "justifyContent": "center"
  },
  "addressyjt": {
    "width": "15",
    "height": "26"
  },
  "tab-panels": {
    "position": "relative",
    "width": "1500",
    "flex": 1,
    "flexDirection": "row",
    "alignItems": "stretch",
    "transitionProperty": "left",
    "transitionDuration": 200,
    "transitionTimingFunction": "ease-in-out"
  },
  "@TRANSITION": {
    "tab-panels": {
      "property": "left",
      "duration": 200,
      "timingFunction": "ease-in-out"
    }
  }
}

/***/ }),

/***/ 458:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _header = __webpack_require__(8);

var _header2 = _interopRequireDefault(_header);

var _toast = __webpack_require__(13);

var _toast2 = _interopRequireDefault(_toast);

var _global = __webpack_require__(0);

var _global2 = _interopRequireDefault(_global);

var _api = __webpack_require__(2);

var _api2 = _interopRequireDefault(_api);

var _BroadcastChannel = __webpack_require__(18);

var _BroadcastChannel2 = _interopRequireDefault(_BroadcastChannel);

var _base = __webpack_require__(1);

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
var globalEvent = weex.requireModule('globalEvent');
var animation = weex.requireModule('animation');
var modal = weex.requireModule('modal');

var weexParams = weex.config.params;
var param = _global2.default.getParams(weex.config.bundleUrl);

exports.default = {
  name: 'shopDetail',
  components: {
    myHeader: _header2.default
  },
  data: function data() {
    return {
      yjt: (0, _base.yjt)(),
      shopJ: (0, _base.shopJ)(),
      shopAdd: (0, _base.shopAdd)(),
      addressIcon: (0, _base.addressIcon)(),
      imageList: '',
      details: {},
      mbUserRelation: {},
      width: 750,
      height: 200,
      buy: 0,
      orderNub: 1,
      isTime: true,
      pickUpActive: ''
    };
  },
  created: function created() {
    var _this = this;

    this.getMbActiveById();
    _BroadcastChannel2.default.shoppingGet(function (event) {
      _this.mbUserRelation = event.data;
    });
    globalEvent.addEventListener("clickEvent", function (e) {
      if (e.backKey && e.backKey == 'keyPress') _this.goBack();
    });
  },

  methods: {
    goBack: function goBack() {
      _toast2.default.close();
      navigator.pop();
    },
    onchange: function onchange(event) {
      console.log('changed:', event.index);
    },
    getMbActiveById: function getMbActiveById() {
      var _this2 = this;

      _toast2.default.showLoadingMessage("获取商品中...");
      _api2.default.getMbActiveById({
        "memberCode": weexParams.memberCode,
        "mbActiveId": param.id
      }, function (res) {
        console.log(res);
        _toast2.default.close();
        if (res.res.code === 10000) {
          _this2.details = res.body.mbActiveOutput;
          _this2.imageList = res.body.imageList;
          _this2.integrationSum = res.body.integrationSum;
          _this2.mbUserRelation = res.body.mbAddress;
          if (_this2.details.courierType) {
            if (_this2.details.courierType == 1 || _this2.details.courierType.split(',')[0] == 1) {
              _this2.pickUpActive = 1;
            } else if (_this2.details.courierType == 2 || _this2.details.courierType.split(',')[1] == 2) {
              _this2.pickUpActive = 0;
            }
          }
          var exchangeData = JSON.parse(res.body.mbActiveOutput.exchangeData),
              isTime = false;

          if (exchangeData.length !== 0) {
            for (var i = exchangeData.length; i--;) {
              if (_this2.calculateTime(exchangeData[i])) {
                isTime = _this2.calculateTime(exchangeData[i]);
                if (Number(res.body.mbActiveOutput.exchangeNum) > Number(exchangeData[i].exchangeNum)) {
                  _this2.details.exchangeNum = exchangeData[i].exchangeNum;
                  if (Number(_this2.details.exchangeNum) > 0 && _this2.integrationSum > _this2.details.exchangeValue) {
                    _this2.orderNub = 1;
                  } else {
                    _this2.orderNub = 0;
                  }
                }
              }
            }
            _this2.isTime = isTime;
          } else {
            if (Number(_this2.details.exchangeNum) > 0 && _this2.integrationSum > _this2.details.exchangeValue) {
              _this2.orderNub = 1;
            } else {
              _this2.orderNub = 0;
            }
          }
        } else {
          _toast2.default.showErrorMessage(res.res.msg);
        }
      });
    },
    calculateTime: function calculateTime(exchangeData) {
      var beginTimeNum = Number(exchangeData.beginTime.split(':')[0]) * 60 + Number(exchangeData.beginTime.split(':')[1]),
          endTimeNum = Number(exchangeData.endTime.split(':')[0]) * 60 + Number(exchangeData.endTime.split(':')[1]),
          myDate = new Date();
      if (beginTimeNum < myDate.getHours() * 60 + myDate.getMinutes() && endTimeNum > myDate.getHours() * 60 + myDate.getMinutes()) {
        return true;
      } else {
        return false;
      }
    },
    exchange: function exchange() {
      var _this3 = this;

      if (this.details.templateId) {
        modal.confirm({
          message: '确认兑换该权益？',
          okTitle: '确认',
          cancelTitle: '取消',
          duration: 0.3
        }, function (res) {
          if (res === '确认') {
            console.log(123);
            if (_this3.orderNub == 0) {
              _toast2.default.showErrorMessage('您不能兑换更多');
            } else {
              if (_this3.orderNub <= _this3.details.exchangeNum && _this3.integrationSum >= _this3.orderNub * _this3.details.exchangeValue) {
                _this3.addMbActiveTrade();
              } else {
                _toast2.default.showErrorMessage('您不能兑换更多');
              }
            }
          }
        });
      } else {
        this.buy = 1;
        var testEl = this.$refs.orderBox;
        animation.transition(testEl, {
          styles: {
            transform: 'translateY(-780px)'
          },
          duration: 300, //ms
          timingFunction: 'ease',
          delay: 200 //ms
        });
      }
    },
    cancel: function cancel() {
      var _this4 = this;

      var testEl = this.$refs.orderBox;
      animation.transition(testEl, {
        styles: {
          transform: 'translateY(0)'
        },
        duration: 300, //ms
        timingFunction: 'ease',
        delay: 200 //ms
      }, function () {
        _this4.buy = 0;
      });
    },
    goAddress: function goAddress() {
      var url = _global2.default.getUrl(weex.config.bundleUrl, 'views/address/addressList.js?buying=true');

      navigator.push({
        url: url,
        animated: 'true'
      });
    },
    goAddAddress: function goAddAddress() {
      var url = _global2.default.getUrl(weex.config.bundleUrl, 'views/address/addAddress.js?address=new');

      navigator.push({
        url: url,
        animated: 'true'
      });
    },
    pagestart: function pagestart(data) {},
    pagefinish: function pagefinish(data) {
      this.height = data.webHeight;
    },
    error: function error(data) {},
    goMyExchange: function goMyExchange(item) {
      _toast2.default.showSuccessMessage("兑换成功", 2000);
      var url;
      if (this.details.actType == 2) {
        url = _global2.default.getUrl(weex.config.bundleUrl, 'views/coupon/exchangeDetails.js?templateId=' + this.details.templateId + '&id=' + item.id + '&code=' + item.code + '&link=' + encodeURIComponent(this.details.link));
      } else {
        url = _global2.default.getUrl(weex.config.bundleUrl, 'views/mall/shopOrder.js?id=' + item.id);
      }
      setTimeout(function () {
        navigator.push({
          url: url,
          animated: 'true'
        });
      }, 2000);
    },
    orderNubAdd: function orderNubAdd() {
      if (this.orderNub < this.details.exchangeNum && this.integrationSum > (this.orderNub + 1) * this.details.exchangeValue) {
        this.orderNub = this.orderNub + 1;
      } else {
        _toast2.default.showErrorMessage('您不能兑换更多');
      }
    },
    orderNubJ: function orderNubJ() {
      if (this.orderNub > 1) {
        this.orderNub = this.orderNub - 1;
      }
    },
    addMbActiveTrade: function addMbActiveTrade() {
      var _this5 = this;

      if (this.orderNub == 0) {
        _toast2.default.showErrorMessage('您没有兑换商品');
      } else {
        var courierType = void 0;
        if (this.pickUpActive) {
          courierType = "1";
        } else {
          courierType = "2";
        }
        var params = {
          "memberCode": weexParams.memberCode,
          "marketId": weexParams.marketId,
          "activeId": this.details.id,
          "changeVal": this.orderNub * this.details.exchangeValue * -1,
          "exchangeNum": this.orderNub,
          "actType": this.details.actType,
          "courierType": courierType
        };
        if (this.details.actType == 2) {
          _toast2.default.showLoadingMessage("兑换中...");
          _api2.default.addMbActiveTrade(params, function (res) {
            _toast2.default.close();
            if (res.res.code === 10000) {
              _this5.integrationSum = _this5.integrationSum - _this5.orderNub * _this5.details.exchangeValue;
              Number(_this5.details.exchangeNum) - _this5.orderNub;
              _this5.cancel();
              _this5.goMyExchange(res.body.mbBondItem);
            } else {
              _toast2.default.showErrorMessage(res.res.msg);
            }
          });
        } else if (this.pickUpActive === 0 && this.mbUserRelation.id) {
          params.addressId = this.mbUserRelation.id;
          _toast2.default.showLoadingMessage("兑换中...");
          _api2.default.addMbActiveTrade(params, function (res) {
            _toast2.default.close();
            if (res.res.code === 10000) {
              _this5.integrationSum = _this5.integrationSum - _this5.orderNub * _this5.details.exchangeValue;
              Number(_this5.details.exchangeNum) - _this5.orderNub;
              _this5.cancel();
              _this5.goMyExchange(res.body.mbActiveTrade);
            } else {
              _toast2.default.showErrorMessage(res.res.msg);
            }
          });
        } else if (this.pickUpActive === 1) {
          _toast2.default.showLoadingMessage("兑换中...");
          _api2.default.addMbActiveTrade(params, function (res) {
            _toast2.default.close();
            if (res.res.code === 10000) {
              _this5.integrationSum = _this5.integrationSum - _this5.orderNub * _this5.details.exchangeValue;
              Number(_this5.details.exchangeNum) - _this5.orderNub;
              _this5.cancel();
              _this5.goMyExchange(res.body.mbActiveTrade);
            } else {
              _toast2.default.showErrorMessage(res.res.msg);
            }
          });
        } else {
          _toast2.default.showErrorMessage('请完善收货地址！');
        }
      }
    }
  },
  filters: {
    toTime: function toTime(value) {
      var leftTime = (value - Date.parse(new Date())) / 1000;
      if (value - Date.parse(new Date()) > 0) {
        var days = parseInt(leftTime / 60 / 60 / 24, 10); //计算剩余的天数
        var hours = parseInt(leftTime / 60 / 60 % 24, 10); //计算剩余的小时
        return days + '天' + hours + '小时';
      } else {
        return '超时';
      }
    }
  }
};

/***/ }),

/***/ 459:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('myHeader', {
    attrs: {
      "tittle": "商品详情"
    },
    on: {
      "goBack": _vm.goBack
    }
  }), _c('scroller', {
    staticClass: ["scroller"]
  }, [(_vm.details.actType == 2) ? _c('div', {
    staticClass: ["coupon"]
  }, [_c('image', {
    staticClass: ["couponHead"],
    attrs: {
      "src": "data:image/png;base64,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"
    }
  })]) : _c('slider', {
    staticClass: ["slider"],
    attrs: {
      "interval": "4500"
    },
    on: {
      "change": _vm.onchange
    }
  }, [_vm._l((_vm.imageList), function(img) {
    return _c('image', {
      staticClass: ["image"],
      attrs: {
        "resize": "cover",
        "src": img.imgPath
      }
    })
  }), _c('indicator', {
    staticClass: ["indicator"]
  })], 2), _c('div', {
    staticClass: ["titleBox"]
  }, [_c('text', {
    staticClass: ["title"]
  }, [_vm._v(_vm._s(_vm.details.actName))]), _c('div', {
    staticClass: ["titleBottom"]
  }, [_c('div', {
    staticClass: ["titleBottomLeft"]
  }, [_c('text', {
    staticClass: ["indicatorNub"]
  }, [_vm._v(_vm._s(_vm.details.exchangeValue))]), _c('text', {
    staticClass: ["indicatorText"]
  }, [_vm._v("积分")])]), (_vm.details.convertibility == 1) ? _c('text', {
    staticClass: ["titleBottomRight"]
  }, [_vm._v("剩余:" + _vm._s(_vm._f("toTime")(_vm.details.actEndTime)))]) : _vm._e()])]), (_vm.details.actDetail || _vm.details.actSubtitle) ? _c('div', {
    staticClass: ["mainBox"]
  }, [(_vm.details.actSubtitle) ? _c('text', {
    staticClass: ["ruleText"]
  }, [_vm._v("兑换规则")]) : _vm._e(), (_vm.details.actSubtitle) ? _c('text', {
    staticClass: ["rules"]
  }, [_vm._v(_vm._s(_vm.details.actSubtitle))]) : _vm._e(), (_vm.details.actDetail) ? _c('text', {
    staticClass: ["ruleText"]
  }, [_vm._v("兑换详情")]) : _vm._e(), (_vm.details.actDetail) ? _c('vk-wx-richtext', {
    ref: "richtext",
    style: {
      width: _vm.width,
      height: _vm.height
    },
    attrs: {
      "src": _vm.details.actDetail
    },
    on: {
      "pagestart": _vm.pagestart,
      "pagefinish": _vm.pagefinish,
      "error": _vm.error
    }
  }) : _vm._e()], 1) : _vm._e()]), _c('div', {
    staticClass: ["buttonBox"]
  }, [_c('text', {
    staticClass: ["noneIntegrationSum"]
  }, [_vm._v("暂未开放兑换")]), (_vm.isTime) ? _c('text', {
    staticClass: ["button"],
    on: {
      "click": _vm.exchange
    }
  }, [_vm._v("积分兑换")]) : _vm._e()]), (_vm.buy) ? _c('div', {
    staticClass: ["orderBg"],
    on: {
      "click": _vm.cancel
    }
  }) : _vm._e(), _c('div', {
    ref: "orderBox",
    staticClass: ["orderBox"]
  }, [_c('div', {
    staticClass: ["orderTitleBox"]
  }, [_c('text', {
    staticClass: ["orderTitle"]
  }, [_vm._v("确认订单")]), _c('text', {
    staticClass: ["cancel"],
    on: {
      "click": _vm.cancel
    }
  }, [_vm._v("取消")])]), (_vm.details.courierType) ? _c('div', {
    staticClass: ["pickUpType"]
  }, [(_vm.details.courierType == 1 || _vm.details.courierType.split(',')[0] == 1) ? _c('text', {
    class: ['pickUp', _vm.pickUpActive ? 'pickUpActive' : ''],
    on: {
      "click": function($event) {
        _vm.pickUpActive = 1
      }
    }
  }, [_vm._v("自提")]) : _vm._e(), (_vm.details.courierType == 2 || _vm.details.courierType.split(',')[1] == 2) ? _c('text', {
    class: ['pickUp', _vm.pickUpActive ? '' : 'pickUpActive'],
    on: {
      "click": function($event) {
        _vm.pickUpActive = 0
      }
    }
  }, [_vm._v("快递")]) : _vm._e()]) : _vm._e(), (_vm.details.courierType) ? _c('div', [(_vm.details.courierType.split(',').length == 2) ? _c('div', {
    staticClass: ["tab-panels"],
    style: {
      'left': !_vm.pickUpActive * -750 + 'px'
    }
  }, [_c('div', {
    staticClass: ["addressBox"]
  }, [_c('image', {
    staticClass: ["addressIcon"],
    attrs: {
      "src": _vm.addressIcon
    }
  }), _c('div', {
    staticClass: ["addressCenter"]
  }, [_vm._m(0), _c('text', {
    staticClass: ["addressBoxText"]
  }, [_vm._v(_vm._s(_vm.details.selfLiftingAddress))])])]), (_vm.mbUserRelation) ? _c('div', {
    staticClass: ["addressBox"],
    on: {
      "click": _vm.goAddress
    }
  }, [_c('image', {
    staticClass: ["addressIcon"],
    attrs: {
      "src": _vm.addressIcon
    }
  }), _c('div', {
    staticClass: ["addressCenter"]
  }, [_c('div', {
    staticClass: ["addressTop"]
  }, [_c('div', {
    staticClass: ["addressTopLeft"]
  }, [_c('text', {
    staticClass: ["addressBoxName"]
  }, [_vm._v("收货人: " + _vm._s(_vm.mbUserRelation.sendeeName))])]), _c('text', {
    staticClass: ["addressBoxPhone"]
  }, [_vm._v(_vm._s(_vm.mbUserRelation.sendeeTel))])]), _c('text', {
    staticClass: ["addressBoxText"]
  }, [_vm._v(_vm._s(_vm.mbUserRelation.sendeeAddress))])]), _c('div', {
    staticClass: ["yjtBox"]
  }, [_c('image', {
    staticClass: ["addressyjt"],
    attrs: {
      "src": _vm.yjt
    }
  })])]) : _vm._e(), (!_vm.mbUserRelation) ? _c('div', {
    staticClass: ["noneAddressBox"]
  }, [_c('div', {
    staticClass: ["noneAddressLeft"]
  }, [_c('image', {
    staticClass: ["addressIcon"],
    attrs: {
      "src": _vm.addressIcon
    }
  }), _c('text', {
    staticClass: ["noneAddressText"]
  }, [_vm._v("还没有收货地址")])]), _c('div', {
    staticClass: ["noneAddressRight"],
    on: {
      "click": _vm.goAddAddress
    }
  }, [_c('text', {
    staticClass: ["addAddress"]
  }, [_vm._v("新建地址")]), _c('image', {
    staticClass: ["yjt"],
    attrs: {
      "src": _vm.yjt
    }
  })])]) : _vm._e()]) : _c('div', [(_vm.pickUpActive) ? _c('div', {
    staticClass: ["addressBox"]
  }, [_c('image', {
    staticClass: ["addressIcon"],
    attrs: {
      "src": _vm.addressIcon
    }
  }), _c('div', {
    staticClass: ["addressCenter"]
  }, [_vm._m(1), _c('text', {
    staticClass: ["addressBoxText"]
  }, [_vm._v(_vm._s(_vm.details.selfLiftingAddress))])])]) : _vm._e(), (!_vm.pickUpActive && _vm.mbUserRelation) ? _c('div', {
    staticClass: ["addressBox"],
    on: {
      "click": _vm.goAddress
    }
  }, [_c('image', {
    staticClass: ["addressIcon"],
    attrs: {
      "src": _vm.addressIcon
    }
  }), _c('div', {
    staticClass: ["addressCenter"]
  }, [_c('div', {
    staticClass: ["addressTop"]
  }, [_c('div', {
    staticClass: ["addressTopLeft"]
  }, [_c('text', {
    staticClass: ["addressBoxName"]
  }, [_vm._v("收货人: " + _vm._s(_vm.mbUserRelation.sendeeName))])]), _c('text', {
    staticClass: ["addressBoxPhone"]
  }, [_vm._v(_vm._s(_vm.mbUserRelation.sendeeTel))])]), _c('text', {
    staticClass: ["addressBoxText"]
  }, [_vm._v(_vm._s(_vm.mbUserRelation.sendeeAddress))])]), _c('div', {
    staticClass: ["yjtBox"]
  }, [_c('image', {
    staticClass: ["addressyjt"],
    attrs: {
      "src": _vm.yjt
    }
  })])]) : _vm._e(), (!_vm.pickUpActive && !_vm.mbUserRelation) ? _c('div', {
    staticClass: ["noneAddressBox"]
  }, [_c('div', {
    staticClass: ["noneAddressLeft"]
  }, [_c('image', {
    staticClass: ["addressIcon"],
    attrs: {
      "src": _vm.addressIcon
    }
  }), _c('text', {
    staticClass: ["noneAddressText"]
  }, [_vm._v("还没有收货地址")])]), _c('div', {
    staticClass: ["noneAddressRight"],
    on: {
      "click": _vm.goAddAddress
    }
  }, [_c('text', {
    staticClass: ["addAddress"]
  }, [_vm._v("新建地址")]), _c('image', {
    staticClass: ["yjt"],
    attrs: {
      "src": _vm.yjt
    }
  })])]) : _vm._e()])]) : _vm._e(), _c('div', {
    staticClass: ["orderMainBox"]
  }, [_c('image', {
    staticClass: ["orderMainImg"],
    attrs: {
      "src": _vm.details.actImgPath
    }
  }), _c('div', {
    staticClass: ["orderMainRight"]
  }, [_c('text', {
    staticClass: ["orderMainTitle"]
  }, [_vm._v(_vm._s(_vm.details.actName))]), _c('text', {
    staticClass: ["orderMainNub"]
  }, [_vm._v(_vm._s(_vm.details.exchangeValue) + " 积分")])])]), _c('div', {
    staticClass: ["exchangeBox"]
  }, [_c('text', {
    staticClass: ["exchangeLeft"]
  }, [_vm._v("兑换数量")]), _c('div', {
    staticClass: ["exchangeRight"]
  }, [_c('div', {
    staticClass: ["shopJBox"],
    on: {
      "click": _vm.orderNubJ
    }
  }, [_c('image', {
    staticClass: ["shopJ"],
    attrs: {
      "src": _vm.shopJ
    }
  })]), _c('text', {
    staticClass: ["exchangeNub"]
  }, [_vm._v(_vm._s(_vm.orderNub))]), _c('div', {
    staticClass: ["shopJBox"],
    on: {
      "click": _vm.orderNubAdd
    }
  }, [_c('image', {
    staticClass: ["shopAdd"],
    attrs: {
      "src": _vm.shopAdd
    }
  })])])]), _c('div', {
    staticClass: ["btnBox"]
  }, [_c('text', {
    staticClass: ["heji"]
  }, [_vm._v("合计: ")]), _c('text', {
    staticClass: ["hejiNub"]
  }, [_vm._v(_vm._s(_vm.orderNub * _vm.details.exchangeValue) + " 积分")]), _c('text', {
    staticClass: ["btn"],
    on: {
      "click": _vm.addMbActiveTrade
    }
  }, [_vm._v("确认兑换")])])])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["addressTop"]
  }, [_c('div', {
    staticClass: ["addressTopLeft"]
  }, [_c('text', {
    staticClass: ["addressBoxName"]
  }, [_vm._v("自提地址")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["addressTop"]
  }, [_c('div', {
    staticClass: ["addressTopLeft"]
  }, [_c('text', {
    staticClass: ["addressBoxName"]
  }, [_vm._v("自提地址")])])])
}]}
module.exports.render._withStripped = true

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = {
  "ttl": {
    "width": "750",
    "height": "88",
    "flexDirection": "row",
    "alignItems": "center",
    "backgroundColor": "#ffffff",
    "borderBottomWidth": "1",
    "borderBottomColor": "rgb(220,223,230)"
  },
  "iOS7": {
    "paddingTop": "40",
    "height": "128"
  },
  "iPhoneX": {
    "paddingTop": "80",
    "height": "168"
  },
  "ttl-icon": {
    "width": "88",
    "height": "88",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "icon-back": {
    "width": "22",
    "height": "39"
  },
  "ttl-text": {
    "flex": 1,
    "lines": 1,
    "textAlign": "center",
    "textOverflow": "ellipsis",
    "fontSize": "36",
    "fontFamily": "PingFangSC-Medium",
    "color": "rgba(51,51,51,1)"
  },
  "rightIcon": {
    "width": "31",
    "height": "31"
  },
  "rightBtn": {
    "fontSize": "28"
  }
}

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = __webpack_require__(1);

//
//
//
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
  name: 'header',
  props: {
    def: String,
    icon: '',
    rightBtn: '',
    tittle: {
      type: String,
      default: '园区服务',
      icon: ''
    }
  },
  filters: {},
  data: function data() {
    return {
      titleClass: 'ttl',
      isiOS7: false,
      isiPhoneX: false,
      msg: '',
      back: (0, _base.back)()
    };
  },
  created: function created() {
    var iPhoneXHeight = 2436;
    this.isiOS7 = WXEnvironment.osName == 'iOS';
    this.isiPhoneX = this.isiOS7 && WXEnvironment.deviceHeight == iPhoneXHeight;
  },

  methods: {
    goBack: function goBack() {
      var tittle = this.tittle;
      if (this.tittle == '园区服务') navigator.pop();else this.$emit('goBack');
      console.log('leftBtnClick');
    },
    rightBtnClick: function rightBtnClick() {
      this.$emit('rightBtnClick');
      console.log('rightBtnClick');
    }
  }
};

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['ttl', _vm.isiOS7 ? 'iOS7' : '', _vm.isiPhoneX ? 'iPhoneX' : '']
  }, [_c('div', {
    staticClass: ["ttl-icon"],
    on: {
      "click": _vm.goBack
    }
  }, [_c('image', {
    staticClass: ["icon-back"],
    attrs: {
      "src": _vm.back
    }
  })]), _c('text', {
    staticClass: ["ttl-text"]
  }, [_vm._v(_vm._s(_vm.tittle))]), _c('div', {
    staticClass: ["ttl-icon"],
    on: {
      "click": _vm.rightBtnClick
    }
  }, [(_vm.icon) ? _c('image', {
    staticClass: ["rightIcon"],
    attrs: {
      "src": _vm.icon
    }
  }) : _vm._e(), (_vm.rightBtn) ? _c('text', {
    staticClass: ["rightBtn"]
  }, [_vm._v(_vm._s(_vm.rightBtn))]) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(5)
)

/* script */
__vue_exports__ = __webpack_require__(6)

/* template */
var __vue_template__ = __webpack_require__(7)
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
__vue_options__.__file = "/Users/denya/Desktop/workspace/weex/h5/src/views/components/header.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-a8511792"
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