<template>
	<u-cell-group>
		<u-cell-item v-for="item in watchList" :arrow="false" bg-color="rgba(0,0,0,0)" @click="edit">
			<view slot="title" style="font-size:18px;color:#333333">
				<text style="">张兰</text>
				<text style="padding:0 4px;color:#CCCCCC;">/</text>
				<text>画客图像</text>
			</view>
			<view slot="label">
				<text style="padding-right: 6px;"><u-icon name="icon iconfont icon-a-20-dingwei"></u-icon></text>
				<text style="padding-right: 8px;">距你7.9公里</text>
				<text style="padding-right: 8px;">全景路演中心</text>
				<text>1天前联系</text>
			</view>
			<view slot="right-icon">
				<u-icon name="icon iconfont icon-a-24-xiangqing" color="rgb(229, 238, 255)" size="48" style="background-color: #0055FF;border-radius: 50%;"></u-icon>
			</view>
		</u-cell-item>
	</u-cell-group>
</template>

<script>
export default {
	name: 'CustomerList',
	props: ['current'],
	watch: {
		current: {
			handler(newValue, oldValue){
				switch (newValue) {
					case 0:
						this.watchList = [1, 2, 3];
						break;
					case 1:
						this.watchList = [1, 2, 3, 5, 6];
						break;
					case 2:
						this.watchList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
						break;
					default:
						break;
				}
			},
			immediate:true
			
		}
	},
	data() {
		return {
			watchList:[] //关注列表
		};
	},
	methods:{
		edit(index){
			console.log(index);
			if(this.current===0){
				this.$emit('editCustomer',index)
			}
		}
	}
};
</script>

<style></style>
