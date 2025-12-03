<template>
	<view>
		<uni-nav-bar right-text="保存" :title="title" fixed statusBar @clickLeft="onLeft" @clickRight="onRight">
			<view slot="left"><u-icon name="icon iconfont icon-a-20-fanhui"></u-icon></view>
		</uni-nav-bar>
		<scroll-view style="height: calc(100vh - 44px);" scroll-y>
			<view style="background: #FFFFFF;">
				<u-field placeholder="姓名" v-model="customer.name" disabled><view slot="icon" class="left-icon">姓名</view></u-field>
				<u-field placeholder="常用电话" type="number" v-model="customer.phone" disabled><view slot="icon" class="left-icon">电话</view></u-field>
				<u-field placeholder="所在公司" v-model="customer.companyname"><view slot="icon" class="left-icon">公司</view></u-field>
			</view>

			<view class="form-title">
				<u-icon name="icon iconfont icon-a-16-gongsi" style="padding-right: 8px;"></u-icon>
				单位地址
			</view>

			<u-cell-group>
				<u-cell-item :arrow="false" title-width="100%" :icon-style="noRight" @click="chooseAddress('company')">
					<input slot="title" placeholder="单位地址" style="width: calc(100vw - 48px);" disabled v-model="customer.company_address.long_lat_address_jd" />
					<u-icon slot="right-icon" name="icon iconfont icon-a-20-dingwei" size="32"></u-icon>
				</u-cell-item>
				<u-cell-item :arrow="false" title-width="100%" :icon-style="noRight">
					<input slot="title" placeholder="详细地址" style="width: calc(100vw - 48px);" v-model="customer.company_address.long_lat_address" />
				</u-cell-item>
			</u-cell-group>

			<view class="form-title">
				<u-icon name="icon iconfont icon-a-16-zhuzhi" style="padding-right: 8px;"></u-icon>
				家庭住址
			</view>

			<u-cell-group>
				<u-cell-item :arrow="false" title-width="100%" :icon-style="noRight" @click="chooseAddress('home')">
					<input slot="title" placeholder="家庭地址" style="width: calc(100vw - 48px);" disabled v-model="customer.home_address.long_lat_address_jd" />
					<u-icon slot="right-icon" name="icon iconfont icon-a-20-dingwei" size="32"></u-icon>
				</u-cell-item>
				<u-cell-item :arrow="false" title-width="100%" :icon-style="noRight">
					<input slot="title" placeholder="详细地址" style="width: calc(100vw - 48px);" v-model="customer.home_address.long_lat_address" />
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
			<view v-for="(address, index) in customer.address_list">
				<u-gap></u-gap>
				<u-cell-group>
					<u-cell-item :arrow="false" title-width="100%" :icon-style="noRight" @click="chooseAddress('other', index)">
						<input slot="title" placeholder="地址" style="width: calc(100vw - 48px);" disabled v-model="address.long_lat_address_jd" />
						<u-icon slot="right-icon" name="icon iconfont icon-a-20-dingwei" size="32"></u-icon>
					</u-cell-item>
					<u-cell-item :arrow="false" title-width="100%" :icon-style="noRight">
						<input slot="title" placeholder="详细地址" style="width: calc(100vw - 48px);" v-model="address.long_lat_address" />
					</u-cell-item>
				</u-cell-group>
			</view>
			<u-gap></u-gap>
			<u-field placeholder="描述" v-model="customer.remark" style="background: #FFFFFF;"><view slot="icon" class="left-icon">备注</view></u-field>
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
							<u-time-line-item style="border-bottom: solid 1rpx #EEEEEE;" @click="editRecord(record)" v-for="record in contactHistoryList">
								<template v-slot:content>
									<view>
										<view class="u-order-title">{{ record.remark }}</view>
										<view class="u-order-time">{{ record.add_time }} <view style="float: right;width:50px;text-align: center;"><u-icon name="icon iconfont icon-a-20-gengduo"  @click="showHisEdit(record)"></u-icon></view></view>
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
					<u-switch slot="right-icon" active-color="#0055FF " inactive-color="#D9DADE" v-model="is_important"></u-switch>
				</u-cell-item>
				<u-cell-item :arrow="false">
					<view slot="icon" class="left-icon">
						<u-icon name="icon iconfont icon-a-20-chaoshiyincang" size="48" style="padding-right: 8px;"></u-icon>
						超时隐藏
					</view>
					<u-switch slot="right-icon" active-color="#0055FF " inactive-color="#D9DADE" v-model="is_time_out"></u-switch>
				</u-cell-item>
			</u-cell-group>
			<u-gap></u-gap>
			<u-cell-group>
				<u-cell-item :user-label-slot="false" :arrow="false" index="6" @click="deleteCustomer">
					<view slot="label" style="font-size: 16px;text-align: center;width: calc(100vw - 32px);color:#E63A2E;">删除联系人</view>
				</u-cell-item>
			</u-cell-group>
			<u-gap height="200"></u-gap>
		</scroll-view>
		<u-popup mode="bottom" v-model="showAddRecord" border-radius="32" height="85%">
			<addRecord @cancel="showAddRecord = false" :customerId="customerId" :record="contactHistory" @addSuccess="addRecordSuccess" />
		</u-popup>
		<u-action-sheet :tips="offAttTips" :list="hisEditActionList" v-model="showHisEditAction" @click="hisEditActionClick" border-radius="16"></u-action-sheet>
	</view>
</template>

<script>
import { getContactHistory,deleteContactHistory } from '../../../api/contact.js';
import { getCustomerInfo, changeCustomerSet } from '../../../api/customer.js';
import addRecord from './addRecord.vue';
export default {
	components: { addRecord },
	data() {
		return {
			customerId: null,
			title: '',
			noRight: {
				width: '0px'
			},
			showAddRecord: false, //显示添加记录页面
			customer: { company_address: {}, home_address: {} },
			contactHistoryList: [],
			is_important: false, //是否重要客户，1是，0否
			is_time_out: false ,//是否超时，1是，0否
			showHisEditAction:false,//是否显示记录操作
			offAttTips: {
				text: '',
				color: '#999999',
				fontSize: 28
			},
			hisEditActionList:[
				{
					text: '编辑记录',
					color: '#333333',
					fontSize: 32
				},{
					text: '删除记录',
					color: '#E63A2E',
					fontSize: 32
			}],
			contactHistory:{}
		};
	},
	onLoad(option) {
		this.customerId = option.id;
		this.getCustomer();
		this.getContacts();
	},
	methods: {
		chooseAddress(type, value) {
			uni.chooseLocation({
				success: res => {
					console.log(res);
					switch (type) {
						case 'company':
							this.customer = {
								...this.customer,
								company_address: {
									long_lat_address_jd: res.name,
									long_lat_address: res.address,
									longitude: res.longitude,
									latitude: res.latitude
								}
							};
							break;
						case 'home':
							this.customer = {
								...this.customer,
								home_address: {
									long_lat_address_jd: res.name,
									long_lat_address: res.address,
									longitude: res.longitude,
									latitude: res.latitude
								}
							};
							break;
						case 'other':
							break;
						default:
							break;
					}
				}
			});
		},
		getCustomer() {
			getCustomerInfo(this.customerId).then(res => {
				this.title = `${res.data.name}的信息`;
				this.customer = res.data;
				this.is_important = res.data.is_important == 1 ? true : false;
				this.is_time_out = res.data.is_time_out == 1 ? true : false;
				console.log(res.data);
			});
		},
		getContacts() {
			const param = { customerId: this.customerId, is_deleted: 0, limit: 100 };
			getContactHistory(param).then(res => {
				this.contactHistoryList = res.data.contactHistoryList;
			});
		},
		//取消
		onLeft() {
			uni.navigateBack({
				delta: 1
			});
		},
		//保存
		onRight() {
			var param = this.$u.deepClone(this.customer);
			param.customerId = this.customerId;
			param.is_important = this.is_important == true ? 1 : 0;
			param.is_time_out = this.is_time_out == true ? 1 : 0;
			changeCustomerSet(param).then(res => {
				uni.$emit('indexRefresh');
				uni.showToast({
					title: '修改成功'
				});
				uni.navigateBack({
					delta: 1
				});
			});
		},
		// 添加记录
		addRecord() {
			this.showAddRecord = true;
		},
		addRecordSuccess() {
			this.showAddRecord = false;
			this.getContacts();
		},
		editRecord() {},
		/**
		 * @description 删除联系人
		 */
		deleteCustomer() {
			uni.showModal({
				title: '提示',
				content: '确定删除联系人',
				success: (res) => {
					if(res.confirm){
						const param={customerId: this.customerId,is_deleted:1};
						changeCustomerSet(param).then(res=>{
							uni.$emit('indexRefresh');
							uni.showToast({
								title:"删除成功",
								success: () => {
									uni.navigateBack({
										delta:1
									});
								}
							})
						});
					}
				}
			});
		},
		showHisEdit(record){
			this.offAttTips.text = `${record.remark}`;
			this.contactHistory=record;
			this.showHisEditAction=true;
		},
		hisEditActionClick(index){
			switch (index){
				case 0:
				this.showAddRecord=true;
					break;
					case 1:
					deleteContactHistory({contact_history_id:this.contactHistory.id}).then(res=>{
						uni.showToast({
							title:'删除成功',complete: () => {
								this.getContacts();
								this.contactHistory={};
							}
						})
					});
						break;
				default:
					break;
			}
		},
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
