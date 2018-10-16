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
/******/ 	return __webpack_require__(__webpack_require__.s = 662);
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

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var icon = {
  // 选中图标
  selectIcon: 'data:image/png;base64,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',
  // 公司logo
  compangLogo: 'data:image/png;base64,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',
  //处理审批认证icon
  VListIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAClUlEQVRYhe2ZXU/TcBSHn3aDCczxIoiiMkEGY7zcyp3RGD+An8aEe+Kn8QMY40uMCSZe4WSTjqwkDCIjWAcjI1tbL5bU1bDy7/ofYwnPXc/W33nSne00q/L+4zpAAngNPAdiXC1KwDvgFaCFgTlgHRjqpJUHMeAl8AxYUYE1rq5sI0PAmkp9DLqFFypXb2a9iKqdNvDLtXC76TrhsMibnj553PS1Ws3k85dvwg1VRWF5Ocnw0Pnf9Q+fvnqfL9xJErOzU01lRbhU4fjkBHfvjAXKuDTh0VvDTD28HzhHaIYb58prnpsRjfaTSs2gKIpT29s/4OdW3ndW269wJNLL8uIcIfVfK8MooWl6S3ltFQ6pKoupBJFIr1OrVM5Ib+awbLulTN/C9n+NQqHmEfPJR8RiUefYtCw20ltUq1W/bR18C5um5TpunMtGpqceMDY24qplstuUy6d+W7poy0iM3x4lPjnhquk7BYrFo8DZ0oUHYzdJJqddteLhEXl9V0q+VOG+vhssLSZQG8akXD4lk9mW1kOacDgcYmkhQU9Pj1OrVqtspLcwLcvjTH9IEVYUhYX5BAMD/U7Nsm3SmzkqlTMZLRykCCdm4oyMDLpqmqZjGCUZ8S58C1vnfLz3JsZdx4W9A/b2D1q38sC/8AUbyjBK5HJ6qz4XIvVXIujaFUGasGkGX7siSBPOZHOB164IUoTz+i7Fw98yoi4ksHCxeIS+U5DhIkQg4ZPyKZmsvLUrgv/by1oNqK/d75LXrggtXWHLtkn/0KSvXRFaEtY0HePPsWwXIXwL7xZ+tW3tiuBbuJOy0IV/Bl4LtxuV+nOwbuFEpf7Qrlt4qwKrgNFpEwEMYFUFssAK8AbozDbw5pi62wqQ/QvU79ComHGHtAAAAABJRU5ErkJggg==',
  //订单详情页成功图标
  succIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAABfCAYAAAAzgY/FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU4RkExNzNCNEFBNTExRTg4NjVCQTZCRTJCNDM1MEMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU4RkExNzNDNEFBNTExRTg4NjVCQTZCRTJCNDM1MEMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RThGQTE3Mzk0QUE1MTFFODg2NUJBNkJFMkI0MzUwQzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RThGQTE3M0E0QUE1MTFFODg2NUJBNkJFMkI0MzUwQzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7pn7gkAAAIJElEQVR42uxd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',
  //右箭头
  yjt: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAWCAYAAAD0OH0aAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc4QTE2RkJDNDZDRTExRThBMzUxQzgzODhGRTgyREFCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc4QTE2RkJENDZDRTExRThBMzUxQzgzODhGRTgyREFCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzhBMTZGQkE0NkNFMTFFOEEzNTFDODM4OEZFODJEQUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzhBMTZGQkI0NkNFMTFFOEEzNTFDODM4OEZFODJEQUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz734g1vAAABDklEQVR42oyTv07CYBTFKzExAQTDjG0V3kAMAZ1MmQyj8Qmc9MVcHTDGpHVk40+gFeoIBKzoI8i5ySHpwPd9nOSXdDi/NL339sD/6D5YlnUHHkFsGZIB96AFfFDdR3gCS1AGATg3CZ/gBqxS0plOkESUEmBTcnWCJExJDiVHJ0hGwKPkUrJ1gmTIqf3wW0Q61QmSAaU1pxZwIEpB0qf0CypbKWPYU4/SH5f6bBIkeXDE55JJuAYdkAUz0NYJVyznwJw7+lIJTZaPwYLlWDWlBssFHqWUp6o91MErKPIYpTxRbfoSvLH8zXKkuqUaeGc5YTlUXevFjvJY9z+8gBOWPV6sMod89T+45aVqsxFgALQSPR7FtXcOAAAAAElFTkSuQmCC',
  //时间
  time: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZFMDc5NEQ5NEEwMDExRThCRjcyODI4NzgwRjMzRENEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZFMDc5NERBNEEwMDExRThCRjcyODI4NzgwRjMzRENEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkUwNzk0RDc0QTAwMTFFOEJGNzI4Mjg3ODBGMzNEQ0QiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkUwNzk0RDg0QTAwMTFFOEJGNzI4Mjg3ODBGMzNEQ0QiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5VjyjUAAAD10lEQVR42syZS0hUURjH71zNSJ1NKilppIIWWRsVAkHzUZvEiKQHBZW9tNeq16La1KLCXQW9FBeVFUEg9FhUYrVK26RRCmpQYtK4UlsMjfZ99L/yzXEe584dZ/zgB+eee+85/znn3O+c7xtXcXGxEYGZRClRSZQQBcRyIgX3p4gRYoDoITqJbmLabkeJNp/PJo4Ru4mcEM8tJpYSa4ltqPtBPCBuEj/tjISOpaHhQeJcGHHBLAfvDqKttGiN4HY0mK7UT2Hquog+YoiYxL1UIo8oIiqIamIJ7iURR9HuceJxqM5dIdYgi79ONCr1X4lmNDylOXqpEHSKWK3cu0WcIP7ameJk4pkizkMcxKi02hBnYGRb8e4BtGVZI/pK1hXII9dO1Iq6Tiz4lki+RGHTEMptvRX1tegzUUfgDaJOXLOojcQvDQFrMErhjNvahLYtq0PfIQXuII6I6zvEIcKn0elmopf4jHI486Ht26KO+94VTGCa8gve4Gub0Zy+Mv7oQJnmOzPwq6+VGcwIJPCycCUeOGOfjfXlClLWGck9xG9cs4O/pApcga/LsrPEmBE7G4MTt6wBmmYFNhGLUP5GtBmxtzb0bUBLkyXQxBBb1uzQlThxQdfENWsyrVNJNir/EE+M+NlTsQGwplIWWCUeYOc5EUeBE9gULKtkgXIz7jLib1JDCQssFBV9C0DgF1Eu5L0vS1R8j1InG4grGk76PfFCqR8S5SwW6FbWQDRsPQhn7G/XKTMnNbjNKE7NcITvucKdqCfE8dvtQKB1MsmzsQ9/wAFDmt+MssBRIXCl8OZ2zYfTj1PLFeVRnuJ+UVG0AL5iqaGfBX4SFRULQGC5KPeYqud2uA6dmlvZ2TpZ4EcRSHNmoD6OAutFdoI1dZs4RdwXD52xEdBH07jP0+KaNU1bQjgw96K8itgXB4F7RczshabZkeLhvCce5m1qWQzFcV9XxXWrtezkVF4kxlHOQKInIQbiEjCdVqDEGs4HCprGkSuxrBrD7JpHcS5EcTWi7qQYqDkfw6MAcerdeRrJBORlGpU4/GG4zAL/gg5xzdHeKyIziuIyccw6LOo6kEQKm/rwIrp/KepqsKk3OHRBJtroRerDsufo06ub3eLgaYsy3ek4sfDZbX+wbFSI9FsD3m0x/HON3MdW9Dl3kWrkqHca//OEgRKYnLJ4h2P6sOGfwMxFMqkcM5CivO/BcmoP+RVpJtHTkY7gUUhyuP688HMXDP88YdA1oWMeRPr5cKgjEQgbwbv5aMuj5Ycc/g1RhbC1AIF2Ku5PYicYwHGO4+2I/ob4J8AAfMHHya5dLOQAAAAASUVORK5CYII=',
  // 无数据
  noMess: '',
  // 失败图标
  failed: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAEp0lEQVRoQ92aW2gcVRjH//9Zk2BBk71FBG1JtK2gNA1SU+sNsaXa4oW21BcvWKU+RGxAwQeffRAUGmgeBK2o9aHFVFGsFCOi1thY7A0Fa82GGEXa3Z3dVIjN1plPzuxu2MlO9jJ7pg27b8nO+X/fb87Z813OITR+5Pz0clDuB2UVgJUi0k3wWgDXFMz8I5ALJBMAzkB4GsKv2dl+VpcbbFRITHMVLD4lkO0AbvSpN0XwAELyPiOR0z41nGG+gcQ0N4mNVyFY14gDZWOJURp4jZHIIT+6dQNJMnm7IDQEoM+PwTrGjBFWP+Pxn+oYU/sMiUgb0tnXReQFAKF6jDTwrEVyD6Idr5CcrUWnphmS6embkbMPCKS3FlHdzxA8gVZjO9vbf6+mXRVI0ul1YvMzAJFqYgF/b9KQhxmNjlayUxFI0tMbxbYOAlgSsLO1ys/QCG1htP3wQgMWBCrMzJeLCKbIMENDNiw0U55A6jcjOWtsESyzhSbCZGuoz+s3VQbk7Gap7A9XagOode05G0Ws4875u185UCqzW0R21Sp8JZ8jOchYeKDUBxdQIWiqpaYnzphZ4NujwORfeZvLbgDu7QMiHbreg0VYfaXB1wVkJ82j2jIABfPhx+BFdzyUtlbgiS06ocaMeGRt8Q3NATm5mYXPdb06fHIYPDvhKScruoBHN2ozxRA2F3O/OSA7ZX6vNdEc3Avmct5AapZe3KENCMSoEYvcpQQdIDmX6RFDTuqzAGDwHTB3yRuopQUYeFarOYbQo0qPPFAy84ZAXtJqYe9+MJ3xBoqGgR2PazVH8E3Gwy87QHbS/KOB4szbseFDYELJln+keymwdZNWIABTRjyylKpsFlq/6VbHyHfgiV+8gXpvBdbfo90kJbSCYmZ3imW/pV39x5PgNyoKeMzQfWuBO1ZrN0kYz1NSmT0i0q9d/cw4+KnKbT2AHtkArLxJu0mSQ7ST6RGAD2hX//s8uE9VHh5AKrBe36ndJMkRSjIzLpBu7eoz/4JD73kD9T8NLLlau0mCCQWUFEhMu7oS3P02eOk/l7S0XAUMPBeIOYIpBXRRIG2BWHh3P5hyxyKJhYFn9Magou8EZ4MFGv4CTEy6Z6h7GbD1oUDeXxEouCX31RHw+M9uoN7bgPV3BwWUop00xwHo3xSUyxNT4EfuBF62bQa6/HaMq76HRHDbdtH2sVPAsULeu2Y1sKanqld+H8hv20EFVr9eNTDOCaySzO4UBJD6NOCY36H51Ceo5FR55fQUxoDJP/M+6u8puNid5FT9J5DyQcHsOwjOuqvWAHoKRah8+aD+CqTAq9RTWN4FPKavp6AYXAWeOoUTC6f8rl3PcZVK8NYWYFeAJbiz7LQ3SSr0FHQDCUaNzpImibPsLmcbS/OS82xjFTYHvY3Gy7MpeDca85uDc36quRUc6LZduRXsQDVTs94BarbjFAeqmQ68ijGlqY4kS6AeFJvDi+ic1f+h8byZao5j/TmoZrp4MQfVTFdjSpPPprm8ND+jbprrZWVg5zI9MPCklguANj7gdeGGypiql5fqqZFKr2iK2LcQRhcA1xVNABcE9gRp/BrEFc3/ATwYM2squvz5AAAAAElFTkSuQmCC',
  // 成功图标
  successed: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAEm0lEQVRoQ92aXWgcVRTH/+fuzuxHophSxQctWlotdU2RKqnxSUQURdQ+9E0fRKJQQUHBB198ERQUFNqHCr7oW2lF8APEgg9ibKilGndDtW2K1lY0IS1NdnZ3ZuceuZOdsLvZjzszO5sw+7Tsnq/fnDvnnvtBGOBnjqs72cHDJOQ4M93NzNuJcCNAN6y64WVmXCeieSL+naWYJQPf76bsuUGFQVENneXauOu4zzNwAMDtIe1dIuBoykh9uosysyFteGqhgebq1SeklG8BmIwSQAfdaSHEO7vT2W/C2A0MNGuX9wrQYQATYRwG0JmR4IPj5sjpADr6GTrHnKnVK+8R4xUGUkGchJVlwCXCoUw69+ZOopqOHa0MnefqjqojjwK4T8doDDJnsoY4sIOy5/vZ7gv0m2NNEuNLAFv6GYv5/yUmPHWvkZ/u5acnUNGpPgaWnwPIxxysrnkLJPYXjOy33RS6AjUy890mgvEZLCY82i1THYEa78zMJhhm3RKxlDXERKd3ah2QV82cyk8bWAB0h9+ZjJF7sL36rQMqOtaHYLyqa3VD5QgfFYz8a80xtACpSTMFmhnWPBP1Yah5isETzZNvC1DRtk4OoQOIytGuP1Mw8/v8H9eAGr3Z14P2Ngx7Qogn/d5vDahoWz/G0GgOg0f5mC6Y+YfUFw+oaK/sAcQvw/Ieh5+0kdqjlh4eUMm23mfg9TgcBbF5sV7Dn24NW0QaBSMHod87K8kP7jHzbzQyZP0VYXEWJOaOsgzGF5VrOOmsrP1/R8rEVP4WpKhvu+nrXCqY+W2kls3SkX9EjiqkAQVzrHIVPzvldRaezY5hnzmqbVkY4i4qudUpduURba0BCvaCUW4mjVE8nRvT9kgQL9Fc3TokJQ5qaw1IsB+McrM/O4aJIBkSOExF2zoB4JEBxallRgdmW8rEy8HeIRDRCSralQsAb9eJhAGcsldwujHe9xojeMAcDVCLAB2Y24SJF0duRo6ETlhNMjRPJcdaYMZWHc0fasv4qnatRVQNCfXy6tSieGEAIixSyalUmTmjA/Tu8hVcZXedqA5U3DBel0BUCwT09vJlVFh2ZO8FNQyYJiD9IXessoRTHeYLn7AT1LBgVoGwqKrcBQBaRUFl50j5P/wjna4jtBlqmDCNgOYDl22LXXxcXugL9Uz2Jhzv0gH4TyN8Nev8PL2yHWZi1YHaKtJYlPWumRw0jHIk1MRasqtTjOCtjw5UN5o4YLx3yGt9IjSnYaDigvEypJpT9aVoh18+BIGKEwbA6vJBAUVd4OlAxQzTusBTp3B1x/1Vp1voJtMLKm4YFVPLErwx7CJvkiioT8oL+LtpnlJd8wv5MI1moMfbukmiVAe1jeUye93Ev66DW1MG7jdGgiyjA1H4wh23sRpZSs5GowJK3Fawl6UkbdYroMQdpyioRB14+ZUjUUeSPlTJWXmcWRzfROes4Q+N2zKVjGN9HypRFy98qI24GkPqyDGOqzHN/UhiLi+1N1mJuV7WDqZO/wjiuUFcAGTIzwrmaKRljM4OrnYH3HxFU0rsAuhOIm67oknXAb4oBM7GcUXzf7+ShHDodGeeAAAAAElFTkSuQmCC',
  //申请成功
  applySucc: 'data:image/png;base64,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',
  //header页返回
  back: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAoCAYAAAD6xArmAAABHElEQVRIS63XQUoEMRCF4f95AK/mSgUXgowuRe+hILPUC7jV+wiewaUyUJJGh5me7k5SVVnW4iOE5D0ikpaZXQCPwDewUoZrZtfAM3D0532E4Qm02J8heAbdAKdueAG9lPTqgmtoOYtuuAXthlvRLrgHbYZ70SbYg1ZhL7oIR9BZOIpOwhnoAZyF7sGZ6BbORgfYzFbAy05Il3mJviGlvEVQ4C/geASsJd170f8d3wLrUdL9AOeS3rz4EJtmdgc8ZeLbPM7G94I+Ez9okCx8spoy8NnOi+KLZRrBqy3txauw9543wR68Ga7gZ5Led59/F9yDd8OtuAtuwd1wBT8JwQt4/Kswg8e+CrvXy8xugAegtM9V+ChGuCRZmf0Cqe3lqBuNOXsAAAAASUVORK5CYII=',
  // 赞 灰色
  zanGray: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAC+0lEQVRIS72WXUhUQRTHz7nXNt0+BAOhT6OXSFIR785sSWCBIAQ+JFFCL0H0UBHZiwURRFAQEfRS9FQQBUnYSxhFtWCFd2a3D4sVKULqoTKK0rSkvPuPWcbYBOVm7s7T3Lln/r97Zs7HZZrh0FpvAXCCmVcCeOK6bpvneSqsHIc1zLVLJpPNQRB0MrObsz7qum6N53mvw2j+M1gptQhAHzOXGwAzvwOwxMwdxzkVi8Xa8wLWWl8GsMOKXwmCYL/rup/t83Up5dZZByulNhPRTSMM4CMzV5aWlv4cGhoatt53CiFaZhXs+/5CZk4T0TIL2SaE6Ojv71+QV7DW+gKA3RZ6QwixxczzCk6lUhuDILhnYgnAF8dxKoUQH/IKTqVS0SAIXhDRKuvtTiHEpYl7zJvHSqkzRNRmQbellE25wZMXsFJqHRE9ICJTKL6Nj49X1dfXv5kKDGCEmd9PE9Ugoj4iOjhlAenq6ppbVlb2lJnX2CPeK4Q4N1k01+MwaWRtHvLAwEDx4ODgPiKqNMEzsZmZVxDRJgvtjsViDcxsvvivkU6n54+MjLwNA2XmUgAOEX3nZDJ5NZPJtE6z8UckEqmpra19FUZ8Kpve3t55Y2NjX4hoDjNr1lqPAohOI9oupTz1P1Cz1/f9Rma+Y0/wNCulJo6vB8Au+8JEcXZeVFTk1dXVPZ4F8HFmPmJ0MplM8x8wgLvxeLzRvNBanwRwaDbBSqluItpguJFIZFFBwIlEojgajX4lorlE9ExKWVsQcE9PT4PjOAl7jWeFEAcKAvZ9/ygzH7PgFiFEZ0HASinTYExNgOu65Z7nfco7uKOjI1JRUWHy16RsWkq5Nuv5RDrlK6q11usBPLLpeF5KuadQ4MPmN9je73YhxLVCgW8BaDJ13nGcpZ7nZbuXKZmBLdzDzNxvFgEsJ6LF9njSzDw608oFoMbkLzO/FEKs/tOEtNbPAVTNVDjsPgBn4/H4gVxwDMDFyW0xrGAIu19EdL+kpKS1urraRHd2/AZWMttFi1SCpQAAAABJRU5ErkJggg==',
  // 赞 亮色
  zanHigh: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAABj0lEQVRIS8WVsStFURzHP79HPRksykKSRUQyGAzUu9emDF7KK7NBBs/iPzBIyiSTQSmlN8n03qUYkBAxKLNFSWHh+ek+vfB41706jjOevuf7Ob/zO+d7hN8OT4dQZoAm4AghjSP7Ye0krPCTztNBlAxQ8WH+AejElaswntHBWa0FLhDqvgCEWRyZ/htwTleA0TLm67gybB7s6QDKRlljIYMjSbPgPa3hgXOgwS7Y0yWUscBqjFe8rQny5IDgy2gUfKjV3HEGNP/YO6NgT+dR0j9CfYExcFZ7EHZKgiJoD/fAdYBACxnwzFT5nm1qnDjHQGuoaqOIhF1hS6t4YQJoK7k8jYATxS+C9lHwdBUlFWGRCemBkFM/3KtNuEXwmPPBfsNtj0H7YOWFCmr/A3xCv3TZB8MCrkzaBwtJHMnYBisx6kjIjW3wOa60v8W63ee0iCvj9sExRkjIml2woFRST58Ufi//qPNAzEJ0XeJKS5Hjg0+BDgvgwvt9B2e1G2H5m2/R1F6eUDzipOiV26LpK5fQg8qrL8quAAAAAElFTkSuQmCC'
};

exports.default = icon;

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

/***/ 662:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(663)
)

/* script */
__vue_exports__ = __webpack_require__(664)

/* template */
var __vue_template__ = __webpack_require__(665)
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
__vue_options__.__file = "/Users/denya/Desktop/workspace/weex/h5/src/views/serviceProvider/apply.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-21c7e476"
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

/***/ 663:
/***/ (function(module, exports) {

module.exports = {
  "apply_top": {
    "position": "relative",
    "height": "466",
    "width": "750"
  },
  "back": {
    "width": "82",
    "height": "100",
    "display": "block",
    "position": "absolute",
    "paddingTop": "30",
    "paddingRight": "30",
    "paddingBottom": "30",
    "paddingLeft": "30",
    "left": 0,
    "top": "34"
  },
  "backX": {
    "top": "54"
  },
  "back_img": {
    "width": "22",
    "height": "40"
  },
  "top_img": {
    "display": "block",
    "width": "750",
    "height": "466"
  },
  "top_title": {
    "position": "absolute",
    "top": "190",
    "left": 0,
    "right": 0,
    "display": "block",
    "textAlign": "center",
    "color": "#ffffff",
    "lineHeight": "66",
    "fontSize": "48"
  },
  "apply_main": {
    "marginTop": "-100",
    "backgroundColor": "#ffffff",
    "borderRadius": "16"
  },
  "main_title": {
    "height": "100",
    "lineHeight": "100",
    "display": "block",
    "textAlign": "center",
    "fontSize": "28",
    "color": "#999999"
  },
  "comp": {
    "display": "flex",
    "flexDirection": "column",
    "paddingTop": 0,
    "paddingRight": "30",
    "paddingBottom": 0,
    "paddingLeft": "30"
  },
  "des": {
    "display": "flex",
    "flexDirection": "column",
    "paddingTop": 0,
    "paddingRight": "30",
    "paddingBottom": 0,
    "paddingLeft": "30"
  },
  "common_title": {
    "display": "block",
    "fontSize": "30",
    "color": "#333333",
    "lineHeight": "34",
    "paddingTop": "28",
    "paddingRight": 0,
    "paddingBottom": "28",
    "paddingLeft": 0
  },
  "input": {
    "width": "692",
    "height": "88",
    "borderRadius": "16",
    "borderWidth": "2",
    "borderStyle": "solid",
    "borderColor": "#E4ECEF",
    "fontSize": "28",
    "placeholderColor": "#CDD7DB",
    "paddingTop": 0,
    "paddingRight": "10",
    "paddingBottom": 0,
    "paddingLeft": "10"
  },
  "textarea": {
    "paddingTop": "10",
    "paddingRight": "10",
    "paddingBottom": "10",
    "paddingLeft": "10",
    "width": "692",
    "height": "280",
    "borderRadius": "16",
    "borderWidth": "2",
    "borderStyle": "solid",
    "borderColor": "#E4ECEF",
    "fontSize": "28",
    "lineHeight": "34",
    "placeholderColor": "#CDD7DB"
  },
  "footer_btn": {
    "width": "686",
    "height": "76",
    "backgroundColor": "#dadada",
    "borderRadius": "38",
    "textAlign": "center",
    "lineHeight": "76",
    "fontSize": "34",
    "color": "#ffffff"
  },
  "isclick": {
    "backgroundColor": "#07a5ff"
  },
  "footer": {
    "height": "100",
    "backgroundColor": "#ffffff",
    "position": "fixed",
    "bottom": 0,
    "left": 0,
    "width": "750",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "paddingLeft": "32",
    "paddingRight": "32"
  },
  "boxShadow": {
    "boxShadow": "0 -4px 15px 0 rgba(0,0,0,0.1)"
  },
  "iPhoneX": {
    "paddingBottom": "68",
    "height": "168"
  }
}

/***/ }),

/***/ 664:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _global = __webpack_require__(0);

var _global2 = _interopRequireDefault(_global);

var _api = __webpack_require__(2);

var _api2 = _interopRequireDefault(_api);

var _toast = __webpack_require__(13);

var _toast2 = _interopRequireDefault(_toast);

var _icon = __webpack_require__(24);

var _icon2 = _interopRequireDefault(_icon);

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

var navigator = weex.requireModule('navigator');
var modal = weex.requireModule('modal');
var globalEvent = weex.requireModule('globalEvent');
var weexParams = weex.config.params || [];

exports.default = {
  components: {},
  data: {
    icon: _icon2.default,
    platform: '',
    companyName: '', //企业名称
    isClick: false,
    providerId: '',
    enterprise: '', //企业名称
    memo: '' //合作诉求
  },
  created: function created() {
    var _this = this;

    globalEvent.addEventListener("clickEvent", function (e) {
      if (e.backKey && e.backKey == 'keyPress') _this.goBack();
    });
    var iPhoneXHeight = 2436;
    this.isiOS = WXEnvironment.osName == 'iOS';
    this.isiPhoneX = this.isiOS && WXEnvironment.deviceHeight == iPhoneXHeight;
    if ((typeof WXEnvironment === 'undefined' ? 'undefined' : _typeof(WXEnvironment)) === 'object') {
      this.platform = WXEnvironment.platform || '';
      this.osVersion = WXEnvironment.osVersion || '';
      this.osVersion1 = this.osVersion.split('.')[0];
    }
    // 获取参数
    var param = _global2.default.getParams(weex.config.bundleUrl);
    this.providerId = param.id;
  },

  methods: {
    goBack: function goBack() {
      _toast2.default.close();
      navigator.pop();
    },
    compName: function compName(event) {
      if (this.enterprise && this.memo) {
        this.isClick = true;
      } else {
        this.isClick = false;
      }
    },
    memoIpt: function memoIpt(event) {
      if (this.enterprise && this.memo) {
        this.isClick = true;
      } else {
        this.isClick = false;
      }
    },
    submit: function submit() {
      if (!this.isClick) {
        return false;
      }
      var that = this;
      var params = {
        "userId": weexParams.userId,
        "userName": weexParams.userName,
        "phone": weexParams.phone,
        "cityId": weexParams.cityId,
        "marketId": weexParams.marketId,
        "providerId": that.providerId,
        "enterprise": that.enterprise,
        "memo": that.memo
      };
      _api2.default.insertProviderDetail(params, function (res) {
        console.log(res);
        if (res.res.code == 10000) {
          _global2.default.jump("views/serviceProvider/applySucc.js", "?id=" + that.providerId);
        } else {
          _toast2.default.showMessage(res.res.msg);
        }
        // configObj.jump("views/serviceProvider/applySucc.js","?id=1");
      });
    }
  }
};

/***/ }),

/***/ 665:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('div', {
    staticClass: ["apply_top"]
  }, [_c('image', {
    staticClass: ["top_img"],
    attrs: {
      "src": "data:image/png;base64,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"
    }
  }), _c('text', {
    staticClass: ["top_title"]
  }, [_vm._v("申请合作")]), _c('div', {
    class: ['back', _vm.isiPhoneX ? 'backX' : ''],
    on: {
      "click": _vm.goBack
    }
  }, [_c('image', {
    staticClass: ["back_img"],
    attrs: {
      "src": _vm.icon.back
    }
  })])]), _c('div', {
    staticClass: ["apply_main"]
  }, [_c('text', {
    staticClass: ["main_title"]
  }, [_vm._v("合作信息")]), _c('div', {
    staticClass: ["comp"]
  }, [_c('text', {
    staticClass: ["common_title"]
  }, [_vm._v("企业名称")]), _c('input', {
    staticClass: ["input"],
    attrs: {
      "type": "text",
      "placeholder": "请填写企业名称",
      "value": (_vm.enterprise)
    },
    on: {
      "input": [function($event) {
        _vm.enterprise = $event.target.attr.value
      }, _vm.compName]
    }
  })]), _c('div', {
    staticClass: ["des"]
  }, [_c('text', {
    staticClass: ["common_title"]
  }, [_vm._v("合作诉求")]), _c('textarea', {
    staticClass: ["textarea"],
    attrs: {
      "rows": "5",
      "placeholder": "请填写合作诉求",
      "value": (_vm.memo)
    },
    on: {
      "input": [function($event) {
        _vm.memo = $event.target.attr.value
      }, _vm.memoIpt]
    }
  })])]), _c('div', {
    class: ['footer', _vm.isiPhoneX ? 'iPhoneX' : '', (_vm.platform == 'android' && _vm.osVersion1 < 5) ? 'boxShadow' : '']
  }, [_c('text', {
    class: ['footer_btn', _vm.isClick ? 'isclick' : ''],
    on: {
      "click": _vm.submit
    }
  }, [_vm._v("提交")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });