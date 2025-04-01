<template>
    <div class="com-container">
        <div class="title" :style="comStyle">
        </div>
        <div class="com-chart" ref="trend_ref"  style="height: 400%"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance, computed } from "vue";
import * as echarts from 'echarts'
import { all } from "axios";
//import '@/../public/static/theme/westeros.js'

let chartInstance = ref(null)
let trend_ref = ref()
let allData = null
let instance = getCurrentInstance();
let titleFontSize = ref(0)

const getData = async (ret) => {
    allData = ret
    console.log(allData)
    updateChart()
}

instance.appContext.config.globalProperties.$socket.registerCallBack('trendData', getData)

const initChart = async () => {
    const themeResponse = await fetch('/static/theme/westeros.json');
    const themeData = await themeResponse.json();
    echarts.registerTheme('westeros', themeData);
    chartInstance = echarts.init(trend_ref.value, 'westeros')
    const initOpt = {
        title: {
            text: '中国近十年毕业生与企业就业数据对比',
            top: '2%',
            textStyle:{
                color:'white'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false
        },
        yAxis: {
            type: 'value'
        },
        grid: {
            top: '35%',
            left: '5%',
            right: '4%',
            bottom: '10%',
            containLabel: true,
        },
        tooltip: {
            show: true,
            trigger: 'axis',
        },
        toolbox: {
            show: true,
            feature: {
                magicType: { show: true, type: ['tild', 'stack'] },
                saveAsImage: { show: true }
            }
        },
        legend: {
            left: '2%',
            top: '15%',
            icon: 'circle'
        }
    }
    chartInstance.setOption(initOpt)
}

const updateChart = () => {
    const timeArr = [10]
    for (var i = 0; i < 10; ++i) {
        timeArr[i] = 2013 + i
    }
    //console.log(timeArr)
    const colorArr1 = [
        'rgba(0,255,255, 0.9)',
        'rgba(102, 124, 237,0.9)',
        'rgba(98, 225, 215, 0.9)',
        'rgba(77, 214, 12, 0.9)',
        'rgba(223, 54, 33, 0.9)',
    ]
    const colorArr2 = [
        'rgba(0,255,255, 0.3)',
        'rgba(102, 124, 237,0.3)',
        'rgba(98, 225, 215, 0.3)',
        'rgba(77, 214, 12, 0.3)',
        'rgba(223, 54, 33, 0.3)',
    ]
    const valueArr = [
        {
            name: '就业人员合计(万人)',
            value: []
        },
        {
            name: '国有单位(万人)',
            value: []
        },
        {
            name: '外商投资单位(万人)',
            value: []
        },
        {
            name: '高校毕业人数(本科生/万人)',
            value: []
        },
        {
            name: '高校毕业人数(研究生/万人)',
            value: []
        },
    ]
    for (var i = 2; i <= 13; ++i) {
        valueArr[0].value.push(parseInt(allData[5]['Unnamed: '+i]))
    }
    for (var i = 2; i <= 13; ++i) {
        valueArr[1].value.push(parseInt(allData[19]['Unnamed: '+i]))
    }
    for (var i = 2; i <= 13; ++i) {
        valueArr[2].value.push(parseInt(allData[26]['Unnamed: '+i]))
    }
    allData.slice(30,40).forEach(item => {
        valueArr[4].value.push(item['Unnamed: 1'])
        valueArr[3].value.push(item['Unnamed: 2'])
    })
    console.log(valueArr[1].value)
    //console.log(valueArr)
    const seriesArr = valueArr.map((item, index) => {
        return {
            name: item.name,
            type: 'line',
            data: item.value,
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        color: colorArr1[index],
                        offset: 0
                    },
                    {
                        color: colorArr2[index],
                        offset: 1
                    },
                ])
            }
        }
    })
    const legendArr = valueArr.map(item => {
        return item.name
    })
    const dataOpt = {
        xAxis: {
            data: timeArr
        },
        legend: {
            data: legendArr
        },
        series: seriesArr
    }
    chartInstance.setOption(dataOpt)
}

const screenAdapter = () => {
    titleFontSize.value = trend_ref.value.offsetWidth / 100 * 0.6 + trend_ref.value.offsetHeight / 100 * 2.2
    const adapterOpt = {
        title: {
            titleStyle: {
                fontSize: titleFontSize.value
            },
        },
        legend: {
            itemWidth: titleFontSize.value,
            itemHeight: titleFontSize.value,
            itemGap: titleFontSize.value * 1.2,
            textStyle: {
                fontSize: titleFontSize.value * 1.2,
            }
        }
    }
    chartInstance.setOption(adapterOpt)
    chartInstance.resize()
    //console.log(titleFontSize.value)
}

const comStyle = computed(() => {
    //console.log(titleFontSize.value)
    return {
        fontSize: titleFontSize.value + 'px',
    }
})

onMounted(async () => {
    await initChart();
    //getData();
    instance.appContext.config.globalProperties.$socket.send({
        action: 'getData',
        socketType: 'trendData',
        chartName: '1-13DAta',
        value: ''
    })
    screenAdapter()
    window.addEventListener('resize', screenAdapter)
});
onUnmounted(() => {
    window.removeEventListener('resize', screenAdapter)
    //instance.appContext.config.globalProperties.$socket.UnregisterCallBack('trendData')
});
</script>

<style lang="less" scoped>
.title {
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 10;
    color: rgb(0, 0, 0);

    .title-icon {
        margin-left: 10px;
        cursor: pointer;
    }
}
</style>