<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<!-- 收货地址组件 -->
		<!-- <my-address></my-address> -->
		
		<!-- 商品列表的标题 -->
		<view class="cart-title">
			<!-- 左侧的图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧的文本 -->
			<text class="cart-title-text">购物车</text>
		</view>
		
		<uni-swipe-action>
			<!-- 循环渲染购物车中的商品信息 -->
			<block v-for="(goods,i) in cart" :key="i">
				<!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过options 属性来指定操作按钮的配置信息 -->
				<uni-swipe-action-item :right-options="options" @click="swiperItemClickHandler(goods)">
					<!-- 在 radioChangeHandler 事件处理函数中，通过事件对象 e，得到商品的 goods_id和 goods_state -->
					<my-goods :goods="goods" :showRadio="true" :showNum="true" @radio-change='radioChangeHandler' @num-change="numberChangeHandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<!-- 使用自定义结算组件 -->
		<my-settle></my-settle>
	</view>
	
	<!-- 空白购物车的区域 -->
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="tip-text">空空如也~~~</text>
	</view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'
import { mapState, mapMutations } from 'vuex'
	
	export default {
		mixins: [badgeMix],
		
		computed: {
			// 将 m_cart 模块中的 cart 数组映射到当前页面中使用
			...mapState('m_cart', ['cart'])
		},
		
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: "#C00000"
					}
				}]
			}
		},
		
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
			// 商品的勾选状态发生了变化
			radioChangeHandler(e) {
				// console.log(e)
				this.updateGoodsState(e)
			},
			
			numberChangeHandler(e) {
				// console.log(e)
				this.updateGoodsCount(e)
			},
			
			swiperItemClickHandler(goods) {
				// console.log(goods)
				this.removeGoodsById(goods.goods_id)
			},
		}
	}
</script>

<style lang="scss">
	
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;
			
		.cart-title-text {
			font-size: 14px;
			margin-left: 10px;
		}
	}
	
	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;
		
		.empty-img {
			height: 90px;
			width: 90px;
		}
		
		.tip-text {
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}
</style>
