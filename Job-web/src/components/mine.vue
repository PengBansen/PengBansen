<template>
    <main>
        <div class="Job_my">
            <section class="register-nav">
                <img :src="job_my" class="register_bj">
                <div class="register_skip">
                    <!-- 未登录头像 -->
                    <div class="register_img" @click="getuserId()" :style="{ display: userIdlist ? 'none' : 'felx' }">
                        <img :src="defaultAvatar" alt="">
                    </div>
                    <!-- 登录默认头像 -->
                    <div class="register_img" @click="avatarshow()" :style="{ display: userIdlist ? 'flex' : 'none' }">
                        <img :src="defaultAvatar" alt="">
                    </div>
                    <!-- 未登录 -->
                    <div class="register_click" @click="getregister()" :style="{ display: userIdlist ? 'none' : 'felx' }">
                        <span class="register_up">点击登录</span>
                        <span class="register_title">立即登录，体验更多功能</span>
                    </div>
                    <!-- // -->
                    <!-- 登录 -->
                    <div class="register_click relogOut" v-if="userData" :style="{ display: userIdlist ? 'flex' : 'none' }">
                        <span class="register_up">{{ getFirstThreeDigits() }}****{{ getLastFourDigits() }}</span>
                        <span class="register_title titleStyle"
                            :class="{ 'color1': userData.userState === 1, 'color2': userData.userState === 2 }">
                            {{ userData.userState === 1 ? '已入职' : '未入职' }}
                        </span>
                        <div class="logOut" @click="logOut">退出登录</div>
                    </div>
                    <!-- // -->
                    <div class="register_ico">
                        <span class="register_content"></span>
                    </div>
                </div>
                <div class="job_my_resume">
                    <div class="resume_title">我的简历</div>
                    <div class="resume_acceptance">完善简历提高您的录取率</div>
                    <div class="resume_accomplish" @click="getuserId()">
                        <span class="resume_button">去完善</span>
                        <!-- <span class="resume_button">100%</span> -->
                    </div>
                </div>
            </section>
            <section class="applyfor" @click="Particulars">
                <div class="applyfor_examine">
                    <span class="applyfor_examine_my">我的申请</span>
                    <span class="applyfor_examine_title">查看全部 <i></i></span>
                </div>
                <div class="applyfor_examine_content">
                    <div><img :src="apply" alt="已报名"></div>
                    <div><img :src="interview" alt="待面试"></div>
                    <div><img :src="entry" alt="待入职"></div>
                </div>
            </section>
            <section class="more">
                <div class="more_top">
                    <span class="more_top_serve">更多服务 (正在维护)</span>
                </div>
                <div class="more_bottom">
                    <div><img :src="collect" alt="我的收藏"></div>
                    <div><img :src="history" alt="历史职位"></div>
                    <div><img :src="feedback" alt="我要反馈"></div>
                    <div><img :src="inregardto" alt="关于我们"></div>
                </div>
            </section>
        </div>
        <footers />
        <div class="popup" v-if="userData" v-show="userishow">
            <div class="popup-content">
                <div class="popSpan">欢迎回来!</div>
                <div class="userPhone">用户: {{ getFirstThreeDigits() }}****{{ getLastFourDigits() }}</div>
            </div>
        </div>
        <div class="headPortrait" id="headPortrait">
            <div class="header">
                <span class="retreat" @click="avatarbtn"></span>
                <span class="basics-title">证件照</span>
            </div>
            <div class="Portrait-content">
                <div class="startcontent">
                    <!-- 头像显示区域 -->
                    <div class="startcontent-img-titme">
                        <span @click="openFileExplorer" :class="{ shake: shakeDiv }">
                            <!-- 点击图片触发文件选择 -->
                            <img :src="displayedImage" alt="">
                        </span>
                        <span>证件照要求：</span>
                        <div class="box-content" v-show="ballsShow2">已上传</div>
                    </div>
                    <!-- 头像要求说明 -->
                    <div class="defaultAvatar-title">
                        <span>本人近期 <i>正面、免冠、无特殊修改的照片。</i></span>
                        <span>证件照片 <i>必须清晰完整。</i></span>
                        <span>证件说明 <i>由于关系到是否能通过申请，请谨慎上传。</i></span>
                    </div>
                </div>
                <!-- 上传按钮 -->
                <div class="defaultAvatar-button">
                    <button @click="throttledUpload" id="uploadButton">立刻上传</button>
                </div>
            </div>
            <!-- 上传加载动画 -->
            <div class="balls" v-show="ballsShow">
                <div class="ballsbox">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
        <!-- 登录后加载动画 -->
        <div class="popup" v-show="ballsShow3">
            <div class="balls">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </main>
</template>
<script lang="ts" setup>
import apply from '../img/apply.png'
import collect from '../img/collect.png'
import entry from '../img/entry.png'
import feedback from '../img/feedback.png'
import history from '../img/history.png'
import defaultAvatar from '../img/defaultAvatar.png'
import inregardto from '../img/inregardto.png'
import interview from '../img/interview.png'
import job_my from '../img/job_my.png'
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, computed, watch, onBeforeUnmount } from "vue";
import axios from 'axios'
const router = useRouter();
import apiUrl from '../api/api.js'
import footers from '@/views/footer.vue';

// 获取用户路由Id
const userId = router.currentRoute.value.params.iiusdis as string;
// 拿到用户后端数据
const userData = ref<any>(null);
// 拿到后端用户id进行判断
const userIdlist = ref();
// 欢迎你 用户：手机号码
const userishow = ref(false)
// 加密手机号码
const userPhone = ref()
// 上传显示蒙层
const avatarshow = () => {
    const headPortrait = document.getElementById('headPortrait') as HTMLInputElement;
    headPortrait.style.top = '0'
}
// 上传隐藏蒙层
const avatarbtn = () => {
    const headPortrait = document.getElementById('headPortrait') as HTMLInputElement;
    headPortrait.style.top = '-500%'
};
// 加载动画
const ballsShow = ref(false)
// 加载完成动画
const ballsShow2 = ref(false)
// 登录后加载动画
const ballsShow3 = ref(false)
// 选中的图片路径
const selectedImage = ref('');
// 显示的图片路径，初始为默认图片
const displayedImage = ref(defaultAvatar);
// 控制按钮晃动效果
const shakeDiv = ref(false);
// 节流变量，表示当前是否可以执行上传
let canUpload = true;
// 页面加载时发起请求获取用户头像
const asyncUserDadata = async () => {
    try {
        const response = await fetch(apiUrl + 'api/user/getId?id=' + userId, {
            method: 'GET',
        });
        // 解析HTTP响应的JSON数据
        const data = await response.json();
        // 后端返回的数据中包含用户头像的路径
        const userHeadPortrait = data?.data?.userHeadPortrait;
        // 如果用户头像存在，则更新显示的图片路径，并保存到本地浏览器
        if (userHeadPortrait) {
            displayedImage.value = userHeadPortrait;
            localStorage.setItem('selectedImage', userHeadPortrait);
        }
    } catch (error) {
        console.error('获取用户头像错误:', error);
    }
}
// 节流函数，规定时间内只执行一次
const throttledUpload = () => {
    if (canUpload) {
        canUpload = false; // 设置为不可上传状态
        uploadingavatar(); // 执行上传操作
        // 在规定时间后恢复可上传状态
        setTimeout(() => {
            canUpload = true;
        }, 1000); // 1000ms 节流延迟
    }
};
// 打开文件选择器
const openFileExplorer = () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*';

    inputElement.addEventListener('change', (event) => {
        // 通过检查事件目标的files属性是否为空来检查是否有文件被选中。如果有文件，它将被存储在file变量中。
        const file = (event.target as HTMLInputElement)?.files?.[0];
        if (file) {
            // 创建一个新的FileReader对象。FileReader对象用于以数据URL的形式读取文件的内容。
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                if (result) {
                    selectedImage.value = result as string;
                    displayedImage.value = result as string;
                }
            };
            reader.readAsDataURL(file);
        }
    });

    inputElement.click();
};
// 上传头像功能
const uploadingavatar = async () => {
    // 检查是否选择了图片 （判断数据库返回的图片地址和当前存储到本地浏览器的图片地址是否相同）
    if (displayedImage.value === localStorage.getItem('selectedImage')) {
        // 如果相同，触发晃动效果并阻止上传
        shakeDiv.value = true;
        setTimeout(() => {
            shakeDiv.value = false;
        }, 1000);
        return;
    }
    // 显示加载动画
    ballsShow.value = true
    try {
        // 创建FormData对象，用于上传文件
        const formData = new FormData();
        formData.append('multipartFile', dataURItoBlob(selectedImage.value));
        formData.append('userId', userId);
        // 发送PUT请求
        await fetch(apiUrl + 'api/user/addHeadPortrait', {
            method: 'PUT',
            body: formData,
        });
        // 隐藏加载动画
        ballsShow.value = false
        // 显示加载完成动画
        ballsShow2.value = true
        setTimeout(() => {
            // 隐藏加载完成动画
            ballsShow2.value = false
        }, 1000)
        // 更新数据
        asyncUserDadata();
    } catch (error) {
        console.error(error);
    }
};
// 将Data URI转换为Blob对象
const dataURItoBlob = (dataURI: string): Blob => {
    // 解码Data URI
    const byteString = atob(dataURI.split(',')[1]);
    // 创建一个类型化数组
    const ab = new ArrayBuffer(byteString.length);
    // 创建一个视图来访问类型化数组
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        // 将每个字符的Unicode码点转换为字节
        ia[i] = byteString.charCodeAt(i);
    }
    // 创建Blob对象
    return new Blob([ab], { type: 'image/png' });
};
onMounted(async () => {
    // 检查是否有存储的selectedImage
    const storedUserId = localStorage.getItem('userId');
    // 检查是否有存储的selectedImage
    const headPortrait = document.getElementById('headPortrait') as HTMLInputElement;
    headPortrait.style.top = '-500%'
    // 检查存储的userId是否与当前userId相同
    if (userId !== 'null' && userId !== ':iiusdis' && storedUserId === userId) {
        // 使用存储的数据而不是发起新的请求
        userIdlist.value = localStorage.getItem('userIdlist');
        // 获取用户信息
        userData.value = JSON.parse(localStorage.getItem('userData') || '{}');
        // 获取用户手机号码
        userPhone.value = localStorage.getItem('userPhone');
    } else {
        try {
            // 发起请求获取用户信息
            if (userId !== 'null' && userId !== ':iiusdis') {
                ballsShow3.value = true
                const response = await axios.get(apiUrl + 'api/user/getId', {
                    params: {
                        id: userId,
                    },
                    headers: {
                        'Access-Control-Allow-Origin': '*', // 根据需要进行调整
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                });
                // 使用新数据更新本地存储
                localStorage.setItem('userId', userId);
                localStorage.setItem('userIdlist', response.data.data.userId);
                localStorage.setItem('userPhone', response.data.data.userPhone);
                // 存储用户信息
                userIdlist.value = response.data.data.userId;
                userData.value = response.data.data;
                userPhone.value = response.data.data.userPhone;
                ballsShow3.value = false
                userishow.value = true;
                // 隐藏加载动画
                setTimeout(() => {
                    userishow.value = false;
                }, 800);
            }
        } catch (error) {
            console.error(error);
        }
    }
    // 获取本地存储中的userI的图片地址
    asyncUserDadata()
});
// 拿到前三个数字
function getFirstThreeDigits() {
    const numberString = userPhone.value ? userPhone.value.toString() : '';
    if (numberString.length >= 3) {
        return numberString.substr(0, 3);
    }
    return '';
}
// 拿到后四位数字
function getLastFourDigits() {
    const numberString = userPhone.value ? userPhone.value.toString() : '';
    if (numberString.length >= 4) {
        return numberString.substr(-4);
    }
    return '';
}
onBeforeUnmount(() => {
    userIdlist.value = null;
});
// 跳转到登录页面
function getregister() {
    router.push('/Register');
}
// 判断是否登录 登录跳转职位申请详情 反之跳转登录
function Particulars() {
    if (userIdlist.value == null) {
        return router.push('/Register');;
    }
    router.push(`/PositionParticulars/${userId}`);
}
// 把拿到的用户id 跳转基本信息页面
function getuserId() {
    if (userIdlist.value == null) {
        return router.push('/Register');;
    }
    router.push(`/Basics/${userId}`);
}
// 退出登录
function logOut() {
    // 跳转到登录页面或其他适当的操作
    router.push(`/Home/${":iiusdis"}`);
    // 用户Id
    localStorage.removeItem('userId');
    // 关联用户Id
    localStorage.removeItem('userIdlist');
    // 用户手机号码
    localStorage.removeItem('userPhone');
    // 用户头像
    localStorage.removeItem('selectedImage');
    // 从 localStorage 中获取数据
    const storedData = localStorage.getItem('positionDataHome');
    const storedData1 = localStorage.getItem('positionData');
    if (storedData === null) {
        console.error("没有找到存储的数据。");
        return;
    }
    if (storedData1 === null) {
        console.error("没有找到存储的数据。");
        return;
    }
    // 将字符串数据解析为 JSON
    const data = JSON.parse(storedData);
    const data1 = JSON.parse(storedData1);

    // 只保留前 10 条数据
    const filteredData = data.slice(0, 10);
    const filteredData1 = data1.slice(0, 10);

    // 更新 localStorage 中的数据
    localStorage.setItem('positionDataHome', JSON.stringify(filteredData));
    localStorage.setItem('positionData', JSON.stringify(filteredData1));
}
</script>
<style scoped>
.Job_my {
    padding-bottom: .01rem;
}

main {
    position: absolute;
    padding-top: 0;
    padding-bottom: 0;
    background-color: #f7f7f7 !important;
}

.shake {
    animation: shake 0.5s ease-in-out;
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    25%,
    75% {
        transform: translateX(-10px);
    }

    50% {
        transform: translateX(10px);
    }
}

.color1 {
    font-size: .48rem !important;
    color: #012a91 !important;
}

.color2 {
    font-size: .48rem !important;
    color: #eaf1fb !important;
}

.titleStyle {
    width: 86px;
    text-align: center;
    padding: .1rem 0;
    border-radius: 0.4rem;
    /* 使用RGBA颜色表示半透明背景，最后一个参数0.5表示透明度为50% */
    background-color: rgba(255, 255, 255, 0.22);
}

.relogOut {
    position: relative;
}

.logOut {
    display: inline-block;
    position: absolute;
    top: .8rem;
    right: -6rem;
    color: #383838;
    font-size: .5rem;
    background-color: #6a9dfe;
    padding: .1rem .2rem !important;
    border-radius: 0.4rem;
}

.popup {
    width: 15rem;
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
    margin: 60% auto;
    width: 40%;
    display: flex;
    /* 使用 rgba(红, 绿, 蓝, 透明度) 设置背景颜色为完全透明 */
    background-color: rgba(255, 255, 255, .9);
    padding: .2rem .5rem;
    box-sizing: border-box;
    border-radius: 8px;
    text-align: center;
    flex-direction: column;
}

.popSpan {
    margin: 0 auto;
    color: #686363;
    font-size: .6rem;
    margin-bottom: 10px;
}

.userPhone {
    color: #666;
    font-size: .4rem;
}
</style>