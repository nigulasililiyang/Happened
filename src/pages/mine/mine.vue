<template>
	<view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="超时提醒" :arrow="false" index="1" @click="click">
					<view slot="right-icon">
						{{ timeoutLabel }}
						<u-icon name="arrow-right" />
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="remark">设置多久时间必须联系他们一次</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="实用教程" :arrow="false" index="2" @click="click"><u-icon slot="icon" name="play-right-fill"></u-icon></u-cell-item>
			</u-cell-group>
		</view>
		<view class="remark">观看教程以便于使用</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="隐私政策" index="3" @click="click"></u-cell-item>
				<u-cell-item title="关于我们" :arrow="false" index="4" @click="click">
					<view slot="right-icon">
						画客好设计荣誉出品
						<u-icon name="arrow-right" />
					</view>
				</u-cell-item>
				<u-cell-item title="意见反馈" index="5" @click="click"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item :user-label-slot="false" :arrow="false" index="6" @click="click">
					<view slot="label" style="text-align: center;width: calc(100vw - 32px);color:#E63A2E;">退出登录</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<u-select mode='single-column' v-model="show" :default-value="timeout" :list="list" @confirm="confirm"></u-select>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			timeout: [],
			list: [
					{
						value: 0,
						label: '1个月'
					},
					{
						value: 1,
						label: '2个月'
					},
					{
						value: 2,
						label: '3个月'
					},
					{
						value: 3,
						label: '半年'
					}
				],
		};
	},
	computed: {
		timeoutLabel() {
			return this.timeout[0]!=undefined?this.list[this.timeout[0]].label:'';
		}
	},
	mounted() {
		this.getTimeout();
	},
	methods: {
		getTimeout() {
			const timeout = uni.getStorageSync('Timeout');
			console.log(timeout)
			this.timeout = timeout!==''?[timeout]:[];
		},
		confirm(e) {
			console.log(e);
			uni.setStorageSync('Timeout', e[0].value);
			this.show = false;
			this.getTimeout();
		},
		click(index) {
			switch (index) {
				case '1':
					this.show = true;
					break;
				case '2':
					uni.navigateTo({
						url: 'components/privacy'
					});
					break;
				case '3':
					uni.navigateTo({
						url: 'components/privacy'
					});
					break;
				case '4':
					uni.navigateTo({
						url: 'components/about'
					});
					break;
				case '5':
					uni.navigateTo({
						url: 'components/suggestions'
					});
					break;
					case '6':
						uni.navigateTo({
							url:'../login/index'
						})
						break;
				default:
					break;
			}
			console.log(index);
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f3f4f8;
}

.camera {
	width: 54px;
	height: 44px;

	&:active {
		background-color: #ededed;
	}
}
.user-box {
	background-color: #fff;
}
.remark {
	padding: 8px 20px;
	color: #999999;
}
</style>
