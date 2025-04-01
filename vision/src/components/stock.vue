<template>
    <div class="com-container backg">
        <div class="com-chart" ref="seller" style="height: 450%;"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue";
import * as echarts from 'echarts'

let chartInstance = ref(null);
let allData = null
let oldData = null
let laData = null
let lacxData = null
const instance = getCurrentInstance();
let currentPage = ref(0)
let timerId = null
const seller = ref()
const adapterFontSize = ref(0)

const initChart = async () => {
    const themeResponse = await fetch('/static/theme/westeros.json');
    const themeData = await themeResponse.json();
    echarts.registerTheme('westeros', themeData);
    chartInstance = echarts.init(seller.value, 'westeros');
    const initOpt = {
        title: {
            left: 'center',
            top: '2%'
        },
        tooltip: {
            show: true,
        },
    }
    chartInstance.setOption(initOpt)
    chartInstance.on('mouseover', () => {
        clearInterval(timerId)
    })
    chartInstance.on('mouseout', () => {
        startInterval()
    })
};

const getDataall = (ret) => {
    console.log(ret)
    oldData = ret.slice(1, 2).concat(ret.slice(7, 9))
    laData = ret.slice(14, 16)
    lacxData = ret.slice(19, 23)
    allData = ret.slice(28, 29)[0]['__parsed_extra'].slice(1, 10)
    updateChart();
    startInterval()
}

instance.appContext.config.globalProperties.$socket.registerCallBack('stockData1',getDataall)

const updateChart = () => {
    //console.log(allData)
    const seriesArr = []
    const colorArr = [
        ['rgb(93, 116, 159)', 'rgb(223, 228, 255)'],
        ['rgb(111, 91, 255)', 'rgb(199, 187, 254)'],
        ['rgb(147, 0, 255)', 'rgb(220, 193, 240)'],
    ]
    const laSeries = {
        type: 'pie',
        center: ['72%', '30%'],
        data: [
            {
                value: laData[1]['__parsed_extra'][currentPage.value],
                name: '劳动力占总人口(' + laData[1]['__parsed_extra'][currentPage.value] + '万人)',
                id: '1'
            },
            {
                value: (allData[currentPage.value] - laData[1]['__parsed_extra'][currentPage.value]),
                id: '2'
            },
        ]
    }
    seriesArr.push(laSeries)
    const lfySeries = {
        type: 'pie',
        center: ['27%', '30%'],
        data: [
            {
                value: oldData[2]['__parsed_extra'][currentPage.value],
                name: '老年抚养比(' + oldData[2]['__parsed_extra'][currentPage.value] + '%)',
                id: '1'
            },
            {
                value: (100 - oldData[2]['__parsed_extra'][currentPage.value]),
                id: '2'
            }
        ]
    }
    seriesArr.push(lfySeries)
    const xfySeries = {
        type: 'pie',
        center: ['72%', '72%'],
        data: [
            {
                value: oldData[1]['__parsed_extra'][currentPage.value],
                name: '少儿抚养比(' + oldData[1]['__parsed_extra'][currentPage.value] + '%)',
                itemStyle: {
                    color: 'rgb(93, 116, 159)'
                },
                id: '1'
            },
            {
                value: (100 - oldData[1]['__parsed_extra'][currentPage.value]),
                name: '3',
                id: '2',
                label: {
                    show:false
                },
            },
        ]
    }
    seriesArr.push(xfySeries)
    for (var i = 0; i < seriesArr.length; ++i) {
        seriesArr[i]['hoverAnimation'] = false
        seriesArr[i]['labelLine'] = {
            show: false
        }
        seriesArr[i]['data'][0]['label'] = {
            position: 'center',
            color: colorArr[i][1]
        },
            seriesArr[i]['data'][1]['tooltip'] = {
                show: false,
            },
            seriesArr[i]['data'][0]['itemStyle'] = {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                        offset: 1,
                        color: colorArr[i][1]
                    },
                    {
                        offset: 0,
                        color: colorArr[i][0]
                    }
                ])

            }
        seriesArr[i]['data'][1]['itemStyle'] = {
            color: 'rgba(107, 107, 107, 0.15)'
        }
    }
    const lacxSeries = {
        type: 'pie',
        center: ['30%', '72%'],
        hoverAnimation: false,
        data: [
            {
                value: lacxData[2]['__parsed_extra'].slice(1, 10)[currentPage.value],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                        {
                            offset: 1,
                            color: 'LightPink'
                        },
                        {
                            offset: 0,
                            color: 'rgb(174, 102, 255)'
                        }
                    ])
                },
                id: '1',
                name: '城镇',
                labelLine: {
                    length: 8
                },
                label: {
                    textStyle:{
                        color:'white',
                        fontSize:'11px'
                    }
                },
            },
            {
                value: lacxData[3]['__parsed_extra'].slice(1, 10)[currentPage.value],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                        {
                            offset: 1,
                            color: 'rgb(28, 223, 164)'
                        },
                        {
                            offset: 0,
                            color: 'rgb(164, 236, 254)'
                        }
                    ])
                },
                id: '2',
                name: '乡村',
                labelLine: {
                    length: 8,
                },
                label: {
                    textStyle:{
                        color:'white',
                        fontSize:'11px'
                    }
                },
            },
            {
                value: laData[1]['__parsed_extra'][currentPage.value] - lacxData[2]['__parsed_extra'].slice(1, 10)[currentPage.value] - lacxData[3]['__parsed_extra'].slice(1, 10)[currentPage.value],
                name: '\n就业人口占劳动力(万人):\n\n城镇:' + lacxData[2]['__parsed_extra'].slice(1, 10)[currentPage.value] + '\n\n乡村:' + lacxData[3]['__parsed_extra'].slice(1, 10)[currentPage.value],
                label: {
                    position: 'center',
                    textStyle:{
                        color:'white',
                        fontSize:'11px'
                    }
                },
                itemStyle: {
                    color: 'MidnightBlue'
                },
                id: '3'
            },
        ]
    }
    seriesArr.push(lacxSeries)
    const year = 2022 - currentPage.value
    const dataOpt = {
        title:{
            text: year + '年数据'
        },
        series: seriesArr,
        animation: true,
    }
    chartInstance.setOption(dataOpt)
}

const startInterval = () => {
    if (timerId) {
        clearInterval(timerId)
    }
    timerId = setInterval(() => {
        currentPage.value++
        if (currentPage.value >= 9) currentPage.value = 0
        updateChart()
    }, 1000)
}

const screenAdapter = () => {
    adapterFontSize.value = seller.value.offsetWidth / 100 * 3.3 + seller.value.offsetHeight / 100 * 1
    console.log(adapterFontSize.value)
    const innerRadius = adapterFontSize.value * 2.9
    const outterRadius = adapterFontSize.value * 3.6
    const seriesArr = [
        {
            radius: [outterRadius*1.125, innerRadius*1.025],
            label: {
                fontSize: adapterFontSize.value / 2
            },
            type: 'pie',
        },
        {
            radius: [outterRadius, innerRadius],
            label: {
                fontSize: adapterFontSize.value / 1.6
            },
            type: 'pie',
        },
        {
            radius: [outterRadius, innerRadius],
            label: {
                fontSize: adapterFontSize.value / 1.6
            },
            type: 'pie',
        },
        {
            radius: [outterRadius * 1.1, innerRadius / 0.85],
            label: {
                fontSize: adapterFontSize.value / 1.9
            },
            type: 'pie',
        },
    ]
    const adapterOpt = {
        title: {
            textStyle: {
                fontSize: adapterFontSize.value,
            }
        },
        series: seriesArr,
    }
    chartInstance.setOption(adapterOpt)
    chartInstance.resize()
}

onMounted(async () => {
    await initChart();
    instance.appContext.config.globalProperties.$socket.send({
        action:'getData',
        socketType:'stockData1',
        chartName:'stockDAta',
        value:''
    })
    screenAdapter()
    window.addEventListener('resize', screenAdapter)
});
onUnmounted(() => {
    clearInterval(timerId);
    window.removeEventListener('resize', screenAdapter)
    //instance.appContext.config.globalProperties.$socket.UnregisterCallBack('stockData1')
});

</script>