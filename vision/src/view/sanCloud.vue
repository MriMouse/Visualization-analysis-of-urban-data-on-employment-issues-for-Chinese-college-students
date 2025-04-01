<template>
    <div>
        <div class="com-container">
            <h2>大学生毕业去向</h2>
            <div class="com-chart" ref="word"></div>
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
                    { name: '三支一扶', value: 49 },
                    { name: "大学生参军", value: 53, url:'http://localhost:8998/sanzhi' },
                    { name: "选调生", value: 51, url:'http://localhost:8998/xuandiao' },
                    { name: '西部计划', value: 49, url:'http://localhost:8998/xibu' },
                    { name: '河北人才网', value: 51, url:'https://www.hbrc.com.cn/' },
                    { name: '国有企业就业', value: 21 },
                    { name: '继续深造', value: 21 },
                    { name: '出国留学', value: 21 },
                    { name: '自主创业', value: 21 },
                    { name: '自由职业', value: 21 },
                    { name: '科研机构', value: 21 },
                    { name: '高等教育机构', value: 21 },
                    { name: '中小学教师', value: 21 },
                    { name: '医疗卫生行业', value: 21 },
                    { name: '非政府组织', value: 21 },
                    { name: '国际组织', value: 21 },
                    { name: '媒体与传播', value: 21 },
                    { name: '艺术与文化', value: 21 },
                    { name: '读研读博', value: 21 },
                    { name: '公务员考试', value: 21 },
                    { name: '就业难', value: 21 },
                ],

            }]
        }
        chart.setOption(option)
        chart.on('click', function (params) {
            if(params.data.url) window.open(params.data.url)
        });
    }
});




</script>

<style lang="less" scoped>
.com-chart {
    height: 300px;
    width: 600px;
    position: relative;
    left: -5vw;
    top: -2vh;
}
h2 {
    text-align: center;
    color: white;
    font-weight: bold;
}
</style>