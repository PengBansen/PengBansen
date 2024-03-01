<template>
  <form>
    <div class="register_head">
      <div class="header">
        <span title="返回" class="retreat" @click="$router.back()"></span>
        <span class="basics-title">登录</span>
      </div>
    </div>
    <div class="register_box">
      <div class="box_head">
        <span class="head_title">手机号快速登录</span>
        <span class="head_note">未注册过的手机号将自动创建账号</span>
      </div>

      <div class="register_contents">
        <span class="get_code styleBottom">
          <input type="nubmer" v-model="phoneNumber" placeholder="输入手机号码" @change="handlePhoneNumberChange">
          <div class="send" @click="throttledationCode" v-show="showSendButton">
            获取验证码
          </div>
          <div class="send" v-show="showResendButton">
            <span class="fontStyle">重新获取({{ countdown }})s</span>
          </div>
        </span>
        <span v-show="showPhoneNumberError">{{ showPhoneNumberErrorText }}</span>
        <span class="verification styleBottom">
          <input type="nubmer" v-model="verificationCode" placeholder="输入6位验证码" @change="handleVerificationCodeChange">
        </span>
        <span v-show="showVerificationCodeError">{{ yard }}</span>
      </div>
      <div class="agreement" :class="{ shake: shakeDiv }">
        <span>
          <input type="checkbox" id="checkbox">
        </span>
        <span>
          <label for="checkbox">
            <i>&nbsp;&nbsp;注册/登录 需勾选</i>
          </label>
          <br />
          <a href="#">《长隆用户隐私政策》</a>
          <a href="#">《实习手册》</a>
          <a href="#"> 适用短期学生兼职</a>
        </span>
      </div>
      <div class="login" :style="loginStyle">
        <span value="登录" @click="login">登录</span>
      </div>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
import axios from "axios";
import apiUrl from '../api/api.js'
import { ref, computed } from 'vue';

const phoneNumber = ref('');
// 验证码
const verificationCode = ref('');
// 发送验证码
const showSendButton = ref(true);
// 发送验证码倒计时
const showResendButton = ref(false);
// 手机号码错误提示文字
const showPhoneNumberErrorText = ref("请输入手机号码");
// 倒计时
const countdown = ref(60);
// 手机号码错误提示Show
const showPhoneNumberError = ref(false);
// 验证码错误提示Show
const showVerificationCodeError = ref(false);
// 验证码错误提示文字
const yard = ref("请输入验证码");
// 控制抖动效果
const shakeDiv = ref(false);
// 节流变量，表示当前是否可以执行
let canUpload = true;

// 节流函数，规定时间内只执行一次
const throttledationCode = () => {
  if (canUpload) {
    canUpload = false; // 设置为不可上传状态
    sendVerificationCode(); // 执行获取验证码
    // 在规定时间后恢复执行获取验证码
    setTimeout(() => {
      canUpload = true;
    }, 1000); // 1000ms 节流延迟
  }
};

// 判断手机号码是否为空
const handlePhoneNumberChange = () => {
  // 手机号码正则表达式
  const phoneNumberRegex = /^1\d{10}$/;
  // 判断手机号码是否为空
  if (!phoneNumber.value.trim()) {
    showPhoneNumberError.value = true;
    return
    // 判断手机号码长度是否大于11或者小于11
  } else if (phoneNumber.value.trim().length > 11 || phoneNumber.value.trim().length < 11) {
    // 如果手机号码长度大于11或者小于11，则显示错误提示
    showPhoneNumberError.value = true;
    // 显示错误提示为“请输入正确的手机号码”
    showPhoneNumberErrorText.value = '请输入正确的手机号码';
    return
  } else {
    // 手机号码正确 
    showPhoneNumberError.value = !phoneNumber.value.match(phoneNumberRegex);
  }
};
// 使用 computed 创建计算属性 进行验证码是否改变登录按钮的背景颜色
const loginStyle = computed(() => ({
  backgroundColor: verificationCode.value.length === 6 ? '#4786ff' : ''
}));
// 判断验证码
const handleVerificationCodeChange = () => {
  // 验证码正则表达式
  const verificationCodeRegex = /^\d{6}$/;
  // 判断验证码是否为空
  if (!verificationCode.value.trim()) {
    showVerificationCodeError.value = true;
    return
    // 判断验证码长度是否大于或者小于6
  } else if (verificationCode.value.trim().length > 6 || verificationCode.value.trim().length < 6) {
    showVerificationCodeError.value = true;
    yard.value = '验证码不规范';
    return
  } else {
    showVerificationCodeError.value = !verificationCode.value.match(verificationCodeRegex);
  }
};
// 获取验证码
const sendVerificationCode = () => {
  if (!phoneNumber.value.trim()) {
    // 如果未输入手机号码，则显示错误提示为“请输入手机号码”
    showPhoneNumberError.value = true;
    // 显示错误提示为“请输入手机号码”
    showPhoneNumberErrorText.value = '请输入手机号码';
    return;
  }
  // 判断复选框是否已勾选
  const checkbox = document.getElementById('checkbox') as HTMLInputElement;
  if (checkbox.checked) {
    // 复选框已勾选，可以发送验证码
    showSendButton.value = false;
    // 显示倒计时
    showResendButton.value = true;
    // 开始倒计时
    startCountdown();
    axios.post(apiUrl + 'api/login/sendAuthCode?userPhone=' + phoneNumber.value,
    )
  } else {
    // 复选框未勾选
    shakeDiv.value = true;
    // 在一段时间后停止晃动
    setTimeout(() => {
      shakeDiv.value = false;
    }, 1000);
  }
};
// 倒计时
const startCountdown = () => {
  // 创建定时器
  const interval = setInterval(() => {
    // 倒计时--
    countdown.value--;
    // 如果倒计时为0，停止倒计时
    if (countdown.value === 0) {
      // 停止倒计时
      clearInterval(interval);
      // 恢复倒计时按钮Show
      showSendButton.value = true;
      // 重新获取按钮
      showResendButton.value = false;
      // 恢复倒计时630秒
      countdown.value = 60;
    }
  }, 1000);
};
// 登录发送请求
const login = () => {
  // 判断手机号码
  handlePhoneNumberChange()
  // 判断验证码
  handleVerificationCodeChange()
  axios.post(apiUrl + `api/login/login?userPhone=${phoneNumber.value}&authCode=${verificationCode.value}`,)
    .then(response => {
      const userId = response.data.data
      if (response.data.code === 200) {
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
        router.push(`/Mine/${userId}`);
      } else {
        // 处理验证码输入错误的逻辑
        showVerificationCodeError.value = true;
        yard.value = '验证码错误';
      }
    })
}

</script>
<style scoped>
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

a {
  color: #2067fb !important;
}

.styleBottom {
  border-bottom: .0267rem solid #d5d8e1;
}

.fontStyle {
  font-size: .5rem;
  color: #9d9ea0;
}
</style>
