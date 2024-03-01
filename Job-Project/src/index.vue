<template>
	<header class="container">
		<div class="header-content">
			<div class="header-name_fl">长隆</div>
			<div class="header-icon1_fl"></div>
			<div class="header-location_fl">
				<span>不限</span>
				<i class="header-icon2_fl"></i>
				<div class="option">
					<span class="option_span_style">不限</span>
					<span>广州</span>
					<span>珠海</span>
				</div>
			</div>
			<div class="header-name_fr">
				<div>
					<span class="color_style color_span">
						<router-link to="/home" class="style_color" @click="refresh()">首页</router-link>
					</span>
				</div>
				<div>
					<span class="color_span">
						<router-link to="/briefIntroduction" class="style_color">平台简介</router-link>
					</span>
				</div>
				<div>
					<span class="color_span">
						<router-link to="/problem" class="style_color">常见问题</router-link>
					</span>
				</div>
				<div class="download">
					<span>App下载</span>
					<div class="downloa_app" style="display:none;">
						<div class="downloa_app_title"> IOS版本 </div>
						<div class="downloa_app_title"> Android版本 </div>
						<img src="" class="Ios" style="margin-left: 20px;margin-right: 19.5px;">
						<div class=""></div>
						<img src="" class="Andrid" style="margin-left: 19.5px;" alt="">
					</div>
				</div>
			</div>
		</div>
	</header>
	<router-view></router-view>
	<!-- 底部 start-->
</template>
<script lang="ts" setup>
import { ref, unref } from 'vue'

const dialogTableVisible = ref(false)



import { useRouter } from 'vue-router';
const router = useRouter();
function refresh() {
	router.push('/home')
	setInterval(function () {
		location.reload()
	}, 100)
}
</script>
<style scoped>
.el-button {
	font-size: 16px !important;
	color: #333333 !important;
	border: none !important;
	cursor: pointer !important;
	font-weight: 700 !important;
	background-color: transparent !important;
}

.element {
	width: 200px !important;
}

.exact {
	color: #0052fe;
	height: 80px;
	display: inline-block;
	border-bottom: 4px solid #0052fe;
	box-sizing: border-box;
}
</style>