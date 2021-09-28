import {
	getToken,
	removeToken
} from './auth'

function request(requestData) {
	const url = requestData.url;
	var header = {};
	var data = requestData.data;
	if (requestData.params) {
		data = requestData.params;
		header['content-type'] = 'application/x-www-form-urlencoded;'
	}
	var baseURl = '/dev-api';

	// #ifdef APP-PLUS
	baseURl = 'https://hkqq.huakewang.com';
	// #endif
	return uni.request({
		url: baseURl + url,
		data: data,
		method: requestData.method.toUpperCase(),
		header: header
	}).then(res => {
		//data为一个数组，数组第一项为错误信息，第二项为返回数据
		const result = res[1];
		const error = res[0];
		if (error != null) {
			uni.showToast({
				title: error.errMsg,
				duration: 2000,
				icon: "none"
			});
			return res[0];
		} else if (result.statusCode == 200) {
			const data = result.data;
			if (data.field === 'login' && !data.success) {
				removeToken();
				uni.reLaunch({
					url: "/pages/login/index"
				})
			} else if (!data.success) {
				uni.showToast({
					title: data.message,
					duration: 2000,
					icon: "none"
				});
			}
			// console.log(data)
			return data;
		}
		return res[0];
	})
}
export default request;
