import request from '../utils/http.js'
import {
	getToken
} from '../utils/auth.js';

/**
 * @description 获取客户信息
 * @param {Object} id
 */
export function getCustomerInfo(id, param) {
	return request({
		url: `/linkerapi/getCustomerInfo/${id}`,
		method: 'POST',
		params: {
			...param,
			en_user_id: getToken()
		}
	});
}
/**
 * @description 修改客户信息
 * @param {Object} param
 */
export function changeCustomerSet(param) {
	return request({
		url: `/linkerapi/change_customer_set`,
		method: 'POST',
		params: {
			...param,
			en_user_id: getToken()
		}
	});
}
/**
 * @description 添加客户
 * @param {Object} param
 */
export function addCustomer(param) {
	return request({
		url: `/linkerapi/addCustomer`,
		method: 'POST',
		params: {
			...param,
			en_user_id: getToken()
		}
	});
}

/**
 * @description 获取客户列表1
 * @param {Object} param
 */
export function getCustomerList(param) {
	return request({
		url: '/linkerapi/get_customer_list',
		method: 'POST',
		params: {
			...param,
			en_user_id: getToken()
		}
	});
}

/**
 * @description 获取客户列表2，带计数功能
 * @param {Object} param
 */
export function getCustomerList2(param) {
	return request({
		url: `/linkerapi/get_customer_list2`,
		method: 'POST',
		params: {
			...param,
			en_user_id: getToken()
		}
	});
}
