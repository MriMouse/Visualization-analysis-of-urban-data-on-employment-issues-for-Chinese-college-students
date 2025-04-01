<template>
    <div class="com-container">
        <div class="dropdown1">
            <select v-model="selectedProvince" @change="updateChart">
                <option v-for="(province, index) in provinces" :key="index" :value="{ name: province, index: index }">{{
                province }}</option>
            </select>
        </div>
        <div class="dropdown2">
            <select v-model="selectedSiying" @change="updateChart">
                <option v-for="(province, index) in siyingAr" :key="index" :value="province">{{ province }}</option>
            </select>
        </div>
        <div class="title">
            <!-- <span>中国实时人口热力图</span> -->
        </div>
        <div class="com-chart" ref="map_ref" style="height: 750%"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue";
import * as echarts from 'echarts'
import chinaMap from 'echarts4/map/json/china.json'
//import '../../public/static/theme/westeros.js'

const siyingAr = ['私营单位', '非私营单位']
const selectedSiying = ref(siyingAr[0])
const provinces = ['农、林、牧、渔业', '采矿业', '制造业', '电力、热力、燃气及水生产和供应业', '建筑业', '批发和零售业', '交通运输、 仓储和邮政业', '住宿和餐饮业', '信息传输、软件和信息技术服务业', '金融业', '房地产业', '租赁和商务服务业', '科学研究和技术服务业', '水利、环境和公共设施管理业', '居民服务、修理和其他服务业', '教育', '卫生和社会工作', '文化、体育和娱乐业', '公共管理、社会保障和社会组织']
const selectedProvince = ref({ name: provinces[0], index: 0 }); // 用于存储选择的省份
const duiying = ['农、林、牧、渔业', '采矿业', '制造业', '电力、热力、燃气\n及水生产和供应业', '建筑业', '批发和零售业', '交通运输、 \n仓储和邮政业', '住宿和餐饮业', '信息传输、软件\n和信息技术服务业', '金融业', '房地产业', '租赁和商务服务业', '科学研究和技术服务业', '水利、环境\n和公共设施管理业', '居民服务、修理\n和其他服务业', '教育', '卫生和社会工作', '文化、体育和娱乐业', '公共管理、\n社会保障和社会组织']
let chartInstance = null;
let allData = null
const instance = getCurrentInstance();
const map_ref = ref()
const dataList = [
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
            min: 40000,
            max: 110000,
            left: '5%',
            text: ['高', '低'],
            textStyle:{
                color:'white'
            },
            inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
            },
            show: true,
            calculable: true,
            bottom: '5%'
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
    allData = ret
    updateChart()
};

instance.appContext.config.globalProperties.$socket.registerCallBack('MapData', getData)

const updateChart = () => {
    var acData = allData
    if (selectedSiying.value === '私营单位') acData = acData.slice(15, 51)
    else acData = acData.slice(68, 104)
    var maxx = 0
    var minn = 0x3f3f3f3f
    if (selectedProvince.value.index == 18) {

        acData.forEach(item => {
            dataList.forEach(x => {
                if (x.name == item['1-29  分地区按行业分城镇私营单位就业人员平均工资(2022年)']) {
                    x.value = parseInt(item['__parsed_extra'][0])
                    maxx = Math.max(maxx, x.value)
                    minn = Math.min(minn, x.value)
                }
            })
        })
    } else {
        acData.forEach(item => {
            dataList.forEach(x => {
                if (x.name == item['1-29  分地区按行业分城镇私营单位就业人员平均工资(2022年)']) {
                    x.value = parseInt(item['Unnamed: ' + (selectedProvince.value.index + 3)])
                    maxx = Math.max(maxx, x.value)
                    minn = Math.min(minn, x.value)
                }
            })
        })
    }
    console.log(dataList)
    const dataOpt = {
        series: [{
            name: '中国',
            type: 'map',
            geoIndex: 0,
            map: 'china',
            data: dataList
        }],
        visualMap: {
            min: minn - 5000,
            max: maxx + 5000,
        },
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
        action: 'getData',
        socketType: 'MapData',
        //chartName:'areaGDPDAta',
        chartName: '1-29seleDAta',
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

<style scoped>
select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 8px 20px;
    border-radius: 5px;
    font-size: 16px;
    color: #333;
    cursor: pointer;
}

select::after {
    content: '&#xe6ef'; /* Unicode 箭头图标 */
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
}

/* 鼠标悬停时的样式 */
select:hover {
    border-color: #666;
}

.dropdown1 {
    position: relative;
    top: 1vh;
    left: 1vw;
}

.dropdown2 {
    position: relative;
    top: 2vh;
    left: 1vw;
}
</style>

<!-- 　　1、指标解释
　　（1）单位就业人员：是指在本单位工作，并由单位支付劳动报酬的人员。
　　（2）工资总额：根据《关于工资总额组成的规定》（详见官网http://www.stats.gov.cn/xxgk/zcfggz/tjxzfg2020/201708/t20170803_1758101.html）， 工资总额是本单位在报告期内（季度或年度）直接支付给本单位人员的劳动报酬总额。包括计时工资、计件工资、奖金、津贴和补贴、加班加点工资、特殊情况下支付的工资。
　　工资总额是税前工资，包括单位从个人工资中直接为其代扣或代缴的个人所得税、社会保险基金和住房公积金等个人缴纳部分以及房费、水电费等。
　　工资总额不论是计入成本的还是不计入成本的，不论是以货币形式支付的还是以实物形式支付的，均应列入工资总额的计算范围。
　　（3）平均工资：是指在报告期内单位发放工资的人均水平。计算公式为：
　　2、统计范围
　　城镇地区私营法人单位和统计上认定的视同法人单位的产业活动单位，具体包括私营有限责任公司、私营股份有限公司、私营合伙企业和私营独资企业。
　　劳动工资统计主要统计法人单位的就业人员，而个体就业人员、自由职业者等非单位就业人员不在统计范围内。
　　3、调查方
　　根据国家统计局制定的《企业一套表统计调查制度》和《劳动工资统计调查制度》，对一套表法人单位采用全面调查的方法，对非一套表法人单位采用抽样调查的方法。
　　4、东中西部和东北地区划分方法
　　东部包括：北京、天津、河北、上海、江苏、浙江、福建、山东、广东和海南10个省（直辖市）。
　　中部包括：山西、安徽、江西、河南、湖北和湖南6个省。
　　西部包括：内蒙古、广西、重庆、四川、贵州、云南、西藏、陕西、甘肃、青海、宁夏和新疆12个省（自治区、直辖市）。
　　东北包括：辽宁、吉林和黑龙江3个省。
　　5、行业分类标准
　　劳动工资统计的行业分类标准按照《国民经济行业分类》（GB/T4754-2017）执行。
　　6、上年基期数据以正式出版的《中国统计年鉴-2022》为准。 -->