<template>
    <div class="com-container">
        <div class="title" :style="comStyle">
            <!-- <span>中国实时人口热力图</span> -->
        </div>
        <div class="com-chart" ref="map_ref"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue";
import * as echarts from 'echarts'
import chinaMap from 'echarts4/map/json/china.json'
//import '../../public/static/theme/westeros.js'

let chartInstance = null;
let allData = ref(null)
const instance = getCurrentInstance();
const map_ref = ref()
const dataList = ref([
    { name: "南海诸岛",value:NaN },
    { ename: "beijing", name: "北京" },
    { ename: "tianjin", name: "天津" },
    { ename: "shanghai", name: "上海" },
    { ename: "chongqing", name: "重庆" },
    { ename: "hebei", name: "河北" },
    { ename: "henan", name: "河南" },
    { ename: "yunnan", name: "云南" },
    { ename: "liaoning", name: "辽宁" },
    { ename: "heilongjiang", name: "黑龙江" },
    { ename: "hunan", name: "湖南" },
    { ename: "anhui", name: "安徽" },
    { ename: "shandong", name: "山东" },
    { ename: "xinjiang", name: "新疆" },
    { ename: "jiangsu", name: "江苏" },
    { ename: "zhejiang", name: "浙江" },
    { ename: "jiangxi", name: "江西" },
    { ename: "hubei", name: "湖北" },
    { ename: "guangxi", name: "广西" },
    { ename: "gansu", name: "甘肃" },
    { ename: "shanxi", name: "山西" },
    { ename: "neimenggu", name: "内蒙古" },
    { ename: "shanxi1", name: "陕西" },
    { ename: "jilin", name: "吉林" },
    { ename: "fujian", name: "福建" },
    { ename: "guizhou", name: "贵州" },
    { ename: "guangdong", name: "广东" },
    { ename: "qinghai", name: "青海" },
    { ename: "xizang", name: "西藏" },
    { ename: "sichuan", name: "四川" },
    { ename: "ningxia", name: "宁夏" },
    { ename: "hainan", name: "海南" },
    { name: "台湾",value:58.6 },
    { ename: "xianggang", name: "香港",value:NaN },
    { ename: "aomen", name: "澳门",value:NaN },
])
//const windowWidth = ref(window.innerWidth)

const initChart = async () => {
    //console.log(allData.value)
    echarts.registerMap('china', chinaMap)
    chartInstance = echarts.init(map_ref.value, 'westeros');
    //console.log(dataList.value)
    const initOpt = {
        tooltip: {
            formatter: function (params, callback) {
                return (
                    params.seriesName + '<br/>' + params.name + ':' + params.value
                )
            }
        },
        visualMap: {
            min: 2,
            max:223,
            left: '5%',
            bottom: '3%',
            text: ['高', '低'],
            inRange: {
                color: ['rgba(174, 232, 253,0.6)','rgba(174, 232, 253,0.8)', 'rgb(87, 117, 155)']
            },
            show: true,
            calculable: true
        },
        geo: {
            map: 'china',
            roam: true,
            zoom: 1,
            label: {
                normal: {
                    show: true,
                    fontSize: '10',
                    color: 'rgba(0,0,0,0.7)',
                },
            },
            itemStyle: {
                normal: {
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                },
                emphasis: {
                    areaColor: 'skyblue',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                }
            }
        }
    }
    chartInstance.setOption(initOpt)
};


const getData = async (ret) => {
    allData.value = ret
    updateChart()
    //console.log(allData.value)
};

instance.appContext.config.globalProperties.$socket.registerCallBack('MapData',getData)

const updateChart = () => {
    console.log(allData.value)
    for(let i=3;i<=33;++i){
        for(let j=0;j<dataList.value.length;++j){
            // console.log('--------------')
            // console.log(dataList.value[j].name)
            // console.log(typeof allData.value[i]['数据库：分省年度数据'])
            // console.log('--------------')
            if(allData.value[i]['数据库：分省年度数据'].startsWith(dataList.value[j].name)){
                dataList.value[j].value = parseFloat(allData.value[i]['__parsed_extra'][1])
            }
        }
    }
    console.log(dataList.value)
    const dataOpt = {
        series:[{
            name:'中国',
            type:'map',
            geoIndex:0,
            map:'china',
            data:dataList.value
        }]
    }
    chartInstance.setOption(dataOpt)
}

const screenAdapter = () => {
    const adapterOpt = {
    }
    chartInstance.setOption(adapterOpt)
    chartInstance.resize()
}

onMounted(async () => {
    //getData();
    instance.appContext.config.globalProperties.$socket.send({
        action:'getData',
        socketType:'MapData',
        //chartName:'areaGDPDAta',
        chartName:'stunumDAta',
        value:''
    })
    await initChart();
    screenAdapter()
    window.addEventListener('resize', screenAdapter)
});
onUnmounted(() => {
    clearInterval(timerId);
    window.removeEventListener('resize', screenAdapter)
    instance.appContext.config.globalProperties.$socket.UnregisterCallBack('MapData')
});

</script>