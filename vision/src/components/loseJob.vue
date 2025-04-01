<template>
    <div class="com-container">
        <div class="com-chart" ref="trend_ref" style="height: 300%;"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance, computed } from "vue";
import * as echarts from 'echarts'
//import '@/../public/static/theme/westeros.js'

let chartInstance = ref(null)
let trend_ref = ref()
let allData = null
let instance = getCurrentInstance();
let titleFontSize = ref(0)

const getData = async (ret) => {
    allData = ret
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
            text: '中国近十年失业人口调查数据',
            top: '2%',
            textStyle: {
                color: 'white'
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
    const acData = allData.slice(47, 57)
    const timeArr = acData.map(item => parseInt(item['1-17  城镇登记失业人数及失业率(年末数)']));
    console.log(acData)
    const colorArr1 = [
        'rgba(255,255, 0.9)',
        'rgba(171, 231, 239,0.9)',
        'rgba(44, 110, 255, 0.9)',
    ]
    const colorArr2 = [
        'rgba(11, 168, 44, 0.3)',
        'rgba(171, 231, 239,0.4)',
        'rgba(44, 110, 255, 0.4)',
    ]
    const valueArr = [
        {
            name: '城镇登记失业人数(万人)',
            value: []
        },
        {
            name: '比上年增长(%)',
            value: []
        },
        {
            name: '城镇登记失业率(%)',
            value: []
        },
    ]
    acData.forEach(item => {
        valueArr[0].value.push(item['Unnamed: 1'])
        valueArr[1].value.push(item['Unnamed: 2'])
        valueArr[2].value.push(item['Unnamed: 3'])
    });
    console.log(valueArr)
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
        chartName: '1-17DAta',
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