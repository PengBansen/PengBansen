<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <nav>
      <!-- <div class="admin-content">
        <span class="ico"></span>
        <span class="adminInput"><input type="search" name="" id="" placeholder="搜索我的文件..."></span>
        <span class="userTitle"><button>搜索</button></span>
      </div> -->
      <div class="navigation">
        <div class="Admin"><router-link to="/Admin">管理员</router-link></div>
        <div class="Entry"><router-link to="/Entry">已入职</router-link></div>
        <div class="ApplyFor"><router-link to="/ApplyFor">申请</router-link></div>
        <div class="Inform"><router-link to="/Inform">通知</router-link></div>
      </div>
    </nav>
    <router-view></router-view>
  </main>
</template>

<style scoped>
.active {
  color: #107ffc;
  border-bottom: .04rem solid #107ffc;
}
</style>
