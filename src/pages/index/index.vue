<template>
	<view class="wrap">
		<uni-nav-bar fixed statusBar @clickLeft="toAddress">
			<view slot="left" style="padding: 0;display: flex;">
				<u-icon name="icon iconfont icon-a-20-dingwei" style="padding-right: 8px;"></u-icon>
				<view style="height: 48px;line-height: 48px;font-size: 16px;color: #131415;" @click="toAddress">
					<text style="padding-right: 8px;">{{ addressName }}</text>
					<u-icon name="icon iconfont icon-a-16-jiantou-you"></u-icon>
				</view>
			</view>
		</uni-nav-bar>

		<view class="u-tabs-box">
			<u-tabs-swiper
				bg-color="#F3F4F8"
				height="112"
				:list="list"
				@change="change"
				:current="current"
				is-scroll
				:active-item-style="activeStyle"
				:bar-style="barStyle"
				bar-width="80"
				bar-height="8"
				gutter="32"
			></u-tabs-swiper>
			<u-icon name="icon iconfont icon-a-20-huishouzhan" color="#999999" size="36" style="padding-right: 18px;" @click="showRecycle = true"></u-icon>
		</view>
		<swiper class="swiper-box" :current="current" @change="swiperChange">
			<swiper-item v-for="(item, index) in list">
				<!-- <scroll-view scroll-y style="height: 100%;width: 100%;"> -->
				<List v-if="index === 0" :sourceList="customerList" @editCustomer="editCustomer" />
				<Timeout v-if="index === 1" :sourceList="customerList" @editCustomer="editCustomer" />
				<Important v-if="index === 2" :sourceList="customerList" @editCustomer="editCustomer" />
				<uni-fab v-show="index === 0" class="add-customer" @fabClick="addCustomer"></uni-fab>
				<!-- </scroll-view> -->
			</swiper-item>
		</swiper>
		<u-popup mode="bottom" v-model="showRecycle" border-radius="16" closeable close-icon="icon iconfont icon-a-20-guanbiqingkong" height="85%"><recycle /></u-popup>
	</view>
</template>

<script>
import List from './components/customer/List.vue';
import Important from './components/customer/Important.vue';
import Timeout from './components/customer/Timeout.vue';
import { getCustomerList } from '../../api/customer.js';

import recycle from './components/recycle.vue';

export default {
	components: { List, Important, Timeout, recycle },
	created() {
		uni.getLocation({
			type: 'gcj02',
			geocode: true,
			success: res => {
				console.log(res);
				this.local = res;
			}
		});
		getCustomerList().then(res => {
			this.customerList = res.data ? res.data : [];
		});
	},
	data() {
		return {
			current: 0,
			activeStyle: {
				color: '#333333',
				'font-size': '20px',
				'font-weight': '500'
			},
			barStyle: {
				background: 'linear-gradient(270deg, rgba(0, 142, 255, 0) 0%, #0055FF 100%)',
				'border-radius': '2px'
			},
			list: [{ name: '首页' }, { name: '超时' }, { name: '关注' }],
			addressName: '请选择定位',
			local: '当前定位', //当前定位
			showRecycle: false,
			customerList: []
		};
	},
	methods: {
		change(index) {
			this.current = index;
		},
		swiperChange(event) {
			this.current = event.detail.current;
		},
		toAddress() {
			uni.chooseLocation({
				latitude: this.local.latitude,
				longitude: this.local.longitude,
				success: res => {
					this.addressName = res.name;
					console.log('位置名称：' + res.name);
					console.log('详细地址：' + res.address);
					console.log('纬度：' + res.latitude);
					console.log('经度：' + res.longitude);
				}
			});
			// uni.navigateTo({
			// 	url:'./Address'
			// })
		},
		addCustomer() {
			uni.navigateTo({
				url: 'components/addCustomer'
			});
		},
		editCustomer(data) {
			console.log('ssssss', data);
			uni.navigateTo({
				url: `components/editCustomer?id=${data.auther_id}`
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.u-tabs-box {
	display: flex;
}
.swiper-box {
	flex: 1;
	background: #ffffff;
	border-radius: 12px 12px 0px 0px;
	padding: 4px;
}
.swiper-item {
	height: 100%;
}
</style>
