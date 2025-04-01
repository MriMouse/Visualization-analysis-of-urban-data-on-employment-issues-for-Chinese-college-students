@echo off
chcp 65001 > nul
title 人口数据可视化项目启动器

echo ===== 启动Koa后端服务 =====
start cmd /k "cd koa_server && echo 正在启动Koa服务器... && npm install && node app.js"

echo 等待Koa服务器启动...
timeout /t 5 /nobreak > nul

echo ===== 启动Vue前端应用 =====
start cmd /k "cd vision && echo 正在启动Vue前端... && npm install && npm run dev"

echo 等待前端服务器启动...
timeout /t 8 /nobreak > nul

echo ===== 正在打开浏览器 =====
start http://localhost:8998/start

echo.
echo 服务已启动:
echo - Koa HTTP API: http://localhost:8888/api
echo - Koa WebSocket: ws://localhost:9998
echo - Vue 应用: http://localhost:8080
echo.
echo 按任意键退出此窗口(服务会继续运行)...
pause > nul