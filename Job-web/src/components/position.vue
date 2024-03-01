<template>
    <main>
        <div class="Job_position">
            <div class="spread1" @click="toggleSpread(1)">
                单位<i :class="{ 'rotated': spreadIndex === 1 }"></i>
            </div>
            <div class="spread2" @click="toggleSpread(2)">
                职位<i :class="{ 'rotated': spreadIndex === 2 }"></i>
            </div>
            <div class="spread3" @click="toggleSpread(3)">
                筛选<i :class="{ 'rotated': spreadIndex === 3 }"></i>
            </div>
            <!-- 单位 -->
            <div class="position_screen1" v-show="spreadIndex === 1">
                <div class="position_screen_content1">
                    <span :class="{ span_active1: selectedUnit === null }" @click="getunitId(null)">不限单位</span>
                    <span v-for="items in filtrateUnit" :key="items.unitId" @click="getunitId(items.unitId)"
                        :class="{ span_active1: items.unitId === selectedUnit }">
                        {{ items.unitName }}
                    </span>
                </div>
            </div>
            <!-- 职位 -->
            <div class="position_screen2" v-show="spreadIndex === 2">
                <div class="position_screen_content2" v-if="filtratePosition.length !== 0">
                    <span :class="{ span_active2: selectedPositionId === null }"
                        @click="getpositionId(null, null)">不限职位</span>
                    <span v-for="items in filtratePosition" :key="items.positionId"
                        @click="getpositionId(items.positionId, items.positionName)"
                        :class="{ span_active2: items.positionId === selectedPositionId }">
                        {{ items.positionName }}
                    </span>
                </div>
                <div class="screen_img" v-else>
                    <img :src="screen" alt="">
                </div>
                <div class="mark" v-show="markishow">
                    <div class="mark-content"></div>
                </div>
            </div>
            <!-- 筛选 -->
            <div class="position_screen3" v-show="spreadIndex === 3">
                <div class="position_screen_contents">
                    <div class="screen_contnet">
                        <div class="screen_title">工作周期</div>
                        <div class="screen_time creen1">
                            <span :class="{ span_active3: selectedFiltrate1 === null }"
                                @click="getFiltrateId1(null, null)">不限</span>
                            <span v-for="items in time_1" @click="getFiltrateId1(items.id, items.name)"
                                :class="{ span_active2: items.id === selectedFiltrate1 }">{{ items.name }}</span>
                        </div>
                    </div>
                    <div class="screen_contnet">
                        <div class="screen_title">用工日期</div>
                        <div class="screen_time creen2">
                            <span :class="{ span_active4: selectedFiltrate2 === null }"
                                @click="getFiltrateId2(null, null)">不限</span>
                            <span v-for="items in time_2" @click="getFiltrateId2(items.id, items.name)"
                                :class="{ span_active2: items.id === selectedFiltrate2 }">{{ items.name }}</span>
                        </div>
                    </div>
                    <div class="screen_contnet">
                        <div class="screen_title">用工类型</div>
                        <div class="screen_time creen3">
                            <span :class="{ span_active5: selectedFiltrate3 === null }"
                                @click="getFiltrateId3(null, null)">不限</span>
                            <span v-for="items in time_3" @click="getFiltrateId3(items.id, items.name)"
                                :class="{ span_active2: items.id === selectedFiltrate3 }">{{ items.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cancel" v-show="spreadIndex !== 0">
                <button @click="confirm">确认</button>
                <button @click="cancel">取消</button>
            </div>
        </div>
        <div class="Job_screen">
            <img :src="wok_screen">
        </div>
        <section class="option">
            <div class="option-content-route">
                <!-- 循环后端的数据 start -->
                <div class="position-content" v-for="(items, index) in positionData" :key="index"
                    @click="goToDetails(items.positionId, userId)">
                    <div class="position-content_top">
                        <div>
                            <span><img :src="recruiting" alt="" class="recruiting"></span>
                            <span class="rec_tile">{{ items.positionName }}</span>
                        </div>
                    </div>
                    <div class="position-content_bottom">
                        <div class="position-content-left">
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
                        <div class="position-content-right">
                            <div><span>{{ items.positionSalary }}</span><i> 元/小时</i></div>
                            <div><i>平日标准</i></div>
                        </div>
                    </div>
                </div>
                <!-- 底部加载模块 -->
                <div class="dotsbox" v-show="dotsShow">
                    <div class="dotstext">努力加载中</div>
                    <div class="dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </section>
        <div class="showTitle" v-if="positionData.length == 0">
            <div class="titlContent">
                <img :src="kk" alt="">
                <span>职位藏起来了哦 ~</span>
            </div>
        </div>
    </main>
</template>
<script lang="ts" setup>
import wok_screen from '../img/wok_screen.png'
import work_eye from '../img/work_eye.png'
import work_time from '../img/work_time.png'
import work_happy from '../img/work_happy.png'
import recruiting from '../img/recruiting.png'
import screen from '../img/screen.png'
import kk from '../img/kk.png'
import { ref, onMounted, inject, watch } from 'vue';
import { useRouter } from "vue-router";
const router = useRouter()
import axios from 'axios'
import apiUrl from '../api/api.js'
// 底部加载
const dotsShow = ref(false)
// 加载蒙层
const markishow = ref(null)
// 创建一个响应式变量来存储事件是否被触发的状态
const eventTriggered = ref(false);
// 单位
const selectedUnit = ref<number | null>(null) // 选中的单位ID，默认为null
// 单位数据
const filtrateUnit = ref<{
    unitId: number //单位Id
    unitName: string //单位名称
}[]>([])
// 获取单位筛选信息
async function filtrateData() {
    const response = await axios.get(apiUrl + 'api/unit/getList', {
    })
    filtrateUnit.value = response.data.data
}
// 拿到单位id获取职位
async function getunitId(userId: any) {
    selectedUnit.value = userId;
    if (userId == null) {
        return filtratePosition.value = []
    } else {
        const response = await axios.get(apiUrl + `api/position/getList?unitId=${userId}`, {
        })
        filtratePosition.value = response.data.data
    }
}
// 筛选职位
const selectedPositionId = ref<number | null>(null) // 选中的职位ID，默认为null
const selectedPositionName = ref<number | null>(null) // 选中的职位名称
// 筛选职位数据
const filtratePosition = ref<{
    positionId: number //职位ID
    positionName: string //职位名称
    positionPeriod: string //工作周期
    positionPeriodYong: string //用工时期
}[]>([])
function getpositionId(positionId: any, positionName) {
    selectedPositionId.value = positionId;
    selectedPositionName.value = positionName;
}
// 筛选条件
const selectedFiltrate1 = ref<number | null>(null) // 选中的工作周期，默认为null
const selectedname1 = ref<number | null>(null) // 工作周期,名称
const selectedFiltrate2 = ref<number | null>(null) // 选中的用工日期，默认为null
const selectedname2 = ref<number | null>(null) // 用工日期,名称
const selectedFiltrate3 = ref<number | null>(null) // 选中的用工类型，默认为null
const selectedname3 = ref<number | null>(null) // 用工日期,名称
// 条件数据一：工作周期
const time_1 = ref([
    { id: 1, name: "一天内" },
    { id: 2, name: "一周内" },
])
function getFiltrateId1(id: any, name: any) {
    selectedFiltrate1.value = id;
    selectedname1.value = name;
}
// 条件数据二：用工日期
const time_2 = ref([
    { id: 1, name: "一周内" },
    { id: 2, name: "一月内" },
])
function getFiltrateId2(id: any, name: any) {
    selectedFiltrate2.value = id;
    selectedname2.value = name;
}
// 条件数据三：用工类型
const time_3 = ref([
    { id: 1, name: "长期" },
])
function getFiltrateId3(id: any, name: any) {
    selectedFiltrate3.value = id;
    selectedname3.value = name;
}
// 当前展开的索引，默认为0
const spreadIndex = ref(0)
// 点击展开/收起
const toggleSpread = (index: number) => {

    if (spreadIndex.value === index) {
        spreadIndex.value = 0; // 点击已展开的项，收起
        spreadIndex.value = spreadIndex.value === index ? 0 : index;
    } else {
        spreadIndex.value = index; // 点击未展开的项，展开
    }
};
// 点击确认按钮
const confirm = () => {
    if (selectedUnit.value !== null) {
        eventTriggered.value = true
    } else if (selectedname1.value != null) {
        eventTriggered.value = true
    } else if (selectedname2.value != null) {
        eventTriggered.value = true
    } else if (selectedname3.value != null) {
        eventTriggered.value = true
    } else {
        eventTriggered.value = false
    }
    // 发起请求
    axios.get(apiUrl + 'api/position/getList', {
        params: {
            unitId: selectedUnit.value,
            positionName: selectedPositionName.value,
            positionPeriod: selectedname1.value,
            positionPeriodYong: selectedname2.value,
            positionStartTime: selectedname3.value,
        },
    })
        .then((response) => {
            positionData.value = response.data.data;
        })
        .catch((error) => {
            console.log(error)
        })

    setTimeout(function () {
        // 隐藏展开的内容
        spreadIndex.value = 0;
    }, 150)
};
// 点击取消按钮
const cancel = () => {
    setTimeout(function () {
        // 隐藏展开的内容
        spreadIndex.value = 0;
    }, 150)
};
// 获取全部职位信息
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
    const data = localStorage.getItem('positionData');
    if (data) {
        return JSON.parse(data);
    }
    return null;
}
// 将职位数据保存到本地存储
function savePositionDataToLocalStorage(data: any) {
    localStorage.setItem('positionData', JSON.stringify(data));
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
        // 加载完成后，隐藏底部加载动画
        dotsShow.value = false
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
        return
    }
    // 监听事件dffound事件触发时，不执行后续操作
    if (eventTriggered.value) {
        return
    }
    // 获取文档高度
    const dHeight = document.documentElement.scrollHeight;
    // 获取窗口高度
    const windowHeight = window.innerHeight;
    // 获取滚动条距离顶部的距离
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // 计算滚动条距离页面底部的距离
    const dBottom = dHeight - (windowHeight + scrollTop);
    // 当滚动条距离页面底部小于等于某个阈值时，加载更多数据
    if (dBottom <= 30) {
        dotsShow.value = true
        changePage(pageNum.value++)
    }
});

// 切换页数时重新获取数据
function changePage(page: number) {
    pageNum.value = page
    fetchPositionData()
}
onMounted(async () => {
    // 全部职位信息
    const cachedData = getPositionDataFromLocalStorage()
    if (cachedData) {
        positionData.value = cachedData;
    } else {
        await fetchPositionData()
    }
    // 单位
    await filtrateData()
})
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
    })
}
</script>
<style lang="css" scoped>
/* 添加一个旋转的 CSS 类 */
.rotated {
    transform: rotate(180deg);
    transition: all 0.2s;
}

.option {
    padding-top: 0.5rem;
    border-radius: 37.5px;
}

main {
    background-color: #f6f6f6 !important;
}

.position_screen_content img {
    margin: 0 auto;
    width: 75%;
    height: 750px;
}

.screen_img {
    height: 88%;
}

.screen_img img {
    width: 73%;
    height: 100%;
    overflow: hidden;
}

.position_screen1,
.position_screen2,
.position_screen3 {
    z-index: 999;
}

.span_active1,
.span_active2,
.span_active3,
.span_active4,
.span_active5,
.span_active6 {
    border: .06rem solid #0152fe !important;
    background-color: #fff !important;
    color: #275ffd !important;
}

.showTitle {
    position: absolute;
    top: -1.2rem;
    background-color: #fff;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: .4rem;
    color: #9499b0;
    position: relative;
}

.showTitle .titlContent {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -0.1%) !important;
    background-color: #fff;
}

.titlContent img {
    width: 5rem;
    height: 6.3rem;
}

.titlContent span {
    display: inline-block;
    position: absolute;
    top: 67%;
    left: 50%;
    transform: translate(-50%, 2%) !important;
}

.option-content-route {
    margin-bottom: .9rem;
}

/* 蒙层 */
.mark {
    position: absolute;
    width: 15rem;
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    background-color: #f5f5f5;
}

.mark-content {
    position: absolute;
    top: 4rem;
    left: 48%;
    margin: 0 auto;
    border: 3px solid #05309e4f;
    border-top-color: #05319e;
    border-radius: 50%;
    width: 2em;
    height: 2em;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg)
    }
}
</style>