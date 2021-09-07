import request from '../utils/http.js'

/**
 * @description 获取客户信息
 * @param {Object} id
 */
export function getCustomerInfo(id, param) {
	return axios.post(`/linkerapi/getCustomerInfo/${id}`, param);
}
/**
 * @description 修改客户信息
 * @param {Object} param
 */
export function changeCustomerSet(param) {
	return axios.post(`/linkerapi/change_customer_set`);
}
/**
 * @description 添加客户
 * @param {Object} param
 */
export function addCustomer(param) {
	return axios.post(`/linkerapi/addCustomer`);
}

/**
 * @description 获取客户列表1
 * @param {Object} param
 */
export function getCustomerList(param) {
	return axios.post(`/linkerapi/get_customer_list`);
}

/**
 * @description 获取客户列表2，带计数功能
 * @param {Object} param
 */
export function getCustomerList2(param) {
	return axios.post(`/linkerapi/get_customer_list2`);
}