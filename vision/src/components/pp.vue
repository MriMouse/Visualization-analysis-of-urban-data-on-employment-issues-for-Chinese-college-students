<template>
    <div class="com-container">
        <div class="com-chart" ref="seller"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue";
import * as echarts from 'echarts'
//import '../../public/static/theme/westeros.js'

let chartInstance = ref(null);
let allData = ref(null)
const instance = getCurrentInstance();
let timerId = null
const seller = ref()
const startValue = ref(0)
const endValue = ref(9)

const initChart = async () => {
    const themeResponse = await fetch('/static/theme/westeros.json');
    const themeData = await themeResponse.json();
    echarts.registerTheme('westeros', themeData);
    chartInstance = echarts.init(seller.value, 'westeros');
    const initOpt = {
        title: {
            left: '1%',
            top: '1%',
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                interval: 0,
                rotate: 45
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                type: 'bar',
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: 'black'
                    }
                },
            },
        ],
        grid: {
            top: '15%',
            left: '10%',
            right: '5%',
            bottom: '25%',
            //containLabel: true
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

const getData = async (ret) => {
    allData = ret
    //console.log(allData)
    allData = allData.slice(3, 34)
    allData.sort((a, b) => {
        // 确保 __parsed_extra 存在且长度足够
        if (a.__parsed_extra && b.__parsed_extra && a.__parsed_extra.length > 1 && b.__parsed_extra.length > 1) {
            const valueA = parseFloat(a.__parsed_extra[1]);
            const valueB = parseFloat(b.__parsed_extra[1]);
            if (isNaN(valueA)) return 1; // 如果 valueA 不是数字，排在后面
            if (isNaN(valueB)) return -1; // 如果 valueB 不是数字，排在前面
            return valueB - valueA; // 如果都是数字，正常比较
        }
        return 0; // 如果缺少 __parsed_extra 或长度不够，保持原有顺序
    });
    updateChart();
    startInterval()
};

instance.appContext.config.globalProperties.$socket.registerCallBack('ppData',getData)

const updateChart = () => {
    const showData = allData//.slice(start, end)
    const proNames = showData.map((item) => {
        return item['数据库：分省年度数据']
    })
    const proValues = showData.map((item) => {
        return item['__parsed_extra'][1]
    })
    const dataOpt = {
        xAxis: {
            data: proNames
        },
        dataZoom: {
            show: false,
            startValue: startValue.value,
            endValue: endValue.value,
        },
        series: [
            {
                data: proValues,
                itemStyle: {
                    color: (value) => {
                        if (value.data > 100000) {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'OrangeRed'
                                },
                                {
                                    offset: 1,
                                    color: 'Orange'
                                },
                            ])
                        } else if (value.data > 70000) {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'Orchid'
                                },
                                {
                                    offset: 1,
                                    color: 'LightPink'
                                },
                            ])
                        } else if (value.data > 50000) {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'MidnightBlue'
                                },
                                {
                                    offset: 1,
                                    color: 'CornflowerBlue'
                                },
                            ])
                        } else if (value.data > 30000) {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'ForestGreen'
                                },
                                {
                                    offset: 1,
                                    color: 'Chartreuse'
                                },
                            ])
                        } else if (value.data > 14000) {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'GoldEnrod'
                                },
                                {
                                    offset: 1,
                                    color: 'Gold'
                                },
                            ])
                        } else {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'CadetBlue'
                                },
                                {
                                    offset: 1,
                                    color: 'LightBLue'
                                },
                            ])
                        }
                    }
                }
            },
        ],
    }
    chartInstance.setOption(dataOpt)
}

const startInterval = () => {
    if (timerId) {
        clearInterval(timerId)
    }
    timerId = setInterval(() => {
        console.log(startValue)
        startValue.value++
        endValue.value++
        if (endValue.value > allData.length - 1) {
            startValue.value = 0
            endValue.value = 9
        }
        updateChart()
    }, 1000)
}

const screenAdapter = () => {
    const titleFontSize = seller.value.offsetWidth / 100 * 2.7 + seller.value.offsetHeight / 100 * 1.
    const adapterOpt = {
        title: {
            text: '━━(￣ー￣*|||━━各省人口数据',
            textStyle: {
                fontSize: titleFontSize,
            }
        },
        tooltip: {
            show: true,
        },
        series: [
            {
                itemStyle: {
                    barBorderRadius: [titleFontSize / 6, titleFontSize / 6, 0, 0]
                }
            },
        ],
    }
    chartInstance.setOption(adapterOpt)
    chartInstance.resize()
}

onMounted(async () => {
    await initChart();
    instance.appContext.config.globalProperties.$socket.send({
        action:'getData',
        socketType:'ppData',
        chartName:'populationDAta',
        value:''
    })
    screenAdapter()
    window.addEventListener('resize', screenAdapter)
});
onUnmounted(() => {
    clearInterval(timerId);
    window.removeEventListener('resize', screenAdapter)
    instance.appContext.config.globalProperties.$socket.UnregisterCallBack('ppData')
});

</script>