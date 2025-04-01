<template>
    <div class="com-container">
        <div class="title" :style="comStyle">
        </div>
        <div class="com-chart" ref="trend_ref"></div>
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

const initChart = async () => {
    const themeResponse = await fetch('/static/theme/westeros.json');
    const themeData = await themeResponse.json();
    echarts.registerTheme('westeros', themeData);
    chartInstance = echarts.init(trend_ref.value, 'westeros')
    const initOpt = {
        title:{
            text:'中国近十年少儿老年人口趋势调查数据',
            top:'3%',
            left:'1%'
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
                magicType: { show: true, type: ['tild','stack'] },
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
    const colorArr1 = [
        'rgba(11, 168, 44, 0.5)',
        'rgba(171, 231, 239,0.5)',
        'rgba(44, 110, 255, 0.5)',
    ]
    const colorArr2 = [
        'rgba(11, 168, 44, 0)',
        'rgba(171, 231, 239,0)',
        'rgba(44, 110, 255, 0)',
    ]
    console.log(allData)
    let timeArr = allData[1].__parsed_extra
    timeArr = timeArr.reverse()
    const valueArr = allData.slice(3, 6)
    console.log(valueArr)
    const seriesArr = valueArr.map((item, index) => {
        //console.log(item)
        return {
            name: item['数据库：年度数据'],
            type: 'line',
            data: item.__parsed_extra,
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
        return item['数据库：年度数据']
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

const getData = async (ret) => {
    allData = ret
    updateChart()
}

instance.appContext.config.globalProperties.$socket.registerCallBack('oldData',getData)

const screenAdapter = () => {
    titleFontSize.value = trend_ref.value.offsetWidth / 100 * 0.6 + trend_ref.value.offsetHeight / 100 * 2.2
    const adapterOpt = {
        title:{
            titleStyle:{
                fontSize:titleFontSize.value
            },
        },
        legend: {
            itemWidth: titleFontSize.value,
            itemHeight: titleFontSize.value,
            itemGap: titleFontSize.value,
            textStyle: {
                fontSize: titleFontSize.value
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
    instance.appContext.config.globalProperties.$socket.send({
        action:'getData',
        socketType:'oldData',
        chartName:'oldDAta',
        value:''
    })
    screenAdapter()
    window.addEventListener('resize', screenAdapter)
});
onUnmounted(() => {
    window.removeEventListener('resize', screenAdapter)
    instance.appContext.config.globalProperties.$socket.UnregisterCallBack('oldData')
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