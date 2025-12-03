<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "uview-ui/index.scss";
	@import "./static/iconfont.css";
	page {
		background-color: #f3f4f8;
		height: 100%;
	}
	.add-customer{
		position: fixed;
		z-index: 10000;
		.uni-fab__circle--leftBottom{
			z-index: 10000;
		    left: calc(50% - 27px)!important;
		}
	}
	.wrap{
		.uni-navbar__header-btns-left{
			width: auto!important;
		}
	}
</style>
