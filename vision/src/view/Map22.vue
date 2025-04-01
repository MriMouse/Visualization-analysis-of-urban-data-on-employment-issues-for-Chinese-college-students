<template>
    <div class="com-container">
        <div class="title" :style="comStyle">
            <!-- <span>中国实时人口热力图</span> -->
        </div>
        <div class="com-chart" ref="map_ref" style="height: 510%;"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue";
import * as echarts from 'echarts'
import chinaMap from 'echarts4/map/json/china.json'
//import '../../public/static/theme/westeros.js'

let city = 1
let chartInstance = null;
let allData = null
const instance = getCurrentInstance();
const map_ref = ref()
const titleFontSize = ref()
var dataList = [
    { name: "南海诸岛", value: NaN },
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
    { name: "台湾", value: NaN },
    { ename: "xianggang", name: "香港", value: NaN },
    { ename: "aomen", name: "澳门", value: NaN },
]
//const windowWidth = ref(window.innerWidth)

const change = () => {
    city = 1 - city
    if (!city) {
        chartInstance.setOption({
            title: {
                text: '乡村就业人员数(万人)'
            },
            visualMap: {
                min: 0,
                max: 6000,
                left: '5%',
                bottom: '3%',
                text: ['高', '低'],
                inRange: {
                    color: ['LightSkyBlue', 'LightPink', 'MediumPurple']
                },
                show: true,
                calculable: true
            },
        })
        var acData = allData.slice(11, 47);
        console.log(acData + 'sbsbsbsbsbsb')
        acData.forEach(item => {
            dataList.forEach(x => {
                item['1-16  分地区就业人员数(2022年底数)'] = item['1-16  分地区就业人员数(2022年底数)'].trim()
                //console.log(x.name+'--'+item['1-16  分地区就业人员数(2022年底数)'])
                if (x.name == item['1-16  分地区就业人员数(2022年底数)']) {
                    //console.log('---------------------')
                    x.value = parseInt(item['Unnamed: 3'])
                }
            })
        })
        console.log(dataList)
        const dataOpt = {
            series: [{
                name: '中国',
                type: 'map',
                geoIndex: 0,
                map: 'china',
                data: dataList
            }]
        }
        chartInstance.setOption(dataOpt)
    } else {
        chartInstance.setOption({
            title: {
                text: '城镇就业人员数(万人)'
            },
            visualMap: {
                min: 150,
                max: 7000,
                left: '5%',
                bottom: '3%',
                text: ['高', '低'],
                inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered']
                },
                show: true,
                calculable: true
            },
        })
        updateChart();
    }
}

const initChart = async () => {
    echarts.registerMap('china', chinaMap)
    chartInstance = echarts.init(map_ref.value, 'westeros');
    const initOpt = {
        title: {
            text: '城镇就业人员数(万人)',
            left: 'center',
            top: '10%',
            textStyle: {
                color: 'white'
            },
        },
        tooltip: {
            formatter: function (params, callback) {
                return (
                    params.seriesName + '<br/>' + params.name + ':' + params.value + '万人'
                )
            }
        },
        visualMap: {
            min: 150,
            max: 7000,
            textStyle: {
                color: 'white'
            },
            left: '5%',
            bottom: '3%',
            text: ['高', '低'],
            inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
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
    chartInstance.on('click', function (params) {
        change()
    });
};


const getData = async (ret) => {
    allData = ret
    //console.log(allData)
    updateChart()
};

instance.appContext.config.globalProperties.$socket.registerCallBack('MapData', getData)

const updateChart = () => {
    var acData = allData.slice(11, 47);
    console.log(acData)
    acData.forEach(item => {
        dataList.forEach(x => {
            item['1-16  分地区就业人员数(2022年底数)'] = item['1-16  分地区就业人员数(2022年底数)'].trim()
            //console.log(x.name+'--'+item['1-16  分地区就业人员数(2022年底数)'])
            if (x.name == item['1-16  分地区就业人员数(2022年底数)']) {
                //console.log('---------------------')
                x.value = parseInt(item['Unnamed: 2'])
            }
        })
    })
    console.log(dataList)
    const dataOpt = {
        series: [{
            name: '中国',
            type: 'map',
            geoIndex: 0,
            map: 'china',
            data: dataList
        }]
    }
    chartInstance.setOption(dataOpt)
}

const screenAdapter = () => {
    titleFontSize.value = map_ref.value.offsetWidth / 100 * 0.6 + map_ref.value.offsetHeight / 100 * 100
    console.log(1)
    const adapterOpt = {
        titleStyle: {
            fontSize: titleFontSize.value
        },
    }
    chartInstance.setOption(adapterOpt)
    chartInstance.resize()
}

onMounted(async () => {
    //getData();
    instance.appContext.config.globalProperties.$socket.send({
        action: 'getData',
        socketType: 'MapData',
        //chartName:'areaGDPDAta',
        chartName: '1-16DAta',
        value: ''
    })
    await initChart();
    screenAdapter()
    window.addEventListener('resize', screenAdapter)
});
onUnmounted(() => {
    window.removeEventListener('resize', screenAdapter)
    //instance.appContext.config.globalProperties.$socket.UnregisterCallBack('MapData')
});

</script>