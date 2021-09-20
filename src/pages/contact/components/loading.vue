<template>
	<view style="width: 100%;height:100vh;text-align: center;padding-top: 137px;background-color: #FFFFFF;">
		<image src="/static/images/contact-loading.png" 
		style="width: 120px;height: 120px;"></image>
		<view>正在导入联系人，请耐心等待片刻</view>
		<view style="padding: 36px;">
			<u-line-progress :percent="100" :show-percent="false" striped striped-active active-color="#0055FF "></u-line-progress>
		</view>
	</view>
</template>

<script>
</script>

<style>
</style>
