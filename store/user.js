export default {
	// 开启命名空间
	namespaced: true,
	
	// 数据
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: JSON.parse(uni.getStorageSync('token') || '{}'),
		// 用户的信息对象
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		// 重定向的 object 对象
		redirectInfo: null
	}),
	
	// 方法
	mutations: {
		// 更新收货地址
		updateAddress(state, address) {
			state.address = address
			
		},
		
		// 持续化存储到本地
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		
		updateUserInfo(state, userinfo) {
			state.userinfo = userinfo
			// 通过 this.commit() 方法，调用 m_user 模块下的 saveUserInfoToStorage 方法，将 userinfo 对象持久化存储到本地
			this.commit('m_user/saveUserInfoToStorage')
		},
		
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		
		// 更新 token 字符串
		updateToken(state, token) {
			state.token = token
			// 通过 this.commit() 方法，调用 m_user 模块下的 saveTokenToStorage 方法，将 token 字符串持久化存储到本地
			this.commit('m_user/saveTokenToStorage')
		},
		
		// 将 token 字符串持久化存储到本地
		saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
		},
		
		updateRedirectInfo(state, info) {
			state.redirectInfo = info
		}
	},
	
	getters: {
		addstr() {
			if (!state.address.provinceName) return ''
			
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
	
}