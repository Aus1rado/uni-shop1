<template>
	<view class="goods-item">
		<!-- 左侧的盒子 -->
		<view class="goods-item-left">
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<!-- 右侧的盒子 -->
		<view class="goods-item-right">
			<!-- 商品的名字 -->
			<view class="goods-name">{{goods.goods_name}}</view>
			<!-- 商品的信息 -->
			<view class="goods-info-box">
				<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
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
		}
	}
</script>

<style lang="scss">
	.goods-item {
		background-color: #fff;
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
		
		.goods-item-left {
			margin-right: 5px;
			
			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			
			.goods-name {
				font-size: 13px;
			}
			
			.goods-info-box {
				
				.goods-price {
					color: #C00000;
					font-size: 16px;
				}
			}
		}
	}
</style>