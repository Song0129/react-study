# React Study

React 学习过程中的一些笔记和小案例

视频学习来源 [B 站尚硅谷 React 教程](https://www.bilibili.com/video/BV1wy4y1D7JT "React教程")

## 一.React_Basic

    React中基本知识点小案例
    此处案例均采用引入关键js的方式显示(react 16.8.4版本,新生命周期为17.0.1版本)

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

-   使用 js 创建虚拟 DOM（一般不常用）

    ```
    const VDOM = React.createElement("h1", { id: "title" }, React.createElement("span", {}, "hello,react"));
    ```

### 3.jsx 语法规则

-   定义虚拟 DOM 时，不要写引号
-   标签中混入 js 表达式时要用{}
-   样式的类型指定不要用 class，要用 className
-   内联样式，要用 style={{key:value}}的形式去写

    1. 外层括号表示是 js 表达式，内层表示为 js 对象，键值对形式声明样式
    2. 多个单词组成的样式 应该使用小驼峰命名如 font-size=》fontSize

-   只有一个根标签=》类似 vue 组件
-   标签必须闭合
-   标签首字母

    1. 若小写字母开头，则将该标签转为 html 中同名元素，若 html 无该标签对应的同名元素，则报错
    2. 若大写字母开头，react 就去渲染对应的组件，若组件没有定义，则报错

-   babel.js 的作用

    1. 浏览器不能直接解析 JSX 代码, 需要 babel 转译为纯 JS 的代码才能运行
    2. 只要用了 JSX，都要加上 type="text/babel", 声明需要 babel 来处理

### 4.React 中的组件

-   函数式组件

    ```
    function MyComponent() {
        console.log(this); //此处的this是undefined,因为babel编译后开启了严格模式
        return <h2>我是用函数定义的组件(使用于[简单组件]的定义)</h2>;
    }

    /*
        执行了ReactDOM.render(<MyComponent/>)......之后,发生了什么?
        1.React解析组件标签，找到了MyComponent组件。
        2.发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。
    */
    ```

-   类式组件

    ```
    class MyComponent extends React.Component {
        render() {
            // render是放在哪里的？---MyComponent的原型对象上,供实例使用。
            // render中的this是谁？---MyComponent的实例对象<=>MyComponent组件实例对象。
            return <h2>我是用类定义的组件(使用于[复杂组件]的定义)</h2>;
        }
    }

    /*
        执行了ReactDOM.render(<MyComponent/>)......之后,发生了什么?
        1.React解析组件标签，找到了MyComponent组件。
        2.发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。
        3.将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。
    */
    ```

### 5.组件的三大属性 1——state

-   理解

    1. state 是组件对象最重要的属性, 值是对象(可以包含多个 key-value 的组合)
    2. 组件被称为"状态机", 通过更新组件的 state 来更新对应的页面显示(重新渲染组件)

-   编码操作

    1. 使用构造器定义 state

    ```
    constructor(props) {
        super(props);
        // 初始化状态
        this.state = { isHot: false, wind: "微风" };
        // 解决changeWeather中this指向问题
        this.changeWeather = this.changeWeather.bind(this);
    }
    ```

    2. 简写 不适用构造器（常用）

    ```
    // 初始化状态  类中通过直接赋值的形式，定义state
    state = { isHot: false, wind: "微风" };
    ```

    3. 获取 state

        可通过解构赋值从 this.state 直接获取对应属性

-   强烈注意

    1. 组件中 render 方法中的 this 为组件实例对象
    2. 组件自定义的方法中 this 为 undefined，如何解决？
        1. 强制绑定 this: 通过函数对象的 bind()
        2. 箭头函数（自定义方法---要用赋值语句的形式+箭头函数）
    3. 状态数据，不能直接修改或更新，需要通过 this.setState({})修改

### 6.组件的三大属性 2——props

-   理解

    1. 每个组件对象都会有 props(properties 的简写)属性
    2. 组件标签的所有属性都保存在 props 中

-   作用

    1. 通过标签属性从组件外向组件内传递变化的数据
    2. 注意: 组件内部不要修改 props 数据

-   编码操作

    1. 内部读取某个属性值

        `this.props.name`

    2. 对 props 中的属性值进行类型限制和必要性限制

        - 第一种方式（React v15.5 开始已弃用）：

        ```
        Person.propTypes = {
            name: React.PropTypes.string.isRequired,
            age: React.PropTypes.number
        }
        ```

        - 第二种方式（新）：使用 prop-types 库进限制（需要引入 prop-types 库）

        ```
        Person.propTypes = {
            name: PropTypes.string.isRequired,
            age: PropTypes.number
        }
        ```

    3. 扩展属性: 将对象的所有属性通过 props 传递
       `<Person {...person}>`
    4. 默认属性值：

        ```
        Person.defaultProps = {
            age: 18,
            sex: '男'
        }
        ```

    5. 组件类的构造函数

        ```
        constructor(props){
            super(props)
            console.log(props)//打印所有属性
        }
        ```

### 7.组件的三大属性 3——refs

1. 理解

    组件内的标签可以定义 ref 属性来标识自己

2. 编码

    - 字符串形式的 ref

    ```
    <input ref="input1"/>
    // 可通过以下方式获取到当前ref为input1的DOM元素
    // 可理解为所有的ref节点都存于this.refs中
    this.refs.input1
    ```

    - 回调形式的 ref

    ```
    <input ref={(c)=>{this.input1 = c}}/>
    // 在组件内方法中，可通过以下方式获取DOM元素
    // 可理解为在当前组件类中增加属性input1，即可通过this直接获取
    this.input1

    /*
        回调函数形式的ref：
        更新过程中，回调函数会执行两次
        第一次：传入的参数为null
        第二次：传入的参数为真实DOM元素
        原因：每次渲染时会创建一个新的函数实例，所以React清空旧的ref并设置新的ref
        解决：将ref的回调函数定义为class的绑定函数的方式可避免上述问题，但大多数情况下都无关紧要
    */
    ```

    - createRef 创建 ref 容器（新版本推荐）

    ```
    // 创建容器
    myRef = React.createRef()
    // 使用ref标识节点
    <input ref={this.myRef}/>
    // 组件方法内，可通过一下方式获取DOM远古三
    this.myRef

    /*
        React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点，该容器的“专人专用”的
        每写用一个ref，都需要调用一次createRef方法
    */
    ```

### 8.React 中的事件处理

1. 通过 onXxx 属性指定事件处理函数(注意大小写)

    1. React 使用的是自定义(合成)事件, 而不是使用的原生 DOM 事件
    2. React 中的事件是通过事件委托方式处理的(委托给组件最外层的元素)

2. 通过 event.target 得到发生事件的 DOM 元素对象

### 9.react 中收集表单数据

-   理解

    1. 非受控组件

        非受控组件可以理解为获取组件内容时，需要通过 ref 等方式获取

    2. 受控组件

        受控组件可以理解为在组件内容发生变化时，通过绑定 onChange 方法将组件内容赋值给指定变量

### 10.高阶函数\_函数柯里化

-   高阶函数：如果一个函数符合下面 2 个规范中的任何一个，那该函数就是高阶函数。
    1. 若 A 函数，接收的参数是一个函数，那么 A 就可以称之为高阶函数。
    2. 若 A 函数，调用的返回值依然是一个函数，那么 A 就可以称之为高阶函数。
    3. 常见高阶函数：Promise、setTimeout、arr.map()等
-   函数柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。

    ```
    function sum (a){
        return(b)=>{
            return(c)=>{
                return a+b+c
            }
        }
    }
    const result = sum(1)(2)(3);
    console.log(result)//6
    ```

### 11.组件的生命周期

-   理解
    1. 组件从创建到销毁会经历一些特定的阶段。
    2. React 组件中包含一系列钩子生命周期（生命周期回调函数），会在特定的时刻调用。
    3. 我们在定义组件时，会在特定的生命周期回调函数中，做特定的工作。
-   生命周期流程图(旧)

![组件的生命周期(旧).png](<https://gitee.com/song0129/react-study/raw/main/picture/react%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F(%E6%97%A7).png> "组件的生命周期(旧)")

-   生命周期的三个阶段(旧)：

    1. 初始化阶段：有 ReactDOM.render()触发--初次渲染
        1. constructor() 构造器触发
        2. componentWillMount() 组件将要挂载
        3. render() 组件挂载
        4. componentDidMount() 组件挂载完毕
    2. 更新阶段：由组件内部 this.setState()或父组件重新 render 触发
        1. shouldComponentUpdate() 组件能否更新(默认可更新)
        2. componentWillUpdate() 组件将要更新
        3. render() 组件更新(挂载)
        4. componentDidUpdate() 组件更新完毕
    3. 卸载组件：由 ReactDOM.unmountComponentAtNode()触发
        1. componentWillUnmount() 组件将要卸载

-   生命周期流程图(新)

![组件的生命周期(新).png](<https://gitee.com/song0129/react-study/raw/main/picture/react%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F(%E6%96%B0).png> "组件的生命周期(新)")

-   生命周期的三个阶段(新)

    注：此处案例使用 17.0.1 版本的 React

    1. 初始化阶段：由 ReactDOM.render()触发---初次渲染
        1. constructor() 构造器触发
        2. **getDerivedStateFromProps** 若组件的 state 都取决于 props 使用该函数
        3. render() 组件挂在
        4. componentDidMount() 组件挂载完毕
    2. 更新阶段：由组件内部 this.setState()或父组件重新 render 触发
        1. **getDerivedStateFromProps** 若组件的 state 都取决于 props 使用该函数
        2. shouldComponentUpdate() 组件能否更新(默认可更新)
        3. render() 组件更新
        4. **getSnapshotBeforeUpdate** 更新之前获取快照
        5. componentDidUpdate() 组件更新完毕
    3. 卸载组件：由 ReactDOM.unmountComponentAtNode()触发
        1. componentWilUnmount() 组件将要卸载

-   重要的钩子

    1. render:初始化渲染或更新渲染调用
    2. componentDidMount:开启监听，发送 ajax 请求等
    3. componentWillUnmount:做一些收尾工作，如：清理定时器定

-   即将废弃的钩子

    1. componentWillMount
    2. componentWillReceiveProps
    3. componentWillUpdate

    现在使用会出现警告，下一个大版本需加上 UNSAFE\_前缀才能使用，以后可能会被彻底废弃，不建议使用

### 12.DOM 的 diff 算法

-   基本原理图

![diff流程图.png](https://gitee.com/song0129/react-study/raw/main/picture/diff%E6%B5%81%E7%A8%8B.png "diff流程图")

-   经典面试题

1.  react/vue 中的 key 有什么作用？（key 的内部原理是什么？）
2.  为什么遍历列表时，key 最好不要用 index?

---

1.  虚拟 DOM 中 key 的作用：

    1. 简单的说: key 是虚拟 DOM 对象的标识, 在更新显示时 key 起着极其重要的作用。

    2. 详细的说: 当状态中的数据发生变化时，react 会根据【新数据】生成【新的虚拟 DOM】,
       随后 React 进行【新虚拟 DOM】与【旧虚拟 DOM】的 diff 比较，比较规则如下：

        1. 旧虚拟 DOM 中找到了与新虚拟 DOM 相同的 key：

            (1).若虚拟 DOM 中内容没变, 直接使用之前的真实 DOM  
             (2).若虚拟 DOM 中内容变了, 则生成新的真实 DOM，随后替换掉页面中之前的真实 DOM

        2. 旧虚拟 DOM 中未找到与新虚拟 DOM 相同的 key
           根据数据创建新的真实 DOM，随后渲染到到页面

2.  用 index 作为 key 可能会引发的问题：

    1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
       会产生没有必要的真实 DOM 更新 ==> 界面效果没问题, 但效率低。
    2. 如果结构中还包含输入类的 DOM：
       会产生错误 DOM 更新 ==> 界面有问题。
    3. 注意！如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，
       仅用于渲染列表用于展示，使用 index 作为 key 是没有问题的。

3.  开发中如何选择 key?
    1. 最好使用每条数据的唯一标识作为 key, 比如 id、手机号、身份证号、学号等唯一值。
    2. 如果确定只是简单的展示数据，用 index 也是可以的。

### 13.复习

1. 类的基本知识

    1. 类中的构造器不是必须写的,要对实例进行一些初始化的操作,如添加指定属性时才写
    2. 如果 A 类继承了 B 类,且 A 类中写了构造器,那么 A 类构造器中的 super 是必须要调用的
    3. 类中所定义的方法,都放在了类的原型对象中,供实例去使用

2. 原生事件绑定

    ```
    <button id="btn1">按钮1</button>
    <button id="btn2">按钮2</button>
    <button onclick="demo()">按钮3</button>
    <script type="text/javascript">
        const btn1 = document.getElementById("btn1");
        btn1.addEventListener("click", () => {
            alert("按钮1被点击了");
        });

        const btn2 = document.getElementById("btn2");
        btn2.onclick = () => {
            alert("按钮2被点击了");
        };

        function demo() {
            alert("按钮3被点击了");
        }
    </script>
    ```

## 二.React_Extension

    React扩展知识点

## 三.React_Staging

    React脚手架create-react-app的使用

### 1. React 脚手架介绍及初次使用等

-   react 脚手架

    1. xxx 脚手架: 用来帮助程序员快速创建一个基于 xxx 库的模板项目
        1. 包含了所有需要的配置（语法检查、jsx 编译、devServer…）
        2. 下载好了所有相关的依赖
        3. 可以直接运行一个简单效果
    2. react 提供了一个用于创建 react 项目的脚手架库: create-react-app
    3. 项目的整体技术架构为: react + webpack + es6 + eslint
    4. 使用脚手架开发的项目的特点: 模块化, 组件化, 工程化

-   创建项目并启动

    1. 全局安装：`npm i -g create-react-app`
    2. 切换到想创项目的目录，使用命令：`create-react-app hello-react`
    3. 进入项目文件夹：`cd hello-react`
    4. 启动项目：`npm start`

-   react 脚手架项目结构

    -   public ---- 静态资源文件夹

        favicon.icon ------ 网站页签图标
        index.html -------- 主页面
        logo192.png ------- logo 图
        logo512.png ------- logo 图
        manifest.json ----- 应用加壳的配置文件
        robots.txt -------- 爬虫协议文件

    -   src ---- 源码文件夹

        App.css -------- App 组件的样式
        App.js --------- App 组件
        App.test.js ---- 用于给 App 做测试
        index.css ------ 样式
        index.js ------- 入口文件
        logo.svg ------- logo 图
        reportWebVitals.js --- 页面性能分析文件(需要 web-vitals 库的支持)
        setupTests.js ---- 组件单元测试的文件(需要 jest-dom 库的支持)

    -   功能界面的组件化编码流程（通用）

        1. 拆分组件: 拆分界面,抽取组件
        2. 实现静态组件: 使用组件实现静态页面效果
        3. 实现动态组件
            1. 动态显示初始化数据
                1. 数据类型
                2. 数据名称
                3. 保存在哪个组件?
            2. 交互(从绑定事件监听开始)

### 2. TodoList 案例

1. 拆分组件、实现静态组件，注意：className、style 的写法
2. 动态初始化列表，如何确定将数据放在哪个组件的 state 中？  
   ——某个组件使用：放在其自身的 state 中  
   ——某些组件使用：放在他们共同的父组件 state 中（官方称此操作为：状态提升）
3. 关于父子之间通信：
    1. 【父组件】给【子组件】传递数据：通过 props 传递
    2. 【子组件】给【父组件】传递数据：通过 props 传递，要求父提前给子传递一个函数
4. 注意 defaultChecked 和 checked 的区别，类似的还有：defaultValue 和 value
   defaultChecked 只执行一次  
   checked 必须有 onChange 函数
5. 状态在哪里，操作状态的方法就在哪里

6. React 脚手架中配置代理

    只需在项目初始创建的时候去配置，即初始架构阶段就可配置好，后面几乎不动！

    注：新版本可能会报错 proxy is not a function ！[解决](https://blog.csdn.net/weixin_44656392/article/details/107702232 "j解决新版proxy报错问题")

    - src 文件夹下创建 setupProxy.js

        ```
        // 此方法可配置多个代理
        const proxy = require("http-proxy-middleware");

        module.exports = function (app) {
            app.use(
                proxy("/api1", {
                    //遇见/api1前缀的请求，就会触发该代理配置
                    target: "http://localhost:5000", //请求转发给谁
                    changeOrigin: true, //控制服务器收到的请求头中Host的值
                    pathRewrite: { "^/api1": "" }, //重写请求路径(必须)
                }),
                proxy("/api2", {
                    target: "http://localhost:5001",
                    changeOrigin: true,
                    pathRewrite: { "^/api2": "" },
                })
            );
        };
        ```

    - package.json 中配置

        在 package.json 最后新增`proxy: "http://localhost:5000"`即可
        缺点：只能配置一个代理

### 3. github 搜索案例

-   说明

    1. React 本身只关注于界面, 并不包含发送 ajax 请求的代码
    2. 前端应用需要通过 ajax 请求与后台进行交互(json 数据)
    3. react 应用中需要集成第三方 ajax 库(或自己封装)

-   常用 axios 库

    1. jQuery: 比较重, 如果需要另外引入不建议使用
    2. axios: 轻量级, 建议使用
        1. 封装 XmlHttpRequest 对象的 ajax
        2. promise 风格
        3. 可以用在浏览器端和 node 服务器端

-   axios

    ```
    axios.get(`/api1/search/users?q=${keyWord}`).then(
        (respone) => {
            // 请求成功后通知App更新状态
            console.log("success", respone.data);
            this.props.updateAppState({ isLoading: false, users: respone.data.items });
        },
        (error) => {
            // 请求失败后通知App更新状态
            console.log("error", error);
            this.props.updateAppState({ isLoading: false, err: error.message });
        }
    );
    ```

-   pubsub

    需要引入`pubsub-js`，使用方法

    ```
    // 引入PubSub
    import PubSub from "pubsub-js";
    // 订阅消息
    this.token = PubSub.subscribe("message", (_, stateObj) => {
        this.setState(stateObj);
    });
    // 发布消息-->通知订阅者数据发生变化
    PubSub.publish("message", { isLoading: false, users: respone.data.items });
    // 取消订阅
    PubSub.unSubsribe(this.token);
    ```

    消息订阅与发布机制

    1. 先订阅，再发布（理解：有一种隔空对话的感觉）
    2. 适用于任意组件间通信
    3. 要在组件的 componentWillUnmount 中取消订阅

-   fetch

    fetch 发送请求（关注分离的设计思想），window 自带兼容性较好，无需引入。

    ```
    try {
        const response= await fetch(`/api1/search/users2?q=${keyWord}`)
        const data = await response.json()
        console.log(data);
    } catch (error) {
        console.log('请求出错',error);
    }
    ```

### 4. React 脚手架中路由的使用

-   SPA 的理解

    1. 单页 Web 应用（single page web application，SPA）。
    2. 整个应用只有**一个完整的页面**。
    3. 点击页面中的链接**不会刷新**页面，只会做页面的**局部更新**。
    4. 数据都需要通过 ajax 请求获取, 并在前端异步展现。

-   路由的理解

    1. 什么是路由?
        1. 一个路由就是一个映射关系(key:value)
        2. key 为路径, value 可能是 function 或 component
    2. 路由分类
        1. 后端路由：
            1. 理解： value 是 function, 用来处理客户端提交的请求。
            2. 注册路由： router.get(path, function(req, res))
            3. 工作过程：当 node 接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据
        2. 前端路由：
            1. 浏览器端路由，value 是 component，用于展示页面内容。
            2. 注册路由: `<Route path="/test" component={Test}>`
            3. 工作过程：当浏览器的 path 变为/test 时, 当前路由组件就会变为 Test 组件

-   react-router 的理解

    1. react 的一个插件库。
    2. 专门用来实现一个 SPA 应用。
    3. 基于 react 的项目基本都会用到此库。
    4. 包含 web(网页)、native(原生开发)、any(都可用) 三类

-   路由的基本使用

    下载 react-router-dom: npm install --save react-router-dom

    使用路由时：需要在入口文件 index.js 中引入 HashRouter/BrowserRouter，将 App 组件包裹。

    1. 路径声明

    ```
    <Link className="list-group-item" to="/home">
        Home
    </Link>
    ```

    2. 路由注册

    ```
    <Route path="/home" component={Home} />
    ```

### 5. NavLink 相关内容

    NavLink可以实现路由链接的高亮，通过activeClassName指定样式名
    可以封装自己的MyNavLink组件，实现统一指定的样式类名

### 6. switch 的使用

1. 通常情况下，path 和 component 是一一对应的关系。
2. Switch 可以提高路由匹配效率(单一匹配)，即匹配到就停止匹配。

### 7. React 脚手架中解决多级路由样式丢失问题

1. public/index.html 中 引入样式时不写 ./ 写 / （常用）
2. public/index.html 中 引入样式时不写 ./ 写 %PUBLIC_URL% （常用）
3. 使用 HashRouter

### 8. 路由精准匹配和模糊匹配

1. 默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
2. 开启严格匹配：`<Route exact={true} path="/about" component={About}/>`，可简写为 **exact**
3. 严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由

### 9. 路由中 Redirect 的使用

1. 一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到 Redirect 指定的路由
2. 具体编码：

```
<Switch>
    <Route path="/about" component={About}/>
    <Route path="/home" component={Home}/>
    <Redirect to="/about"/>
</Switch>
```

### 10. 嵌套路由的使用

1. 注册子路由时要写上父路由的 path 值
2. 路由的匹配是按照注册路由的顺序进行的

### 11. 路由组件传参方式

-   params 参数（较常用）

    1. 路径声明-->传参

    ```
    {/* 向路由组件传递params参数 */}
    <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>
    ```

    2. 路由注册

    ```
    {/* 声明接收params参数 */}
    <Route path="/home/message/detail/:id/:title" component={Detail} />
    ```

    3. 参数接收

    ```
    // 接收params参数
    const { id, title } = this.props.match.params;
    ```

-   search 参数

    1. 路径声明-->传参

    ```
    {/* 向路由组件传递search参数 */}
    <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>
    ```

    2. 路由注册

    ```
    {/* search参数无需声明接收，正常注册路由即可 */}
    <Route path="/home/message/detail" component={Detail} />
    ```

    3. 参数接收

    ```
    // 传入的参数是urlencode形式的  需要解码
    // 需要引入qs
    import qs from "querystring";
    // 接收search参数
    const { search } = this.props.location;
    const { id, title } = qs.parse(search.slice(1));
    ```

-   state 参数（参数在地址栏中不可见）

    1. 路径声明-->传参

    ```
    {/* 向路由组件传递state参数 */}
    <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>
    ```

    2. 路由注册

    ```
    {/* search参数无需声明接收，正常注册路由即可 */}
    <Route path="/home/message/detail" component={Detail} />
    ```

    3. 参数接收

    ```
    // 初次state是undefined，需要增加容错
    // 接收state参数
    const { id, title } = this.props.location.state || {};
    ```

### 12. push 和 replace 模式

    路由跳转可以理解为堆栈操作，页面前进跳转类似压栈的操作。

-   push

    正常压栈操作，可正常根据栈顺序回退

-   replace

    替换当前内容，回退则为上一级

### 13. 编程式路由导航

-   push

    push 方式页面跳转

    ```
    // push跳转+携带params参数
    this.props.history.push(`/home/message/detail/${id}/${title}`);
    // push跳转+携带search参数
    this.props.history.push(`/home/message/detail?id=${id}&title=${title}`);
    // push跳转+携带state参数
    this.props.history.push("/home/message/detail", { id, title });
    ```

-   replace

    repalce 方式页面跳转

    ```
    // replace跳转+携带params参数
    this.props.history.replace(`/home/message/detail/${id}/${title}`);
    // push跳转+携带search参数
    this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`);
    // push跳转+携带state参数
    this.props.history.replace("/home/message/detail", { id, title });
    ```

-   back

    页面回退（按照路由栈中存储的路由进行跳转）

    `this.props.history.goBack();`

-   forward

    页面前进（按照路由栈中存储的路由进行跳转）

    `this.props.history.goForward();`

-   go

    页面前进（n 为整数）/后退（n 为负数）n 级

    `this.props.history.go(n);`

### 14. withRouter 的使用

-   场景

    在一般组件内，props 中没有路由组件的相关方法需要使用 withRouter 来添加路由组件的方法。  
    例如：header 组件属于一般组件，当要实现前进、后退等操作路由的功能时，则要借助 withRouter 方法。

-   使用

    ```
    // 在组件中引入withRouter方法
    import { withRouter } from "react-router-dom";
    // 抛出组件时，抛出的为调用withRouter方法执行后的新组件
    export default withRouter(Header);

    // withRouter 可以加工一般组件，让一般组件具备路由组件所特有的API
    // withRouter 的返回值是一个新组件
    ```

### 15. HashRouter 和 BrowserRouter

1. 底层原理不一样：
   BrowserRouter 使用的是 H5 的 history API，不兼容 IE9 及以下版本。
   HashRouter 使用的是 URL 的哈希值。
2. path 表现形式不一样
   BrowserRouter 的路径中没有#,例如：localhost:3000/demo/test
   HashRouter 的路径包含#,例如：localhost:3000/#/demo/test
3. 刷新后对路由 state 参数的影响
    1. BrowserRouter 没有任何影响，因为 state 保存在 history 对象中。
    2. HashRouter 刷新后会导致路由 state 参数的丢失！！！
4. 备注：HashRouter 可以用于解决一些路径错误相关的问题。

### 16. ant-design 的使用

-   基本使用

    [antd 文档](https://ant.design/components/overview-cn/ "antd文档")
    [antd GitHub](https://github.com/ant-design/ant-design/ "github地址")

    ```
    // 引入组件
    import { Button, DatePicker, Space } from "antd";
    const { RangePicker } = DatePicker;
    <Button type="primary">Primary Button</Button>
    <Space direction="vertical">
        <DatePicker onChange={this.onChange} />
        <DatePicker onChange={this.onChange} picker="week" />
        <DatePicker onChange={this.onChange} picker="month" />
        <DatePicker onChange={this.onChange} picker="quarter" />
        <DatePicker onChange={this.onChange} picker="year" />
    </Space>
    <RangePicker />

    // 注：部分组件需要二次解构引入
    ```

-   按需加载 antd 组件 + 自定义 antd 主题

1. 安装依赖

    ```
    yarn add react-app-rewired customize-cra babel-plugin-import less less-loader
    ```

    less-loader 版本不宜过高，版本过高报错**TypeError: this.getOptions is not a function**  
    解决方式：降低 less-loader 版本即可，自测 7.0.1 可用

2. 修改 package.json

    ```
    "scripts": {
        "start": "react-app-rewired start",
        "build": "react-app-rewired build",
        "test": "react-app-rewired test",
        "eject": "react-scripts eject"
    },
    ```

3. 根目录下创建 config-overrides.js

    ```
    //配置具体的修改规则
    const { override, fixBabelImports,addLessLoader} = require('customize-cra');
    module.exports = override(
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
        }),
        addLessLoader({
            lessOptions:{
                javascriptEnabled: true,
                modifyVars: { '@primary-color': 'green' },
            }
        }),
    );
    ```

4. 备注：不用在组件里亲自引入样式了，即：`import 'antd/dist/antd.css'`应该删掉

## 四.Redux_test

    React中状态管理工具Redux的使用

### 1. redux 理解

-   学习文档

    1. 英文文档: https://redux.js.org/
    2. 中文文档: http://www.redux.org.cn/
    3. Github: https://github.com/reactjs/redux

-   redux 是什么

    1. redux 是一个专门用于做状态管理的 JS 库(不是 react 插件库)。
    2. 它可以用在 react, angular, vue 等项目中, 但基本与 react 配合使用。
    3. 作用: 集中式管理 react 应用中多个组件共享的状态。

-   什么情况下需要用 redux

    1. 某个组件的状态，需要让其他组件可以随时拿到（共享）。
    2. 一个组件需要改变另一个组件的状态（通信）。
    3. 总体原则：能不用就不用, 如果不用比较吃力才考虑使用。

-   redux 工作流程

    ![redux工作流程](https://gitee.com/song0129/react-study/raw/main/picture/redux%E5%8E%9F%E7%90%86%E5%9B%BE.png "redux工作流程")

### 2. redux 的三个核心概念

-   action

    1. 动作的对象
    2. 包含 2 个属性
        1. type：标识属性, 值为字符串, 唯一, 必要属性
        2. data：数据属性, 值类型任意, 可选属性
    3. 例子：{ type: 'ADD_STUDENT',data:{name: 'tom',age:18} }

-   reducer

    1. 用于初始化状态、加工状态。
    2. 加工时，根据旧的 state 和 action， 产生新的 state 的纯函数。

-   store

    1. 将 state、action、reducer 联系在一起的对象
    2. 如何得到此对象?
        1. import {createStore} from 'redux'
        2. import reducer from './reducers'
        3. const store = createStore(reducer)
    3. 此对象的功能?
        1. getState(): 得到 state
        2. dispatch(action): 分发 action, 触发 reducer 调用, 产生新的 state
        3. subscribe(listener): 注册监听, 当产生了新的 state 时, 自动调用

### 3. redux 的核心 API

-   createStore()

    作用：创建包含指定 reducer 的 store 对象

-   store 对象

    1. 作用: redux 库最核心的管理对象
    2. 它内部维护着:
        1. state
        2. reducer
    3. 核心方法:
        1. getState()
        2. dispatch(action)
        3. subscribe(listener)
    4. 具体编码:
        1. store.getState()
        2. store.dispatch({type:'INCREMENT', number})
        3. store.subscribe(render)

-   applyMiddleware()

    作用：应用上基于 redux 的中间件(插件库)

-   combineReducers()

    作用：合并多个 reducer 函数

### 4. redux 异步编程

-   理解：

    1. redux 默认是不能进行异步处理的,
    2. 某些时候应用中需要在 redux 中执行异步任务(ajax, 定时器)

-   使用异步中间件

    `npm install --save redux-thunk`

### 5. react-redux

-   理解

    1. 一个 react 插件库
    2. 专门用来简化 react 应用中使用 redux

-   react-Redux 将所有组件分为两大类

    1. UI 组件

        1. 只负责 UI 的呈现，不带有任何业务逻辑
        2. 通过 props 接收数据(一般数据和函数)
        3. 不使用任何 Redux 的 API
        4. 一般保存在 components 文件夹下

    2. 容器组件

        1. 负责管理数据和业务逻辑，不负责 UI 的呈现
        2. 使用 Redux 的 API
        3. 一般保存在 containers 文件夹下

-   相关 API

1. Provider：让所有组件都可以得到 state 数据

    ```
    <Provider store={store}>
        <App />
    </Provider>
    ```

2. connect：用于包装 UI 组件生成容器组件

    ```
    import { connect } from "react-redux"
    connect(
        mapStateToProps,
        mapDispatchToprops
    )(Counter)
    ```

3. mapStateToprops：将外部的数据（即 state 对象）转换为 UI 组件的标签属性

    ```
    const mapStateToProps = function (state) {
        return {
            value: state
        }
    }
    ```

4. mapDispatchToProps：将分发 action 的函数转换为 UI 组件的标签属性

### 6. 使用上 redux 调试工具

-   下载工具依赖包

```
npm install --save-dev redux-devtools-extension
```

### 7. 纯函数和高阶函数

-   纯函数

    1. 一类特别的函数: 只要是同样的输入(实参)，必定得到同样的输出(返回)
    2. 必须遵守以下一些约束
        1. 不得改写参数数据
        2. 不会产生任何副作用，例如网络请求，输入和输出设备
        3. 不能调用 Date.now()或者 Math.random()等不纯的方法
    3. redux 的 reducer 函数必须是一个纯函数

-   高级函数
    1. 理解: 一类特别的函数
        1. 情况 1: 参数是函数
        2. 情况 2: 返回是函数
    2. 常见的高阶函数:
        1. 定时器设置函数
        2. 数组的 forEach()/map()/filter()/reduce()/find()/bind()
        3. promise
        4. react-redux 中的 connect 函数
    3. 作用: 能实现更加动态, 更加可扩展的功能

## 4.求和案例\_react-redux 基本使用

    (1).明确两个概念：
        1).UI组件:不能使用任何redux的api，只负责页面的呈现、交互等。
        2).容器组件：负责和redux通信，将结果交给UI组件。
    (2).如何创建一个容器组件————靠react-redux 的 connect函数
        connect(mapStateToProps,mapDispatchToProps)(UI组件)
            -mapStateToProps:映射状态，返回值是一个对象
            -mapDispatchToProps:映射操作状态的方法，返回值是一个对象
    (3).备注1：容器组件中的store是靠props传进去的，而不是在容器组件中直接引入
    (4).备注2：mapDispatchToProps，也可以是一个对象
