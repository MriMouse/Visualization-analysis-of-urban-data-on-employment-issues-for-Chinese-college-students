<template>
    <div class="com-container">
        <div class="com-chart" ref="bing"></div>
        <span class="iconfont arr-left" @click="handleARR(1)" :style="comStyle">&#xe6ef;</span>
        <span class="iconfont arr-right" @click="handleARR(-1)" :style="comStyle">&#xe6ed;</span>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance, computed } from 'vue';
import * as echarts from 'echarts'

let chartInstance = ref(null);
let allData = ref(null)
const instance = getCurrentInstance();
let currentPage = ref(8)
let dataLen = ref(0)
let timerId = null
const bing = ref()
const titleFontSize = ref(0)

const handleARR = (x) => {
    currentPage.value += x
    if (currentPage.value > dataLen - 1) {
        currentPage.value = 0
    } else if (currentPage.value < 0) {
        currentPage.value = dataLen - 1
    }
    updateChart()
}

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
            label: {
                show: true
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
    allData = ret
    //console.log(allData)
    updateChart();
};

instance.appContext.config.globalProperties.$socket.registerCallBack('bingData',getData)

const updateChart = () => {
    const showData = allData.slice(3, 6)
    dataLen = 9
    console.log(showData)
    const seriesData = showData.map(item => {
        return {
            name: item["数据库：年度数据"],
            value: item["__parsed_extra"][currentPage.value]
        }
    })
    const titleName = allData[1]["__parsed_extra"][currentPage.value] + '人口年龄结构饼状图'
    const dataOpt = {
        title: {
            text: titleName
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
                fontSize: titleFontSize.value,
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
                radius: titleFontSize.value * 6,
            },
        ],
        legend: {
            itemWidth: titleFontSize.value,
            itemHeight: titleFontSize.value / 2,
            itemGap: titleFontSize.value,
            textStyle: {
                fontSize: titleFontSize.value / 1.5
            },
        }
    }
    chartInstance.setOption(adapterOpt)
    chartInstance.resize()
}

const comStyle = computed(()=>{
    return {
        fontSize: titleFontSize.value*1.2 + 'px'
    }
})

onMounted(async () => {
    await initChart();
    instance.appContext.config.globalProperties.$socket.send({
        action:'getData',
        socketType:'bingData',
        chartName:'oldDAta',
        value:''
    })
    screenAdapter()
    window.addEventListener('resize', screenAdapter)
});
onUnmounted(() => {
    clearInterval(timerId);
    instance.appContext.config.globalProperties.$socket.UnregisterCallBack('bingData')
    window.removeEventListener('resize', screenAdapter)
});
</script>

<style lang="less" scoped>
.arr-left {
    position: relative;
    left: 6%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}

.arr-right {
    position: relative;
    right: 6%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}
</style>
