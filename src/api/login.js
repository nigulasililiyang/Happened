import request from '../utils/http.js'

/**
 * @description 注册并登录
 * @param {Object} id
 */
export function loginWithAutoReg(params) {
	return request({
		url: `/hkw_newapi/login_with_auto_reg`,
		method: 'post',
		params: params
	});
}
/**
 * @description 获取手机验证码
 * @param {Object} params
 */
export function getRegSmsCode(params) {
	return request({
		url: `/hkw_newapi/get_reg_sms_code`,
		method: 'post',
		params: params
	});
}
/**
 * @description 获取图形验证码
 * @param {Object} param
 */
export function getVerifycode() {
	return request({
		url: `/index.php/verifycode/index/2`,
		method: "get"
	});
}
