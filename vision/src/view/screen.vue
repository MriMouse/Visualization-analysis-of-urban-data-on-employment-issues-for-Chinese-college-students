<template>
    <div>
        <div id="title">
            <h1><span class="gradient-text">中国</span> <span class="normal-text">人口分析</span></h1>
        </div>
        <div id="left1">
            <oldPage></oldPage>
        </div>
        <div id="left2">
            <bingPage></bingPage>
        </div>
        <div id="center1">
            <ppPage></ppPage>
        </div>
        <div id="center2">
            <MapPage></MapPage>
        </div>
        <div id="right1">
            <TrendPage></TrendPage>
        </div>
        <div id="right2">
            <stockPage></stockPage>
        </div>
    </div>

</template>
<script setup>
import bingPage from '@/view/bingPage.vue'
import MapPage from '@/view/MapPage.vue'
import oldPage from '@/view/oldPage.vue'
import stockPage from '@/view/stockPage.vue'
import TrendPage from '@/view/TrendPage.vue'
import ppPage from '@/view/ppPage.vue'


</script>

<style lang="less" scoped>
body {
    background: white;
}

#title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10%;
    /* background: #555; */
    color: black;
    font-size: 35px;
    /* 弹性盒子布局 */
    display: flex;
    /* 水平剧中*/
    justify-content: center;
    /* 垂直居中*/
    align-items: center;
}

.gradient-text {
    background-image: linear-gradient(90deg, rgb(255, 163, 1), rgb(244, 42, 62));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
}

.normal-text {
    font-size: 95%;
    font-weight: normal;
    font-weight: bold;
    color: rgb(36, 53, 71);
}

#left1 {
    background: rgb(249, 249, 249);
    width: 30%;
    height: 45%;
    position: absolute;
    top: 10%;
    left: 0;
}

#left2 {
    background: rgb(249, 249, 249);
    width: 30%;
    height: 45%;
    position: absolute;
    top: 55%;
    left: 0;
}

#center1 {
    position: absolute;
    top: 10%;
    left: 30%;
    width: 40%;
    height: 35%;
    background: rgb(249, 249, 249);
    display: flex;
    flex-wrap: wrap;
    /*文本超出后换行*/
}

#center2 {
    position: absolute;
    top: 45%;
    left: 30%;
    width: 40%;
    height: 55%;
    background: rgb(249, 249, 249);
}

#right1 {
    position: absolute;
    top: 10%;
    right: 0;
    width: 30%;
    height: 45%;
    background: rgb(249, 249, 249);
}

#right2 {
    position: absolute;
    top: 55%;
    right: 0;
    width: 30%;
    height: 45%;
    background: rgb(249, 249, 249);
}
</style>