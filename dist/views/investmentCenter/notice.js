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
/******/ 	return __webpack_require__(__webpack_require__.s = 440);
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
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAsUAAACgCAYAAADkbRHYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABy5JREFUeNrs3UtsFGUAwPFv2oIYQkzUS72YmMjBmBiNiR6Uo3rUgwcu+CCERBNfqBdPxnoyBqyKNbHGM5EACTESUNEIXtAACgZoUXzwSAoRENrutjvOlELa7by2IGzo75dMuzPdnZ1+c/ln8u1sFMdx6F7a0xElQgh5S8fCBfMXHfr0tWMBAADa3J3PvtP970jtTBKycSheUnGHIQMAYK4TxQAAiGJDAACAKAYAAFEMAACiGAAARDEAAIhiAAAQxQAAIIoBAEAUAwCAKAYAAFEMAACiGAAARDEAAIhiAAAQxQAAIIoBAEAUAwCAKAYAAFEMAACiGAAARDEAAIhiAAAQxQAAIIoBAEAUAwCAKAYAAFEMAACiGAAARDEAAIhiAAAQxQAAIIoBAEAUAwCAKAYAAFEMAACiGAAARDEAAIhiAAAQxQAAIIoBAEAUAwCAKAYAAFEMAACiGAAARDEAAIhiAAAQxQAAIIoBAEAUAwCAKAYAAFEMAACiGAAARDEAAIhiAAAQxQAAIIoBAEAUAwCAKAYAAFEMAACiGAAARDEAAIhiAAAQxQAAIIoBAEAUAwCAKAYAAFEMAACiGAAARDEAAIhiAAAQxQAAIIoBAEAUAwCAKAYAAFEMAACiGAAARDEAAIhiAAAQxQAAIIoBAEAUAwCAKAYAAFEMAACiGAAARDEAAIhiAAAQxQAAIIoBAEAUAwCAKAYAAFEMAACiGAAARDEAAIhiAAAQxQAAIIoBAEAUAwCAKAYAAFEMAACiGAAARDEAAIhiAAAQxQAAIIoBAEAUAwCAKAYAAFEMAACiGAAARDEAAIhiAAAQxQAAIIoBAEAUAwCAKAYAAFEMAACiGAAARDEAAIhiAAAQxQAAIIoBAEAUAwCAKAYAAFEMAACiGAAA2jaKY8MCAMB1Kq4axQAAMKeIYgAA5rK4KIrjnG3jxg0AgDbXmGzXqELjhqwojgsiOV2GjDEAAG1uaEq/5rVtYRQXPTldHzDGAAC0uYGcls1VNqd46ovTqRN7jDEAAG1uT5g+7bf07mqVP2iX7GlseLS+0xgDANDORmpjO9N2beU1HRUKemL7aG1s/OWPN6dRXDPUAAC0qXrSrD+k7RpVaNysKC403miE7XsPn00ebjLWAAC0qc3f7j18Jm3XVlSN4jhN6SS4az//frzPWAMA0I5+OXJi7ejY2OjkZeDK39Rc+T7FUbJtpFZvrFi9fn+yutWQAwDQZrYmrbpveLTeiPK/d6MwiuOMJ8eh6f5u6YPj/5w9/83uwTeNOQAA7SRt1KRVz8UzQzhuatwZkVx5+kT6Iy3uWn288Xr/FweT1R5DDwBAm3g7bdTR2tjUq8Sznj4Rl4Vx6q+h0yMPvdLXnzzcZvwBALjGvlqyqq8/bdRWuzYvipufnHW5OY6iKPx24tSp5as/fzFZ3+88AABwjfy6Ys36lwaPnzqZNmpWu4bir3yeEcVxSVlPe4PU9j2H/+7d8P2yZP2A8wEAwFV24P2NO5Z9vXvwz7RNM2I4q2czH3eUPDkUxfFwrR6/t2nn4NPvrnsyWd3uvAAAcJV8lzbomo07DqVNWhLDpa3byvSJzKkU52v1xrafBv54eNVHy5P1t5wfAAD+Zz1LXu17Jm3Q8xeCuGjKRMvTJ0Ko/km9SztPP93XiON48OjJoXuf6/3wky93PZBsX+dcAQBwha3r37Lrwfue7/1g4O+hobRBoxbCt6h1o3T6RffSnmhyYvLEtozf1ZY4RPPndXbcetPCG3ueenTxY/cvXplsfyRZbnYOAQCYhdPJsnXLjwfXvvHZlgNDp88Np7cInijP0NKSF8VxXhRnBXFrcZwsC5I67uwI829ZtPCGvheeuOueO7ofT97j7uRvtyfLbc4vAAAZjibLkaRR9+09fGzjyt4N+06ePVdLMnh0JKnhFkM4a65x81XiaVEcmqq47GpxpUhO3mFirwvmpYEcdSXbOif/1jllPwAAcDFQL4bv+HgjHhup18fT+0pEs4vgSleJU10FBxQ1/Q4Z0Vw4b2Pi4OMQpVUfX/gHQ9N+o9DCN40AAHBdiqYE7KU+nAzOOGrtQ3RVg3iarowQzgvkkBPHcUlYX/xnooy/570nAABzRyOjEZtjtiiMQ0kk57VqZhQXRW0I+VeNS4M4ZF91zgptgQwAMDdU/XKNKmEcQv7V4bI4zoziohDOm04RZfwDUcnrs96r9GABAJgTkRy3EMZFQVw5kLsqHmBZGBe9Lm8/WQfkSjEAwNyL4Cpx3EogFwVxpq4KMVsWyFWjOoT8K82hlYMGAOC6DuTZXDWuGsJx1SjOCuOysC0L4qJpE+YUAwAI4SpBXBbFRY8LY7nVD9qFMPPDcrOZThHnRLArxQAAIrlK6Fa6/3DVzuyqcHBRSdxezr2G8+IYAIC5GcOtRvFlB3GVKK4axkEcAwBwBWK4ahRn7WNWQZz6T4ABAJdMoPySsJ92AAAAAElFTkSuQmCC';
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
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAACZFBMVEUKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgEKxgF/iVmtAAAAy3RSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRocHiAhIiMkJSYnKSorLi8wMTM0NTY3OTo7PD5BREVGSEtMUFNUVVZXWFlaW11eYmVmZ2hpamxtbm9wcnV2d3h5ent8fX6Cg4SFhoeIiYuMjY6PkJGSk5WWl5mam5ydnp+goqSoqausrq+wsbKztre4ubq7vL2+v8DBwsPExcfIysvMzc7P0NHS09TV1tjZ2tvc3d7f4OHi4+Xn6Onq6+zt7u/w8fLz9PX29/j5+vv8/iKY9dMAAAVVSURBVHhetdr5W1RVGAfw7wzXAUFAGIWhRTTaxDIYp0UDLWCIAsmtGNLczYUWM1BpwSjBigQrLBfKZUAUUaENHTJ0HBjmfv+pHs6jIs3cdS6fH/nh5Zl77j3nPe/7Qp+0JSt3N5+4FBghRwKXTjTvXrkkDVbJLKn3y4wi++tLMhE316rOCMlQV6OvxJ3nnAVHZu5Cd4mvsStEMtK5KgdxsL98OEKOddS4HYjicNd0jJGRw0V2mOOo7CXDreWpUJRa3homeysdME6qHCSv1bqgwVU7QA5WSjDIfYb0l0nQQSr1k2fdMGLOAZlXvXboZPdeoXxwDnQrDvDOhpkwYOaGOwwUQ58ZdTI7cmFQbgfluhnQYd4phtbZYJhtXYin50GT5zr782FKfj+HFkPD8hDbMmBSRhtvLYWq1yLcL8E0aT/HvFBRIXMH4rKDcgUULY9wE+K0kZEVUFAQ5HbEbRtDBYgpd4j7YIF9HFqAGJLPsEOCBRLaeS4Z0Q6wPwOWyOhnI6Ks4Gg+LJI/yqiFzgpwLSyzloEsTNXEDhssY2vnIUyxlMH5sND8IKfsGVI318NS69ktYVIlryTBUklXWIn7EgfphcXKOJiIe95gtx0Ws3dP/gR7H8thOS/77BBQxAEJlpMGWAQBLaxFPGp3xv4zWyG4xsMuxOFdco8N0bLD4zmYsJqtiMNmktxrQ7QWrsGEn+Ja4m0U6mIucycAZEbCaTBtJ4URD6KljkYyxRdxDGbZ9lC46UYsx+gFUM8a0/E/onDzOcT0NhsAdNNtNv7HFIafQWyF7AbS5JDDZPx6CjcWQYEjJKfhWXbBlISDFIYWQtEpelDOT83F/4zC309B2UFWYzNrTcX/gsKfT0BFLXehiaUwTmqi8MfjUFPKZpw08xI5vqQw+BhUFfIk+phnPP5XFAZyoS6PfQjQaTh+K4Wrj0KDkwGMMBXGJH1Dof8RaEnlLZBQ4ov5hiR/R+Hiw9BGqvyD9/jXkzHiH6XQ+xB0IJUf0W6SQ0/jf1J+oHDBBUHzESktsu1DTri+CFOkdlLwZ0HQXmSl19T2CYXAlJ0y/WcKZ+dClzz2KX5otr0U/ln8QPwTFH5zQg/xoSlvFbYPKNwsxF0Zpyl0ZUCnEjZji/Jmt4vCvx4Izl8pnEyHPmKzU92ud1C49TwAzD1D4Rfd8cV2rX7gbKEQfAHIOk/heCr0O0WPxpG5iULwJVcPhR9ToJc4MtOBHrpVbyrCnX4K7ckwQBz6aFBPW2r4gDZD8UXaop14vSXznm+TYEgHvSJ1HFNft9UyBR5xwJBZInXUkfy+KXPC1w4Y4+Vxnel7pUyyWT2+SvqeMx7OhrrXIzwkwaDssfEcCK3aqVHF5wkwyscj034JnLzGlsFyJZPXWFTRb/1F3M+VD5YSymCxUv6eNM3FkCpMknr4DixVyx5pakHqtrUFqdtciikOsd3aktqX010UdEWXNUP5sMjCEF9BlEZezoAlZl9mI6Iln+P3CbBAQhv9yYhhwTQXx4GCMW5F3LYyWAAFKyLcGH+DYuxF1RbL9njbE3I5VFRE2CDBNKlBo0kELB9lmxMmObXbXIDnBgfcMKVwgNcXQ9O80xz3mWk1+sZFq1FbYp3MduPN0qOU30+EPsXDDBpt9wY5XAzdspvIyyU26GR7tY9syoYRy3rI86U6W+7nyJ5lMEiqGiSv+bKgIdt3jRyskmBcYnUvGW4pUxt7KGsJkxerE00PbrQoD27MuDu40VJkRxxy1kyOnhTmOVOAFGde4f3Rk+NrciwZnrkgM4p8QQzPWCTdUz0x/jMcJIPDE+M/1Z7Z0OU/BpHZe4JnUpoAAAAASUVORK5CYII=';
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
  return 'data:image/png;base64,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';
};

var like = function like() {
  //赞
  return 'data:image/png;base64,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';
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
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAFpUlEQVRYR8WYa2wUVRTH/+fubnetgXZRQflgQkTCF40pPgADASSKAsaoGyJg3G5nZqmmHwwqKtFEwQhRkVjTdGa2D1JilDXK4wO+UAFfMTHERMREI5/wGTu0TaXdxxxzN7NNaXfZO9ttvB/6oXvO//zuY8459xJ8jHg8HolEIjOZeSEz30dENzPzdQBmSRkiOs/MvzDzKdd1DxHRDwMDA4PpdPqCahhSMZQgoVBorRBineu6txHR9QCCFXxzzPwrEX0L4CiAg5Zl/VspXkUgXddvAvASES1m5igRVfQZH5SZmYgGiegbInq+s7NTApYdZcXb2trCmUzmEdd1XyWiGZVmpvj7BSJ6ob+//41y21gSyDCMKwE8y8xaDWEKzMw8LITozefzO1Kp1J8TJzIJyIPpBrAGQEhx5n7NckR0IhAIbOro6PhjvPNFQLFYrC4ajT4DYPs0whRXKk9EluM4W8dv30VAuq7HiWgPgKjfKVdjz8xDQoinTdPsKPqPARmGsRDAl8WcUk2AanyY+TwRLbEs66dCLpN/YrFYoLGxsY+IHqpGdKo+RHSImWOWZWULQK2trcvy+fy7AGZPVbxK/wEAccuyDpJ3kHcAeAKAqFJwqm4ugD7HcVqppaVllhDiMBHdrqpazL4APiMik5m/DofDnM1mm1zXfRTAamZu9JnVvxdCrCVN024UQnwF4HIVIA/mtOu621KplKxRPMGPksnkKgA7vbqnWmouuK57l3Texsy7VGA8mwFmbrZt+xAAudSlhpzoSiHEWwDm+NDeIYEOM/N6H06yat9fYmUmVQHDMPYBeNiH9lEyDONnAPNVnYhotWmax1Tsk8nkcmY+rmLr2ZyVQOcBNKg61dfXR/fu3St9Ko62traZo6Oj8pNWGoU2xTCMjJ+6lcvlZnZ3dw+pREgkEjOCweCgiq1nkyVd188R0VxVp2nest/koT7BzMtUgZj5gG3bG1TsDcPoApBQsfVsvpBb9iKA53w4OUS02TTNUjmoKCMT7tJAIJAGcI0P7V1yy5Z6GbdOxbGYGJn5Kdu2JdSkoWnaKiHETmZe7CNbZ4hoHTU3N18VDAaPEtEiFSBp40H9BeAjAD3Dw8PfNTQ0uNlsVmb9BDPfw8xX+4CRmmeIaE2xuO4EsPX/Kq7eBPc7jpMs1JlkMnkHM78D4ArVVaqx3ZC8UNi2faAAZBhGPYBPACypcSAlOWY+HYlElra3tw+OVWJN0x4UQrwNIKCkUjsj2ezHTdPcLyXHgFasWBFcsGDBYQB31y5WZSVm/pyI7pTt60VA3tY1MfMxImqsLFUTC3lpvLezs/PTsQQ2XlY+KtTV1b0CQHZ909rOyi9LCHFQ9laWZY0V4FI31yYA7wO4tiZrUF6kn5k32rb94XiTSUDyShSNRp8E8PI0A70OYFvx7JTcsuI/PaiTABaPP/g1BDyTyWSaent7RyZqlm3A5bsQEb0HYF4NQaTUPwA2WpYly86kURbISwPyria7gVq9gshLwT7HcR7z9T5UxN6yZctsZj7CzLfWaJXOyopumuaP5fQq3pl0Xb9Fvg/66SrLBBsiok2maR651OQqAnkJMyavugDCVa6UfGfcbprm7kvc5QrSSkCxWOyyaDT6mqzDfmudTIAAjo+MjGzo6+uTPdQlhxKQVGhpaZkvi6+fRs6L/LvruptTqdRYeZjylhUFksnkEmaWbYpsV1SGXJ1mx3H2p9PpvIqD8goVxXRd3yTfBhWgcgDetCzrcRWQoo1vIK8Ay1uKbHnLHXKXmT/I5XLxnp6ev6cVyPvq5Dv2AQArywQ7l8/n13d1dZ3yA6P8lZUSTSQSc0Oh0EnXdedNuF3IfPOAaZof+4WZEpB01jRtkRCiB8ANXnDZUmy1bbu3GpgpA8kmTtO05UKIPcw8h4h2h8Nhs729fbRaoP8A1bw4qPGcj1sAAAAASUVORK5CYII=';
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

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
var analytics = weex.requireModule('analytics');  

1.	自定义事件,数量统计. 使用前，请先到友盟App管理后台的设置->编辑自定义事件 中添加相应的事件ID，然后在工程中传入相应的事件ID
analytics.event("eventId");

2．自定义事件,数量统计，可以对事件设置标签
analytics.eventLabel("eventId","自定义的事件标签");

3.  自定义事件,数量统计，可以对事件设置自定义属性，属性中的key-value必须是string类型，最多支持10个key     (注意：必须为jsonObject格式)
	var attributes = {"name":"常龙","address":"无锡市太湖区"};
    analytics.eventAttribute("eventId", attributes);

4.  自动页面时长统计, 开始记录某个页面展示时长. 使用方法：必须配对调用beginLogPageView:和endLogPageView:两个函数来完成自动统计，若只调用某一个函数不会生成有效数据. pageName 统计的页面名称.
analytics.beginLogPageView ("页面名称");

5.  自动页面时长统计, 结束记录某个页面展示时长.
analytics.endLogPageView ("页面名称");
*/
var analytics = weex.requireModule('analytics');

var event = function event(eventId) {
  if (analytics) analytics.event(eventId);
};
var eventLabel = function eventLabel(eventId, label) {
  if (analytics) analytics.eventLabel(eventId, label);
};
var eventAttribute = function eventAttribute(eventId, attributes) {
  if (analytics) analytics.eventAttribute(eventId, attributes);
};

exports.default = {
  event: event,
  eventLabel: eventLabel,
  eventAttribute: eventAttribute
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

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(441)
)

/* script */
__vue_exports__ = __webpack_require__(442)

/* template */
var __vue_template__ = __webpack_require__(443)
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
__vue_options__.__file = "/Users/denya/Desktop/workspace/weex/h5/src/views/investmentCenter/notice.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-d143b9e0"
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

/***/ 441:
/***/ (function(module, exports) {

module.exports = {
  "wrapper": {
    "position": "absolute",
    "alignItems": "center"
  },
  "list": {
    "flex": 1,
    "width": "750",
    "minHeight": "750"
  },
  "cell": {
    "justifyContent": "space-between",
    "height": "160",
    "opacity": 1,
    "paddingTop": "40",
    "paddingRight": "30",
    "paddingBottom": "40",
    "paddingLeft": "30",
    "borderBottomWidth": "1",
    "borderBottomColor": "#F3F4F6",
    "backgroundColor": "#ffffff",
    "opacity:active": 0.5
  },
  "cell-top": {
    "flexDirection": "row"
  },
  "cell-top-img": {
    "width": "38",
    "height": "36"
  },
  "cell-top-type": {
    "fontSize": "28",
    "color": "#666666",
    "marginLeft": "20"
  },
  "cell-top-time": {
    "flex": 1,
    "fontSize": "24",
    "color": "#999999",
    "textAlign": "right"
  },
  "cell-bottom-text": {
    "fontSize": "24",
    "color": "#333333",
    "textOverflow": "ellipsis",
    "lines": 1
  }
}

/***/ }),

/***/ 442:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _header = __webpack_require__(8);

var _header2 = _interopRequireDefault(_header);

var _downLoading = __webpack_require__(14);

var _downLoading2 = _interopRequireDefault(_downLoading);

var _upLoading = __webpack_require__(93);

var _upLoading2 = _interopRequireDefault(_upLoading);

var _default = __webpack_require__(9);

var _default2 = _interopRequireDefault(_default);

var _global = __webpack_require__(0);

var _global2 = _interopRequireDefault(_global);

var _analytics = __webpack_require__(35);

var _analytics2 = _interopRequireDefault(_analytics);

var _toast = __webpack_require__(13);

var _toast2 = _interopRequireDefault(_toast);

var _base = __webpack_require__(1);

var _api = __webpack_require__(2);

var _api2 = _interopRequireDefault(_api);

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

var navigator = weex.requireModule('navigator');
// const toast = weex.requireModule('toast');
var globalEvent = weex.requireModule('globalEvent');

//读取图片base64数据
exports.default = {
  name: 'notice',
  components: {
    myHeader: _header2.default,
    downLoading: _downLoading2.default,
    upLoading: _upLoading2.default,
    defaultView: _default2.default
  },
  filters: {
    checkIcon: function checkIcon(val) {
      var map = {
        '园区公告': (0, _base.propertyIcon)(),
        '新闻动态': (0, _base.eventsIcon)(),
        '天气预报': (0, _base.weatherIcon)()
      };
      return val ? map[val] : (0, _base.activityIcon)();
    },
    formatTime: function formatTime(val) {
      return _global2.default.formatTime(new Date(val), '.', 'yyyymmdd');
      // return val;
    }
  },
  data: function data() {
    return {
      pageNo: 1,
      pageMore: true,
      lists: [
        // {
        //   src: weatherIcon(),
        //   noticeTitle: '当前气温：23℃风力：东南偏东风2级湿度：83%气压：1020当前气温：23℃风力：东南偏东风2级湿度：83%气压：1020',
        //   createTime: 1524645875604,
        //   noticeLabel: '天气',
        //   id: 1003
        // },
        // {
        //   src: propertyIcon(),
        //   noticeTitle: '请您将车辆停放在指定位置,并检查确认车门车窗是否完全锁住请您将车辆停放在指定位置,并检查确认车门车窗是否完全锁住...',
        //   createTime: 1524645275604,
        //   noticeLabel: '物业',
        //   id: 1004
        // },
        // {
        //   src: activityIcon(),
        //   noticeTitle: '此次“贴息”活动 主要针对购买别墅产品的购房者,优惠总价共为此次“贴息”活动 主要针对购买别墅产品的购房者,优惠总价共为...',
        //   createTime: 1524645873604,
        //   noticeLabel: '活动',
        //   id: 1001
        // },
        // {
        //   src: eventsIcon(),
        //   noticeTitle: '习近平主席将于4月12日考察上海万科各个园区！习近平主席将于4月12日考察上海万科各个园区！',
        //   createTime: 1524645835604,
        //   noticeLabel: '大事',
        //   id: 1005
        // }
      ],
      result: '',
      noneIntShow: true,
      pageShow: false,
      pageType: 'noData'
    };
  },
  created: function created() {
    var _this = this;

    this.getNoticeListByMarketId();

    globalEvent.addEventListener("clickEvent", function (e) {
      if (e.backKey && e.backKey == 'keyPress') _this.goBack();
    });
  },

  methods: {
    goBack: function goBack() {
      _toast2.default.close();
      navigator.pop();
    },
    goPage: function goPage(id, item) {
      var url = _global2.default.getUrl(weex.config.bundleUrl, 'views/investmentCenter/noticeDetails.js?id=' + id);
      navigator.push({
        url: url,
        animated: 'true'
      });

      /*统计分析埋点：自定义事件*/
      var attr = {
        //noticeId: item.id,
        title: '[' + item.id + ']' + item.noticeTitle
      };
      _analytics2.default.eventAttribute('notice_detail', attr);
      /*统计分析埋点：自定义事件*/
    },
    getNoticeListByMarketId: function getNoticeListByMarketId() {
      var _this2 = this;

      var weexParams = weex.config.params || {};
      var params = {
        'accessToken': weexParams.accessToken, //'57d52877043b9e819fda0736e46232f8',
        'marketId': weexParams.marketId,
        'userId': weexParams.userId, //"6608155D2DD44DBE8D139C3C9DFD7258",
        "pageNo": this.pageNo,
        "pageSize": "10"
      };
      _toast2.default.showLoadingMessage("加载中…");
      _api2.default.getNoticeListByMarketId(params, function (ret) {
        _toast2.default.close();
        //上拉复位
        var $loading = _this2.$refs.loading;
        if ($loading) $loading.update(false);

        //下拉复位
        var $refresh = _this2.$refs.refresh;
        if ($refresh) $refresh.update(false);

        //this.result = ret;
        _this2.pageShow = true;
        if (!ret.res) {
          _this2.pageType = 'noNetwork';
          _toast2.default.showErrorMessage('服务异常');
          return;
        }
        if (ret.res.code == '10000' && ret.body) {
          // this.lists = ret.body.noticeList;
          if (_this2.pageNo == 1) _this2.lists = ret.body.noticeList;else if (ret.body.noticeList.length > 0) {
            _this2.lists = _this2.lists.concat(ret.body.noticeList);
          }

          if (ret.body.noticeList.length < 9) _this2.pageMore = false;

          // if(this.lists.length>9){
          //   if($loading) $loading.showView(true);
          //   $loading.showView(true);
          // }
        } else {
          _toast2.default.showMessage(ret.res.msg);
        }
      });
    },
    onloading: function onloading(event) {
      this.pageNo++;
      this.getNoticeListByMarketId();
    },
    onrefresh: function onrefresh(event) {
      this.pageMore = true;
      this.pageNo = 1;
      this.getNoticeListByMarketId();
    },
    onpullingdown: function onpullingdown(event) {
      // console.log("dy: " + event.dy)
      // console.log("pullingDistance: " + event.pullingDistance)
      // console.log("viewHeight: " + event.viewHeight)
    },
    reload: function reload() {
      this.onrefresh();
    },
    loadmore: function loadmore() {
      // toast.showMessage('loadmore');
      if (this.lists.length > 9 && this.pageMore) this.onloading(0);
    }
  }
};

/***/ }),

/***/ 443:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('myHeader', {
    attrs: {
      "tittle": "公告通知"
    },
    on: {
      "goBack": _vm.goBack
    }
  }), (_vm.lists.length > 0) ? _c('list', {
    staticClass: ["list"],
    attrs: {
      "loadmoreoffset": "50"
    },
    on: {
      "loadmore": _vm.loadmore
    }
  }, [_c('downLoading', {
    ref: "refresh",
    on: {
      "onrefresh": _vm.onrefresh,
      "onpullingdown": _vm.onpullingdown
    }
  }), _vm._l((_vm.lists), function(item) {
    return _c('cell', {
      key: item.id,
      staticClass: ["cell"],
      appendAsTree: true,
      attrs: {
        "append": "tree"
      },
      on: {
        "click": function($event) {
          _vm.goPage(item.id, item)
        }
      }
    }, [_c('div', {
      staticClass: ["cell-top"]
    }, [_c('image', {
      staticClass: ["cell-top-img"],
      attrs: {
        "resize": "contain",
        "src": _vm._f("checkIcon")(item.noticeLabel)
      }
    }), _c('text', {
      staticClass: ["cell-top-type"]
    }, [_vm._v(_vm._s(item.noticeLabel))]), _c('text', {
      staticClass: ["cell-top-time"]
    }, [_vm._v(_vm._s(_vm._f("formatTime")(item.createTime)))])]), _c('div', {
      staticClass: ["cell-bottom"]
    }, [_c('text', {
      staticClass: ["cell-bottom-text"]
    }, [_vm._v(_vm._s(item.noticeTitle))])])])
  })], 2) : (_vm.pageShow) ? _c('defaultView', {
    attrs: {
      "type": _vm.pageType
    },
    on: {
      "reload": _vm.reload
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}
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

/***/ 61:
/***/ (function(module, exports) {

module.exports = {
  "loading": {
    "width": 750,
    "alignItems": "center"
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

/***/ 62:
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
  name: 'upLoading',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  filters: {},
  data: function data() {
    return {
      loadinging: false,
      loadingText: '上拉加载更多'
    };
  },
  created: function created() {},

  methods: {
    onloading: function onloading(event) {
      this.loadinging = true;
      this.loadingText = '加载中';
      this.$emit('onloading', event);
    },
    update: function update(f) {
      this.loadingText = '上拉加载更多';
      this.loadinging = f;
    },
    showView: function showView(f) {
      this.show = f;
    }
  }
};

/***/ }),

/***/ 63:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('loading', {
    staticClass: ["loading"],
    attrs: {
      "display": _vm.loadinging ? 'show' : 'hide'
    },
    on: {
      "loading": _vm.onloading
    }
  }, [_c('text', {
    staticClass: ["indicator-text"]
  }, [_vm._v(_vm._s(_vm.loadingText))]), _c('loading-indicator', {
    staticClass: ["indicator"]
  })]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true

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

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(61)
)

/* script */
__vue_exports__ = __webpack_require__(62)

/* template */
var __vue_template__ = __webpack_require__(63)
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
__vue_options__.__file = "/Users/denya/Desktop/workspace/weex/h5/src/views/components/upLoading.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4275e167"
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