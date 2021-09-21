<template>
	<view>
		<u-cell-item :arrow="false">
			<view slot="icon" @click="cancel">取消</view>
			<view slot="right-icon" @click="confirm">确定</view>
		</u-cell-item>
		<view>
			<u-field placeholder="记录一下" label-width="0"></u-field>
			<view>{{ $u.timeFrom(time, 'yyyy年mm月dd日') }}编辑</view>
			<u-picker mode="time" v-model="show" :default-time="time" @confirm="changeTime">{{ time }}</u-picker>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			mode: 'date',
			time: new Date()
		};
	},
	methods: {
		cancel() {
			this.$emit('cancel');
		},
		confirm() {},
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
