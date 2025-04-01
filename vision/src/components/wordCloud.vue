<template>
    <div>
        <div class="com-container">
            <h2>大学生就业热词</h2>
            <div class="com-chart chart" ref="word"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance, watch } from "vue";
import $ from 'jquery'
import * as echarts from 'echarts'
import 'echarts-wordcloud'

const word = ref()
onMounted(async () => {
    //await nextTick();
    console.log(word.value)
    if (word.value) {
        var chart = echarts.init(word.value);
        const option = {
            series: [{
                type: 'wordCloud',
                shape: 'circle',
                keepAspect: false,
                // maskImage: maskImage,
                left: 'center',
                top: 'center',
                width: '100%',
                height: '90%',
                right: null,
                bottom: null,
                sizeRange: [12, 60],
                rotationRange: [-0, 0],
                rotationStep: 45,
                gridSize: 15,
                drawOutOfBound: false,
                layoutAnimation: true,
                textStyle: {
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                    color: function () {
                        // Random color
                        return 'rgb(' + [
                            Math.round(Math.random() * (255 - 100) + 100),
                            Math.round(Math.random() * (255 - 100) + 100),
                            Math.round(Math.random() * (255 - 100) + 100)
                        ].join(',') + ')';
                    }
                },
                emphasis: {
                    // focus: 'self',
                    textStyle: {
                        textShadowBlur: 3,
                        textShadowColor: '#333'
                    }
                },
                //data属性中的value值却大，权重就却大，展示字体就却大
                data: [
                    { name: '乡村振兴', value: 25 },
                    { name: "小微企业", value: 40 },
                    { name: "政策", value: 30 },
                    { name: '精准帮扶', value: 20 },
                    { name: '人数增加', value: 30 },
                    { name: '就业难', value: 34 },
                    { name: '失业率', value: 30 },
                    { name: '慢就业', value: 40 },
                    { name: '校企合作', value: 20 },
                    { name: '降薪时代', value: 27 },
                    { name: '新一线城市', value: 30 },
                    { name: '单位就业比例上升', value: 23 },
                    { name: '互联网热度消退', value: 21 },
                    { name: '补贴', value: 24 },
                    { name: '人才', value: 41 },
                    { name: '互联网', value: 36 },
                    { name: '考公', value: 45 },
                    { name: '事业单位', value: 33 },
                    { name: '考研', value: 22 },
                    { name: '编制', value: 39 },
                    { name: '就业', value: 33 },
                    { name: '创业', value: 22 },
                    { name: '稳中向好', value: 39 },
                ]
            }]
        }
        chart.setOption(option)
    }
});




</script>

<style lang="less" scoped>
.com-chart {
    height: 350px;
    width: 600px;
    position: relative;
    left: -4vw;
    top: -2vh;
}

h2 {
    text-align: center;
    color: white;
    font-weight: bold;
}
</style>