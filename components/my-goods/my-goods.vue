<template>
	<view class="goods-item">
		<!-- 左侧的盒子 -->
		<view class="goods-item-left">
			<!-- 使用 v-if 指令控制 radio 组件的显示与隐藏 -->
			<!-- 存储在购物车中的商品，包含 goods_state 属性，表示商品的勾选状态 -->

			<radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<!-- 右侧的盒子 -->
		<view class="goods-item-right">
			<!-- 商品的名字 -->
			<view class="goods-name">{{goods.goods_name}}</view>
			<!-- 商品的信息 -->
			<view class="goods-info-box">
				<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
				<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		
		props: {
			goods:{
				type: Object,
				default: {}
			},
			
			// 是否展示图片左侧的 radio
			showRadio: {
				type: Boolean,
				// 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
				default: false
			},
			
			// 是否展示价格右侧的 NumberBox 组件
			showNum: {
				type: Boolean,
				default: false
			}
		},
		
		data() {
			return {
				// 默认的图片
				defaultPic: 'https://img2.baidu.com/it/u=1793059765,2651512268&fm=253&fmt=auto&app=120&f=JPEG?w=1575&h=800'
			};
		},
		
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2) 
			}
		},
		
		methods: {
			// 这是 radio 组件的点击事件处理函数
			radioClickHandler() {
				// 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
				// 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
				this.$emit('radio-change', {
					// 商品的 Id
					goods_id: this.goods.goods_id,
					// 商品最新的勾选状态
					goods_state: !this.goods.goods_state
				})
			},
			
			// 监听到了 NumberBox 组件数量变化的事件
			numChangeHandler(val) {
				// 通过 this.$emit() 触发外界通过 @ 绑定的 num-change 事件
				this.$emit('num-change', {
					goods_id: this.goods.goods_id,
					goods_count: +val
				})
			},
		},
	}
</script>

<style lang="scss">
	.goods-item {
		width: 750rpx;
		box-sizing: border-box;
		background-color: #fff;
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
		
		.goods-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		.goods-item-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
			
			.goods-name {
				font-size: 13px;
			}
			
			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.goods-price {
					color: #C00000;
					font-size: 16px;
				}
			}
		}
	}
</style>