## 1.求和案例\_redux 精简版

    (1).去除Count组件自身的状态
    (2).src下建立:
        -redux
            -store.js
            -count_reducer.js

    (3).store.js：
        1).引入redux中的createStore函数，创建一个store
        2).createStore调用时要传入一个为其服务的reducer
        3).记得暴露store对象

    (4).count_reducer.js：
        1).reducer的本质是一个函数，接收：preState,action，返回加工后的状态
        2).reducer有两个作用：初始化状态，加工状态
        3).reducer被第一次调用时，是store自动触发的，
            传递的preState是undefined,
            传递的action是:{type:'@@REDUX/INIT_a.2.b.4}

    (5).在index.js中监测store中状态的改变，一旦发生改变重新渲染<App/>
        备注：redux只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写。

## 2.求和案例\_redux 完整版

    新增文件：
        1.count_action.js 专门用于创建action对象
        2.constant.js 放置容易写错的type值

## 3.求和案例\_redux 异步 action 版

    (1).明确：延迟的动作不想交给组件自身，想交给action
    (2).何时需要异步action：想要对状态进行操作，但是具体的数据靠异步任务返回
    (3).具体编码：
        1).yarn add redux-thunk，并配置在stroe中
        2).创建action的函数不再返回一般对象，而是一个函数，该函数中写异步任务
        3).异步任务有结果后，分发一个同步action去真正操作数据
    (4).备注：异步action不是必须要写的，完全可以自己等待异步任务的结果有了再去分发同步action

## 4.求和案例\_react-redux 优化

    (1).容器组件和UI组件整个为一个文件
    (2).无需自己给容器组件传递store，给<App/>包裹一个<Provider store={store}>即可
    (3).使用了react-redux后也不用再自己检测redux中状态的改变了，容器组件可以自动完成整个工作
    (4).mapDispatchToProps也可以简单的写成一个对象
    (5).一个组件要和redux“打交道”要经过哪几步？
        1).定义好UI组件---不暴露
        2).引入connect生成一个容器组件，并暴露，写法如下：
            connect(
                state=>({key:value}),//映射状态
                {key:xxxAction}//映射操作状态的方法
            )(UI组件)
        3).在UI组件中通过this.props.xxx  读取和操作状态
