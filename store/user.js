export default {
	// 开启命名空间
	namespaced: true,
	
	// 数据
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}')
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
		}
	},
	
	getters: {
		addstr() {
			if (!state.address.provinceName) return ''
			
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
	
}