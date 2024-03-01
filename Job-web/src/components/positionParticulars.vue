<template>
    <main>
        <div class="positionParticulars">
            <div class="header">
                <div class="headernav">
                    <span title="返回" class="retreat" @click="retreat"></span>
                    <span>我的申请</span>
                </div>
                <div class="tablenav">
                    <div v-for="(item, index) in list" :key="index">
                        <span @click="handleClick(index)" :class="{ action: index === activeIndex }">
                            {{ item.name }}
                        </span>
                    </div>
                </div>
            </div>
            <!-- 没有申请显示图片 -->
            <div class="Particulars-img" v-show="DataList.length == 0">
                <img :src="Particulars" alt="">
            </div>
            <div class="positionParticularsart">
                <div class="option-content-route">
                    <!-- 数据 start -->
                    <div class="positionParticulars-content" v-for="items in DataList">
                        <div class="positionParticulars-content_top">
                            <div>
                                <img :src="work_happy" alt="" class="work_ppy">
                                <span class="rec_tile">职位名称：</span>
                                <span class="rec_tile">{{ items.position.positionName }}</span>
                            </div>
                        </div>
                        <div class="positionParticulars-content_bottom">
                            <div class="positionParticulars-content-left">
                                <div>
                                    <img :src="work_happy" alt="" class="work_ppy">
                                    <span class="work_h_title">所属单位：</span>
                                    <span class="work_h_title">{{ items.position.positionAffiliatedUnit }}</span>
                                </div>
                                <div class="work_content">
                                    <img :src="work_happy" alt="" class="work_ppy">
                                    <span class="work_h_title">招聘时间：</span>
                                    <span class="work_h_title">
                                        {{ items.position.positionStartTime }}
                                        {{ items.position.positionEndTime }}</span>
                                </div>
                            </div>
                            <div class="positionParticulars-content-right">
                                <div><span>{{ items.position.positionSalary }}</span><i> 元/小时</i></div>
                            </div>
                        </div>
                        <div class="positionParticulars-content_dispose">
                            <div class="particular">
                                <div>
                                    <img :src="work_happy" class="work_ppy">是否通过：
                                    <i v-if="items.applyForState == '1'">通过</i>
                                    <i v-else-if="items.applyForState == '2'" class="f3485eSty">未通过</i>
                                    <i v-else class="f3485eSty">待审核</i>
                                </div>
                                <div class="cause">
                                    <span><img :src="work_happy" alt="" class="work_ppy">原因备注：</span>
                                    <span>
                                        <textarea readonly cols="30" placeholder="暂无" rows="3"
                                            :value="items.applyForCause"></textarea>
                                    </span>
                                </div>
                            </div>
                            <div class="button-content">
                                <button @click="goToDetails(userId, items.position.positionId)">点击可查看职位详情</button>
                            </div>
                        </div>
                    </div>
                    <!-- 数据 end -->
                </div>
            </div>
            <div class="mark" v-show="markishow">
                <div class="mark-content"></div>
            </div>
        </div>
    </main>
</template>
<script lang='ts' setup>
import { ref, onMounted, watchEffect } from 'vue';
import Particulars from '../img/Particulars.png'
import work_happy from '../img/work_happy.png'
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
import axios from 'axios';
import apiUrl from '../api/api.js'

// 加载蒙层
const markishow = ref(true)

// 拿到用户id(路由)
const userId = router.currentRoute.value.params.iiusdis as string;

// 定义了一个接口（interface）ApplyForItem，描述了一个ApplyForItem的类型,ApplyForItem 包含 position 属性
interface ApplyForItem {
    position: {
        positionId: number //一个字符串类型的属性，表示职位名称。
        positionName: string //一个字符串类型的属性，表示职位名称。
        positionAffiliatedUnit: string //一个字符串类型的属性，表示职位所属单位。
        positionStartTime: string//一个字符串类型的属性，表示职位的开始时间。
        positionEndTime: string //一个字符串类型的属性，表示职位的结束时间。
        positionSalary: number //一个数字类型的属性，表示职位的薪资。

    };
    applyForState: string //一个字符串类型的属性，表示申请状态。
    applyForCause: string //一个字符串类型的属性，表示申请未通过的原因。
}
// 职位通过详情
const DataList = ref<ApplyForItem[]>([]);

// 标记是否已经发送过请求
let hasRequested = false;

// 发送请求并更新数据的函数
const fetchData = async () => {
    try {
        const response = await axios.get(apiUrl + 'api/applyFor/listAll', {
            params: {
                userId: userId
            },
        });
        // 更新数据
        DataList.value = response.data.data;
        if (DataList.value.length !== 0) {
            markishow.value = false; // 隐藏蒙层
        } else {
            setInterval(() => {
                markishow.value = false; // 隐藏蒙层
            }, 2000)
        }
    } catch (error) {
        console.log(error);
    }
};

// 当组件挂载时执行的逻辑
onMounted(async () => {
    // 发送请求
    await fetchData();
    // 设置标志，表示已经发送过请求
    hasRequested = true;
});

// 监听路由参数变化
watchEffect(() => {
    // 当路由参数 userId 发生变化时，且不是第一次进入页面时，发送请求
    if (hasRequested && userId !== router.currentRoute.value.params.iiusdis) {
        fetchData();
    }
});
// 点击进行筛选状态
const handleClick = (index) => {
    activeIndex.value = index;
    const applyForState = index === 0 ? '' : index; // 根据下标确定 applyForState 的值
    makeApiRequest({ userId, applyForState });
};
const makeApiRequest = ({ userId, applyForState }) => {
    fetch(apiUrl + `api/applyFor/listAll?userId=${userId}&applyForState=${applyForState}`)
        .then(response => response.json())
        .then(data => {
            // 处理响应数据
            DataList.value = data.data
        })
        .catch(error => {
            // 处理错误
            console.error(error);
        });
};

// 去职位详细页面
function goToDetails(userId, positionId) {
    setTimeout(() => {
        router.push({
            name: 'Details',
            query: {
                pisoPcnisd: positionId,
                userId: userId,
            }
        });
    }, 100)
}

function retreat() {
    router.push(`/Mine/${userId}`);
}
const activeIndex = ref(0)
const list = ref([
    { id: '1', name: '全部' },
    { id: '2', name: '待入职' },
    { id: '3', name: '未通过' },
    { id: '4', name: '待审核' }
])

</script>
<style scoped>
main {
    position: absolute;
    padding-top: 0;
    padding-bottom: 0;
    background-color: #f7f7f7 !important;
}

.action {
    border-bottom: 0.11rem solid #668bf1 !important;
}

.Particulars-content {
    padding-top: 112.5px;
}

.mark {
    width: 15rem !important;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    background-color: #edeff6e6;
    width: 100%;
    height: 100%;
}

.mark-content {
    position: absolute;
    top: 5rem;
    left: 43%;
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
        transform: rotate(360deg);
    }
}
</style>
