<template>
	<view>
		<!-- 使用自定义搜索组件 -->
		<!-- <my-search :bgcolor="'pink'" :radius="3"></my-search> -->
		<my-search @click="gotoSearch"></my-search>
		
		<view class="scroll-view-container">
			<!-- 左侧的滑动区域 -->
			<scroll-view scroll-y="true" class="left-scroll-view" :style="{height: wh + 'px'}">
				<block v-for="(item, i) in categoryList" :key="i">
					<view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChanged(i)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右侧的滑动区域 -->
			<scroll-view scroll-y="true" class="right-scroll-view" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="category-lv2 " v-for="(item2, i2) in categoryLevel2" :key="i2">
					<!-- 二级分类的标题 -->
					<view class="category-lv2-title">/ {{item2.cat_name}} /</view>
					<!-- 当前二级分类下的三级分类列表 -->
					<view class="category-lv3-list">
						<!-- 三级分类的item项 -->
						<view class="category-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
							<!-- 三级分类的图片 -->
							<image :src="item3.cat_icon"></image>
							<!-- 三级分类的文本 -->
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'

	export default {
		mixins: [badgeMix],
		
		data() {
			return {
				// 当前设备可用高度
				wh: 0,
				categoryList: [],
				active: 0,
				// 二级分类的列表
				categoryLevel2: [],
				scrollTop: 0,
			};
		},
		
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			
			this.getCategoryList()
		},
		
		methods: {
			// 获取分类列表的数据
			async getCategoryList() {
				const { data : res } = await uni.$http.get("/api/public/v1/categories")
				if (res.meta.status !== 200) return uni.$showMsg()
				this.categoryList = res.message
				
				// 为二级分类赋值
				this.categoryLevel2 = res.message[0].children
				
				
			},
			
			activeChanged(i) {
				this.active = i
				
				// 重新为二级分类赋值
				this.categoryLevel2 = this.categoryList[i].children
				
				// 让 scrollTop 的值在 0 与 1 之间切换
				this.scrollTop = this.scrollTop === 0 ? 0.1 : 0
			},
			
			// 跳转到商品列表页面
			gotoGoodsList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			},
			
			gotoSearch() {
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			},
		}		
		
	}
</script>

<style lang="scss">

	.scroll-view-container {
		display: flex;
	}

	.left-scroll-view {
		width: 120px;
		
		.left-scroll-view-item {
			background-color: #f7f7f7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			
			// 激活项的样式
			&.active {
				background-color: #fff;
				position: relative;
				
				// 渲染激活项左侧的红色指示边线
				&::before {
					content: ' ';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #C00000;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
	}
	
	.right-scroll-view {
		
		.category-lv2-title {
			font-weight: bold;
			font-size: 12px;
			text-align: center;
			padding: 15px 0;
		}
	}
	
	.category-lv3-list {
		display: flex;
		flex-wrap: wrap;
	}
	
	.category-lv3-item {
		width: 33.33%;
		display: flex;
		flex-direction: column;
		// 水平布局
		justify-content: center;
		// 垂直布局
		align-items: center;
		
		image {
			background-color: #C00000;
			width: 60px;
			height: 60px;
		}
		
		text {
			font-size: 12px;
		}
	}

</style>
