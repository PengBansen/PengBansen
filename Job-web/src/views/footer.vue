<template>
    <footer class="navigation">
        <div class="navigation_content">
            <router-link :to="`/Home/${userId}`" class='color'>
                <span><i class="hom_ico"></i>首页</span>
            </router-link>
            <router-link :to="`/Position/${userId}`">
                <span><i class="position_ico"></i>职位</span>
            </router-link>
            <router-link :to="`/Work/${userId}`">
                <span><i class="work_ico"></i>工作</span>
            </router-link>
            <router-link :to="`/Mine/${userId}`" class="navigation_my">
                <span><i class="my_ico"></i>我的</span>
            </router-link>
        </div>
    </footer>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
// 拿到用户id
const userId = router.currentRoute.value.params.iiusdis;
</script>