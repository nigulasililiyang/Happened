<template>
	<view style="padding:16px">
		<u-input v-model="value" type="textarea" border placeholder="请填写10个字以上的问题描述，以便我们提供更好的帮助"/>
		<u-upload ref="uUpload" :action="action" :auto-upload="false" ></u-upload>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
