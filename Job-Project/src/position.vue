<template>
  <main>
    <div class="position_title"></div>
    <div class="position_content">
      <div class="position_content_left">
        <div class="pcr_top">
          <div class="index-list-item-left">
            <div class="WN">
              <img src="../img/recruiting.png" alt="" /><span class="li-name">管理员</span>
            </div>
            <!-- <div class="li-address" style="margin-bottom: 12px;">
                            <img src="../img/work_happy.png" alt=""><span>园区经营部</span>
                        </div> -->
            <div class="li-address" style="margin-bottom: 12px">
              <img src="../img/work_happy.png" alt="" /><span>动物世界</span>
            </div>
            <div class="li-time">
              <img src="../img/work_time.png" alt="" /><span>2023-12-3 &nbsp; 2024-12-3 </span>
            </div>
          </div>
          <div class="index-list-item-right">
            <div class="lir-l1">
              <div class="li-pay">
                <div class="li-pay-top">
                  <span>19</span>
                  <i>元/时</i>
                </div>
                <div class="li-pay-bot">平日工资标准</div>
              </div>
            </div>
            <div class="lir-r-ac1" @click="open">
              申请岗位
            </div>
          </div>
        </div>
        <div class="pcr_mid">
          <div class="pcr_mid_title">工作内容</div>
          <div class="pcr_mid_title1">工资标准</div>
          <div class="pcr_mid_content">19元/小时</div>
          <div class="pcr_mid_title1">岗位要求</div>
          <div class="pcr_mid_content">
            暂无
          </div>
          <div class="pcr_mid_title1">岗位职责</div>
          <div class="pcr_mid_content">
            暂无
          </div>
          <div class="pcr_mid_title1">食宿安排</div>
          <div>暂无</div>
          <div class="pcr_mid_title1">其他说明</div>
          <div class="pcr_mid_content">
            暂无
          </div>
        </div>
      </div>
      <div class="position_content_right">
        <img src="../img/positionR.png" alt="" />
      </div>
    </div>
    <div class="page-bot">
      <div class="pd-line">地址：中国广东省广州市番禺区 邮编：511430</div>
      <div class="pd-line">
        粤ICP备11002274号 | 2019广州长隆集团有限公司版权所有 Copyright © 2019
        Chimelong. All Rights Reserved
      </div>
    </div>
    <!-- 底部 end-->
  </main>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { store } from "./utils/store.js";

const open = () => {
  ElMessage("请下载 长隆Job 应用程序")
}


</script>
<style scoped>
main {
  width: 1100px;
  height: auto;
  margin: 0 auto;
  margin-top: 120px;
}
</style>
