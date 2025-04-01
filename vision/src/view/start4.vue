<template>
    <div class="container-fluid">
        <div class="col-md-12">
            <div class="col-md-4 divv" style="min-height: 500px">
                <div class="pannel divv" style="min-height: 300px">
                    <div class="hezi">
                        <wordCloud></wordCloud>
                    </div>
                </div>
                <div class="divv" style="min-height: 200px">
                    <div class="hezi">
                        <div class="container-fluid" style="padding: 0%;">
                            <div class="col-md-6 d d1">
                                <bing11></bing11>
                            </div>
                            <div class="col-md-6 d d2">
                                <bing14></bing14>
                            </div>
                            <div class="col-md-6 d d3">
                                <bing17></bing17>
                            </div>
                            <div class="col-md-6 d d4">
                                <bing22></bing22>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 divv" style="min-height: 500px">
                <div class="divv" style="min-height: 150px">
                    <div class="hezi">
                        <loseJob></loseJob>
                    </div>
                </div>
                <div class="divv" style="min-height: 350px">
                    <div class="hezi">
                        <Map2></Map2>
                    </div>
                </div>
            </div>
            <div class="col-md-4 divv" style="min-height: 500px">
                <div class="divv" style="min-height: 300px">
                    <div class="hezi">
                        <stock></stock>
                    </div>
                </div>
                <div class="divv" style="min-height: 200px">
                    <div class="hezi">
                        <sanCloud></sanCloud>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import zhengCe from './zhengCe.vue';
import wordCloud from './wordCloudPage.vue'
import Mapsele from '@/components/Mapsele.vue'
import bComJ from '@/components/bComJ.vue'
import stock from '@/components/stock.vue'
import indust from './industryPage.vue'
import bing22 from '@/components/industry22.vue'
import bing11 from '@/components/industry11.vue'
import bing14 from '@/components/industry14.vue'
import bing17 from '@/components/industry17.vue'
import loseJob from '@/components/loseJob.vue'
import Map2 from './Map22.vue'
import sanCloud from '@/view/sanCloud.vue'
</script>

<style scoped>
.center-chart {
    height: 20%;
    border: 2px solid red;
}

.divv {
    /* background-color: antiquewhite; */
    /* border: 1px solid red; */
    padding-left: 0%;
    padding-right: 10px;
    padding-top: 0%;
    padding-bottom: 10px;
}

.hezi {
    background-color: rgb(61, 61, 61);
    height: auto;
    border: 2px solid rgb(61, 61, 61);
    /* 设置边框样式 */
    border-radius: 10px;
    /* 设置圆角大小 */
}

.d {
    position: relative;
    top: 12vh;
}

.hezi-zuo {
    background-color: rgb(61, 61, 61);
    height: auto;
    border: 2px solid rgb(61, 61, 61);
    /* 设置边框样式 */
    border-radius: 10px;
    /* 设置圆角大小 */
}
</style>
