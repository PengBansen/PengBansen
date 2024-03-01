<template>
    <main>
        <div class="basics">
            <div class="header">
                <span title="返回" class="retreat" @click="retreat"></span>
                <span class="basics-title">基本资料</span>
            </div>
        </div>
        <form class="basics-input" v-if="userData">
            <div class="title">姓名 <i>*</i></div>
            <div class="input-content">
                <input type="text" placeholder="请输入您的真实姓名" @input="isModified = true" v-model="userData.userName">
            </div>
            <div class="title">手机号码 <i>*</i></div>
            <div class="input-content">
                <input type="text" placeholder="请输入您的手机号码" @input="isModified = true" v-model="userData.userPhone">
            </div>
            <div class="title">身份证号码 <i>*</i></div>
            <div class="input-content">
                <input type="text" placeholder="请输入您的身份证号码" @input="isModified = true" v-model="userData.userIdentityCard">
            </div>
            <div class="title">性别 <i>*</i></div>
            <div class="gender-content">
                <input type="radio" name="gender" id="man" @input="isModified = true" v-model="userData.userGender"
                    value="男">
                <label for="man">男</label>
                <input type="radio" name="gender" id="girl" @input="isModified = true" v-model="userData.userGender"
                    value="女">
                <label for="girl">女</label>
            </div>
            <div class="title">民族 <i>*</i></div>
            <div class="input-content">
                <input type="text" placeholder="请输入您的民族" @input="isModified = true" v-model="userData.userNation">
            </div>
            <div class="title">年龄 <i>*</i></div>
            <div class="input-content">
                <input type="text" placeholder="未填写" @input="isModified = true" v-model="userData.userAge">
            </div>
            <div class="title">身高 <i>*</i></div>
            <div class="input-content">
                <input type="text" placeholder="请输入您的身高 (cm) " @input="isModified = true" v-model="userData.userStature">
            </div>
            <div class="title">体重 <i>*</i></div>
            <div class="input-content">
                <input type="text" placeholder="请输入您的体重 (kg) " @input="isModified = true" v-model="userData.userWeight">
            </div>
            <div class="title">是否服从调配 </div>
            <div class="deploy-content">
                <input type="radio" name="radio" id="good" @input="isModified = true" v-model="userData.userState"
                    value="1">
                <label for="good">是</label>
                <input type="radio" name="radio" id="no" @input="isModified = true" v-model="userData.userState" value="0">
                <label for="no">否</label>
            </div>
            <div class="title">是否需要住宿 </div>
            <div class="putUp-content">
                <input type="radio" name="putUp" id="goods" @input="isModified = true" v-model="userData.userPutUp"
                    value="1">
                <label for="goods">是</label>
                <input type="radio" name="putUp" id="nos" @input="isModified = true" v-model="userData.userPutUp" value="0">
                <label for="nos">否</label>
            </div>
            <div class="submit syblitstyle" v-if="isModified">
                <div @click="updateUser">保存</div>
            </div>
            <div class="submit" v-else>
                <div>保存</div>
            </div>
        </form>
        <div class="popup" v-show="showPopup">
            <div class="popup-content">
                <div class="popSpan">信息修改成功</div>
            </div>
        </div>
        <div class="mark" v-show="markishow">
            <div class="mark-content"></div>
        </div>
        <div class="basicsShowpopup" v-show="basicsShow">
            <div class="balls">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </main>
</template>
<script lang='ts' setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from "vue-router";
import { useRoute } from 'vue-router';
import axios from 'axios';
import apiUrl from '../api/api.js'
// 修改加载蒙层
const markishow = ref()
// 进入个人信息加载动画
const basicsShow = ref();
// 获取路由实例
const route = useRoute();
// 表示输入框的值是否修改
const isModified = ref(false);
const router = useRouter();
// 储存用户Id
const userId = ref('');
// 修改信息
const showPopup = ref();
// 储存用户手机号码
const userPhone = ref('');
// 储存用户数据
const userData = ref({
    userId: '',
    userName: '',
    userPhone: '',
    userGender: '',
    userNation: '',
    userAge: '',
    userStature: '',
    userWeight: '',
    userState: '',
    userPutUp: '',
    userIdentityCard: ''
});
// 获取用户数据
const fetchUserData = async () => {
    basicsShow.value = true; // 显示加载状态
    try {
        // 发送 HTTP GET 请求获取用户数据
        const response = await axios.get(apiUrl + `api/user/getId?id=${userId.value}`);
        userData.value = response.data.data; // 将响应数据赋值给 userData
        userPhone.value = response.data.data.userPhone; // 从响应中提取手机号码并保存到 userPhone 中
        localStorage.setItem('userPhone', userPhone.value); // 将手机号码保存到本地存储中
        basicsShow.value = false; // 隐藏加载状态
    } catch (error) {
        console.error(error); // 打印错误信息
    }
};
// 更新用户数据
const updateUser = () => {
    // 加载蒙层
    markishow.value = true
    const requuserData = {
        userId: userId.value,
        userName: userData.value.userName,
        userPhone: userData.value.userPhone,
        userGender: userData.value.userGender,
        userNation: userData.value.userNation,
        userAge: userData.value.userAge,
        userStature: userData.value.userStature,
        userWeight: userData.value.userWeight,
        userState: userData.value.userState,
        userPutUp: userData.value.userPutUp,
        userIdentityCard: userData.value.userIdentityCard,
    };
    axios.post(apiUrl + `api/user/update`, requuserData)
        .then(response => {
            if (requuserData === requuserData) {
                markishow.value = false
                showPopup.value = true
                setTimeout(() => {
                    showPopup.value = false
                    isModified.value = false
                }, 800)
            }
        })
        .catch(error => {
            console.error(error);
        });
};
// 页面加载时发送请求获取用户数据
onMounted(async () => {
    userId.value = router.currentRoute.value.params.iiusdis as string; // 从路由参数中获取用户 ID
    if (!userPhone.value) {
        await fetchUserData(); // 如果本地存储中没有手机号码，则发送请求
    }
});
// 监听 userPhone 的变化，如果发生变化则重新发送请求
watch(userPhone, () => {
    if (userPhone.value) {
        fetchUserData(); // 发送请求获取用户数据
    }
});
// 返回
function retreat() {
    router.push(`/Mine/${userId.value}`);
}
</script>
<style scoped>
form {
    width: 15rem !important;
}

.syblitstyle {
    background-color: #4585fe;
}

.popup {
    position: fixed !important;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 999 !important;
}

.popup-content {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    background-color: rgba(255, 255, 255, .9);
    padding: .2rem .6rem;
    box-sizing: border-box;
    border-radius: 8px;
    text-align: center;
    max-width: 50%;
    max-height: 3.2rem;
    flex-direction: column;
}

.popSpan {
    padding: .2rem .4rem;
    color: #fff;
    font-size: .5rem;
    background-color: #4585fe;
    border-radius: .2rem;
}

/* 加载 */
.mark {
    position: fixed !important;
    width: 15rem;
    position: absolute;
    top: 15%;
    left: 50%;
    margin: 0 auto;
    transform: translate(-50%);
    background-color: rgba(0, 0, 0, 0.5);
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

.basicsShowpopup {
    width: 15rem;
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
}

.balls span {
    background-color: #4585fe;
}
</style>
