# EasyAPI团队模块 http://team.easyapi.com

## 项目介绍

本模块主要是EasyAPI团队模块功能，包括团队基本信息管理，团队账户充值，团队成员管理，订单管理。

## 相关技术和第三方库

* [vue2.0中文网](https://vuefe.cn/v2/guide/)
* [ECMAScript 6 入门](http://es6.ruanyifeng.com/)
* [vuex中文文档](https://vuex.vuejs.org/zh-cn/)
* [vue-router2中文文档](https://router.vuejs.org/zh-cn/)
* [ViewUI组件库](https://www.iviewui.com/)
* [vue-cli脚手架](https://github.com/vuejs/vue-cli)

---

## 开发调试

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 项目目录结构

``` bash
├── README.md
├── build                   #webpack配置
├── config                  #webpack配置
├── dist                    #打包后输出文件夹
├── index.html              #入口index
├── node_modules            #依赖模块
├── package.json
├── src                     #源码文件夹
  ├── App.vue              
  ├── assets                #静态资源
  │   ├── icons             #自定义图标
  │   ├── images            #图片
  │   └── styles            #样式表
  ├── components            #公用组件
  │   ├── header.vue          #头部组件
  │   └── common            #公用组件
  ├── libs                  #依赖工具函数
  ├── locale                #多语言文件
  ├── utils                 #全局公用方法  
  ├── main.js              
  ├── pages                 #页面文件夹
  │   ├── TeamNew.vue       #新建团队
  │   ├── TeamNewSuccess    #新建团队成功
  │   ├── Teams.vue         #团队列表
  │   └── info              #账号信息         
  │      ├── account        #账户
  │      ├── bill           #订单
  │      └── members        #成员
  ├── router             
  │   └── index.js          #路由
  ├── service
  │   ├── apiList.js        #api列表
  │   └── request.js        #ajax封装
  └── store                 #vuex相关
  ├── actions.js
  ├── getters.js
  ├── index.js
  ├── mutation-types.js
  ├── mutations.js
└── static                  #静态资源文件
  └── images                #图片

```

## 命名规范

* 页面使用kebab-case（短横线）命名方式
* 图片资源采用的命名规范
* CSS命名规范
* 常规名称命名方案，参见EasyAPI中英文翻译

## 其他说明

* page目录页面命名规范，文件命令简明扼要，例如/pages/api/list.vue表示API列表页，/pages/api/detail.vue表示API详情页
* page目录中尽量采用样式表和页面分离开发，例如login文件夹中包含login.vue，login.styl
* 自定义组建说明，基于成熟的组建进行自定义开发，可平滑升级，打造属于EasyAPI的Vue组件库，以EasyAPI缩写ea为前缀，例如ea-table

## 常见问题


**1. 编译失败**

	请使用cnpm试试

**2. 编译成功启动失败**

	请确保网络正常，可提供错误给相关工程师
