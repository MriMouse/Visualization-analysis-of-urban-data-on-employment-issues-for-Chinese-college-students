<template>
    <div class="all-contain">
        <div class="header">
            <ul id="nav">
                <li ref="slide1" class="slide1"></li>
                <li ref="slide2" class="slide2"></li>
                <li v-for="(item, index) in menuItems" :key="index">
                    <a href="#" @click="handleClick(index)" @mouseover="handleMouseOver(index)"
                        @mouseout="handleMouseOut" style="margin: 0 1vw;">{{ item }}</a>
                </li>
            </ul>
        </div>
        <div class="content">
            <div v-if="selectedItem === '首页'">
                <div class="container-fliud">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="title-container">
                                <div style="font-size: 5vw;">
                                    <span class="gradient-text">中国</span>
                                    <span class="normal-text">大学生</span>
                                </div>
                                <div>
                                    <span class="normal-text">就业问题城市数据</span>
                                    <span class="blue-text">可视化分析</span>
                                </div>
                            </div>
                            <div class="jieshao">
                                <p>
                                    大学生就业问题是当前中国社会关注的焦点。本可视化分析平台深入挖掘中国大学生就业数据，利用图表、词云等多维度可视化手段，全面展示近十年来毕业生的就业分布、行业偏好、薪酬趋势以及企业需求变化。同时，对比城市GDP增长与就业人口数据，揭示经济发展与就业机会的密切联系。为政策制定者提供可视化方案，帮助学生群体更好获取信息，为学校相关指导老师提供教学可视化工具，为企业提供宝贵的市场洞察和决策参考。
                                </p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <Map2></Map2>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="selectedItem === '国家政策'">
                <start2></start2>
            </div>
            <div v-else-if="selectedItem === '就业信息'">
                <!-- Gamma内容 -->
                <start3></start3>
            </div>
            <div v-else-if="selectedItem === '数据统计'">
                <start4></start4>
            </div>
        </div>
    </div>
    <!-- <router-view></router-view> -->
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import start2 from '@/view/start2.vue'
import start3 from '@/view/start3.vue'
import start4 from '@/view/start4.vue'
import zhengCe from './zhengCe.vue';
import wordCloud from './wordCloudPage.vue'
import Map2 from '@/components/Map2.vue'


const router = useRouter()
const selectedItem = ref('数据统计');
const slide1 = ref(null);
const slide2 = ref(null);
const menuItems = ['首页', '国家政策', '就业信息', '数据统计'];

const setSlidePosition = (slide, position, width) => {
    slide.style.opacity = '1';
    const parentPosition = slide.parentNode.getBoundingClientRect();
    slide.style.left = `${position.left - parentPosition.left}px`;
    slide.style.width = `${width}px`;
};

const handleClick = index => {
    const item = slide1.value.parentNode.children[index + 2];
    selectedItem.value = menuItems[index];
    console.log(item.getBoundingClientRect().left)
    setSlidePosition(slide1.value, item.getBoundingClientRect(), item.offsetWidth);

    //router.push('/stock')
};

const handleMouseOver = index => {
    const item = slide2.value.parentNode.children[index + 2];
    setSlidePosition(slide2.value, item.getBoundingClientRect(), item.offsetWidth);
    slide2.value.classList.add('squeeze');
};

const handleMouseOut = () => {
    slide2.value.style.opacity = '0';
    slide2.value.classList.remove('squeeze');
}
</script>

<style lang="less" scoped>
.all-contain {
    background-color: rgb(41, 41, 41);
}

.content {
    position: relative;

}

.gradient-text {
    background-image: linear-gradient(90deg, rgb(255, 163, 1), rgb(244, 42, 62));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    font-size: 110%;
}

.normal-text {
    font-size: 110%;
    font-weight: normal;
    font-weight: bold;
    color: rgb(255, 255, 255);
}

.jieshao {
    margin-top: 5%;
    margin-left: 12%;
    color: rgb(151, 151, 151);
}

.title-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-size: 3vw;
    margin-left: 12%; // 距离左侧10%
    margin-top: 23%; // 距离顶部20%
}

.blue-text {
    background-image: linear-gradient(45deg, rgb(0, 163, 255), rgb(1, 226, 95));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    font-size: 110%;
}

#nav {
    position: absolute;
    border: none;
    border-radius: 10em;
    display: flex;
    list-style: none;
    background: rgb(60, 60, 60);
    box-shadow: 15px 15px 15px #00000033;
    padding: 1px;
    width: 50%;
    left: 50%;
    transform: translate(-50%);
    top: 2%;
    margin: auto;
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
}

#nav li {
    font-size: 20px;
}

#nav li a {
    position: relative;
    padding: 15px 50px;
    font: 500 10px;
    border: none;
    outline: none;
    color: rgb(241, 245, 255);
    display: inline-block;
    text-decoration: none;
    z-index: 3;
}

.slide1,
.slide2 {
    position: absolute;
    display: inline-block;
    height: 50px;
    border-radius: 10em;
    //transform: translate(-100%);
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
}

.slide1 {
    background-color: rgba(45, 91, 184, 0.826);
    z-index: 2;
}

.slide2 {
    opacity: 0;
    background-color: rgba(94, 111, 170, 0.5);
    z-index: 1;
    box-shadow: 0 0 20px #ffffffaa inherit;
}

.all-contain {
    display: flex;
    flex-direction: column;
    height: 100vh;
    /* 占据整个视口高度 */
}

.header {
    height: 10%;
    /* 占据上面20% */
}

.content {
    flex: 1;
    /* 占据剩余的空间 */
    position: relative;
}
</style>