<template>
    <main>
        <div class="details_content">
            <div class="Particulars ">
                <div class="header">
                    <span title="返回" class="retreat" @click="goBack"></span>
                    <span class="basics-title">职位详情</span>
                </div>
            </div>
            <section class="option">
                <div class="option-content-route">
                    <!-- 数据 start -->
                    <div class="Job-details" v-if="detailsData">
                        <div class="Job-content_top">
                            <div>
                                <span class="rec_tile">{{ detailsData.positionName }}</span>
                            </div>
                        </div>
                        <div class="Job-content_bottom">
                            <div class="Job-content-left">
                                <div>
                                    <img :src="work_happy" alt="" class="work_ppy">
                                    <span class="work_h_title">{{ detailsData.positionAffiliatedUnit }}</span>
                                </div>
                                <div class="work_content">
                                    <img :src="work_time" alt="" class="work_time">
                                    <span class="work_h_title">
                                        {{ detailsData.positionStartTime }}
                                        &nbsp;
                                        {{ detailsData.positionEndTime }}
                                    </span>
                                </div>
                                <div class="work_content">
                                    <img :src="work_eye" alt="" class="work_eye">
                                    <span class="work_h_title">
                                        <i>{{ detailsData.positionHeat }}人已查看</i>
                                    </span>
                                </div>
                            </div>
                            <div class="Job-content-right">
                                <div><span>{{ detailsData.positionSalary }}</span><i> 元/小时</i></div>
                            </div>
                        </div>
                    </div>
                    <!-- 数据 end -->
                </div>
                <div class="details" v-if="detailsData">
                    <div>
                        <span class="headline">工作内容</span>
                    </div>
                    <div>
                        <span class="details_title">工资标准</span>
                        <span class="details_content">{{ detailsData.positionSalary }}<i> 元/小时</i></span>
                    </div>
                    <div>
                        <span class="details_title">岗位要求</span>
                        <span class="details_content indent">{{ detailsData.positionJobRequirements }}</span>
                    </div>
                    <div>
                        <span class="details_title">岗位职责</span>
                        <span class="details_content indent">{{ detailsData.positionRtatement }}</span>
                    </div>
                    <div>
                        <span class="details_title">食宿安排</span>
                        <span class="details_content indent">{{ detailsData.positionArrangement }}</span>
                    </div>
                    <div>
                        <span class="details_title">其他说明</span>
                        <span class="details_content indent">{{ detailsData.positionOtherDescription }}</span>
                    </div>
                    <div class="details_submit apply">
                        <button type="submit" value="已 申 请" :disabled="isButtonDisabled" v-show="buttonLabel1">
                            已 申 请
                        </button>
                        <button type="submit" value="申 请 职 位" @click="applyForadd" v-show="buttonLabel2" id="moment">
                            {{ moment }}
                        </button>
                    </div>
                    <div class="details_submit" v-if="detailsData.positionNumber <= 0">
                        <button type="submit" value="已招满">已 招 满</button>
                    </div>
                    <div class="details_submit" v-show="userInfoShow">
                        <button type="submit" value="我 要 登 录" @click="logOut">登 录 可 申 请</button>
                    </div>
                </div>
            </section>
        </div>
        <div class="mark" v-show="markishow">
            <div class="mark-content"></div>
        </div>
        <div id="succeed" class="succeed-content" v-show="succeedishow">申请成功</div>
    </main>
</template>
<script lang='ts' setup>
import work_eye from '../img/work_eye.png'
import work_happy from '../img/work_happy.png'
import work_time from '../img/work_time.png'
import { ref, onMounted } from 'vue'
import axios from 'axios';
import apiUrl from '../api/api.js'
import { useRoute, useRouter } from 'vue-router';
// 获取路由实例
const route = useRoute();
const router = useRouter();
// 是否登录
const userInfoShow = ref(false)
// 是否显示申请成功
const moment = ref('申 请 职 位')
// 获取用户路由Id
const userId = router.currentRoute.value.params.iiusdis as string;
// 拿到职位Id(路由)
const positionId = route.query.pisoPcnisd as string;
// 已经通过获取传递的 positionId职位详情 数据进行渲染
const detailsData = ref()
// 加载蒙层
const markishow = ref(true)
// 申请成功弹出层
const succeedishow = ref(true)
// 初始化按钮可用状态
const isButtonDisabled = ref(false)
// 拿到用户信息
const userIdData = ref()
// 判断是否已经申请职位
const buttonLabel1 = ref()
const buttonLabel2 = ref()
// 返回上一页
const goBack = () => {
    router.back();
};
// 在组件挂载后获取传递的 positionId
const posoionDataList = async () => {

    // 根据 positionId 进行相应的操作，比如发送请求获取职位详情数据
    try {
        const response = await axios.get(apiUrl + 'api/position/getId', {
            params: {
                id: positionId
            },
            headers: {
                'Access-Control-Allow-Origin': '*', // 添加允许的域名，可以根据实际情况设置
            },
        });
        // 获取数据
        detailsData.value = response.data.data
        if (detailsData.value !== '') {
            markishow.value = false //隐藏加载蒙层
        }
        // 判断是否登录再发起请求
        if (userId == null || userId == ':iiusdis') {
            // 需要登录
            userInfoShow.value = true
            return
        } else {
            // 已经登录
            userInfoShow.value = false
            const responses = await axios.get(apiUrl + 'api/applyFor/getList', {
                params: {
                    userId: userId,
                    positionId: positionId
                },
            })
            const userIdDatali = responses.data.data.map(items => items.userId)

            if (userId == userIdDatali) {
                buttonLabel1.value = true;
                buttonLabel2.value = false;
            } else {
                buttonLabel1.value = false;
                buttonLabel2.value = true;
            }
            // 已完善信息
            await asyncUserData()
        }

    } catch (error) {
        console.error(error);
    }
}
// 申请职位
const applyForadd = (async () => {
    moment.value = "请 稍 等 ..."
    try {
        const response = await axios.put(apiUrl + 'api/applyFor/add', {
            userId: userId,
            positionId: positionId,
            headers: {
                'Access-Control-Allow-Origin': '*', // 添加允许的域名，可以根据实际情况设置
                'Content-Type': 'application/json;charset=utf-8' // 设置请求的内容类型为 JSON
            }
        });
        posoionDataList()
    } catch (error) {
        console.error(error);
    }
    const succeed = document.getElementById('succeed') as HTMLInputElement;
    setTimeout(() => {
        succeedishow.value = true
        setTimeout(() => {
            succeed.style.top = '10%';
        }, 30)
        setTimeout(() => {
            succeed.style.top = '-50%';
            setTimeout(() => {
                succeedishow.value = false
            }, 100)
        }, 1500)
    }, 500)
})

// 判断是否完善个人信息
const asyncUserData = async () => {
    try {
        const resUserId = await axios.get(apiUrl + 'api/user/getId', {
            params: {
                id: userId
            },
            headers: {
                'Access-Control-Allow-Origin': '*', // 添加允许的域名，可以根据实际情况设置
                'Content-Type': 'application/json;charset=utf-8' // 设置请求的内容类型为 JSON
            }

        });
        userIdData.value = resUserId.data.data
    } catch (error) {
        console.error(error);
    }
}

// 加载页面获取数据
onMounted(async () => {
    posoionDataList()
});


// 未登录跳转登录页面
function logOut() {
    router.push('/Register');
}

</script>
<style scoped>
main {
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: #f7f7f7 !important;
    position: relative;
}

.rec_tile {
    font-size: .7rem !important;
    font-weight: 700;
    color: #535151 !important;
}

.work_h_title {
    font-size: .6rem !important;
}

.option {
    width: 100%;
    height: 100%;
    padding-bottom: 2.7rem !important;
    padding-top: 2.44rem !important;
}

.apply button {
    background-color: #05319e !important;
}

.mark {
    width: 15rem;
    position: absolute;
    top: 0;
    left: 50%;
    margin: 0 auto;
    transform: translate(-50%);
    background-color: #f5f5f5;
}

.mark-content {
    position: absolute;
    top: 4rem;
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

.succeed-content {
    position: fixed;
    z-index: 88;
    top: -50%;
    left: 50%;
    transform: translateX(-50%);
    padding: .2rem .3rem;
    font-size: .5rem;
    border-radius: .3rem;
    color: #fff;
    background-color: #05309edf;
    transition: all 1s;
}
</style>
