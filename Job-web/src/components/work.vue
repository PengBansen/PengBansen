<template>
    <main>
        <div class="work_page">
            <div class="work_top">
                <img :src="Work" alt="">
            </div>
            <div class="work_centre">
                <div class="work_img">
                    <img :src="Work_ico" alt="">
                    <div class="work_imgtitle">
                        <div class="work_centre_title">工作台仅限入职员工查看哦</div>
                        <div class="work_centre_titles">快快找职位，成为长隆的一员吧</div>
                        <div class="work_centre_button">
                            <button @click="getui">查看职位列表</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footers />
    </main>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Work from '../img/work.png'
import Work_ico from '../img/work_ico.png'
import footers from '@/views/footer.vue';
import { useRouter } from "vue-router";
const router = useRouter();
function getui() {
    router.push(`/Position/${userId}`);
}

// 拿到用户id
const userId = router.currentRoute.value.params.iiusdis;

</script>
<style scoped>
main {
    position: absolute;
    padding-top: 0;
    padding-bottom: 0;
    background-color: #f7f7f7 !important;
}
</style>
