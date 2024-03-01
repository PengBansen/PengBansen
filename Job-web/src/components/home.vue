<template>
    <!-- 首页 -->
    <div class="Job_home">
        <section class="banner">
            <img :src="bj" alt="">
            <div class="nav-content">
                <div class="content-vacation">
                    <span><img :src="vacation" alt=""></span>
                    <span class="vacation-tilte">假期急招</span>
                </div>
                <div class="long-term">
                    <span><img :src="term" alt=""></span>
                    <span class="long-term-tilte">长期有效</span>
                </div>
            </div>
        </section>
        <section class="option">
            <div class="option-content-route">
                <!-- 循环后端的数据 start -->
                <div class="Job-content" v-for="(items, index) in positionData" :key="index"
                    @click="goToDetails(items.positionId, userId)">
                    <div class="Job-content_top">
                        <div>
                            <span><img :src="recruiting" alt="" class="recruiting"></span>
                            <span class="rec_tile">{{ items.positionName }}</span>
                        </div>
                    </div>
                    <div class="Job-content_bottom">
                        <div class="Job-content-left">
                            <div>
                                <img :src="work_happy" alt="" class="work_ppy">
                                <span class="work_h_title">{{ items.positionAffiliatedUnit }}</span>
                            </div>
                            <div class="work_content">
                                <img :src="work_time" alt="" class="work_time">
                                <span class="work_h_title">
                                    {{ items.positionStartTime }} &nbsp; {{ items.positionEndTime }}</span>
                            </div>
                            <div class="work_content">
                                <img :src="work_eye" alt="" class="work_eye">
                                <span class="work_h_title">
                                    <i>{{ items.positionHeat }}人已查看</i>
                                </span>
                            </div>
                        </div>
                        <div class="Job-content-right">
                            <div><span>{{ items.positionSalary }}</span><i> 元/小时</i></div>
                            <div><i>平日标准</i></div>
                        </div>
                    </div>
                </div>
                <!-- 底部加载模块 -->
                <div class="dotsbox">
                    <div class="dotstext">努力加载中</div>
                    <div class="dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script lang="ts" setup>
import bj from '../img/bj.png'
import recruiting from '../img/recruiting.png'
import term from '../img/term.png'
import vacation from '../img/vacation.png'
import work_eye from '../img/work_eye.png'
import work_happy from '../img/work_happy.png'
import work_time from '../img/work_time.png'
import { ref, onMounted, inject, watch } from 'vue';
import { useRouter } from "vue-router";
import axios from 'axios'
import apiUrl from '../api/api.js'
const router = useRouter();
const optionClass = ref(1)
// 全部职位信息
const positionData = ref<{
    positionId: number;
    positionName: string;
    positionAffiliatedUnit: string;
    positionSalary: string;
    positionHeat: string;
    positionStartTime: number;
    positionEndTime: string;
}[]>([]);
// 职位页数
const pageNum = ref(1);
// 职位条数
const pageSize = ref(10);
// 标志变量，表示是否正在加载更多数据
let isLoadingMore = false;
// 从本地存储中获取职位数据
function getPositionDataFromLocalStorage() {
    const data = localStorage.getItem('positionDataHome');
    if (data) {
        return JSON.parse(data);
    }
    return null;
}
// 将职位数据保存到本地存储
function savePositionDataToLocalStorage(data: any) {
    localStorage.setItem('positionDataHome', JSON.stringify(data));
}
// 获取职位数据，先从本地存储获取，如果不存在或已过期，则发起请求获取新数据并更新本地存储
async function fetchPositionData() {
    isLoadingMore = true; // 将标志变量设置为true，表示正在加载数据
    try {
        const response = await axios.get(apiUrl + 'api/position/getList', {
            params: {
                pageNum: pageNum.value,
                pageSize: pageSize.value
            },
            headers: {
                'Access-Control-Allow-Origin': '*', // 根据实际情况添加允许的域名
            },
        });
        // 拿到新数据
        let newData = response.data.data;
        // 随机排序新数据
        newData = shuffleArray(newData);
        // 将新数据与现有数据合并
        positionData.value = positionData.value.concat(newData);
        // 使用获取到的新数据更新本地存储
        savePositionDataToLocalStorage(positionData.value);
        // 加载完成后，将标志变量设置为false，表示加载完成
        isLoadingMore = false;
    } catch (error) {
        console.log(error);
    }
}
// Fisher-Yates 洗牌算法，用于对数组进行随机排序
function shuffleArray(array) {
    // 洗牌算法第一次随机排序
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    // 洗牌算法第二次随机排序
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    // 返回随机排序后的数组
    return array;
}
// 注入共享数据
const sharedData = ref(inject<number>('sharedData'))
// 选择地区获取单位信息
async function sharedDataList() {
    try {
        const response = await axios.get(apiUrl + `api/position/listByRegionId`, {
            params: {
                regionId: sharedData.value,
                pageNum: pageNum.value, // 重置页码为1
                pageSize: pageSize.value // 使用当前页面大小
            },
            headers: {
                'Access-Control-Allow-Origin': '*', // 根据实际情况添加允许的域名
            },
        });
        // 覆盖原有数据
        const newshreData = shuffleArray(response.data.data);
        positionData.value = newshreData;
        // 将数据存储到本地浏览器
        savePositionDataToLocalStorage(newshreData);
        // 更新页码
        pageNum.value = 1;

    } catch (error) {
        console.log(error);
    }
}
// 监听数据变化
watch(sharedData, async (newValue, oldValue) => {
    if (newValue === 0) {
        await fetchPositionData()
    } else {
        sharedDataList()
    }
});
// 监听滚动事件
window.addEventListener("scroll", () => {
    // 如果正在加载数据或已经加载完所有数据，则直接返回，不执行后续操作
    if (isLoadingMore || positionData.value.length >= 150) {
        return;
    }
    // 获取文档高度
    const documentHeight = document.documentElement.scrollHeight;
    // 获取窗口高度
    const windowHeight = window.innerHeight;
    // 获取滚动条距离顶部的距离
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // 计算滚动条距离页面底部的距离
    const distanceToBottom = documentHeight - (windowHeight + scrollTop);
    // 当滚动条距离页面底部小于等于某个阈值时，加载更多数据
    if (distanceToBottom <= 30) {
        changePage(pageNum.value++)
    }
});
// 切换页数时重新获取数据
function changePage(page: number) {
    pageNum.value = page;
    fetchPositionData();
}
// 进入页面
onMounted(async () => {
    // 全部职位信息
    const cachedData = getPositionDataFromLocalStorage();
    if (cachedData) {
        positionData.value = cachedData;
    } else {
        await fetchPositionData();
    }

});
// 获取用户路由Id
const userId = router.currentRoute.value.params.iiusdis as string;
// 去职位详细页面
function goToDetails(positionId, userId) {
    router.push({
        name: 'Details',
        query: {
            pisoPcnisd: positionId,
            usndUdoisd: userId
        }
    });
}
</script>
<style scoped>
main {
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: #f7f7f7 !important;
}

.option-content-route {
    margin-bottom: .9rem;
}

.Job-content:last-child {
    border-bottom-left-radius: 0.3867rem !important;
    border-bottom-right-radius: 0.3867rem !important;
}
</style>