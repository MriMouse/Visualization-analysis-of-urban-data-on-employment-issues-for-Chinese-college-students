<template>
    <div class="com-page" style="height: 700%;">
        <div class="container-fluid">
            <div class="col-md-6 d d1"><bing22></bing22></div>
            <div class="col-md-6 d d2"><bing11></bing11></div>
            <div class="col-md-6 d d3"><bing14></bing14></div>
            <div class="col-md-6 d d4"><bing17></bing17></div>
        </div>
    </div>
</template>

<script setup>
import bing22 from '@/components/industry22.vue'
import bing11 from '@/components/industry11.vue'
import bing14 from '@/components/industry14.vue'
import bing17 from '@/components/industry17.vue'
</script>

<style scoped>
.d {
    position: relative;
    /* margin-top: 30vh; */
}

.d1 {
    top: 50%;
    left: 10%;
}
.d2 {
    top: 50%;
    right: 10%;
}
.d3 {
    bottom: 10%;
    left: 10%;
}
.d4 {
    bottom: 10%;
    right: 10%;
}
</style>
