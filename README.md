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

    1. 初始化阶段：由 ReactDOM.render()触发---初次渲染
        1. constructor() 构造器触发
        2. getDerivedStateFromProps 若组件的 state 都取决于 props 使用该函数
        3. render() 组件挂在
        4. componentDidMount() 组件挂载完毕
    2. 更新阶段：由组件内部 this.setState()或父组件重新 render 触发
        1. getDerivedStateFromProps 若组件的 state 都取决于 props 使用该函数
        2. shouldComponentUpdate() 组件能否更新(默认可更新)
        3. render() 组件更新
        4. getSnapshotBeforeUpdate 更新之前获取快照
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

### 13.复习

1. 类的基本知识

2. 原生事件绑定

3. 类方法中的 this 指向

4. 展开运算符

5. 对象相关的知识

6. 演示函数的柯里化

## 二.React_Extension

    React扩展知识点

## 三.React_Staging

    React脚手架create-react-app的使用

## 四.Redux_test

    React中状态管理工具Redux的使用
