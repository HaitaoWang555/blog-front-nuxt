## blog-front-nuxt 

### 参考
 1. [https://github.com/zzzzbw/Fame](https://github.com/zzzzbw/Fame)

### 简介
`blog-front-nuxt ` 此项目为博客展示平台 基于[Nuxt.js](https://nuxtjs.org)实现. 主要功能 文章与笔记的展示

### 项目演示
项目在线演示地址：[https://blog.wanghaitao.club/](https://blog.wanghaitao.club/)

### 项目布局
``` lua
src -- 源码目录
├── api -- axios网络请求定义
├── assets -- 全局样式
├── components -- 通用组件封装
├── config -- 服务配置
├── layout -- 通用页面加载框架
├── middleware -- 中间件
├── pages -- 前端页面
├── plugins -- 插件
├── static -- 静态图片资源文件 
├── store -- vuex的状态管理
├── utils -- 工具类
└── nuxt.config.js -- nuxt配置

```

### 搭建步骤
```bash
# 克隆项目
git clone https://github.com/HaitaoWang555/blog-front-nuxt.git
# 进入项目目录
cd blog-front-nuxt
# 安装依赖
npm install --registry=https://registry.npm.taobao.org
# 创建配置文件 生产环境配置 (可和server-config.js一样)
touch config/server-config-prod.js

# 本地开发 启动项目
npm run dev
```