<template>
  <div class="com-container">
    <div class="com-chart" ref="seller" style="height: 420%"></div>
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
const endValue = ref(6)

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
        rotate: 45,
        fontWeight: 'bolder',
        color: 'white',
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
            color: 'white'
          }
        },
      },
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: 'white'
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
  allData = [
    [
      ['农、林、牧、渔业', 42605], ['采矿业', 68509], ['制造业', 67352], ['电力、热力、燃气\n及水生产和供应业', 61870], ['建筑业', 60918], ['批发和零售业', 60630], ['交通运输、 \n仓储和邮政业', 66059], ['住宿和餐饮业', 47547], ['信息传输、软件\n和信息技术服务业', 123894], ['金融业', 110304], ['房地产业', 56435], ['租赁和商务服务业', 65731], ['科学研究和技术服务业', 81569], ['水利、环境\n和公共设施管理业', 44714], ['居民服务、修理\n和其他服务业', 47760], ['教育', 52771], ['卫生和社会工作', 71060], ['文化、体育和娱乐业', 56769], ['公共管理、\n社会保障和社会组织', 0]
    ],
    [
      ['农、林、牧、渔业', 58976], ['采矿业', 121522], ['制造业', 97528], ['电力、热力、燃气\n及水生产和供应业', 132964], ['建筑业', 78295], ['批发和零售业', 115408], ['交通运输、 \n仓储和邮政业', 115345], ['住宿和餐饮业', 53995], ['信息传输、软件\n和信息技术服务业', 220418], ['金融业', 174341], ['房地产业', 90346], ['租赁和商务服务业', 106500], ['科学研究和技术服务业', 163486], ['水利、环境\n和公共设施管理业', 68256], ['居民服务、修理\n和其他服务业', 65478], ['教育', 120422], ['卫生和社会工作', 135222], ['文化、体育和娱乐业', 121151], ['公共管理、\n社会保障和社会组织', 117440]
    ]
  ]
  allData[1].forEach((item, idx) => {
    //console.log(allData[1][idx])
    allData[1][idx].push(allData[0][idx][1])
  })
  allData = allData[1]
  allData.sort((a, b) => {
    return b[1] - a[1]; // 根据第二项升序排序
  });
  console.log(allData)
  updateChart();
  startInterval()
};

instance.appContext.config.globalProperties.$socket.registerCallBack('ppData', getData)

const updateChart = () => {
  const proNames = allData.map((item) => {
    return item[0]
  })
  const proValues1 = allData.map((item) => {
    return item[1]
  })
  const proValues2 = allData.map((item) => {
    return item[2]
  })
  console.log(proValues2)
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
        name: '非私营企业',
        data: proValues1,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'GoldEnrod'
                },
                {
                  offset: 1,
                  color: 'Gold'
                },
              ])
        }
      },
      {
        name: '私营企业',
        data: proValues2,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'Orchid'
            },
            {
              offset: 1,
              color: 'LightPink'
            },
          ])
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
      endValue.value = 6
    }
    updateChart()
  }, 1000)
}

const screenAdapter = () => {
  try {
    // 尝试获取元素的 offsetWidth
    const titleWidth = seller.value.offsetWidth || 0;
    const titleHeight = seller.value.offsetHeight || 0;

    // 计算标题字体大小
    const titleFontSize = titleWidth / 100 * 2.7 + titleHeight / 100 * 1;

    // 设置适配选项
    const adapterOpt = {
      title: {
        text: '分行业就业人员平均工资',
        textStyle: {
          fontSize: titleFontSize,
          color:'white'
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
        {
          itemStyle: {
            barBorderRadius: [titleFontSize / 6, titleFontSize / 6, 0, 0]
          }
        },
      ],
    };

    // 设置图表选项并调整大小
    chartInstance.setOption(adapterOpt);
    chartInstance.resize();
  } catch (error) {
    console.log('1111111111111111111跳过')
  }
}


onMounted(async () => {
  await initChart();
  instance.appContext.config.globalProperties.$socket.send({
    action: 'getData',
    socketType: 'ppData',
    chartName: '1-29seleDAta',
    value: ''
  })
  screenAdapter()
  window.addEventListener('resize', screenAdapter)
});
onUnmounted(() => {
  console.log('1111111111111111111111111111111111111111111111111111111111111111111111111111111')
  clearInterval(timerId);
  window.removeEventListener('resize', screenAdapter)
  //instance.appContext.config.globalProperties.$socket.UnregisterCallBack('ppData')
});

</script>