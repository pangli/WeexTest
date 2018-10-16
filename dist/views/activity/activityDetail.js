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
/******/ 	return __webpack_require__(__webpack_require__.s = 258);
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

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(259)
)

/* script */
__vue_exports__ = __webpack_require__(260)

/* template */
var __vue_template__ = __webpack_require__(261)
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
__vue_options__.__file = "/Users/denya/Desktop/workspace/weex/h5/src/views/activity/activityDetail.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-c8f347de"
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

/***/ 259:
/***/ (function(module, exports) {

module.exports = {
  "wrapper": {
    "backgroundColor": "#FFFFFF"
  },
  "list_box": {
    "marginBottom": "100"
  },
  "banner_box": {
    "height": "400"
  },
  "back_icon_box": {
    "position": "fixed",
    "top": "0",
    "left": "20",
    "width": "60",
    "height": "60",
    "borderTopLeftRadius": "30",
    "borderTopRightRadius": "30",
    "borderBottomLeftRadius": "30",
    "borderBottomRightRadius": "30",
    "backgroundColor": "rgba(152,152,152,0.5)"
  },
  "iOS7": {
    "top": "40"
  },
  "IOSX": {
    "top": "80"
  },
  "back_icon": {
    "marginTop": "18",
    "marginLeft": "23"
  },
  "application_box": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "height": "80",
    "backgroundColor": "rgba(0,0,0,0.5)",
    "position": "absolute",
    "left": "0",
    "right": "0",
    "top": "320",
    "paddingLeft": "30",
    "paddingRight": "30"
  },
  "application_time": {
    "height": "80",
    "color": "#FFFFFF",
    "lineHeight": "80",
    "fontSize": "23",
    "fontWeight": "bold"
  },
  "application_num": {
    "height": "80",
    "color": "#FFFFFF",
    "lineHeight": "80",
    "fontSize": "23",
    "fontWeight": "bold"
  },
  "activity_content": {
    "borderBottomWidth": "13",
    "borderBottomColor": "#F3F4F6"
  },
  "activity_title": {
    "fontSize": "28",
    "lineHeight": "30",
    "fontWeight": "bold",
    "marginTop": "34",
    "paddingLeft": "30",
    "paddingRight": "30"
  },
  "activity_num_box": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "marginTop": "20",
    "marginBottom": "20",
    "paddingLeft": "30",
    "paddingRight": "30"
  },
  "activity_num_box_left": {
    "flexDirection": "row"
  },
  "activity_num_see": {
    "fontSize": "24",
    "color": "#999999",
    "marginRight": "40"
  },
  "activity_num_limit": {
    "fontSize": "24",
    "color": "#999999",
    "marginRight": "40"
  },
  "activity_num_butn": {
    "height": "36",
    "width": "148",
    "lineHeight": "36",
    "fontSize": "24",
    "textAlign": "center",
    "color": "#00bdff",
    "backgroundColor": "#E5F8FF"
  },
  "activity_time_box": {
    "borderTopWidth": "1",
    "borderTopColor": "#F3F4F6",
    "paddingLeft": "30",
    "paddingRight": "30",
    "flexDirection": "row"
  },
  "activity_address_box": {
    "borderTopWidth": "1",
    "borderTopColor": "#F3F4F6",
    "paddingLeft": "30",
    "paddingRight": "30",
    "flexDirection": "row"
  },
  "activity_price_box": {
    "borderTopWidth": "1",
    "borderTopColor": "#F3F4F6",
    "paddingLeft": "30",
    "paddingRight": "30",
    "flexDirection": "row"
  },
  "activity_label_box": {
    "borderTopWidth": "1",
    "borderTopColor": "#F3F4F6",
    "paddingLeft": "30",
    "paddingRight": "30",
    "flexDirection": "row"
  },
  "activity_time_box_img": {
    "marginRight": "35",
    "marginTop": "29"
  },
  "activity_address_box_img": {
    "marginRight": "35",
    "marginTop": "29"
  },
  "activity_price_box_img": {
    "marginRight": "35",
    "marginTop": "29"
  },
  "activity_label_box_img": {
    "marginRight": "35",
    "marginTop": "29"
  },
  "activity_time_box_text": {
    "height": "90",
    "lineHeight": "90",
    "color": "#333333",
    "fontSize": "28"
  },
  "activity_address_box_text": {
    "height": "90",
    "lineHeight": "90",
    "color": "#333333",
    "fontSize": "28"
  },
  "activity_price_box_text": {
    "height": "90",
    "lineHeight": "90",
    "color": "#333333",
    "fontSize": "28",
    "fontWeight": "bold"
  },
  "activity_label_box_text": {
    "height": "90",
    "lineHeight": "90",
    "color": "#00bdff",
    "fontSize": "28",
    "marginRight": "18"
  },
  "activity_detail_tab_box": {
    "borderBottomWidth": "1",
    "borderBottomColor": "#F3F4F6",
    "flexDirection": "row",
    "justifyContent": "center"
  },
  "activity_detail_tab": {
    "width": "274",
    "flexDirection": "row",
    "justifyContent": "space-between"
  },
  "activity_detail_tab_text": {
    "height": "88",
    "lineHeight": "88",
    "fontSize": "24",
    "color": "#666666"
  },
  "activity_detail_tab_text_active": {
    "borderBottomWidth": "4",
    "borderBottomColor": "#00BDFF"
  },
  "activity_detail_text": {
    "textAlign": "center",
    "fontSize": "24",
    "lineHeight": "36"
  },
  "bottom_box": {
    "flexDirection": "row",
    "position": "absolute",
    "left": "0",
    "right": "0",
    "bottom": "0",
    "height": "100"
  },
  "ask_box": {
    "flexDirection": "row",
    "justifyContent": "center",
    "width": "375",
    "borderTopWidth": "1",
    "borderTopColor": "#E0E0E0"
  },
  "ask_img": {
    "marginRight": "16",
    "marginTop": "34"
  },
  "ask_title": {
    "fontSize": "26",
    "lineHeight": "100"
  },
  "apply_box": {
    "width": "375",
    "backgroundColor": "#00BDFF"
  },
  "apply_box_gray": {
    "backgroundColor": "#7C7C78"
  },
  "apply_title": {
    "color": "#FFFFFF",
    "textAlign": "center",
    "lineHeight": "100",
    "fontSize": "26"
  },
  "activeRuleList": {
    "paddingTop": "30",
    "paddingRight": "30",
    "paddingBottom": "30",
    "paddingLeft": "30"
  },
  "activeRulesBox": {
    "flexDirection": "row",
    "flexWrap": "wrap",
    "height": "36",
    "boxSizing": "border-box"
  },
  "activeRulesLeft": {
    "fontSize": "28",
    "paddingLeft": "20",
    "width": "50"
  },
  "activeRulesRight": {
    "flex": 1,
    "fontSize": "26"
  }
}

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _global = __webpack_require__(0);

var _global2 = _interopRequireDefault(_global);

var _api = __webpack_require__(2);

var _api2 = _interopRequireDefault(_api);

var _analytics = __webpack_require__(35);

var _analytics2 = _interopRequireDefault(_analytics);

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

var navigator = weex.requireModule('navigator');
var toast = weex.requireModule('toast');
var globalEvent = weex.requireModule('globalEvent');
var general = weex.requireModule('general');
var wxBack = weex.requireModule('wxBack');
var weexParams = weex.config.params;

// import PhoneModal from '../components/PhoneModalNew.vue';

exports.default = {
  data: function data() {
    return {
      isiOS7: WXEnvironment.osName == 'iOS',
      isiPhoneX: '',
      detailOrNotice: true,
      isShowModal: false,

      result: '',

      phoneNum: '',
      actLabel: '',
      actAddress: '',
      actImg: '',
      actTitle: '',
      actPrice: '',
      isFree: '',
      actBegTime: '',
      actEndTime: '',
      currentTime: '',
      signBegTime: '',
      signEndTime: '',
      distanceTime: '',
      signNumber: '',
      actMaxPerson: '',
      alreadyReg: '',
      actState: '',
      visitNumber: '',

      actId: '',

      htmlStr: '',
      width: 750,
      height: 200,

      widthNotice: 750,
      heightNotice: 200,
      htmlStrNotice: '',

      html: '',

      isRegForm: '',
      orderId: '',
      noForm: '212121212121',

      activeRules: ""
    };
  },

  components: {
    // PhoneModal
  },
  created: function created() {
    var _this2 = this;

    this.isiPhoneX = this.isiOS7 && WXEnvironment.deviceHeight == 2436;
    globalEvent.addEventListener("clickEvent", function (e) {
      if (e.backKey && e.backKey == 'keyPress') _this2.goBack();
    });
    this.getActiveDetailById();
  },
  mounted: function mounted() {},

  methods: {
    goBack: function goBack() {
      navigator.pop();
    },
    goApply: function goApply() {
      if (weexParams.userId === '') {
        wxBack.setParams({
          login: 2
        }); //通知native重新登录
      }
      if (this.isRegForm == 1) {
        var url = _global2.default.getUrl(weex.config.bundleUrl, 'views/activity/activityForm.js' + '?actId=' + this.actId);
        navigator.push({
          url: url,
          animated: 'true'
        });
      } else if (this.isRegForm == 2) {
        this.insertActiviteOrder();
      }
      _analytics2.default.event('active_sign_in');
    },
    getActiveDetailById: function getActiveDetailById() {
      var _this3 = this;

      var param = _global2.default.getParams(weex.config.bundleUrl);
      var params = {
        'userId': weex.config.params.userId,
        'activeId': param.actId || weex.config.params.actId
      };
      toast.showLoadingMessage('加载中...');
      _api2.default.getActiveDetailById(params, function (ret) {
        toast.close();
        if (!ret.res) {
          toast.showErrorMessage('服务异常');
          return;
        }
        if (ret.res.code == '10000' && ret.body) {
          if (ret.body.activeInfo) {
            var _this = _this3;
            _this3.activeRules = ret.body.activeRules;

            _this3.phoneNum = ret.body.activeInfo.contactNumber;
            if (ret.body.activeInfo.actLabel) {
              _this3.actLabel = ret.body.activeInfo.actLabel.split(';');
            }
            _this3.actAddress = ret.body.activeInfo.actAddress;
            _this3.actImg = ret.body.activeInfo.actImg;
            _this3.actTitle = ret.body.activeInfo.actTitle;
            _this3.actPrice = ret.body.activeInfo.actPrice;
            _this3.isFree = ret.body.activeInfo.isFree;
            _this3.actBegTime = _global2.default.formatTime(ret.body.activeInfo.actBegTime, '-', 'yyyymmdd hhmm');
            _this3.actEndTime = _global2.default.formatTime(ret.body.activeInfo.actEndTime, '-', 'yyyymmdd hhmm');
            _this3.signNumber = ret.body.activeInfo.signNumber;
            _this3.actMaxPerson = ret.body.activeInfo.actMaxPerson;
            _this3.alreadyReg = ret.body.activeInfo.alreadyReg;
            _this3.isRegForm = ret.body.activeInfo.isRegForm;
            _this3.visitNumber = ret.body.activeInfo.visitNumber;

            _this3.actId = ret.body.activeInfo.actId;

            var getDistanceTime = function getDistanceTime() {
              _this.currentTime = Date.parse(new Date());
              _this.signEndTime = ret.body.activeInfo.signEndTime;
              if (_this.signEndTime - _this.currentTime <= 0) {
                _this.distanceTime = '报名已经结束请查看其它活动';
              } else {
                var hour = parseInt((_this.signEndTime - _this.currentTime) / (1000 * 60 * 60));
                var minute = parseInt((_this.signEndTime - _this.currentTime) / (1000 * 60) % 60);
                if (hour < 24) {
                  _this.distanceTime = '距离报名结束仅剩' + hour + '小时' + minute + '分';
                } else {
                  _this.distanceTime = '距离报名结束大于24小时';
                }
              }
            };
            getDistanceTime();
            setInterval(function () {
              getDistanceTime();
            }, 1000 * 60);

            var getActState = function getActState() {
              _this.signBegTime = ret.body.activeInfo.signBegTime;
              if (_this.signBegTime < _this.currentTime && _this.currentTime < _this.signEndTime) {
                _this.actState = '报名进行中';
              }
              if (_this.currentTime > Date.parse(new Date()) && isRegForm === 2) {
                _this.actState = '报名进行中';
              }
              if (_this.signBegTime > _this.currentTime) {
                _this.actState = '报名未开始';
              }
              if (_this.currentTime > _this.signEndTime) {
                _this.actState = '报名已结束';
              }
              // _this.actState = '报名中';
            };
            getActState();

            _this3.htmlStr = ret.body.activeInfo.actDetail;
            _this3.htmlStrNotice = ret.body.activeInfo.actNotice;

            _this3.html = ret.body.activeInfo.actDetail;
          } else {
            toast.showErrorMessage('暂无数据');
          }
        } else {
          toast.showMessage(ret.res.msg);
        }
      });
    },
    insertActiviteOrder: function insertActiviteOrder() {
      var _this4 = this;

      var param = _global2.default.getParams(weex.config.bundleUrl);
      var params = {
        'userId': weex.config.params.userId,
        'actId': param.actId || weex.config.params.actId,
        "userName": weex.config.params.userName,
        "phone": weex.config.params.phone,
        "marketId": weexParams.marketId
      };

      _api2.default.insertActiviteOrder(params, function (ret) {
        _this4.noForm = '3333333333';
        _this4.noForm = ret;
        if (!ret.res) {
          toast.showErrorMessage('服务异常');
          return;
        }
        if (ret.res.code == '10000' && ret.body) {
          if (ret.body.orderId) {
            _this4.orderId = ret.body.orderId;
            if (ret.body.type == 1) {
              var url = _global2.default.getUrl(weex.config.bundleUrl, 'views/activity/activityResult.js' + '?actId=' + _this4.actId + '&orderId=' + _this4.orderId + '&listgo=1');
              navigator.push({
                url: url,
                animated: 'true'
              });
            } else if (ret.body.type == 2) {
              var url = _global2.default.getUrl(weex.config.bundleUrl, 'views/activity/activityPay.js' + '?orderId=' + _this4.orderId + '&actId=' + _this4.actId);
              navigator.push({
                url: url,
                animated: 'true'
              });
            }
          } else {
            toast.showErrorMessage('暂无数据');
          }
        } else {
          toast.showMessage(ret.res.msg);
        }
      });
    },

    changDetailOrNotice: function changDetailOrNotice(param) {
      if (param == 'detail') {
        this.html = this.htmlStr;
        this.detailOrNotice = true;
      } else if (param == 'notice') {
        this.html = this.htmlStrNotice;
        this.detailOrNotice = false;
      }
    },
    callPhone: function callPhone() {
      if (this.phoneNum === '') {
        toast.showErrorMessage('此活动暂无咨询热线');
      } else {
        general.call(this.phoneNum);
      }
      _analytics2.default.event('active_advisory');
    },
    /*callPhone: function (num){
      this.isShowModal = true;
    },
    changeShowModal: function (msg){
      this.isShowModal = msg;
    },*/

    pagestart: function pagestart(data) {},
    pagefinish: function pagefinish(data) {
      this.height = data.webHeight;
    },
    error: function error(data) {},
    pagestartNotice: function pagestartNotice(data) {},
    pagefinishNotice: function pagefinishNotice(data) {
      this.heightNotice = data.webHeight;
    },
    errorNotice: function errorNotice(data) {}
  }
};

/***/ }),

/***/ 261:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('scroller', {
    staticClass: ["list_box"]
  }, [_c('div', [_c('div', {
    staticClass: ["banner_box"]
  }, [_c('image', {
    staticStyle: {
      width: "750px",
      height: "400px"
    },
    attrs: {
      "src": _vm.actImg
    }
  })]), _c('div', {
    class: ['back_icon_box', _vm.isiOS7 ? 'iOS7' : '', _vm.isiPhoneX ? 'IOSX' : ''],
    on: {
      "click": _vm.goBack
    }
  }, [_c('image', {
    staticClass: ["back_icon"],
    staticStyle: {
      width: "13px",
      height: "24px"
    },
    attrs: {
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAaCAYAAACHD21cAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFCOUFCMEJBNDc5NTExRThBNzE3RUNEOUJEODk3MTc4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFCOUFCMEJCNDc5NTExRThBNzE3RUNEOUJEODk3MTc4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUI5QUIwQjg0Nzk1MTFFOEE3MTdFQ0Q5QkQ4OTcxNzgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUI5QUIwQjk0Nzk1MTFFOEE3MTdFQ0Q5QkQ4OTcxNzgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5xWMuWAAAAxUlEQVR42rTUWwrCMBAF0MSqn65EfItLcYMi+KIUd+UbNxBvNIUYJ+1MigP3qz0QJpPRxhglrB7yVBYKskCuyFKC5sjDfGrNRTMPbZGMg6bI3UPtd18EaFeiOjhBbg7tkY7/PYbGrnu2Dkg3/IdCI+RShSho0dmhPIZCOPRQUYV8OEBODh3rUAn7UmTTwsBqlVLEUQvuUanm5NzmNLqORgNAjdzPnEqG/Otl/O1ZxR5yxoXh6thwVwe1rFbJ61GnLuSXAAMAaKsIWtKClo0AAAAASUVORK5CYII="
    }
  })]), _c('div', {
    staticClass: ["application_box"]
  }, [_c('text', {
    staticClass: ["application_time"]
  }, [_vm._v(_vm._s(_vm.distanceTime))]), _c('text', {
    staticClass: ["application_num"]
  }, [_vm._v(_vm._s(_vm.signNumber) + "人已报名")])])]), _c('div', [_c('div', {
    staticClass: ["activity_content"]
  }, [_c('div', {
    staticClass: ["activity_title_box"]
  }, [_c('text', {
    staticClass: ["activity_title"]
  }, [_vm._v(_vm._s(_vm.actTitle))])]), _c('div', {
    staticClass: ["activity_num_box"]
  }, [_c('div', {
    staticClass: ["activity_num_box_left"]
  }, [_c('text', {
    staticClass: ["activity_num_see"]
  }, [_vm._v("浏览" + _vm._s(_vm.visitNumber) + "次")]), _c('text', {
    staticClass: ["activity_num_limit"]
  }, [_vm._v("限" + _vm._s(_vm.actMaxPerson) + "人")])]), (_vm.isFree == 2) ? _c('div', {
    staticClass: ["activity_num_box_right"]
  }, [_c('text', {
    staticClass: ["activity_num_butn"]
  }, [_vm._v(_vm._s(_vm.actState))])]) : _vm._e()]), _c('div', {
    staticClass: ["activity_time_box"]
  }, [_c('image', {
    staticClass: ["activity_time_box_img"],
    staticStyle: {
      width: "30px",
      height: "30px"
    },
    attrs: {
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAA0lBMVEUzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMz3o8oAAAARXRSTlMAAQIDBAUGCgsOEBkeNzk8PT9AQURKS1JTVWRmZ2h8fX5/j5CRkpSVqKmqtMDBwsTFxtHS2N7m5+jp6u3u7/P19vf4+fqhqUkkAAABNElEQVR4XnWT6VbCMBBGp9YUoVILCBRFjBBxBS1oN1Rk+d7/lTz0hMZ0uT/n9iTTzDeUwboTP9puI3/SZZSnPoqREY/quu0HwJJ3bMuyO3wJBH1SmGNg7qqCOwPGZmafsBkaqbAoxRhu8Hj0At8OpZwlU1lzviDkvfhtyuI5XkjSXMNLew5wQ0VN1wgO/d9ibpRpYw5OxGK4VKbJRcyoiwWVa1qgRwJ3VZrjnt7QqdJtvFMCu0rbSGgHq0pb2OX156Cmae3w0w9g/TyoqcO11uikNQ0PX1weWxPgpGG2H0L8yB+Tz6JjttrHZ2ExLqgUFwk7jOTV0IUaiRpogSuEaSC9LA4KFQcigZWTt84KohhF0qOogjwrBlnhyTVgTK6BRxoN/n+JeIPysJ7wo/0+8kWPZeIPKbg3YS8BSXUAAAAASUVORK5CYII="
    }
  }), _c('text', {
    staticClass: ["activity_time_box_text"]
  }, [_vm._v(_vm._s(_vm.actBegTime) + "至" + _vm._s(_vm.actEndTime))])]), _c('div', {
    staticClass: ["activity_address_box"]
  }, [_c('image', {
    staticClass: ["activity_address_box_img"],
    staticStyle: {
      width: "26px",
      height: "35px"
    },
    attrs: {
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAjCAMAAAC94eqZAAAB1FBMVEUzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzPQ5Q5iAAAAm3RSTlMAAwH+BN8CD9L0SAoGPfvwI70Q3RznFX4FBxST7vaL6hHbhULc4rzPCCt2uFXJ5Ov4TuWxuXkNdUrhe9hG+QnaYk1eboSot58LWXPZMTiIOyLBH/VLDC2CMOzoavNyLmkk5sBQjzNEdFKZxeOuINfpmjIa8tRxGDQ2s7uHFvF3DizTXdX3Jz+kxMec4En6NTep3orMlsoh7zxRxrsK/FQAAAHASURBVHhebZJlkyIxFEVf08DgA4sMDM6Ou9uOrbu7u7u7u7ueP7t0GoqG4XzJuXXzUklVpITTn9k6t32gL7R7j1RhW3uJMvR6LE3zCLRumg56E9uWJvthZUO5eTLJvnl7OXnXXedGxPRgllBMLGxx4VJz8XZGfFJFg4tVtqI8oqV8tHe2JJG9PBNZk8K8kf1gC7jmbSocxmGXZfSq4OsGdxpWq04Ls0O+sFxVKxiadtp7GtmvYoErsp4NaqiRjcbawxJVbaZd3OQM7SQvBlqaMUNipGSGnYbuKu12ullkyGNmJMpFQzsO6IeMdYKwGBzhqBzjuPIThE+KnMpyWsUzhKTAWeXec3A+Chc0FX8wKn4um6Gj0A9942bQhrgqzlY8YqJFrtlKOkG+qE20yQK6uVmUW2lu1zZ3cKsnJLlbW93jvpIHD1lc3QySypk2xVO7tUnM0VXSWQej1qqJ5/Gye3jxstJ0DuivKuk1b7Sya295Z/2IUaYqx70fEwsf9I+fTPsc0Gvum+SremTOwTepJvGdYZuIbZifPqnh12/GRbpoDMoCBvXAH39A/yt1yDCZJSP1iP+DNk3qEss7mi3xP0zrcmMeiBtfAAAAAElFTkSuQmCC"
    }
  }), _c('text', {
    staticClass: ["activity_address_box_text"]
  }, [_vm._v(_vm._s(_vm.actAddress))])]), _c('div', {
    staticClass: ["activity_price_box"]
  }, [_c('image', {
    staticClass: ["activity_price_box_img"],
    staticStyle: {
      width: "30px",
      height: "30px"
    },
    attrs: {
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAA6lBMVEUzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzPGRm3NAAAATXRSTlMAAQMFBgsMDg8QEhkaIiQrLDc5PD1AQUpLUlNhZGZnaG98fX5/gYOPkJGSmaiprrO0wMHCw8TFxszR0tbi5ufo6ert7u/w9fb3+Pn6/uve/hYAAAFwSURBVHhehZNtU4JAFIUvLqmFWhb5mmaRBVlWmikqAWZl2Pn/fycWd8Gwmc6Xs8szs/eyey7FYlVz7H59uWOzyiit3IWHWN5F7jetO8DUqGiqqlWMKeDUt2DmBhjqyV4fADeZmN5j1VZoS0p7hTvJLSyPKaXjN1iiLj7LoWlHEh1qoZU/0Ih6dnDO3Q4qG1oJbG4tOLz/Swyjutfwi9yLPq65K0MYRMyDvmnwEdMs0d4UD5umdHiMqrBFyfwMfUXpY5YXH2zUyMIVCZXe0e1iWZJ7A7c0QtRRwez1ehN8f2MSLswCx6d4IR8axx38UodjDT4FUDnONltcQGTNLMcqAoGlALEQWB6exuJw2VroWxqRbM2CsYuf5Y/Ja0nXltfCPJz8jXX4jD/Jk5LG8kniB93FZ3jNcW/wOAjN55GJOMgwLWSYDg5kmBaw/o1iEuTBbpATNcQYMCbGQNSV2je2h8jYp7RYzRq767U7tmosBj9MHFBY0b9I/gAAAABJRU5ErkJggg=="
    }
  }), (_vm.isFree == 2) ? _c('text', {
    staticClass: ["activity_price_box_text"]
  }, [_vm._v("￥" + _vm._s(_vm.actPrice))]) : _vm._e(), (_vm.isFree == 1) ? _c('text', {
    staticClass: ["activity_price_box_text"]
  }, [_vm._v("免费")]) : _vm._e()]), (_vm.actLabel.length !== 0) ? _c('div', {
    staticClass: ["activity_label_box"]
  }, [_c('image', {
    staticClass: ["activity_label_box_img"],
    staticStyle: {
      width: "25px",
      height: "30px"
    },
    attrs: {
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAeCAMAAADuMkXpAAAAxlBMVEUzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzNQEGTdAAAAQXRSTlMAS6W0acwzBvMe1dsE+USuB0D27fzHFTZgirBH2r309SXWHShtSHx6eUOsH0qnG3R9cReqGqbyc3XUJN2iGXLfZ40z4b0AAACXSURBVHhe7c7FEsJAFETRh87EBXd3d5f+/58ilYGq2BJ23O3pRVMzg6iyXYohurgjCQqX/JWY5ZQoVwhIvoF3xYDQOi3qfO/bX6SSHilsyIGxFJZKFahx1AfML5IBtHRqbwCl5xGzb4Mf3fFIBozJR6YKMJuTiC047OXKFQ2QLc/j7Q7QXMH+oJIv6wRHzpfrjYKp98fzBXeQKlRPb/CbAAAAAElFTkSuQmCC"
    }
  }), _vm._l((_vm.actLabel), function(item) {
    return _c('text', {
      staticClass: ["activity_label_box_text"]
    }, [_vm._v("#" + _vm._s(item))])
  })], 2) : _vm._e()])]), _c('div', [_c('div', {
    staticClass: ["activity_detail"]
  }, [(_vm.activeRules.length !== 0) ? _c('div', {
    staticClass: ["activity_detail_tab_box"]
  }, [_c('div', {
    staticClass: ["activity_detail_tab"]
  }, [_c('text', {
    class: ['activity_detail_tab_text', _vm.detailOrNotice ? 'activity_detail_tab_text_active' : ''],
    on: {
      "click": function($event) {
        _vm.changDetailOrNotice('detail')
      }
    }
  }, [_vm._v("活动详情")]), _c('text', {
    class: ['activity_detail_tab_text', _vm.detailOrNotice ? '' : 'activity_detail_tab_text_active'],
    on: {
      "click": function($event) {
        _vm.changDetailOrNotice('notice')
      }
    }
  }, [_vm._v("退款规则")])])]) : _vm._e(), _c('div', {
    staticClass: ["activity_detail"]
  }, [(_vm.detailOrNotice) ? _c('vk-wx-richtext', {
    ref: "richtext",
    style: {
      width: _vm.width,
      height: _vm.height
    },
    attrs: {
      "src": _vm.html
    },
    on: {
      "pagestart": _vm.pagestart,
      "pagefinish": _vm.pagefinish,
      "error": _vm.error
    }
  }) : _c('div', {
    staticClass: ["activeRuleList"]
  }, _vm._l((_vm.activeRules), function(item, index) {
    return _c('div', [_c('div', {
      staticClass: ["activeRulesBox"]
    }, [(_vm.activeRules.length !== 1) ? _c('text', {
      staticClass: ["activeRulesLeft"]
    }, [_vm._v(_vm._s(index + 1) + ".")]) : _vm._e(), _c('text', {
      staticClass: ["activeRulesRight"]
    }, [_vm._v("截至活动开始前" + _vm._s(item.ruleTime) + "天取消订单，退还该订单总金额的" + _vm._s(item.refundRatio) + "%")])])])
  }))], 1)])])]), _c('div', {
    staticClass: ["bottom_box"]
  }, [_c('div', {
    staticClass: ["ask_box"],
    on: {
      "click": _vm.callPhone
    }
  }, [_c('image', {
    staticClass: ["ask_img"],
    staticStyle: {
      width: "32px",
      height: "32px"
    },
    attrs: {
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABblBMVEUAvf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf8Avf/OUPcTAAAAeXRSTlMA+Wk8/rTPAYQwEf33T769CaoCnvDr8Rxd9gTqgmT6YVM4JOZE2gPfFJUaUtIomsvMO7rlGwWk7E22hQjFMdzvVO581InIo4BsOSFujVh+jLfElpdf6Uy8LC9H0St4ZW1xKntbgVkyXOEgY6ut/MY3HT6PLc1eV8dFIZkI4gAAAXtJREFUeF6t0EWP40AYhOFqx2MnsR1kmDAMMjMzwzIzM9a/X7WUSDHkts+lXrX69MEhEkFPzfqgZpKmNlhvwk1/0SCToWg0lCQbb3Q4zISYOqnEZMYq5ymGZmBzd5rxAXRgIM7pH+hSzYsMbDIiX0UHlkeMMhzKxsgyOvwswKVAfyeHstuzcJndzg618yWH4WGY++1aq+XgIVdbg4R3HIOnMR5BstgPT/20IB1wKw0P6S0ey7XypBqPwCESV8lbFnAoEkvKCufgsMcV5SwhJrFYDACxsDoKm1E1HAMCxTDWwwBwyhJsSvwt5zIL9snwUYGNQp+cPv6HD+JCxoLzWI+5IOeOgJYIAriiDzaTvAYQTGm44fjtwI66q8NG31V37t0fZwnwGyQfuI6dIUmjIPPhI/9GDg6KSDxZevoMdvrzeZKtV3g9xbercHvP1ofox+Snz1TngvAwZcrnVRajX+BpUXwF8I3f0cMG1ycmfpoigF5+aZub83/+oss/skFGF7IBPWAAAAAASUVORK5CYII="
    }
  }), _c('text', {
    staticClass: ["ask_title"]
  }, [_vm._v("活动咨询")])]), (_vm.actState == '报名进行中') ? _c('div', {
    staticClass: ["apply_box"]
  }, [_c('text', {
    staticClass: ["apply_title"],
    on: {
      "click": _vm.goApply
    }
  }, [_vm._v("我要报名")])]) : _vm._e(), (_vm.actState != '报名进行中') ? _c('div', {
    staticClass: ["apply_box", "apply_box_gray"]
  }, [_c('text', {
    staticClass: ["apply_title"]
  }, [_vm._v("我要报名")])]) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true

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

/***/ })

/******/ });