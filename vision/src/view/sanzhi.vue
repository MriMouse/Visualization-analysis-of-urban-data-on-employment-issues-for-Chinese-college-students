<template>
    <div class="container">
        <div class="row">
            <div class="col-md-9">
                <h1 style="font-size: 6vh; font-weight: bold; color: rgb(36, 53, 71); ">大学生参军政策介绍</h1>
                <br/>
                <div class="wenzi">
                    <p>
                        指根据国家有关规定批准设立、实施高等学历教育的全日制公办普通高等学校、民办普通高等学校和独立学院，按照国家招生规定录取的全日制普通本科、专科（含高职）、研究生、第二学士学位的应（往）届毕业生、在校生和已被普通高校录取但未报到入学的学生。
                    </p>
                    <p>
                        征集的大学生以男性为主，女性大学生征集根据军队需要确定。
                    </p>
                    <p>
                        征集服现役的公民必须热爱中国共产党，热爱社会主义祖国，热爱人民军队，遵纪守法，品德优良，决心为抵抗侵略、保卫祖国、保卫人民的和平劳动而英勇奋斗。征兵政治审查的内容包括：应征公民的年龄、户籍、职业、政治面貌、宗教信仰、文化程度、现实表现以及家庭主要成员和主要社会关系成员的政治情况等。
                    </p>
                    <p>
                        男性普通高等学校在校生为年满17至22周岁、大学毕业生放宽到24周岁。
                        女性普通高等学校在校生和毕业生为年满17至22周岁。
                    </p>
                    <p>
                        高校毕业生应征入伍服义务兵役，除享有优先报名应征、优先体检政审、优先审批定兵、优先安排使用“四个优先”政策，家庭按规定享受军属待遇外，还享受优先选拔使用、学费补偿和国家助学贷款代偿、退役后考学升学优惠、就业服务等政策。
                    </p>
                    <a href="https://www.gfbzb.gov.cn/zbbm/zcfg/dxsrw/201808/20180801/1710941292.html" style="font-size: 20px;">大学生应征入伍政策</a>
                </div>
            </div>
            <div class="col-md-3" style="margin-top: 80px; ">
                <img src="@/assets/bing.jpg" alt="大学生参军政策图片"  style="height: 500px;" class="mt-4">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SoldierPolicyIntroduction'
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin-top: -10px;
}

.content {
    text-align: center;
}

.policy-image {
    width: 300px;
    height: auto;
    margin-bottom: 20px;
}

.wenzi p {
    font-size: 20px;
}

.container {
    margin-left: 12% ;
}
</style>