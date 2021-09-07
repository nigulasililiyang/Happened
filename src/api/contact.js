import request from '../utils/http.js'

/**
 * @description 添加联系记录
 * @param {Object} id
 */
export function getCustomerInfo(param) {
	return axios.post(`/linkerapi/add_contact_history`, param);
}
/**
 * @description 获取联系记录
 * @param {Object} param
 */
export function getContactHistory(param) {
	return axios.post(`/linkerapi/get_contact_history`);
}
