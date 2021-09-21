<template>
	<view style="padding:0 48px;background-color: #FFFFFF;height: 100%;">
		<view style="display: flex;padding: 92px 0 48px 0;">
			<image src="../../static/logo.png" style="width: 64px;height: 64px;padding-right: 12px;" />
			<view style="width: calc(100% - 64px);">
				<view style="font-size: 24px;font-weight: 500;line-height: 33px;">手机号登录</view>
				<view style="color: #999999;">巧巧终于等到您</view>
			</view>
		</view>
		<u-form :border-bottom="false">
			<u-form-item style="height: auto;padding: 0;border: none;">
				<u-field placeholder="请先输入手机号" label-width="0" style="height:56px;" :clearable="false"></u-field>
			</u-form-item>
			<u-form-item style="height: auto;padding: 0;border: none;">
				<u-field placeholder="6位验证码" label-width="0" style="height:56px;" :clearable="false">
					<view slot="right">
						<u-verification-code
							:keep-running="true"
							:seconds="seconds"
							@end="end"
							@start="start"
							ref="uCode"
							@change="codeChange"
							:startText="startText"
							:changeText="changeText"
							:endText="endText"
						></u-verification-code>
						<u-button @tap="getCode">{{ tips }}</u-button>
					</view>
				</u-field>
			</u-form-item>
		</u-form>
		<view style="text-align: right;margin: 16px 0px 0 0;">
			<text style="color: #999999;" v-if="!voiceCode" @click="getVoiceCode">收不到验证码？</text>
			<text style="color: #F2A100;" v-if="voiceCode">即将提供语音验证码，请注意接听～</text>
		</view>
		<uni-row style="margin-top: 40px;"><button type="primary" @click="">登录</button></uni-row>
		<view style="height: calc(100% - 476px);"></view>
		<view style="text-align: center;"><u-checkbox v-model="approve" :label-disabled="false" @change="onAgree">阅读并同意《隐私政策》</u-checkbox></view>
		<uni-popup ref="popup" :mask-click="false">
			<view
				style="display: flex;
						align-items: center;
						width: 100vw;
						height: 100vh;
						justify-content: center;"
			>
				<view
					style="width: 318px;
							height: 488px;
							border-radius: 8px;
							padding: 20px 20px 4px;
							color: rgb(51, 51, 51);
							background-color: #ffffff;position: absolute;"
				>
					<image style="width: 144px;height: 152px;position: absolute;right: 0;top: 0;" src="../../static/images/denglu-zhuangshi.png"></image>
					<view style="font-size: 18px;text-align: center;padding-bottom: 11px;">巧巧用户隐私政策</view>
					<scroll-view style="font-size: 15px;line-height: 24px;height: 320px;" scroll-y="true">
						回用下车种维号率传管书据认团北里得场力方音矿领直传团制日值全己起水江则五长使安立年应被史记建样志切半织计例及合委作白备况完标观多这与。
						身习什会米研按须亲速天马指体而化口把构派型约取儿面西个些具京一上等因管受常整状斗近听受人因好。
						或验备与公命真众得书力科出日还养规及场没路外转采维装满已者值养上全多周备决农。
						色基知必头开形很节表或它力为合术上给器往料不说入总方强真海实己区解切这连应些平土术织力价把同合消加报。
						更成所入样场林科多南证你总想却矿角先可示开公八见联从并便史全生回感件红了原新非斗七安林过比包难性问完期现群步同被。
						确满并定色较外处青自白很场明增那造支车层律连题志内门海体导战周展利一重县给二质件家切信她团联切物叫有置八满细积活心国后土圆何。
						面速数积西多度用始始造半适加得太按全会影派美八证期民主提是事引采安风点采及外道斗好处向属速四有最传给流位我或育些政义发合进花观看马多家系参报张。
						层越口进指证断规意高信切动要路术革又才维市子社但现数度府全里道政九段流制论技自究委千后感育社选。
						回用下车种维号率传管书据认团北里得场力方音矿领直传团制日值全己起水江则五长使安立年应被史记建样志切半织计例及合委作白备况完标观多这与。
						身习什会米研按须亲速天马指体而化口把构派型约取儿面西个些具京一上等因管受常整状斗近听受人因好。
						或验备与公命真众得书力科出日还养规及场没路外转采维装满已者值养上全多周备决农。
						色基知必头开形很节表或它力为合术上给器往料不说入总方强真海实己区解切这连应些平土术织力价把同合消加报。
						更成所入样场林科多南证你总想却矿角先可示开公八见联从并便史全生回感件红了原新非斗七安林过比包难性问完期现群步同被。
						确满并定色较外处青自白很场明增那造支车层律连题志内门海体导战周展利一重县给二质件家切信她团联切物叫有置八满细积活心国后土圆何。
						面速数积西多度用始始造半适加得太按全会影派美八证期民主提是事引采安风点采及外道斗好处向属速四有最传给流位我或育些政义发合进花观看马多家系参报张。
						层越口进指证断规意高信切动要路术革又才维市子社但现数度府全里道政九段流制论技自究委千后感育社选。
					</scroll-view>
					<view>
						<button type="primary" style="margin: 12px 0 8px 0;height: 40px;" @click="agree()">同意</button>
						<button style="height: 40px;" @click="disAgree()">不同意</button>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			approve: false,
			voiceCode: false,
			timeOut: 0,
			tips: '',
			seconds: 60,
			startText: '获取验证码',
			changeText: 'X秒重新获取',
			endText: '重新获取'
		};
	},
	methods: {
		codeChange(text) {
			// console.log(text);
			this.tips = text;
		},
		getCode() {
			if (this.$refs.uCode.canGetCode) {
				// 模拟向后端请求验证码
				uni.showLoading({
					title: '正在获取验证码'
				});
				setTimeout(() => {
					uni.hideLoading();
					// 这里此提示会被this.start()方法中的提示覆盖
					this.$u.toast('验证码已发送');
					// 通知验证码组件内部开始倒计时
					this.$refs.uCode.start();
				}, 2000);
			} else {
				this.$u.toast('倒计时结束后再发送');
			}
		},
		end() {
			// this.$u.toast('倒计时结束');
		},
		start() {
			// this.$u.toast('倒计时开始');
		},
		reset() {
			this.$refs.uCode.reset();
		},
		getVoiceCode() {
			this.voiceCode = true;
		},
		onAgree({ value }) {
			console.log(value);
			if (value) {
				this.open();
			} else {
				this.close();
			}
		},
		open() {
			// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
			this.$refs.popup.open('top');
		},
		close() {
			this.$refs.popup.close();
		},
		agree() {
			this.close();
		},
		disAgree() {
			this.approve = false;
			this.close();
		}
	}
};
</script>

<style></style>
