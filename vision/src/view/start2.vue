<template>
    <div id="wrapper">
        <div class="container-fluid">
            <div class="row col-md-12" style="min-height: 40rem;">
                <!-- BASIC TABLE -->
                <div>
                    <zhengCe style="height: 100%;"></zhengCe>
                </div>
                <!-- END BASIC TABLE -->
            </div>
            <div class="row col-md-12 haha">
                <div class="col-md-3">
                    <!-- TABLE NO PADDING -->
                    <div>
                        <a href="https://www.xuexi.cn/local/normalTemplate.html?itemId=10358742687509820279">
                            <img src="@/assets/2.png" alt="长春理工大学创业宣讲推介会" class="tu">
                            <div class="text">
                                长春理工大学创业宣讲推介会
                            </div>
                        </a>
                    </div>
                    <!-- END TABLE NO PADDING -->
                </div>

                <div class="col-md-3">
                    <!-- TABLE STRIPED -->
                    <div>
                        <a href="https://www.bilibili.com/video/BV1Jk4y1K7hY">
                            <img src="@/assets/1.png" alt="教育部部长会后就大学生就业问题同外媒记者交流" class="tu">
                            <div class="text">
                                教育部部长会后就大学生就业问题进行交流
                            </div>
                        </a>
                    </div>
                    <!-- END TABLE STRIPED -->
                </div>
                <div class="col-md-3">
                    <!-- TABLE HOVER -->
                    <div>
                        <a href="https://www.bilibili.com/video/BV1ka41147p6">
                            <img src="@/assets/3.png" alt="大学生就业，选择城市排行榜" class="tu">
                            <div class="text">
                                大学生就业，选择城市排行榜
                            </div>
                        </a>
                    </div>
                    <!-- END TABLE HOVER -->
                </div>
                <div class="col-md-3">
                    <!-- BORDERED TABLE -->
                    <div>
                        <div>
                        <a href="https://www.icourse163.org/learn/BFU-1003376002?tid=1471197443#/learn/content?type=detail&id=1256088873&cid=1288832106">
                            <img src="@/assets/4.png" alt="国家精品课:发展与就业" class="tu">
                            <div class="text">
                                国家精品课:发展与就业
                            </div>
                        </a>
                    </div>
                    </div>
                    <!-- END BORDERED TABLE -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import zhengCe from './zhengCe.vue';
import wordCloud from './wordCloudPage.vue'

</script>

<style scoped>
.haha {
    background-color: rgb(49, 49, 49);
}

.tu {
    height: 100px;
    /* margin-top: 10%; */
    position: relative;
    top: 3vh;
    left: 10vh;
}

.text {
    font-size: 17px;
    color: #8badd9;
    height: 100px;
    text-align: center; /* 文字水平居中 */
    position: relative;
    top: 4vh;
}
</style>
