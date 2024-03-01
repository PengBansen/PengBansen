<template>
    <main>
        <div class="informationuse">
            <div class="header">
                <div class="headernav">
                    <span title="返回" class="retreat" @click="retreat"></span>
                    <span>我的信息</span>
                </div>
                <div class="tablenav">
                    <div v-for="(item, index) in list" :key="item.id">
                        <span @click="activeIndex = index" :class="{ action: index === activeIndex }">{{ item.name
                        }}</span>
                    </div>
                </div>
            </div>
            <!-- 没有申请显示图片 -->
            <div class="information-img">
                <img :src="Particulars" alt="">
            </div>
            <!-- 数据开始 -->
            <div class="content">

            </div>
            <!-- 数据结束 -->
        </div>
    </main>
</template>
<script lang='ts' setup>
import { ref } from 'vue';
import Particulars from '../img/Particulars.png'
import { useRouter } from "vue-router";
const router = useRouter();
function retreat() {
    router.back()
}
const activeIndex = ref(0)
const list = ref([
    { id: '1', name: '全部' },
    { id: '2', name: '已报名' },
])

</script>
<style scoped>
main {
    position: absolute;
    padding-top: 0;
    padding-bottom: 0;
    background-color: #f7f7f7 !important;
}

.information-img {
    height: 100%;
}

.information-img img {
    padding-top: 8rem;
    width: 100%;
    height: 100%;
}


.action {
    border-bottom: .1rem solid #668bf1 !important;
}
</style>
