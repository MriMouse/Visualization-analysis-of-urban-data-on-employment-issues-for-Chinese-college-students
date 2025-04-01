import SellerPage from "@/view/SellerPage.vue";
import jQuery from "jquery";
import { createRouter, createWebHistory } from "vue-router";
import TrendPage from "@/view/TrendPage.vue";
import MapPage from "@/view/MapPage.vue";
import ppPage from "@/view/ppPage.vue";
import bingPage from "@/view/bingPage.vue";
import oldPage from "@/view/oldPage.vue";
import stockPage from "@/view/stockPage.vue";
import sele from "@/view/selePage.vue";
import screen from "@/view/screen.vue";
import start from "@/view/start.vue";
import main from "@/view/mainPage.vue";
import industry from "@/view/industryPage.vue";
import test from "@/view/testPage.vue";
import wordCloud from "@/view/wordCloudPage.vue";
import zhengCe from "@/view/zhengCe.vue";
import sanzhi from "@/view/sanzhi.vue";
import xibu from "@/view/xibu.vue";
import xuandiao from "@/view/xuandiao.vue";

const routes = [
  {
    path: "/", // 添加这个根路径路由
    redirect: "/start", // 或者重定向到 '/start' 或其他您想要作为首页的路由
  },
  {
    path: "/SellerPage",
    component: SellerPage,
  },
  {
    path: "/TrendPage",
    component: TrendPage,
  },
  {
    path: "/MapPage",
    component: MapPage,
  },
  {
    path: "/pp",
    component: ppPage,
  },
  {
    path: "/bing",
    component: bingPage,
  },
  {
    path: "/old",
    component: oldPage,
  },
  {
    path: "/stock",
    component: stockPage,
  },
  {
    path: "/test",
    component: test,
  },
  {
    path: "/screen",
    component: screen,
  },
  {
    path: "/start",
    component: start,
  },
  {
    path: "/main",
    component: main,
  },
  {
    path: "/industry",
    component: industry,
  },
  {
    path: "/sele",
    component: sele,
  },
  {
    path: "/word",
    component: wordCloud,
  },
  {
    path: "/zhengCe",
    component: zhengCe,
  },
  {
    path: "/sanzhi",
    component: sanzhi,
  },
  {
    path: "/xibu",
    component: xibu,
  },
  {
    path: "/xuandiao",
    component: xuandiao,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
