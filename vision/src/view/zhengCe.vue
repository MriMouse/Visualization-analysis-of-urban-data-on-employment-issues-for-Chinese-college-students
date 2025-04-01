<template>
    <div class="com-container">
        <div class="com-chart" ref="seller" style="height: 670%"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance, nextTick } from "vue";
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
    await nextTick()
    console.log(seller.value)
    const themeResponse = await fetch('/static/theme/westeros.json');
    const themeData = await themeResponse.json();
    echarts.registerTheme('westeros', themeData);
    chartInstance = echarts.init(seller.value, 'westeros');
    const initOpt = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
        },
        series: [
            {
                type: 'tree',
                top: '1%',
                left: '8%',
                bottom: '1%',
                width:'20%',
                right: '20%',
                symbolSize: 10,
                label: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 16,
                    color:'white',
                    overflow:'breakAll'
                },
                leaves: {
                    label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                },
                emphasis: {
                    focus: 'descendant'
                },
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
            }
        ]
    }
    chartInstance.setOption(initOpt)
    chartInstance.on('mouseover', () => {
        clearInterval(timerId)
    })

}


const getData = async (ret) => {
    allData = ret
    allData = {
        name: '大学生就业政策',
        children: [
            {
                name: '拓宽就业渠道',
                left: '8%',
                children: [
                    {
                        name: '扩大企业就业规模',
                        children: [
                            {
                                name: '支持中小微企业更多吸纳高校毕业生就业，按规定给予社会保险补贴'
                            },
                            {
                                name: '健全职业技能等级（岗位）设置，完善职业技能等级认定机制'
                            },
                            {
                                name: '落实科研项目经费申请、科研成果等申报与国有企事业单位同类人员同等待遇'
                            },
                            {
                                name: '国家发展改革委、科技部、工业和信息化部、财政部、人力资源社会保障部、商务部、人民银行、国务院国资委、税务总局、市场监管总局等按职责分工负责'
                            },
                        ]
                    },
                    {
                        name: '拓宽基层就业空间',
                        children: [
                            {
                                name: '挖掘基层就业社保、医疗卫生、养老服务、社会工作、司法辅助等就业机会'
                            },
                            {
                                name: '对到中西部地区、艰苦边远地区、老工业基地县以下基层单位就业的高校毕业生，按规定给予学费补偿和国家助学贷款代偿、高定工资等政策'
                            },
                            {
                                name: '中央组织部、最高人民法院、最高人民检察院、教育部、民政部、财政部、人力资源社会保障部、农业农村部、国家卫生健康委、共青团中央等按职责分工负责'
                            },
                        ]
                    },
                    {
                        name: '支持自主创业和灵活就业',
                        children: [
                            {
                                name: '汇集优质创新创业培训资源，对高校毕业生开展针对性培训，按规定给予职业培训补贴'
                            },
                            {
                                name: '支持高校毕业生自主创业，按规定给予一次性创业补贴、创业担保贷款及贴息、税费减免等政策，政府投资开发的创业载体要安排30%左右的场地免费向高校毕业生创业者提供'
                            },
                            {
                                name: '支持高校毕业生自主创业，按规定给予一次性创业补贴、创业担保贷款及贴息、税费减免等政策，政府投资开发的创业载体要安排30%左右的场地免费向高校毕业生创业者提供'
                            },
                            {
                                name: '对毕业年度和离校2年内未就业高校毕业生实现灵活就业的，按规定给予社会保险补贴%左右的场地免费向高校毕业生创业者提供'
                            },
                            {
                                name: '国家发展改革委、教育部、科技部、财政部、人力资源社会保障部、人民银行、税务总局、市场监管总局等按职责分工负责'
                            },
                        ]
                    },
                    {
                        name: '稳定公共部门岗位规模',
                        children: [
                            {
                                name: '畅通政法专业高校毕业生进入基层司法机关就业渠道'
                            },
                            {
                                name: '支持承担国家科技计划（专项、基金等）的高校、科研院所和企业扩大科研助理岗位规模'
                            },
                            {
                                name: '中央组织部、最高人民法院、最高人民检察院、教育部、科技部、人力资源社会保障部等按职责分工负责'
                            },
                        ]
                    },
                    
                ]
            },
            {
                name: '强化不断线就业服务',
                children: [
                    {
                        name: '精准开展困难帮扶',
                        children: [
                            {
                                name: '要把有劳动能力和就业意愿的脱贫家庭、低保家庭、零就业家庭高校毕业生，以及残疾高校毕业生和长期失业高校毕业生作为就业援助的重点对象'
                            },
                            {
                                name: '面向困难高校毕业生开展就业能力培训'
                            },
                            {
                                name: '实施国家助学贷款延期还款、减免利息等支持举措，延期期间不计复利、不收罚息、不作为逾期记录报送'
                            },
                            {
                                name: '教育部、民政部、财政部、人力资源社会保障部、人民银行、共青团中央、中国残联、开发银行等按职责分工负责'
                            },
                        ]
                    },
                    {
                        name: '优化招聘服务',
                        children: [
                            {
                                name: '扩大国家24365大学生就业服务平台、百日千万网络招聘、“千校万岗”、中小企业网上百日招聘等招聘平台和活动影响力'
                            },
                            {
                                name: '积极组织服务机构、用人单位进校园招聘'
                            },
                            {
                                name: '教育部、工业和信息化部、人力资源社会保障部、国务院国资委、共青团中央、全国工商联等按职责分工负责'
                            },
                        ]
                    },
                    {
                        name: '加强就业指导',
                        children: [
                            {
                                name: '高校要按一定比例配齐配强就业指导教师，就业指导教师可参加相关职称评审。打造一批大学生就业指导名师、优秀职业指导师、优秀就业指导课程和教材'
                            },
                            {
                                name: '举办全国大学生职业规划大赛，增强大学生生涯规划意识，指导其及早做好就业准备'
                            },
                            {
                                name: '教育部、人力资源社会保障部、共青团中央等按职责分工负责'
                            },
                        ]
                    },
                    {
                        name: '落实实名服务',
                        children: [
                            {
                                name: '深入实施离校未就业高校毕业生就业创业促进计划，强化教育、人力资源社会保障部门离校前后信息衔接，持续跟进落实实名服务'
                            },
                            {
                                name: '运用线上失业登记、求职登记小程序、基层摸排等各类渠道，与有就业意愿的离校未就业高校毕业生普遍联系，为每人免费提供1次职业指导、3次岗位推荐、1次职业培训或就业见习机会'
                            },
                            {
                                name: '人力资源社会保障部牵头，教育部等按职责分工负责'
                            },
                        ]
                    },
                    {
                        name: '维护就业权益',
                        children: [
                            {
                                name: '开展平等就业相关法律法规和政策宣传，坚决防止和纠正性别、年龄、学历等就业歧视，依法打击“黑职介”、虚假招聘、售卖简历等违法犯罪活动，坚决治理付费实习、滥用试用期、拖欠试用期工资等违规行为'
                            },
                            {
                                name: '督促用人单位与高校毕业生签订劳动（聘用）合同或就业协议书，明确双方的权利义务、违约责任及处理方式，维护高校毕业生合法就业权益'
                            },
                            {
                                name: '教育部、公安部、人力资源社会保障部、市场监管总局、全国妇联等按职责分工负责'
                            },
                        ]
                    },
                    
                ]
            },
            {
                name: '优化求职就业手续',
                children: [
                    {
                        name: '推动取消就业报到证',
                        children: [
                            {
                                name: '从2023年起，不再发放《全国普通高等学校本专科毕业生就业报到证》和《全国毕业研究生就业报到证》（以下统称就业报到证），取消就业报到证补办、改派手续，不再将就业报到证作为办理高校毕业生招聘录用、落户、档案接收转递等手续的必需材料。'
                            },
                            {
                                name: '中央组织部、教育部、公安部、人力资源社会保障部等按职责分工负责'
                            },
                        ]
                    },
                    {
                        name: '提供求职就业便利',
                        children: [
                            {
                                name: '取消高校毕业生离校前公共就业人才服务机构在就业协议书上签章环节，取消高校毕业生离校后到公共就业人才服务机构办理报到手续。'
                            },
                            {
                                name: '应届高校毕业生可凭普通高等教育学历证书、与用人单位签订的劳动（聘用）合同或就业协议书，在就业地办理落户手续（超大城市按现有规定执行）；可凭普通高等教育学历证书，在原户籍地办理落户手续'
                            },
                            {
                                name: '教育部、公安部、人力资源社会保障部等按职责分工负责'
                            },
                        ]
                    },
                    {
                        name: '积极稳妥转递档案',
                        children: [
                            {
                                name: '档案涉密的应通过机要通信或派专人转递。公共就业人才服务机构要主动加强与高校的沟通衔接，动态更新机构服务信息，积极推进档案政策宣传服务进校园，及时接收符合转递规定的学生档案'
                            },
                            {
                                name: '档案管理部门要及时向社会公布服务机构名录和联系方式。'
                            },
                            {
                                name: '中央组织部、教育部、人力资源社会保障部、国家邮政局等按职责分工负责'
                            },
                        ]
                    },
                    {
                        name: '推进体检结果互认',
                        children: [
                            {
                                name: '指导用人单位根据工作岗位实际，合理确定入职体检项目，不得违法违规开展乙肝、孕检等检测。对外科、内科、胸透X线片等基本健康体检项目，高校毕业生近6个月内已在合规医疗机构进行体检的，用人单位应当认可其结果，原则上不得要求其重复体检，法律法规另有规定的从其规定'
                            },
                            {
                                name: '用人单位或高校毕业生对体检结果有疑问的，经协商可提出复检、补检要求。高校可不再组织毕业体检'
                            },
                            {
                                name: '教育部、人力资源社会保障部、国家卫生健康委等按职责分工负责'
                            },
                        ]
                    },                 
                ]
            },
            {
                name: '青年就业帮扶',
                children: [
                    {
                        name: '健全青年就业服务机制',
                        children: [
                            {
                                name: '强化户籍地、常住地就业失业管理服务责任，允许到本地就业创业的往届高校毕业生、留学回国毕业生及失业青年进行求职登记、失业登记，提供均等化基本公共就业服务，按规定落实就业创业扶持政策'
                            },
                            {
                                name: '实施青年就业启航计划，对有就业意愿的失业青年，开展职业素质测评，制定求职就业计划，提供针对性岗位信息，组织志愿服务、创业实践等活动。对长期失业青年，开展实践引导、分类指导、跟踪帮扶，提供就业援助，引导他们自强自立、及早就业创业'
                            },
                            {
                                name: '人力资源社会保障部、共青团中央等按职责分工负责'
                            },
                        ]
                    },
                    {
                        name: '提升职业技能水平',
                        children: [
                            {
                                name: '适应产业转型升级和市场需求，高质量推动产训结合和职业技能培训资源共建共享，扩大青年职业技能培训规模，拓展学徒培训、技能研修、新职业培训等多种模式，举办各类职业技能竞赛活动'
                            },
                            {
                                name: '鼓励高校毕业生等青年在获得学历证书的同时获得相关职业资格证书或职业技能等级证书，对需要学历学位证书作为报考条件的，允许先参加考试评定，通过考试评定的，待取得相关学历学位证书后再发放职业资格证书或职业技能等级证书'
                            },
                            {
                                name: '国家发展改革委、教育部、财政部、人力资源社会保障部等按职责分工负责'
                            },
                        ]
                    },
                    {
                        name: '扩大就业见习规模',
                        children: [
                            {
                                name: '实施百万就业见习岗位募集计划，支持企事业单位、社会组织、政府投资项目、科研项目等设立见习岗位，按规定给予就业见习补贴'
                            },
                            {
                                name: '鼓励有条件的地方或用人单位为见习人员购买商业医疗保险，提高见习保障水平。离校未就业高校毕业生到基层实习见习基地参加见习或者到企事业单位参加项目研究的，视同基层工作经历，自报到之日起算。实施大学生实习“扬帆计划”，广泛开展各级政务实习、企业实习和职业体验活动'
                            },
                            {
                                name: '人力资源社会保障部牵头，中央组织部、教育部、科技部、工业和信息化部、民政部、财政部、商务部、国务院国资委、共青团中央、全国工商联等按职责分工负责'
                            },
                        ]
                    },                
                ]
            },
            {
                name: '压实工作责任',
                children: [
                    {
                        name: '组织领导',
                        children: [
                            {
                                name: '各地区各部门各高校要以习近平新时代中国特色社会主义思想为指导，认真贯彻落实党中央、国务院决策部署，把高校毕业生等青年就业作为就业工作重中之重，作为政府绩效考核和高校绩效考核内容'
                            },
                            {
                                name: '将帮扶困难高校毕业生就业作为重点，明确目标任务，细化具体举措，强化督促检查。各有关部门要立足职责，密切配合，同向发力，积极拓宽就业渠道，加快政策落实'
                            },
                            {
                                name: '各有关部门和单位、各省级人民政府按职责分工负责'
                            },
                        ]
                    },
                    {
                        name: '工作保障',
                        children: [
                            {
                                name: '要根据本地区高校毕业生等青年就业形势和实际需要，统筹安排资金，加强人员保障，确保工作任务和政策服务落实。健全公共就业服务体系，实施提升就业服务质量工程，增强对高校毕业生等青年就业指导服务的针对性有效性'
                            },
                            {
                                name: '运用政府购买服务机制，支持经营性人力资源服务机构、社会组织等市场力量参与就业服务、职业指导、职业培训等工作'
                            },
                            {
                                name: '各有关部门和单位、各省级人民政府按职责分工负责'
                            },
                        ]
                    },
                    {
                        name: '宣传引导',
                        children: [
                            {
                                name: '开展就业政策服务专项宣传，及时提供通俗易懂的政策解读。开展“最美基层高校毕业生”、“基层就业出征仪式”等典型宣传活动，引导高校毕业生等青年将职业选择融入国家发展，在奋斗中实现人生价值。做好舆论引导，及时回应社会关切，稳定就业预期'
                            },
                            {
                                name: '各有关部门和单位、各省级人民政府按职责分工负责'
                            },
                        ]
                    },               
                ]
            },
        ]
    }
    updateChart();
};

const updateChart = () => {
    const dataOpt = {
        series: [
            {
                data: [allData],
            },
        ],
    }
    chartInstance.setOption(dataOpt)
}


// const screenAdapter = () => {
//     const titleFontSize = seller.value.offsetWidth / 100 * 2.7 + seller.value.offsetHeight / 100 * 1.
//     const adapterOpt = {
//         title: {
//             text: '━━(￣ー￣*|||━━各省人口数据',
//             textStyle: {
//                 fontSize: titleFontSize,
//             }
//         },
//         tooltip: {
//             show: true,
//         },
//         series: [
//             {
//                 itemStyle: {
//                     barBorderRadius: [titleFontSize / 6, titleFontSize / 6, 0, 0]
//                 }
//             },
//         ],
//     }
//     chartInstance.setOption(adapterOpt)
//     chartInstance.resize()
// }

onMounted(async () => {
    await initChart();
    getData()
    //screenAdapter()
    //window.addEventListener('resize', screenAdapter)
});
onUnmounted(() => {
    clearInterval(timerId);
    //window.removeEventListener('resize', screenAdapter)
});

</script>