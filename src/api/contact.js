import request from '../utils/http.js';
import {
	getToken
} from '../utils/auth.js';
/**
 * @description 添加联系记录
 * @param {Object} id
 */
export function addContactHistory(param) {
	return request({
		url: '/linkerapi/add_contact_history',
		method: 'POST',
		params: {
			...param,
			en_user_id: getToken()
		}
	});
}
/**
 * @description 获取联系记录
 * @param {Object} param
 */
export function getContactHistory(param) {
	return request({
		url: '/linkerapi/get_contact_history',
		method: 'POST',
		params: {
			...param,
			en_user_id: getToken()
		}
	});
}
/**
 * @description 删除联系记录
 * @param {Object} param
 */
export function deleteContactHistory(param){
	return request({
		url:'/linkerapi/remove_contact_history',
		method: 'POST',
		params: {
			...param,
			en_user_id: getToken()
		}
	});
}

/**
 * @description 删除联系记录
 * @param {Object} param
 */
export function recoveryContactHistory(param){
	return request({
		url:'/linkerapi/recovery_contact_history',
		method: 'POST',
		params: {
			...param,
			en_user_id: getToken()
		}
	});
}
