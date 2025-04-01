import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as echarts from 'echarts'
import * as echarts4 from 'echarts4'
import './assets/css/global.less'
import axios from 'axios'
import './assets/font/iconfont.css'
import Socket from './utils/socket'
import '@/assets/css/bootstrap.min.css'
//import * as jQuery from 'jquery'
// import VueResource from 'vue-resource'
// import '../public/static/theme/westeros'

Socket.Instance.connect()

axios.defaults.baseURL = 'http://127.0.0.1:8888/api'

const app = createApp(App)
app.config.globalProperties.echarts = echarts
app.config.globalProperties.$echarts4 = echarts4
app.config.globalProperties.$http = axios
app.config.globalProperties.$socket = Socket.Instance
app.use(router)
//app.use(VueResource)
app.mount('#app')
