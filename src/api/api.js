//import { event } from '../utils/event'
import store from './../store/index.js'
import { $showToast, $showError } from './../utils/common.js'
import XsdLog from './xsdlog.js'

// 配置API接口地址
var root = process.env.API_ROOT
// 引用axios
var axios = require('axios')
var qs = require('qs')
var CryptoJS = require("crypto-js")

// 自定义判断元素类型JS
function toType(obj) {
	return({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
	for(var key in o) {
		if(o[key] === null) {
			delete o[key]
		}
		if(toType(o[key]) === 'string') {
			o[key] = o[key].trim()
		} else if(toType(o[key]) === 'object') {
			o[key] = filterNull(o[key])
		} else if(toType(o[key]) === 'array') {
			o[key] = filterNull(o[key])
		}
	}
	return o
}

function getQueryString(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

/**
 * 加密
 * @param word
 * @returns {*}
 */
//模块初始化
function encrypt(word) {
	var key = CryptoJS.enc.Utf8.parse("秘钥"); //秘钥
	var iv = CryptoJS.enc.Utf8.parse('偏移量'); //偏移量
	var data = JSON.stringify(word.body); //转为json字符串
	var encrypted = CryptoJS.AES.encrypt(data, key, { //加密算法
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	var a = encodeURIComponent(encrypted); //特殊字符转码
	var result = '{"body":"' + a + '"}';
	var newresult = JSON.parse(result);

	//	console.log("encrypt data", newresult);

	return newresult;
}

function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

/*解密
 * @param word
 * @returns {*}
 */
function decrypt(word) {
	var key = CryptoJS.enc.Utf8.parse("秘钥"); //秘钥
	var iv = CryptoJS.enc.Utf8.parse('偏移量'); //偏移量
	var encrypted = decodeURIComponent(word); //转码
	var decrypted = CryptoJS.AES.decrypt(encrypted, key, { //解密算法
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});

	// 转换为 utf8 字符串
	decrypted = CryptoJS.enc.Utf8.stringify(decrypted);
	return decrypted;
}

function apiAxios(method, url, params, success, failure) {
	XsdLog.log("apiAxios", "Url: " + url + ", " + JSON.stringify(params));
	if(!navigator.onLine) {
		XsdLog.log("apiAxios", "失去网络连接");
		$showToast(false, "text", "失去网络连接，请稍后重试！")
		return
	}
	store.state.isfetchLoading = true // 显示loading画面
	if(params) {
		params = filterNull(params);
	}

	axios({
			method: method,
			url: url,
			data: method === 'POST' || method === 'PUT' ? qs.stringify(encrypt(params)) : null,
			params: method === 'GET' || method === 'DELETE' ? encrypt(params) : null,
			baseURL: root,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			withCredentials: false
		})
		.then(function(res) {
			store.state.isfetchLoading = false // 隐藏loading
			var bodyStr = res.data.body;
			var descriptStr = decrypt(bodyStr);
			var decryptRes = JSON.parse(descriptStr);
			if(decryptRes.message == "success") {
				if(success) {
					success(decryptRes.result)
				}
			} else {
				if(failure) {
					console.log(decryptRes);
					XsdLog.log("apiAxios", decryptRes.message);
					failure(decryptRes.message);
//					$showToast(false, "text", decryptRes.message);

				} else {
					$showToast(false, "text", "请求失败")
				}
			}
		})
		.catch(function(err) {
			console.log(err);
			store.state.isfetchLoading = false // 隐藏loading
			if(err.message) {
				XsdLog.log("apiAxios", err.message);
				//				$showToast(false, "text", "网络连接失败，请稍后重试")
			} else {
				if(err) {
					XsdLog.log("apiAxios", err);
					//					$showToast(false, "text", "网络连接失败，请稍后重试")
				}
			}
		})
}

// 返回在vue模板中的调用接口
export default {
	get: function(url, params, success, failure) {
		return apiAxios('GET', url, params, success, failure)
	},
	post: function(url, params, success, failure) {
		return apiAxios('POST', url, params, success, failure)
	},
	put: function(url, params, success, failure) {
		return apiAxios('PUT', url, params, success, failure)
	},
	delete: function(url, params, success, failure) {
		return apiAxios('DELETE', url, params, success, failure)
	}
}