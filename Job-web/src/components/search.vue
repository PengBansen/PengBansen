<template>
    <div class="box_search_content">
        <div class="search_content_left" @click="$router.back()">取消</div>
        <div class="search_content">
            <input id="inputValue" ref="searchInput" type="text" placeholder="请输入你要搜索的职位" @keydown="handleKeyDown">
        </div>
        <div @click="handleSearch"></div>
    </div>
    <main>
        <!-- 搜索框 start -->
        <div class="box_search" v-show="router">
            <section class="option">
                <div class="option-content-route">
                    <!-- 搜索之后循环的值 start -->
                    <div class="Job-content" v-for="item in positionData" @click="goToDetails(item.positionId, userId)">
                        <div class="Job-content_top">
                            <div>
                                <span><img :src="recruiting" alt="" class="recruiting"></span>
                                <span class="rec_tile">{{ item.positionName }}</span>
                            </div>
                        </div>
                        <div class="Job-content_bottom">
                            <div class="Job-content-left">
                                <div>
                                    <img :src="work_happy" alt="" class="work_ppy">
                                    <span class="work_h_title">
                                        {{ item.positionAffiliatedUnit }}
                                    </span>
                                </div>
                                <div class="work_content">
                                    <img :src="work_time" alt="" class="work_time">
                                    <span class="work_h_title">
                                        {{ item.positionStartTime }}
                                        &nbsp;
                                        {{ item.positionEndTime }}
                                    </span>
                                </div>
                                <div class="work_content">
                                    <img :src="work_eye" alt="" class="work_eye">
                                    <span class="work_h_title">
                                        <i>{{ item.positionHeat }}人已查看</i>
                                    </span>
                                </div>
                            </div>
                            <div class="Job-content-right">
                                <div><span>{{ item.positionSalary }}</span><i> 元/ 小时</i></div>
                                <div><i>平日标准</i></div>
                            </div>
                        </div>
                    </div>
                    <!-- 搜索之后循环的值 end -->
                </div>

            </section>
            <div v-show="showTitle" class="showTitle">
                <div class="titlContent">
                    <img :src="kk" alt="">
                    <span>职位藏起来了哦 ~</span>
                </div>
            </div>
        </div>
        <!-- 搜索框 end -->

    </main>
</template>
<script lang="ts" setup>
import recruiting from '../img/recruiting.png'
import work_eye from '../img/work_eye.png'
import work_happy from '../img/work_happy.png'
import work_time from '../img/work_time.png'
import kk from '../img/kk.png'
import { useRouter } from "vue-router";
const router = useRouter();
import axios from 'axios';
import apiUrl from '../api/api.js'
import { ref, onMounted, onBeforeUnmount } from 'vue';

const showTitle = ref()

const searchInput = ref<HTMLInputElement | null>(null);
const searchInputs: any = ref(null);
searchInputs.value?.focus();

// 获取input框焦点
onMounted(() => {
    if (searchInput.value) {
        searchInput.value.focus();
    }
});

// 查询后的返回的数据
const positionData = ref<{
    positionId: number; // 职位id
    positionName: string; //职位名称
    positionAffiliatedUnit: string; // 职位所属单位
    positionSalary: string; // 职位薪资
    positionHeat: string; //热度
    positionStartTime: number; //开始时间
    positionEndTime: string; //结束时间
}[]>([]);

const showCancel = ref(true);
const showSearch = ref(false);

const handleKeyDown = (event: KeyboardEvent) => {
    const positiontitle = searchInput.value?.value.trim() || '';
    showSearch.value = positiontitle !== '';
    if (showCancel.value == null) {
        showSearch.value = positiontitle !== '';
    }
    showCancel.value = !showSearch.value;
    const isNumericKey = event.key >= '0' && event.key <= '9';
    if (isNumericKey) {
        event.preventDefault();
    }
    if (event.keyCode === 32) {
        event.preventDefault(); // 阻止输入空格
    }
};

const handleSearch = async () => {
    const inputValue = document.getElementById('inputValue') as HTMLInputElement;
    const inputdata = inputValue.value;
    try {
        const response = await axios.get(apiUrl + 'api/position/getListPlus', {
            params: {
                positionName: inputdata,
            },
            headers: {
                'Access-Control-Allow-Origin': '*', // 添加允许的域名，可以根据实际情况设置
            },
        });
        // 获取数据
        positionData.value = response.data.data
        if (response.data.data.length == 0) {
            return showTitle.value = true;
        }
        else {
            return showTitle.value = false;
        }
    } catch (error) {
        console.error(error);
    }

};

onMounted(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    };
    window.addEventListener('keydown', handleKeyDown);

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', handleKeyDown);
    });
});

// 获取用户路由Id
const userId = router.currentRoute.value.params.iiusdis as string;

// 去职位详细页面
function goToDetails(positionId, userId) {
    router.push({
        name: 'Details',
        query: {
            pisoPcnisd: positionId,
            usndUdoisd: userId
        }
    });
}
</script>

<style scoped>
main {
    padding-bottom: 0.3067rem !important;
}

.link-color {
    color: #9499b0;
}

main {
    position: relative;
}


.option {
    padding-top: .5rem !important;
    background-color: #fff;

}


.option .Job-content {
    width: 14.2rem !important;
    padding: 0.2rem 0.5rem !important;
    border-bottom: 0 !important;
}

.option .Job-content:first-child {

    border-top-left-radius: .2rem;
    border-top-right-radius: .2rem;
}

.option .Job-content:last-child {
    border-bottom-left-radius: .2rem;
    border-bottom-right-radius: .2rem;
}
</style>