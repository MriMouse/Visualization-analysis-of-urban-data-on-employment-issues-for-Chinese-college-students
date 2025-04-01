<template>
    <div class="com-container">
        <div class="com-chart" ref="bing" style="height: 200%;"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import * as echarts from 'echarts'

let chartInstance = ref(null);
let allData = ref(null)
let timerId = null
const bing = ref()
const titleFontSize = ref(0)
const dataList = [
    {
        name: '第一产业',
        value: 34.7
    },
    {
        name: '第二产业',
        value: 29.6
    },
    {
        name: '第三产业',
        value: 35.7
    }
]

const initChart = async () => {
    const themeResponse = await fetch('/static/theme/westeros.json');
    const themeData = await themeResponse.json();
    echarts.registerTheme('westeros', themeData);
    chartInstance = echarts.init(bing.value, 'westeros');
    const initOpt = {
        title: {
            top: '3%'
        },
        legend: {
            icon: 'circle'
        },
        series: [{
            type: 'pie',
            top:'20%',
            label: {
                show: false
            },
            emphasis: {
                scale: true,
                scaleSize: 20,//等待解决
                focus: 'self',
                label: {
                    show: true,
                },

            }
        }],
    }
    chartInstance.setOption(initOpt)
};

const getData = async (ret) => {
    allData = dataList;
    //console.log(allData)
    updateChart();
};

const updateChart = () => {
    const seriesData = allData.map(item => {
        return {
            name: item['name'],
            value: item["value"]
        }
    })
    console.log(seriesData);
    const titleName = '2011年一二三产业就业比重饼状图(%)'
    const dataOpt = {
        title: {
            text: titleName,
            textStyle:{
                color:'white'
            }
        },
        series: [{
            data: seriesData
        }],
        legend: {
            data: seriesData.name,
            top: '10%'
        }
    }
    chartInstance.setOption(dataOpt)
}

const screenAdapter = () => {
    titleFontSize.value = bing.value.offsetWidth / 100 * 2.7 + bing.value.offsetHeight / 100 * 1.3
    //const titleFontSize = seller.value.offsetWidth / 100 * 3.7
    const adapterOpt = {
        title: {
            textStyle: {
                fontSize: titleFontSize.value*1.5,
            },
            left: 'center',
        },
        tooltip: {
            axisPointer: {
                lineStyle: {
                    width: titleFontSize.value,
                }
            }
        },
        series: [
            {
                radius: titleFontSize.value * 8,
            },
        ],
        legend: {
            itemWidth: titleFontSize.value,
            itemHeight: titleFontSize.value / 2,
            itemGap: titleFontSize.value,
            textStyle: {
                fontSize: titleFontSize.value * 1.5
            },
        }
    }
    chartInstance.setOption(adapterOpt)
    chartInstance.resize()
}

onMounted(async () => {
    await initChart();
    getData();
    // instance.appContext.config.globalProperties.$socket.send({
    //     action:'getData',
    //     socketType:'bingData',
    //     chartName:'oldDAta',
    //     value:''
    // })
    screenAdapter()
    window.addEventListener('resize', screenAdapter)
});
onUnmounted(() => {
    clearInterval(timerId);
    //instance.appContext.config.globalProperties.$socket.UnregisterCallBack('bingData')
    window.removeEventListener('resize', screenAdapter)
});
</script>

<style lang="less" scoped>
.com-container {
    position: relative;
    top: 20%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>
