<template>
	<view>
		<uni-nav-bar left-icon="back" left-text="取消" right-text="保存" title="新建联系人" fixed statusBar @clickLeft="onLeft" @clickRight="onRight"></uni-nav-bar>
		<scroll-view style="height: calc(100vh - 44px);" scroll-y>
			<u-form style="background-color: #FFFFFF;">
				<u-field placeholder="姓名"><view slot="icon" class="left-icon">姓名</view></u-field>
				<u-field placeholder="常用电话" type="number"><view slot="icon" class="left-icon">电话</view></u-field>
				<u-field placeholder="所在公司"><view slot="icon" class="left-icon">公司</view></u-field>
			</u-form>

			<view class="form-title">
				<u-icon name="icon iconfont icon-a-16-gongsi" style="padding-right: 8px;"></u-icon>
				单位地址
			</view>

			<u-cell-group>
				<u-cell-item :arrow="false" title-width="100%" :icon-style="noRight" @click="chooseWork">
					<input slot="title" placeholder="单位地址" style="width: calc(100vw - 48px);" disabled />
					<u-icon slot="right-icon" name="icon iconfont icon-a-20-dingwei" size="32"></u-icon>
				</u-cell-item>
				<u-cell-item :arrow="false" title-width="100%" :icon-style="noRight" @click="chooseWork">
					<input slot="title" placeholder="详细地址" style="width: calc(100vw - 48px);" />
				</u-cell-item>
			</u-cell-group>

			<view class="form-title">
				<u-icon name="icon iconfont icon-a-16-zhuzhi" style="padding-right: 8px;"></u-icon>
				家庭住址
			</view>

			<u-cell-group>
				<u-cell-item :arrow="false" title-width="100%" :icon-style="noRight" @click="chooseHome">
					<input slot="title" placeholder="家庭地址" style="width: calc(100vw - 48px);" disabled />
					<u-icon slot="right-icon" name="icon iconfont icon-a-20-dingwei" size="32"></u-icon>
				</u-cell-item>
				<u-cell-item :arrow="false" title-width="100%" :icon-style="noRight" @click="chooseWork">
					<input slot="title" placeholder="详细地址" style="width: calc(100vw - 48px);" />
				</u-cell-item>
			</u-cell-group>

			<u-gap></u-gap>

			<u-cell-group>
				<u-cell-item :arrow="false">
					<view slot="title" style="font-size: 16px;color: #333333;">添加更多地址</view>
					<view slot="icon" style="padding-right: 8px;">
						<u-icon name="icon iconfont icon-a-24-tianjia" size="48" style="border-radius: 24px;background-color:#0055FF;color:rgb(230 238 255;border:none;"></u-icon>
					</view>
				</u-cell-item>
			</u-cell-group>

			<u-gap></u-gap>

			<u-cell-group>
				<u-cell-item :arrow="false" title-width="100%" :value-style="noRight">
					<view slot="title" style="width: 100%;"><input placeholder="描述" /></view>
					<view slot="icon" class="left-icon">备注</view>
				</u-cell-item>
			</u-cell-group>
			<u-gap></u-gap>
			<u-cell-group>
				<u-cell-item :arrow="false">
					<view slot="icon" class="left-icon">
						<u-icon name="icon iconfont icon-a-20-guanzhu" size="48" style="padding-right: 8px;"></u-icon>
						设为关注
					</view>
					<u-switch slot="right-icon" v-model="contact.attention" active-color="#0055FF " inactive-color="#D9DADE"></u-switch>
				</u-cell-item>
				<u-cell-item :arrow="false">
					<view slot="icon" class="left-icon">
						<u-icon name="icon iconfont icon-a-20-chaoshiyincang" size="48" style="padding-right: 8px;"></u-icon>
						超时隐藏
					</view>
					<u-switch slot="right-icon" v-model="contact.attention" active-color="#0055FF " inactive-color="#D9DADE"></u-switch>
				</u-cell-item>
			</u-cell-group>
			<u-gap height="200"></u-gap>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			contact: {
				addressForm: {}
			},
			noRight: {
				width: '0px'
			}
		};
	},
	methods: {
		onLeft() {
			uni.navigateBack({
				delta: 1
			});
		},
		onRight() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style scoped>
.form-title {
	font-size: 14px;
	color: #999999;
	padding: 20px 16px 8px 16px;
}
.form-item {
	height: 48px;
	line-height: 48px;
	font-size: 16px;
	border-bottom: solid 0.5px #e6e6e6;
	background-color: #ffffff;
}
.placeholder {
	color: #cccccc;
}
.left-icon {
	min-width: 88px;
	font-size: 16px;
	font-weight: 500;
	color: #1d1e1f;
	line-height: 30px;
}
</style>
