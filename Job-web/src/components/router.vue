<template>
	<header class="cephalosome" :class="{ 'searchactive': isCustomStyle }">
		<div class="search-content" ref="navbarRef" :style="navbarStyle">
			<div class="site">
				<span @click="toggleRegion">不限</span><i :style="{ transform: iconRotation }"></i>
				<div class="site_region" v-show="showRegion">
					<!-- <div @click="selectRegion({ regionId: -1, regionName: '不限' })"
						:class="{ active: selectedRegion.regionId === -1 }">不限</div> -->
					<div v-for="item in getList" :key="item.regionId" @click="selectRegion(item)"
						:class="{ active: selectedRegion.regionId === item.regionId }">{{ item.regionName }}
					</div>
				</div>
			</div>
			<div class="search" @click="search()">搜索您想要的职位</div>
			<div class="information" @click="Information" ref="iconRef" :style="iconStyle"></div>
		</div>
	</header>
	<router-view></router-view>
	<footers :iiusdis="userId" />
</template>
<script lang="ts" setup>

import { ref, onMounted, provide } from "vue";
import axios from "axios";
import apiUrl from '../api/api.js'
import { useRouter } from "vue-router";
const router = useRouter()
import footers from '@/views/footer.vue';
// 拿到用户id(路由)
const userId = router.currentRoute.value.params.iiusdis;
// 显示地区
const showRegion = ref(false)
// 图标旋转
const iconRotation = ref('rotate(0deg)')
// 选择地区
const selectedRegion = ref({ regionId: -1, regionName: '广州' })
// 地区数据
const getList = ref<{
	regionId: number,
	regionName: string
}[]>([])
// 图标旋转事件
const toggleRegion = () => {
	showRegion.value = !showRegion.value;
	iconRotation.value = showRegion.value ? 'rotate(180deg)' : 'rotate(0deg)';
};
// 控制是否添加自定义样式的变量
const isCustomStyle = ref(false);
// 创建一个响应式变量 传递数据给子组件
const sharedData = ref();
// 提供数据
provide('sharedData', sharedData);
// 把拿到的数据渲染到到页面
const selectRegion = (region) => {
	iconRotation.value = 'rotate(0deg)';
	const spanElement = document.querySelector('.site > span') as HTMLElement;
	selectedRegion.value = region;
	showRegion.value = false;
	spanElement.innerText = region.regionName;

	// 保存选中的地区到本地存储
	localStorage.setItem('selectedRegion', JSON.stringify(region));
	// if (spanElement.innerText === "不限") {
	// 	sharedData.value = 0
	// }
	if (spanElement.innerText === "广州") {
		sharedData.value = 1
	} else {
		sharedData.value = 2
	}
};

// 进入页面加载
onMounted(async () => {
	try {
		const response = await fetch(apiUrl + 'api/region/getList')
		const data = await response.json()
		getList.value = data.data;
		// 从本地存储中获取选中的地区，并更新页面
		const storedRegion = localStorage.getItem('selectedRegion');
		if (storedRegion) {
			selectedRegion.value = JSON.parse(storedRegion);
			const spanElement = document.querySelector('.site > span') as HTMLElement;
			spanElement.innerText = selectedRegion.value.regionName;
		}
	} catch (error) {
		console.error(error)
	}
})

const navbarRef = ref<HTMLElement | null>(null)
const iconRef = ref<HTMLElement | null>(null)
const scrollPosition = ref(0)

onMounted(() => {
	window.addEventListener('scroll', handleScroll)
})

function handleScroll() {
	// 如果滚动位置大于 0，则添加样式
	isCustomStyle.value = window.scrollY > 0;
	const navbarElement = navbarRef.value;
	// 获取元素
	if (!navbarElement) return;
	// 获取滚动位置
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	// 获取元素高度
	const divHeight = navbarElement.offsetHeight || 0;
	// 判断滚动位置
	scrollPosition.value = scrollTop;
	if (scrollTop >= divHeight) {
		const site = document.querySelector('.site') as HTMLElement;
		const search = document.querySelector('.search') as HTMLElement;

		// 改变搜索框样式
		search.style.marginLeft = '.6rem';
		// 隐藏地区选择框
		site.style.display = 'none';
		const opacity = Math.min((scrollTop - divHeight) / 100, 1)
		// 背景颜色
		const backgroundColor = `rgba(255, 255, 255, ${opacity})`;
		// 字体颜色
		const fontColor = `rgba(56, 56, 56, ${opacity})`;
		// 图标颜色
		const iconColor = `rgba(195, 203, 214, ${opacity})`;
		// 设置样式
		navbarStyle.value = {
			backgroundColor,
			color: fontColor,
		};
		// 设置图标
		iconStyle.value = {
			color: iconColor,
		};
	} else {
		const site = document.querySelector('.site') as HTMLElement;
		const search = document.querySelector('.search') as HTMLElement;
		// 设置默认搜索框样式
		search.style.marginLeft = '';
		// 显示地区选择框
		site.style.display = 'block';
		// 设置默认样式
		navbarStyle.value = {
			backgroundColor: '',
			color: '',
		};
		// 设置默认图标
		iconStyle.value = {
			color: '',
		};
	}
}

const navbarStyle = ref<{
	backgroundColor?: string;
	color?: string;
	transition?: string
}>({
	transition: 'background-color 0.5s, color 0.5s',
})

const iconStyle = ref<{
	color?: string;
	transition?: string
}>({
	transition: 'background-color 0.5s, color 0.5s',
})


function search() {
	router.push(`/Search/${userId}`)
}


function Information() {
	if (userId == ':iiusdis') {
		router.push('/register')

	}
	else if (userId == 'null') {
		router.push('/register')

	} else {
		router.push(`/Information/${userId}`)
	}
}
</script>
<style>
.active {
	color: #0152fe !important;
}

.site_region {
	display: none;
}

.site_region.show {
	display: block;
}

.exact {
	color: #0152fe !important;
}

.searchactive {
	position: fixed !important;
	z-index: 10 !important;
	top: 0 !important;
	left: 50% !important;
	transform: translateX(-50%) !important;
}
</style>
