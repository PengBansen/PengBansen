<template lang="">
  <!-- 搜索框 start-->
  <article>
    <div class="article-wrapper">
      <img :src="bg3"/>
    </div>
    <div class="index-bot">
      <div class="article-footer">
        <div class="toggle">
          <button class="next">&gt;</button>
        </div>
      </div>
      <div class="index-search">
        <div class="search-item">
          <input
            type="search"
            class="input-text none"
            name="search"
            id="searchId"
          /><i class="none"></i>
          <span class="input-span none">搜索</span>
          <span class="title text-none">搜索您想要的职位</span>
        </div>
      </div>
    </div>
  </article>
  <!-- 搜索框 end-->
  <!-- ------------------------------------------------------------------------------------------------------ -->
  <!-- 版心 start-->
  <router-view></router-view>
  <main class="clearfix">
    <!-- 主要内容 start-->
    <div class="conbox">
      <div class="content">
        <!-- 工作地点 start -->
        <div class="earch-incloud">
          <div class="work_line">
            <div class="work_line_fl">工作地点</div>
            <div class="work_line_fr">
              <div class="work_line_right_item ac_style work_line_style">
                不限
              </div>
              <div class="work_line_right_item ac_style">广州</div>
              <div class="work_line_right_item ac_style">珠海</div>
            </div>
          </div>
        </div>
        <!-- 工作地点 end-->
        <!-- 工作单位 start-->
        <div class="work_line1 clearfix">
          <div class="work_line_left1">
            <div>工作单位</div>
            <div class="will_line"></div>
          </div>
          <div class="work_line_right1">
            <!-- 需要后端的内容 start 不限-->
            <div class="wlrc wlrc1 wlrc-item">
              <el-dropdown><div class="el-dropdown-link work_line_right_item">动物世界</div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>Action 1</el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                    <el-dropdown-item>Action 3</el-dropdown-item>
                  </el-dropdown-menu>
                </template>              
              </el-dropdown>
            </div>
            <!-- 需要后端的内容 end -->
            <!-- 需要后端的内容 start 广州-->
            <div class="wlrc wlrc2">
              <el-dropdown><div class="el-dropdown-link work_line_right_item">欢乐世界</div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>Action 1</el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                    <el-dropdown-item>Action 3</el-dropdown-item>
                  </el-dropdown-menu>
                </template>              
              </el-dropdown>
            </div>
            <!-- 需要后端的内容 end -->

            <!-- 需要后端的内容 start 珠海-->
            <div class="wlrc wlrc3">
              <el-dropdown>
                <div class="el-dropdown-link work_line_right_item">集团总部(珠)</div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>Action 1</el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                    <el-dropdown-item>Action 3</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <!-- 需要后端的内容 end -->
          </div>
        </div>
        <!-- 工作单位 end-->
        <!-- 已选条件 start-->
        <div class="work_line">
          <div class="work_line_left">已选条件</div>
          <div class="work_line_right">
            <div class="work_line_right_item1">
              <span> 全部 </span>
              <img :src="toClose" alt="" />
            </div>
          </div>
        </div>
        <!-- 已选条件 end-->
      </div>
      <!-- 职位 start-->
      <div class="sc-condition">
        <div class="sc_content">
          <span class="spang"
            >工作周期
            <div class="sc_content-none1">
              <span class="p_style1">不限</span>
              <span>一天内</span>
              <span>一周内</span>
            </div>
          </span>
          <img :src="next_botton" alt="" />
          <span class="spang">用工时期
            <div class="sc_content-none2">
              <span class="p_style2">不限</span>
              <span>一周内</span>
              <span>一月内</span>
            </div>
          </span>
          <img :src="next_botton" alt="" />
          <span class="spang"
            >周工类型
            <div class="sc_content-none3">
              <span class="p_style3">不限</span>
              <span>长期</span>
              <span>短期</span>
            </div>
          </span>
          <img :src="next_botton" alt="" />
        </div>
        <div class="index-list clearfix">
          <!-- 需要后端的内容 start -->
          <!-- <div class="index-list-item-first clearfix" v-for="items in data" :key="items.positionId"> -->
          <div class="index-list-item-first clearfix">
            <div class="index-list-item-left">
              <div class="WN">
                <img :src="recruiting" style="margin-right: 8px" />
                <span class="li-name">管理员</span>
              </div>
              <div class="li-address" style="margin-bottom: 12px">
                <img :src="work_happy" alt="" />
                <span>动物世界</span>
              </div>
              <div class="li-time">
                <img :src="work_time" alt="" />
                <span>2023-12-3 &nbsp; 2024-12-3</span>
              </div>
            </div>
            <div class="index-list-item-right">
              <div>
                <div class="li-pay">
                  <div class="li-pay-top">
                    <span>19</span><i> 元/时</i>
                  </div>
                  <div class="li-pay-bot">平日工资标准</div>
                </div>
              </div>

              <div class="lir-r">
                <a style="color: #0052fe" @click="goposition()">
                  立即申请
                </a>
              </div>
            </div>
          </div>
          <!-- 需要后端的内容 end -->
        </div>
      </div>
      <!-- 职位 end-->
    </div>
    <!-- 主要内容 end-->
    <!-- ------------------------------------------------------------------------------------------------------ -->
    <!-- 底部 start-->
    <div class="page-bot">
      <div class="pd-line">地址：中国广东省广州市番禺区 邮编：511430</div>
      <div class="pd-line">
        粤ICP备11002274号 | 2019广州长隆集团有限公司版权所有 Copyright © 2019
        Chimelong. All Rights Reserved
      </div>
    </div>
    <!-- 底部 end-->
    <!-- ------------------------------------------------------------------------------------------------------ -->
  </main>
</template>
<script lang="ts" setup>
import bg3 from "/img/bg3.png";
import dsj from "/img/dsj.png";
import toClose from "/img/toClose.png";
import next_botton from "/img/next_botton.png";
import recruiting from "/img/recruiting.png";
import work_happy from "/img/work_happy.png";
import work_time from "/img/work_time.png";
import { useRouter } from "vue-router";
const router = useRouter();
function goposition() {
  router.push(`/position`);
}
</script>
