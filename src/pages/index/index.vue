<template>
	<view class="wrap">
		<view style="height: 48px;line-height: 48px;font-size: 16px;color: #131415;" @click="toAddress">
			<text style="padding: 0 6px 0 23px;"><u-icon name="icon iconfont icon-a-20-dingwei"></u-icon></text>
			<text style="padding-right: 8px;">{{ addressName }}</text>
			<u-icon name="icon iconfont icon-a-16-jiantou-you"></u-icon>
		</view>
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
			<u-icon name="icon iconfont icon-a-20-huishouzhan" color="#999999" size="36" style="padding-right: 18px;"
			@click="showRecycle=true"></u-icon>
		</view>
		<swiper class="swiper-box" :current="current" @change="swiperChange">
			<swiper-item v-for="item in list">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<u-field placeholder="输入姓名或手机号搜索"><u-icon slot="icon" name="icon iconfont icon-a-20-sousuo"></u-icon></u-field>
					<CustomerList :current="current" @editCustomer="editCustomer"/>
					<uni-fab v-if="current === 0" class="add-customer" @fabClick="addCustomer"></uni-fab>
				</scroll-view>
			</swiper-item>
		</swiper>
		<u-popup mode="bottom" v-model="showRecycle" border-radius="16" closeable close-icon="icon iconfont icon-a-20-guanbiqingkong" height="85%">
			<recycle  />
		</u-popup>
		
	</view>
</template>

<script>
import CustomerList from './components/CustomerList.vue';
import recycle from './components/recycle.vue';
export default {
	components: { CustomerList,recycle },
	created() {
		uni.getLocation({
			type: 'gcj02',
			geocode: true,
			success: res => {
				console.log(res);
				this.local = res;
			}
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
			local: '当前定位' ,//当前定位
			showRecycle:false,
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
		addCustomer(){
			uni.navigateTo({
				url:'components/addCustomer'
			})
		},
		editCustomer(data){
			console.log('ssssss');
			uni.navigateTo({
				url:'components/editCustomer',
				
			})
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
