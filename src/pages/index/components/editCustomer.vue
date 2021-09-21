<template>
	<view>
		<uni-nav-bar right-text="保存" :title="title" fixed statusBar @clickLeft="onLeft" @clickRight="onRight">
			<view slot="left"><u-icon name="icon iconfont icon-a-20-fanhui"></u-icon></view>
		</uni-nav-bar>
		<scroll-view style="height: calc(100vh - 44px);" scroll-y>
			<u-cell-group>
				<u-cell-item :arrow="false" :value-style="noRight">
					<input slot="title" placeholder="姓名" />
					<view slot="icon" class="left-icon">姓名</view>
				</u-cell-item>
				<u-cell-item :arrow="false" :value-style="noRight">
					<input slot="title" placeholder="常用电话" type="number" />
					<view slot="icon" class="left-icon">电话</view>
				</u-cell-item>
				<u-cell-item :arrow="false" :value-style="noRight">
					<input slot="title" placeholder="所在公司" />
					<view slot="icon" class="left-icon">公司</view>
				</u-cell-item>
			</u-cell-group>

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

			<u-cell-group title="记录">
				<u-cell-item :arrow="false" @click="addRecord">
					<view slot="title" style="font-size: 16px;color: #333333;">添加更多记录</view>
					<view slot="icon" style="padding-right: 8px;">
						<u-icon name="icon iconfont icon-a-24-tianjia" size="48" style="border-radius: 24px;background-color:#0055FF;color:rgb(230 238 255;border:none;"></u-icon>
					</view>
				</u-cell-item>
				<u-read-more show-height="200" toggle close-text="展开全部记录" text-indent="0">
					<view style="padding:16px;">
						<u-time-line>
							<u-time-line-item style="border-bottom: solid 1rpx #EEEEEE;" @click="editRecord(record)" v-for="record in recordList">
								<template v-slot:content>
									<view>
										<view class="u-order-title">{{ record.title }}</view>
										<!-- <view class="u-order-desc">[自提柜]您的快件已放在楼下侧门，直走前方53.6米，左拐约10步，再右拐直走，见一红灯笼停下，叩门三下，喊“芝麻开门”即可。</view> -->
										<view class="u-order-time">{{ record.createTime }}</view>
									</view>
								</template>
							</u-time-line-item>
						</u-time-line>
					</view>
				</u-read-more>
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
			<u-gap></u-gap>
			<u-cell-group>
				<u-cell-item :user-label-slot="false" :arrow="false" index="6" @click="click">
					<view slot="label" style="font-size: 16px;text-align: center;width: calc(100vw - 32px);color:#E63A2E;">删除联系人</view>
				</u-cell-item>
			</u-cell-group>
			<u-gap height="200"></u-gap>
		</scroll-view>
		<u-popup mode="bottom" v-model="showAddRecord" border-radius="32" height="85%"><addRecord @cancel="showAddRecord = false" /></u-popup>
	</view>
</template>

<script>
import addRecord from './addRecord.vue';
export default {
	components: { addRecord },
	data() {
		return {
			title: '张兰的信息',
			contact: {
				addressForm: {}
			},
			noRight: {
				width: '0px'
			},
			showAddRecord: false, //显示添加记录页面
			recordList: [
				{ id: 1, title: '今日已电话联系', createTime: new Date() },
				{ id: 2, title: '带了3箱苹果过去，相谈甚欢，项目沟通进展', createTime: new Date() },
				{ id: 3, title: '建立关系', createTime: new Date() }
			]
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
		},
		// 添加记录
		addRecord() {
			this.showAddRecord = true;
		},
		editRecord() {}
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
.u-order-title {
	font-size: 16px;
	font-weight: 500;
	color: #1d1e1f;
}
</style>
