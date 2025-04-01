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
let currentPage = ref(1)
let totalPage = ref(0)
let timerId = null
const seller = ref()
//const windowWidth = ref(window.innerWidth)

const initChart = async () => {
  const themeResponse = await fetch('/static/theme/westeros.json');
  const themeData = await themeResponse.json();
  echarts.registerTheme('westeros', themeData);
  chartInstance = echarts.init(seller.value, 'westeros');
  const initOpt = {
    title: {
      text: '━━(￣ー￣*|||━━各省人口数据',
      textStyle: {
        fontSize: 40,
        left: 20,
        top: 20
      }
    },
    grid: {
      top: '10%',
      left: '10%',
      right: '50%',
      bottom: '50%',
      //containLabel: true,
    },
    xAxis: {
      type: 'value',
      // axisLine: {
      //   lineStyle: {
      //     length: 100110,
      //   }
      // },
    },
    yAxis: {
      type: 'category',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        z: 0,
        lineStyle: {
          width: 56,
          color: '#DCDCDC'
        }
      }
    },
    series: [
      {
        type: "bar",
        barWidth: 44,
        label: {
          show: true,
          position: 'right',
          textStyle: {
            color: 'black'
          }
        },
        itemStyle: {
          barBorderRadius: [0, 22, 22, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: '#5052EE'
            },
            {
              offset: 1,
              color: '#AB6EE5'
            }
          ])
        }
      },
    ],
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
  //文件名记得填上
  // const ret = await instance.appContext.config.globalProperties.$http.get("populationDAta");
  allData = ret
  console.log(allData)
  allData = allData.slice(3, 34)
  allData.sort((a, b) => {
    // 确保 __parsed_extra 存在且长度足够
    if (a.__parsed_extra && b.__parsed_extra && a.__parsed_extra.length > 1 && b.__parsed_extra.length > 1) {
      const valueA = parseFloat(a.__parsed_extra[1]);
      const valueB = parseFloat(b.__parsed_extra[1]);
      if (isNaN(valueA)) return 1; // 如果 valueA 不是数字，排在后面
      if (isNaN(valueB)) return -1; // 如果 valueB 不是数字，排在前面
      return valueA - valueB; // 如果都是数字，正常比较
    }
    return 0; // 如果缺少 __parsed_extra 或长度不够，保持原有顺序
  });

  totalPage.value = allData.length % 6 === 0 ? allData.length / 6 : allData.length / 6 + 1
  updateChart();
  startInterval()
};

instance.appContext.config.globalProperties.$socket.registerCallBack('sellerData',getData)

const updateChart = () => {
  const start = (currentPage.value - 1) * 6
  const end = currentPage.value * 6
  const showData = allData.slice(start, end)
  const sellerNames = showData.map((item) => {
    return item['数据库：分省年度数据']
  })
  const sellerValues = showData.map((item) => {
    return item['__parsed_extra'][1]
  })
  const dataOpt = {
    yAxis: {
      data: sellerNames
    },
    series: [
      {
        data: sellerValues,
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
    currentPage.value++
    if (currentPage.value > totalPage.value) currentPage.value = 1
    updateChart()
  }, 3000)
}

const screenAdapter = () => {
  const titleFontSize = seller.value.offsetWidth / 100 * 2.7 + seller.value.offsetHeight / 100 * 1.3
  //const titleFontSize = seller.value.offsetWidth / 100 * 3.7
  const adapterOpt = {
    title: {
      text: '━━(￣ー￣*|||━━各省人口数据',
      textStyle: {
        fontSize: titleFontSize,
      }
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          width: titleFontSize,
        }
      }
    },
    series: [
      {
        barWidth: titleFontSize,
        itemStyle: {
          barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0]
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
        socketType:'sellerData',
        chartName:'populationDAta',
        value:''
    })
  screenAdapter()
  window.addEventListener('resize', screenAdapter)
});
onUnmounted(() => {
  clearInterval(timerId);
  instance.appContext.config.globalProperties.$socket.UnregisterCallBack('sellerData')
  window.removeEventListener('resize', screenAdapter)
});

</script>
