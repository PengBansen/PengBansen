<template>
   <div class="Usercontent w-ty">
      <div class="userheader">
         <span class="userTilte">用户表</span>
         <!-- 数据开始 -->
         <el-table :data="filteredUserData" stripe style="width: 100%" height="330">
            <el-table-column fixed prop="userName" label="姓名" width="100" />
            <el-table-column prop="userPhone" label="手机号码" width="125" />
            <el-table-column prop="userGender" label="性别" width="110" />
            <el-table-column prop="userAge" label="年龄" width="110" />
            <el-table-column prop="userNation" label="民族" width="110" />
            <el-table-column prop="userStature" label="身高" width="110" />
            <el-table-column prop="userWeight" label="体重" width="110" />
            <el-table-column prop="userObey" label="服从调配" width="110" />
            <el-table-column prop="userPutUp" label="是否住宿" width="110" />
            <el-table-column align:any="right">
               <template #header>
                  <el-input v-model="userinput" placeholder="请输入用户信息" />
                  <el-button :icon="Search" circle @click="searchUsers" style="display: none;" />
               </template>
               <template #default="scope">
                  <el-switch v-model="scope.row.userState" class="mb-2" active-text="禁用" inactive-text="解除" />
               </template>
            </el-table-column>
         </el-table>
         <!-- 数据结束 -->
      </div>
      <div class="positionheader">
         <span class="positionTilte">职位表</span>
         <!-- 数据开始 -->
         <el-table :data="filteredPositions" stripe style="width: 100%" height="330">
            <el-table-column fixed="left" prop="positionName" label="职位名称" width="125" />
            <el-table-column prop="positionSalary" label="职位工资" width="100" />
            <el-table-column prop="positionJobRequirements" label="岗位要求" width="500" />
            <el-table-column prop="positionRtatement" label="岗位职责" width="320" />
            <el-table-column prop="positionArrangement" label="食宿安排" width="320" />
            <el-table-column prop="positionOtherDescription" label="其他说明" width="500" />
            <el-table-column prop="positionPeriod" label="工作周期" width="100" />
            <el-table-column prop="positionPeriodYong" label="用工时期" width="100" />
            <el-table-column prop="positionStartTime" label="招聘时间" width="120" />
            <el-table-column prop="positionEndTime" label="结束时间" width="120" />
            <el-table-column prop="positionNumber" label="需要人数" width="100" />
            <el-table-column prop="positionAffiliatedUnit" label="所属单位" width="100" />
            <el-table-column fixed="right" width="150">
               <template #header>
                  <el-input v-model="positioninput" placeholder="请输入职位信息" />
                  <el-button :icon="Search" @click="searchPositions" style="display: none;" />
               </template>
            </el-table-column>

         </el-table>
         <!-- 数据结束 -->
      </div>
   </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { Check, Delete, Edit, Message, Search, Star, } from '@element-plus/icons-vue'
import axios from 'axios'


// 用户
const UserData = ref<{
   userId: number,  //ID
   userName: string, //名称
   userPhone: number, //手机号码
   userGender: string, //性别
   userAge: number, //年龄
   userNation: string, //民族
   userStature: number, //身高
   userWeight: number, //体重
   userObey: number //服从调配
   userPutUp: number //是否住宿
   userState: number, //删除状态
}[]>([])
// 用户绑定
const userinput = ref('')
// 获取用户列表
const fetchUsers = async () => {
   try {
      const response = await axios.get('https://api.recruit.lldwb.top/api/user/getList', {
         headers: {
            'Access-Control-Allow-Origin': '*', // 添加允许的域名，可以根据实际情况设置
         },
      });
      UserData.value = response.data.data;
   } catch (error) {
      console.error(error);
   }
};
// 在页面渲染后获取职位列表
onMounted(fetchUsers);
// 搜索用户
const searchUsers = async () => {
   try {
      const response = await axios.get('https://api.recruit.lldwb.top/api/user/getList', {
         params: {
            userName: userinput.value,
            userPhone: userinput.value,
            userGender: userinput.value,
            userAge: userinput.value,
            userNation: userinput.value,
            userStature: userinput.value,
            userWeight: userinput.value,
         },
         headers: {
            'Access-Control-Allow-Origin': '*', // 添加允许的域名，可以根据实际情况设置
         },
      });
      UserData.value = response.data.data;
   } catch (error) {
      console.error(error);
   }
};
// 计算过滤后的职位列表
const filteredUserData = computed(() => {
   if (!userinput.value) {
      return UserData.value;
   }
   const keyword = userinput.value.toLowerCase();
   return UserData.value.filter((user) =>
      user.userName.toLowerCase().includes(keyword) ||
      user.userPhone.toString().includes(keyword) ||
      user.userGender.toLowerCase().includes(keyword) ||
      user.userAge.toString().includes(keyword) ||
      user.userNation.toLowerCase().includes(keyword) ||
      user.userStature.toString().includes(keyword) ||
      user.userWeight.toString().includes(keyword)
   );
});

// 修改用户状态





















// -----------------------------------------------------------------------------
// 职位数据
const PositionData = ref<{
   // 职位名称
   positionName: string
   // 职位工资
   positionSalary: number
   // 岗位要求
   positionJobRequirements: string
   // 岗位职责
   positionRtatement: string
   // 食宿安排
   positionArrangement: string
   // 其他说明
   positionOtherDescription: string
   // 工作周期
   positionPeriod: string
   // 用工时期
   positionPeriodYong: string
   // 招聘时间
   positionStartTime: string
   // 结束时间
   positionEndTime: string
   // 需要人数
   positionNumber: number
   // 所属单位
   positionAffiliatedUnit: string
}[]>([])
// 职位
const positioninput = ref('')
// 获取职位列表
const fetchPositions = async () => {
   try {
      const response = await axios.get('https://api.recruit.lldwb.top/api/position/getList', {
         headers: {
            'Access-Control-Allow-Origin': '*', // 添加允许的域名，可以根据实际情况设置
         },
      });
      PositionData.value = response.data.data;
   } catch (error) {
      console.error(error);
   }
};
// 在页面渲染后获取职位列表
onMounted(fetchPositions);
// 搜索职位
const searchPositions = async () => {
   try {
      const response = await axios.get('https://api.recruit.lldwb.top/api/position/getListPlus', {
         params: {
            positionName: positioninput.value,
            positionStartTime: positioninput.value,
         },
         headers: {
            'Access-Control-Allow-Origin': '*', // 添加允许的域名，可以根据实际情况设置
         },
      });
      PositionData.value = response.data.data;
   } catch (error) {
      console.error(error);
   }
};
// 计算过滤后的职位列表
const filteredPositions = computed(() => {
   if (!positioninput.value) {
      return PositionData.value;
   }
   const keyword = positioninput.value.toLowerCase();
   return PositionData.value.filter((position) =>
      position.positionName.toLowerCase().includes(keyword)
   );
});


</script>
<style scoped></style>