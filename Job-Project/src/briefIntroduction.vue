<template>
    <link rel="stylesheet" href="./src/assets/briefIntroduction.css">
    <main>
        <div class="about">
            <div class="problem_tab">
                <div class="pt_item">
                    <div class="pt_item_text"> 兼职平台 </div>
                    <div class="pt_item_tip"></div>
                </div>
            </div>
            <div class="about_content">
                <div class="about_content_title"> 广州长隆旅游度假区 —— 中国一站式综合性旅游度假区 </div>
                <div class="about_content_text">
                    广州长隆旅游度假区是长隆集团旗下首个综合性主题旅游度假区，拥有长隆欢乐世界、长隆国际大马戏、长隆水上乐园、
                    长隆野生动物世界、长隆飞鸟乐园和长隆酒店等多家主题公园及酒店，是中国拥有主题公园数量众多和超大规模的综合
                    性主题旅游度假区，先后被评为“文化产业示范基地”、“ 科普教育基地 ”、中国首批国家AAAAA 级景区，年接待游客
                    连续多年超过千万人次，位居世界主题景区前列，成为中国在世界旅游业的标杆。
                </div>
                <img :src="aboutBg" alt="">
                <div class="about_content_title"> 珠海横琴长隆国际海洋度假区 —— 极具特色的长隆综合主题旅游度假区 </div>
                <div class="about_content_text">
                    珠海横琴长隆国际海洋度假区是长隆集团投资建设的超大型综合主题旅游度假区，
                    地处与澳门近在咫尺的中国国家级开放新区——横琴新区，是长隆集团应用世界先进技术和经验，
                    自主创新，并采用先进的科技设备、极具创意的设计和完善的管理，全力打造的集主题公园、
                    豪华酒店、商务会展、旅游购物、体育休闲于一体的超级旅游度假区，同时也是世界超大型海洋主题旅游度假区。
                </div>
                <img :src="aboutBg1" alt="">
            </div>
        </div>
        <div class="page-bot">
            <div class="pd-line"> 地址：中国广东省广州市番禺区 邮编：511430 </div>
            <div class="pd-line"> 粤ICP备11002274号 | 2019广州长隆集团有限公司版权所有 Copyright © 2019 Chimelong. All Rights Reserved
            </div>
        </div>
        <!-- 底部 end-->
    </main>
</template>
<script lang="ts" setup>
import aboutBg from '/img/aboutBg.png'
import aboutBg1 from '/img/aboutBg1.png'
</script>
<style scoped></style>