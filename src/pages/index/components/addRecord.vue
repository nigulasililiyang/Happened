<template>
	<view>
		<u-cell-item :arrow="false">
			<view slot="icon" @click="cancel">取消</view>
			<view slot="right-icon" @click="confirm">确定</view>
		</u-cell-item>
		<view>
			<u-field placeholder="记录一下" label-width="0" v-model="contactInfo"></u-field>
			<!-- <view>{{ $u.timeFrom(time, 'yyyy年mm月dd日') }}编辑</view> -->
			<!-- <u-picker mode="time" v-model="show" :default-time="time" @confirm="changeTime">{{ time }}</u-picker> -->
		</view>
	</view>
</template>

<script>
	import {addContactHistory}from'../../../api/contact.js'
export default {
	props:['customerId'],
	data() {
		return {
			show: false,
			mode: 'date',
			contactInfo:'',
			time: new Date()
		};
	},
	methods: {
		cancel() {
			this.$emit('cancel');
		},
		confirm() {
			const param={contactInfo:this.contactInfo,customerId:this.customerId,is_deleted:0};
			addContactHistory(param).then(res=>{
				console.log('添加成功')
				this.$emit('addSuccess');
			});
		},
		change(e) {
			console.log(e);
		},
		changeTime(params) {
			console.log(params);
		}
	}
};
</script>

<style></style>
