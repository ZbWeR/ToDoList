<h1 align="center">✨ ToDoList 🎯</h1>

Page访问地址: https://todolist-a1m.pages.dev/

<strong>主要功能</strong>

+ 利用类似终端输入的方法实现增加待办/清除数据的操作.
+ 采用点击交互的方法实现编辑待办/完成待办的操作.
+ 由于时间原因,暂时没有做移动端的适配.

<strong>项目收获</strong>

1. 遮罩层和页面内弹窗的样式设计.以及如何实现点击遮罩层关闭弹窗.
2. `Flex`布局的熟练应用,`font-family`通用字体族的概念以及单行文本溢出省略的写法.
3. `json` 数据的各种操作(阿巴阿巴阿巴) ; `jQuery` 一些方法的使用(有空再详细展开).

<strong>目录架构</strong>

```cpp
.
│   index.html      // 页面主体框架
│   README.md       // 此文档
│   style.css       // 页面所有样式
│
├───json            // 存放页面初始化的数据
│
├───script          // jQuery文件与页面所有脚本
│
└───全过程记录 

```

<strong>后期计划</strong>

+ 增加网站logo和Title
+ 增加待办详情页多行文本时自适应高度
+ 增加暗色模式转换
+ 增加移动端响应式布局
+ 定时删除Finish的任务
+ 增加每日任务模块,每天自动新增待办
+ help 指令显示所有指令
