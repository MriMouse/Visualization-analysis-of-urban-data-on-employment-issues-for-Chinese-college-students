<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="col-md-6 divv" style="min-height: 300px;">
                    <div class="hezi-zuo">
                        <Mapsele></Mapsele>
                    </div>
                </div>
                <div class="col-md-6 divv" style="min-height: 150px;">
                    <div class="col-md-12 divv" style="min-height: 150px;"><div class="hezi">
                        <bComJ></bComJ>
                    </div></div>
                    <div class="col-md-12 divv" style="min-height: 150px;"><div class="hezi">
                        <seller></seller>
                    </div></div>
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
import seller from '@/components/sele.vue'
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
    border: 2px solid rgb(61, 61, 61); /* 设置边框样式 */
    border-radius: 10px; /* 设置圆角大小 */
}

.hezi-zuo {
    background-color: rgb(61, 61, 61);
    height: auto;
    border: 2px solid rgb(61, 61, 61); /* 设置边框样式 */
    border-radius: 10px; /* 设置圆角大小 */
}
</style>
