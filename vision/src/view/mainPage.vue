<template>
    <div class="container">
        <div class="title-container">
            <span class="normal-text"></span>
            <div style="font-size: 5vw;">
                <span class="gradient-text">中国</span>
                <span class="normal-text">大学生</span>
            </div>
            <div>
                <span class="normal-text">就业问题城市数据</span>
                <span class="blue-text">可视化分析</span>
            </div>
            <span class="normal-text"></span>
        </div>
    </div>
</template>
<script setup>

</script>

<style lang="less" scoped>
.container {
    background: rgb(58, 58, 58);
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

.title-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-size: 3vw;
    margin-left: 10%; // 距离左侧10%
    margin-top: 15%; // 距离顶部20%
}

.blue-text {
    background-image: linear-gradient(45deg, rgb(0, 163, 255), rgb(1, 226, 95));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
}
</style>