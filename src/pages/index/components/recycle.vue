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
				<u-cell-item v-for="item in 20" :arrow="false" bg-color="rgba(0,0,0,0)" hover-class="none">
					<view slot="title" style="font-size:18px;color:#333333">
						<text style="">张兰</text>
						<text style="padding:0 4px;color:#CCCCCC;">/</text>
						<text>画客图像</text>
					</view>
					<view slot="label">
						<text style="padding-right: 8px;">全景路演中心</text>
						<text>1天前移除</text>
					</view>
					<view slot="right-icon"><u-button style="font-size: 14px;height:32px;" @click="removeBack(item)">移回</u-button></view>
				</u-cell-item>
			</u-cell-group>
		</scroll-view>
	</view>
</template>

<script>
export default {
	methods: {
		removeBack() {
			
		}
	},
};
</script>

<style></style>
