<template>
	<view style="height: calc(100% - 50px);">
		<u-field placeholder="输入姓名或手机号搜索" @input="search"><u-icon slot="icon" name="icon iconfont icon-a-20-sousuo"></u-icon></u-field>
		<scroll-view scroll-y style="height: 100%;width: 100%;">
			<u-cell-group>
				<u-cell-item v-for="item in customerList" :arrow="false" bg-color="rgba(0,0,0,0)" @click="edit(item)">
					<view slot="title" style="font-size:18px;color:#333333">
						<text style="">{{item.Name}}</text>
						<text style="padding:0 4px;color:#CCCCCC;">/</text>
						<text>{{item.companyname}}</text>
					</view>
					<view slot="label">
						<text style="padding-right: 6px;"><u-icon name="icon iconfont icon-a-20-dingwei"></u-icon></text>
						<text style="padding-right: 8px;">距你{{item.distance}}公里</text>
						<text style="padding-right: 8px;">{{item.long_lat_address_jd}}</text>
						<text>{{ item.last_visit_time_txt }}联系</text>
					</view>
					<view slot="right-icon">
						<u-icon name="icon iconfont icon-a-24-xiangqing" color="rgb(229, 238, 255)" size="48" style="background-color: #0055FF;border-radius: 50%;"></u-icon>
					</view>
				</u-cell-item>
			</u-cell-group>
			<uni-load-more status="noMore"></uni-load-more>
		</scroll-view>
	</view>
</template>
	<script>
		import { getCustomerList } from '../../../../api/customer.js';
		export default {
			name: 'contactHistoryList',
			props: ['sourceList'],
			watch: {
				sourceList(newValue, oldValue) {
					this.getData();
				}
			},
			data() {
				return {
					customerList: [],
					catcheData:[],
				};
			},
			methods: {
				edit(item) {
					this.$emit('editCustomer', item);
				},
				getData() {
					this.customerList = this.sourceList;
					this.catcheData=this.$u.deepClone(this.customerList);
				},
				search(val){
					console.log(val)
					this.customerList=this.catcheData.filter(item=>{
						if(item.Name.indexOf(val)>-1||item.phone.indexOf(val)>-1){return item}
					});
				},
			}
		};
	</script>

	<style></style>
