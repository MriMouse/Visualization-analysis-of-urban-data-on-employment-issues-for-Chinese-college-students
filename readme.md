# 人口数据可视化系统

## 项目简介

人口数据可视化系统是一个基于 Vue 和 ECharts 的网页应用，用于展示和分析人口统计数据。该系统提供了直观的图表和可视化工具，帮助用户理解人口数据趋势和模式。

## 项目特点

- 多种数据可视化图表
- 自定义主题支持（西式、粉笔风、复古风等）
- 交互式数据探索
- 词云展示功能
- 响应式设计，适配不同设备

## 系统架构

- **前端**：基于 Vue 3 构建的单页应用
- **图表库**：ECharts
- **数据处理**：基于 Koa 的后端服务
- **数据格式**：CSV 数据转换为 JSON 格式

## 开发环境配置

### 快速启动

```bash
# 使用批处理文件一键启动前后端服务
start.bat
```

### 前端配置

```bash
# 安装依赖
cd vision
npm install

# 开发模式运行
npm run dev

# 构建生产版本
npm run build
```

### 后端配置

```bash
# 安装依赖
cd koa_server
npm install

# 启动服务器
node app.js
```

## 使用到的技术

- **Vue 3**：前端框架
- **Vite**：构建工具
- **ECharts**：数据可视化图表库
- **Koa**：轻量级后端框架
- **PapaParse**：CSV 解析工具

## 主题与样式

系统内置了三种主题：

- Westeros（西式）
- Chalk（粉笔风）
- Vintage（复古风）

可通过切换主题来改变整个应用的视觉风格。

## 数据源

系统使用 CSV 格式的人口数据，包含区域、行业、年份等多个维度的统计信息。通过 Koa 后端服务将 CSV 数据转换为前端可用的 JSON 格式。

## 项目结构

```
project/
├── vision/                 # 前端Vue应用
│   ├── public/             # 静态资源
│   │   ├── static/         # ECharts库和主题
│   ├── src/                # 源代码
│   └── index.html          # 入口HTML
├── koa_server/             # 后端Koa服务
│   ├── data/               # 数据文件
│   ├── middleware/         # 中间件
│   ├── utils/              # 工具函数
│   └── app.js              # 服务器入口
└── README.md               # 项目说明
```

## 推荐开发工具

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (禁用 Vetur)

## 许可证

[MIT](LICENSE)
