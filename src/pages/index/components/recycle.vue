<!-- 回收站 -->
<template>
	<view>
		<view
			style="
		padding-left: 16px;
		height: 56px;
		line-height: 56px;
		font-size: 18px;
		font-weight: 500;
		color: #333333;"
		>
			回收站
		</view>
		<scroll-view scroll-y="true" style="height: calc(85vh - 56px);">
			<u-cell-group>
				<u-cell-item v-for="item in customerList" :arrow="false" bg-color="rgba(0,0,0,0)" hover-class="none">
					<view slot="title" style="font-size:18px;color:#333333">
						<text style="">{{item.Name}}</text>
						<text style="padding:0 4px;color:#CCCCCC;">/</text>
						<text>{{item.companyname}}</text>
					</view>
					<view slot="label">
						<text style="padding-right: 8px;">{{item.long_lat_address_jd}}</text>
						<text>{{item.last_visit_time_txt}}移除</text>
					</view>
					<view slot="right-icon"><u-button style="font-size: 14px;height:32px;" @click="removeBack(item)">移回</u-button></view>
				</u-cell-item>
			</u-cell-group>
		</scroll-view>
	</view>
</template>

<script>
import { getCustomerList,changeCustomerSet } from '../../../api/customer.js';

export default {
	data() {
		return {
			customerList: []
		}
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData(){
			const param={is_deleted:1}
			getCustomerList(param).then(res => {
				this.customerList=res.data;
			});
		},
		removeBack(item) {
			const param={customerId:item.customer_id,is_deleted:0}
			changeCustomerSet(param).then(res=>{
				uni.showToast({
					title:'成功移回',success: () => {
						this.getData();
					}
				})
			});
		}
	}
};
</script>

<style></style>
