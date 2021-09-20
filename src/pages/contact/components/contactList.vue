<template>
	<view v-if="loaded">
		<view v-if="list.length > 0">
			<view class="group-members-page-top">
				<u-search
					placeholder="搜索"
					v-model="searchKey"
					bgColor="#FFFFFF"
					borderColor="#E6E6E6"
					shape="square"
					height="80"
					:show-action="false"
					@search="searchContact"
				></u-search>
			</view>
			<view v-if="searchKey.length > 0">
				<scroll-view scroll-y :style="[{ height: 'calc(100vh - ' + CustomBar + 'px)' }]" :scroll-with-animation="true" :enable-back-to-top="true">
					<view v-for="(item, i) in searchResult" :key="i"  style="display: flex;justify-content: space-between;align-items: center;width: 100vw;padding: 16px;">
								<view>
									<text style="color:#333333;font-weight: 500;font-size: 18px;">{{ item.displayName }}</text>
									<p style="color: #999999;font-size: 14px;">{{ item.phoneNumbers[0].value }}</p>
								</view>
								<view v-if="item.attention === '1'" style="text-align: right;display: flex;">
									<view style="color: #999999;width: 64px;height: 32px;font-size: 14px;line-height: 32px;padding-right: 6px;text-align: center;">已关注</view>
									<u-button
										type="primary"
										style="width: 64px;height: 32px;font-size: 14px;line-height: 32px;margin-right: 6px;padding: 6px 18px;"
										@click="deImportant(item)"
									>
										取关
									</u-button>
								</view>
								<view v-else style="text-align: right;display: flex;">
									<u-button
										style="width: 64px;height: 32px;font-size: 14px;line-height: 32px;margin-right: 6px;padding: 6px 18px;"
										@click="onRemove(item)"
									>
										移除
									</u-button>
									<u-button
										type="primary"
										style="width: 64px;height: 32px;font-size: 14px;line-height: 32px;margin-right: 6px;padding: 6px 18px;"
										@click="onImportant(item)"
									>
										重视
									</u-button>
								</view>
					</view>
				</scroll-view>
			</view>
			<view v-else>
				<scroll-view
					scroll-y
					class="indexes"
					:scroll-into-view="'indexes-' + listCurID"
					:style="[{ height: 'calc(100vh - ' + CustomBar + 'px)' }]"
					:scroll-with-animation="true"
					:enable-back-to-top="true"
				>
					<view v-for="(item, index) in list" :key="index">
						<view :class="'indexItem-' + item" :id="'indexes-' + item" :data-index="item">
							<view class="letter-box box-size14" v-show="item">
								<view class="action" style="padding:0 16px;">
									<text class="fw500 font-color666">{{ item }}</text>
								</view>
							</view>
							<view class="cu-list menu box-size14 bgcolorfff">
								<view class="cu-item card-height54 " v-for="(name, i) in names" :key="i" v-if="names[index][i]">
									<view class="flex-layout height-cover middle-layout">
										<view class="ml16" style="display: flex;justify-content: space-between;align-items: center;width: calc(100vw - 100rpx);">
											<view>
												<text style="color:#333333;font-weight: 500;font-size: 18px;">{{ names[index][i].displayName }}</text>
												<p style="color: #999999;font-size: 14px;">{{ names[index][i].phoneNumbers[0].value }}</p>
											</view>
											<view v-if="names[index][i].attention === '1'" style="text-align: right;display: flex;">
												<view style="color: #999999;width: 64px;height: 32px;font-size: 14px;line-height: 32px;padding-right: 6px;text-align: center;">
													已关注
												</view>
												<u-button
													type="primary"
													style="width: 64px;height: 32px;font-size: 14px;line-height: 32px;margin-right: 6px;padding: 6px 18px;"
													@click="deImportant(names[index][i])"
												>
													取关
												</u-button>
											</view>
											<view v-else style="text-align: right;display: flex;">
												<u-button
													style="width: 64px;height: 32px;font-size: 14px;line-height: 32px;margin-right: 6px;padding: 6px 18px;"
													@click="onRemove(names[index][i])"
												>
													移除
												</u-button>
												<u-button
													type="primary"
													style="width: 64px;height: 32px;font-size: 14px;line-height: 32px;margin-right: 6px;padding: 6px 18px;"
													@click="onImportant(names[index][i])"
												>
													重视
												</u-button>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="indexBar" :style="[{ height: 'calc(100vh - ' + CustomBar + 'px)' }]">
					<view class="indexBar-box font-size12 font-color999" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
						<view
							:class="['indexBar-item', listCurID == item ? 'active' : '']"
							v-for="(item, index) in list"
							:key="index"
							:id="index"
							@touchstart="getCur"
							@touchend="setCur"
						>
							{{ item }}
						</view>
					</view>
				</view>
				<!--选择显示-->
				<view v-show="!hidden" class="indexToast">{{ listCur }}</view>
			</view>
		</view>
		<view v-else>
			<u-empty text="通讯录暂无数据"></u-empty>
			<button type="primary" style="width: 147px;" @click="reImport">再次导入</button>
		</view>
	</view>
	<view v-else style="display: flex;height: 100vh;align-items: center;justify-content: center;"><u-loading size="100"></u-loading></view>
</template>

<script>
import renDropdownFilter from '../../../components/ren-dropdown-filter/ren-dropdown-filter.vue';
import vPinyin from './vue-py.js';
export default {
	props: {
		contacts: {
			required: true
		}
	},
	components: { renDropdownFilter },
	data() {
		return {
			searchKey: '',
			StatusBar: this.StatusBar,
			CustomBar: 72,
			hidden: true,
			listCurID: 'A',
			listCur: '',
			FristPin: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
			items: {},
			list: [],
			names: [],
			searchResult: [],
			loaded: false
		};
	},
	watch: {
		contacts(newValue, oldValue) {
			this.initData();
			if(this.searchKey.length>0){
				this.searchContact()
			}
		}
	},
	mounted() {
		this.initData();
	},
	onReady() {
		let that = this;
		uni.createSelectorQuery()
			.select('.indexBar-box')
			.boundingClientRect(function(res) {
				that.boxTop = res.top;
			})
			.exec();
		uni.createSelectorQuery()
			.select('.indexes')
			.boundingClientRect(function(res) {
				that.barTop = res.top;
			})
			.exec();
	},
	methods: {
		reImport() {
			uni.$emit('reImport');
		},
		initData() {
			var itemArr = [];
			let contactList = [];
			let namesList = [];
			for (let i = 0; i < this.contacts.length; i++) {
				//遍历数组,拿到文字名称
				let itemName = this.contacts[i].displayName;
				//取全部文字的首字母
				let fristName = vPinyin.chineseToPinYin(this.contacts[i].displayName); //这里截取首字母的第一位
				//给原json添加首字母键值对
				this.contacts[i].first = fristName;
				//放入新数组
				itemArr.push(this.contacts[i]);
			}

			let items = {};
			//根据首字母键值对给原数据按首字母分类
			for (let i = 0; i < this.FristPin.length; i++) {
				//这里的FirstPin是一个写入了所有字母的数组,见data中
				var thisFristPin = this.FristPin[i];
				items[this.FristPin[i]] = itemArr.filter(function(value) {
					return value.first === thisFristPin;
				});
			}
			let thisFirst = '';
			var nameArr = [];
			for (let i = 0; i < 22; i++) {
				//22个字母
				let thisLength = items[this.FristPin[i]].length; //当前首字母有几个同字母的字段
				if (thisLength > 0) {
					//大于0，排除空数组
					for (let j = 0; j < thisLength; j++) {
						let newFirst = items[this.FristPin[i]][j].first; //获取当前字母
						if (thisFirst == newFirst) {
							//判断当前字母和获取字母是否相同
							nameArr.push(items[this.FristPin[i]][j]);
							continue;
						} else {
							thisFirst = newFirst;
							nameArr = [];
							nameArr.push(items[this.FristPin[i]][j]);
						}
						contactList.push(newFirst);
						namesList.push(nameArr);
					}
				}
			}
			this.list = contactList;
			this.names = namesList;
			this.loaded = true;
		},
		//移除
		onRemove(contact) {
			uni.$emit('onRemove', contact);
		},
		//重视
		onImportant(contact) {
			uni.$emit('onImportant', contact);
		},
		//取关
		deImportant(contact) {
			uni.$emit('deImportant', contact);
		},
		//搜索
		searchContact(val) {
			this.searchResult=this.contacts.filter((item)=>{
				if(item.displayName.indexOf(this.searchKey)>-1){
					return item;
				}
			})
		},
		//获取文字信息
		getCur(e) {
			this.hidden = false;
			this.listCur = this.list[e.target.id];
		},
		setCur(e) {
			this.hidden = true;
			this.listCur = this.listCur;
		},
		//滑动选择Item
		tMove(e) {
			let y = e.touches[0].clientY,
				offsettop = this.boxTop,
				that = this;
			//判断选择区域,只有在选择区才会生效
			var thatCur = this.listCur;
			if (y > offsettop) {
				let num = parseInt((y - offsettop) / 20);
				this.listCur = that.list[num];
			}
			if (this.listCur == undefined) {
				//当滑动为空时获取最后的字母显示
				this.listCur = thatCur;
			}
		},

		//触发全部开始选择
		tStart() {
			this.hidden = false;
		},

		//触发结束选择
		tEnd() {
			this.hidden = true;
			this.listCurID = this.listCur;
		},
		indexSelect(e) {
			let that = this;
			let barHeight = this.barHeight;
			let list = this.list;
			let scrollY = Math.ceil((list.length * e.detail.y) / barHeight);
			for (let i = 0; i < list.length; i++) {
				if (scrollY < i + 1) {
					that.listCur = list[i];
					that.movableY = i * 20;
					return false;
				}
			}
		}
	}
};
</script>

<style>
.group-members-page-top {
	height: 72px;
	background: #fff;
	padding: 16px 16px 4px 16px;
}
page {
	height: 100%;
}
.indexes {
	position: relative;
}

.indexBar {
	position: fixed;
	right: 0px;
	top: 50%;
	padding: 20upx 20upx 20upx 60upx;
	display: flex;
	align-items: center;
	transform: translateY(-50%);
}

.indexBar .indexBar-box {
	width: 40upx;
	height: auto;
	/* background: #fff; */
	display: flex;
	flex-direction: column;
	/* box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1); */
	border-radius: 10upx;
}

.indexBar-item {
	flex: 1;
	width: 14px;
	height: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 10px;
	color: #888;
}

movable-view.indexBar-item {
	width: 40upx;
	height: 40upx;
	z-index: 9;
	position: relative;
}

/* movable-view.indexBar-item::before {
	content: '';
	display: block;
	position: absolute;
	left: 0;
	top: 10upx;
	height: 20upx;
	width: 4upx;
	background-color: #f37b1d;
} */

.indexToast {
	position: fixed;
	top: 0;
	right: 80upx;
	bottom: 0;
	/* background: rgba(0, 0, 0, 0.5); */
	background: url(../../../static/images/通讯录-img-字母轴背景.png) no-repeat;
	background-size: contain;
	width: 90px;
	height: 90px;
	/* border-radius: 10upx; */
	margin: auto;
	color: #fff;
	line-height: 90px;
	/* text-align: left; */
	font-size: 40px;
	font-weight: bold;
	padding-left: 23px;
}
.letter-box {
	height: 52upx;
	line-height: 52upx;
}
.head_portrait {
	width: 72upx;
	height: 72upx;
}
.name-color {
	color: #0d0e15;
}
.group-members-scroll {
	/* flex: 1; */
	/* overflow-y: scroll; */
	height: calc(100vh - 72px);
}
.active {
	color: #007aff;
}
</style>
