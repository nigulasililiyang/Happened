import request from '../utils/http.js'

/**
 * @description 注册并登录
 * @param {Object} id
 */
export function loginWithAutoReg(param) {
	return axios.post(`/hkw_newapi/login_with_auto_reg`, param);
}
/**
 * @description 获取手机验证码
 * @param {Object} param
 */
export function getRegSmsCode(param) {
	return axios.post(`/hkw_newapi/get_reg_sms_code`);
}
/**
 * @description 获取图形验证码
 * @param {Object} param
 */
export function getVerifycode(param) {
	return axios.get(`/index.php/verifycode/index/2`);
}

