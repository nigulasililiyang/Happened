<template>
	<view style="height: 100vh;background-color: #FFFFFF;">
		<view v-if="!perm" style="text-align: center;padding-top: 157px;">
			<image src="/static/images/contact-loading.png" style="width: 120px;height: 120px;"></image>
			<view style="padding:16px 0 32px 0">从通讯录快速导入，需要您的授权</view>
			<button type="primary" style="width: 147px;" @click="getContacts">同意启用</button>
			<loading v-if="importing" style="position: absolute;top: 0;" />
		</view>
		<view v-else style="height: 100%;"><contactList :contacts="contacts" v-if="contacts" /></view>
		<!-- 移除 -->
		<u-action-sheet :tips="tips" :list="actionList" @click="actionClick" v-model="showAction" border-radius="16"></u-action-sheet>
		<!-- 取关 -->
		<u-action-sheet :tips="offAttTips" :list="offAttActionList" @click="offAttActionClick" v-model="showOffAttAction" border-radius="16"></u-action-sheet>
		<!-- 重视 -->
		<u-popup mode="bottom" v-model="showPopup" border-radius="16">
			<u-row style="height: 56px;line-height: 56px;font-size: 16px;">
				<u-col :span="2"><view style="text-align: center;color:  #999999;" @click="showPopup = false">取消</view></u-col>
				<u-col :span="8">
					<view style="text-align: center;font-weight: 500;font-size: 18px;color: #333333;">完善“{{ contact.displayName }}”的地址信息</view>
				</u-col>
				<u-col :span="2"><view style="text-align: center;color:  #0055FF;" @click="onSave">保存</view></u-col>
			</u-row>
			<view style="padding: 16px;">
					<view class="form-title">
						<u-icon name="icon iconfont icon-a-16-gongsi" style="padding-right: 8px;"></u-icon>
						单位地址
					</view>
					<view class="form-item" @click="chooseWork">
						<u-row>
							<u-col :span="10" style="text-align: left;">
								<text v-if="addressForm.workLocation != null" style="color:#1D1E1F ;">{{ addressForm.workLocation.name }}</text>
								<text v-else style="color: #CCCCCC;">单位地址</text>
							</u-col>
							<u-col :span="2" style="text-align: right;"><u-icon name="icon iconfont icon-a-20-dingwei"></u-icon></u-col>
						</u-row>
					</view>
					<u-row class="form-item">
						<u-col><input placeholder="详细地址"  v-model="addressForm.workDetail" placeholder-class="placeholder" /></u-col>
					</u-row>

					<view class="form-title">
						<u-icon name="icon iconfont icon-a-16-zhuzhi" style="padding-right: 8px;"></u-icon>
						家庭住址
					</view>

					<view class="form-item" style="" @click="chooseHome">
						<u-row>
							<u-col :span="10">
								<text v-if="addressForm.homeLocation != null" style="color:#1D1E1F ;">{{ addressForm.homeLocation.name }}</text>
								<text v-else style="color: #CCCCCC;">家庭地址</text>
							</u-col>
							<u-col :span="2" style="text-align: right;"><u-icon name="icon iconfont icon-a-20-dingwei"></u-icon></u-col>
						</u-row>
					</view>
					<u-row class="form-item">
						<u-col><input placeholder="详细地址" v-model="addressForm.homeDetail" placeholder-class="placeholder" /></u-col>
					</u-row>
			</view>
		</u-popup>
	</view>
</template>

<script>
import {addCustomer}from '../../api/customer.js';
import contactList from './components/contactList.vue';
import loading from './components/loading.vue';
export default {
	components: { contactList, loading },
	watch: {
		showPopup(newValue, oldValue) {
			if (newValue) {
				this.addressForm=this.contact.addressForm?this.contact.addressForm:{};
			} else {
				this.addressForm = {};
			}
		}
	},
	data() {
		return {
			perm: false,
			contacts: [],
			importing: false, //授权导入中
			showAction: false, //显示操作栏
			actionList: [], //操作栏=>操作项
			tips: {
				text: '',
				color: '#999999',
				fontSize: 28
			},
			showOffAttAction: false, //显示操作栏
			offAttActionList: [], //操作栏=>操作项
			offAttTips: {
				text: '',
				color: '#999999',
				fontSize: 28
			},
			showPopup: false,
			contact: { displayName: '' },
			displayName: '',
			platform: '',
			addressForm: {}
		};
	},
	onPullDownRefresh() {
		this.initData();
	},
	created() {
		this.platform = uni.getSystemInfoSync().platform;
		uni.$on('reImport', () => {
			this.getContacts();
		});
		uni.$on('onRemove', contact => {
			this.contact = contact;
			this.tips.text = `将“${this.contact.displayName}”从通讯录移除`;
			this.actionList = [
				{
					text: '移除联系人',
					color: '#E63A2E',
					fontSize: 32
				}
			];
			this.showAction = true;
		});
		uni.$on('onImportant', contact => {
			this.contact = contact;
			this.showPopup = true;
		});
		uni.$on('deImportant', contact => {
			this.contact = contact;
			this.offAttTips.text = `取消对“${this.contact.displayName}”的关注`;
			this.offAttActionList = [
				{
					text: '取消关注',
					color: '#333333',
					fontSize: 32
				},
				{
					text: '取消并移除联系人',
					color: '#E63A2E',
					fontSize: 32
				}
			];
			this.showOffAttAction = true;
		});
	},
	mounted() {
		// #ifdef APP-PLUS
		this.perm = this.checkPermission();

		if (this.perm) {
			this.initData();
		} else {
		}
		// #endif
	},
	methods: {
		chooseWork() {
			uni.chooseLocation({
				success: res => {
					this.addressForm = {...this.addressForm,workLocation:res};
				}
			});
		},
		chooseHome() {
			uni.chooseLocation({
				success: res => {
					this.addressForm = {...this.addressForm,homeLocation:res};
				}
			});
		},
		actionClick(index) {
			//移除联系人
			if (index === 0) {
				const newData = this.contacts.filter(item => {
					if (item.id !== this.contact.id) {
						return item;
					}
				});
				uni.setStorageSync('contacts', newData);
				this.contacts = newData;
			}
		},
		//取关
		offAttActionClick(index) {
			//取消关注
			if (index === 0) {
				const newData = this.contacts.map(item => {
					if (item.id === this.contact.id) {
						item.attention = '0';
					}
					return item;
				});
				uni.setStorageSync('contacts', newData);
				this.contacts = JSON.parse(JSON.stringify(newData));
			}
			//取消关注并删除联系人
			else if (index === 1) {
				const newData = this.contacts.filter(item => {
					if (item.id !== this.contact.id) {
						return item;
					}
				});
				uni.setStorageSync('contacts', newData);
				this.contacts = newData;
			}
		},
		onSave() {
			//关注联系人
			// this.contact.attention=true;
			const newData = this.contacts.map(item => {
				if (item.id === this.contact.id) {
					item.attention = '1';
					item.addressForm=this.addressForm;
				}
				return item;
			});
			const param={
				name:this.contact.displayName,
				Phone:this.contact.phoneNumbers[0].value,
			};
			addCustomer(param).then(res=>{
				uni.showToast({
					title:'关注成功',
					success: () => {
						uni.setStorageSync('contacts', newData);
						this.contacts = newData;
						this.showPopup = false;
					}
				})
			});
		},
		/**
		 * @description 从缓存中读取数据
		 */
		initData() {
			uni.showLoading({
				title: '加载中'
			});
			uni.getStorage({
				key: 'contacts',
				success: res => {
					this.contacts = res.data;
				},
				complete() {
					uni.hideLoading();
					uni.stopPullDownRefresh();
				}
			});
		},
		/**
		 * @description 判断通讯录权限是否开启
		 * @return {bool}
		 */
		checkPermission() {
			var result = false;
			var CNContactStore = plus.ios.import('CNContactStore');
			var cnAuthStatus = CNContactStore.authorizationStatusForEntityType(0);
			if (cnAuthStatus == 3) {
				result = true;
				console.log('通讯录权限已经开启');
			} else {
				console.log('通讯录权限没有开启');
			}
			plus.ios.deleteObject(CNContactStore);
			return result;
		},
		/**
		 * @description 从手机通讯录获取数据
		 */
		getContacts() {
			var that = this;
			that.importing = true;
			// 获取通讯录对象
			plus.contacts.getAddressBook(
				plus.contacts.ADDRESSBOOK_PHONE,
				addressbook => {
					console.log('获取通讯录对象成功');
					that.perm = true;

					// 查找联系人
					addressbook.find(
						['displayName', 'phoneNumbers', 'addresses'],
						function(contacts) {
							console.log('获取联系人成功');
							that.importing = false;
							that.contacts = contacts;
							uni.setStorageSync('contacts', contacts);
						},
						function() {
							that.importing = false;
							uni.showToast({
								title: '获取联系人失败',
								duration: 2000
							});
						},
						{ multiple: true }
					);
				},
				e => {
					that.perm = false;
					that.importing = false;
					uni.showToast({
						title: '获取失败',
						duration: 2000
					});
				}
			);
		}
	}
};
</script>

<style scoped>
.form-title {
	font-size: 14px;
	color: #999999;
	padding: 20px 0 8px 0;
}
.form-item {
	height: 48px;
	line-height: 48px;
	font-size: 16px;
	border-bottom: solid 0.5px #e6e6e6;
}
.placeholder {
	color: #cccccc;
}
</style>
