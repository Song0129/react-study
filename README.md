# React Study

React 学习过程中的一些笔记和小案例

视频学习来源 [B 站尚硅谷 React 教程](https://www.bilibili.com/video/BV1wy4y1D7JT "React教程")

## 一.React_Basic

    React中基本知识点小案例
    此处案例均采用引入关键js的方式显示(16版本)

    react.development.js==>用于引入React核心库
    react-dom-development.js==>用于支持React操作DOM
    babel.min.js==>将jsx转为js

```
<!--准备好一个容器-->
<div id="test"></div>

<!--引入React核心库-->
<script src="../js/react.development.js"></script>
<!--引入React-DOM  用于支持React操作ROM-->
<script src="../js/react-dom.development.js"></script>
<!--引入babel  将jsx转为js-->
<script src="../js/babel.min.js"></script>
<script type="text/babel">
    /*此处 type一定是babel*/
    // jsx内容
</script>
```

### 1.初识 React

    初次使用React在页面显示Hello React

```
// 1.创建虚拟DOM
const VDOM = <h1>Hello,React</h1>; /*此处一定不要写引号 是虚拟dom不是字符串*/

// 2.渲染虚拟DOM到页面
ReactDOM.render(VDOM, document.getElementById("test"));
```

### 2.虚拟 DOM

-   使用 jsx 创建虚拟 DOM

```
const VDOM = (
    <h1>
        <span>Hello,React</span>
    </h1>
)
```

-   使用 js 创建虚拟 DOM

```
const VDOM = React.createElement("h1", { id: "title" }, React.createElement("span", {}, "hello,react"));
```

### 3.jsx 语法规则

jsx 语法规则：

-   定义虚拟 DOM 时，不要写引号
-   标签中混入 js 表达式时要用{}
-   样式的类型指定不要用 class，要用 className
-   内联样式，要用 style={{key:value}}的形式去写
    外层括号表示是 js 表达式，内层表示为 js 对象，键值对形式声明样式

    多个单词组成的样式 应该使用小驼峰命名如 font-size=》fontSize

-   只有一个根标签=》类似 vue 组件
-   标签必须闭合
-   标签首字母

    (1).若小写字母开头，则将该标签转为 html 中同名元素，若 html 无该标签对应的同名元素，则报错

    (2).若大写字母开头，react 就去渲染对应的组件，若组件没有定义，则报错

### 4.React 中的组件

### 5.组件的三大属性 1——state

### 6.组件的三大属性 2——props

### 7.组件的三大属性 3——refs

### 8.React 中的事件处理

### 9.react 中收集表单数据

### 10.高阶函数\_函数柯里化

### 11.组件的生命周期

### 12.DOM 的 diff 算法

## 二.React_Extension

    React扩展知识点

## 三.React_Staging

    React脚手架create-react-app的使用

## 四.Redux_test

    React中状态管理工具Redux的使用
