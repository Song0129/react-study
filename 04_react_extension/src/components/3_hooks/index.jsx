import React from "react";
import ReactDOM from "react-dom";

// 类式组件
// class Demo extends React.Component {
// 	state = { count: 0 };

// 	myRef = React.createRef();

// 	add = () => {
// 		this.setState((state) => ({ count: state.count + 1 }));
// 	};

// 	componentDidMount() {
// 		this.timer = setInterval(() => {
// 			this.setState((state) => ({ count: state.count + 1 }));
// 		}, 1000);
// 	}

// 	componentWillUnmount() {
// 		clearInterval(this.timer);
// 	}

// 	unmout() {
// 		ReactDOM.unmountComponentAtNode(document.getElementById("root"));
// 	}

// 	show = () => {
// 		alert(this.myRef.current.value);
// 	};

// 	render() {
// 		return (
// 			<div>
// 				<input type="text" ref={this.myRef} />
// 				<h2>当前求和为：{this.state.count}</h2>
// 				<button onClick={this.add}>点我+1</button>&nbsp;
// 				<button onClick={this.unmout}>卸载组件</button>&nbsp;
// 				<button onClick={this.show}>点我提示信息</button>
// 			</div>
// 		);
// 	}
// }

function Demo() {
	/*
        React.useState(x)
        const [xxx, setXxx] = React.useState(initValue)
        1.x为初始状态值
        2.返回为一个包含两个元素的数组
            数组第一项为状态值
            数组第二项为更新状态值的函数
        3.setXxx()2种写法:
            setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
            setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
    */
	const [count, setCount] = React.useState(0);
	console.log("demo");

	/*
        React.useEffect(()=>{
            // dosomething 在此可以执行任何带副作用操作
            return ()=>{// 在组件卸载前执行
                // 在此做一些收尾工作, 比如清除定时器/取消订阅等
            }
        },[stateValue])// 如果指定的是[], 回调函数只会在第一次render()后执行

        可以把 useEffect Hook 看做如下三个函数的组合
            componentDidMount()
            componentDidUpdate()
            componentWillUnmount()
    */
	React.useEffect(() => {
		let timer = setInterval(() => {
			setCount((count) => count + 1);
		}, 1000);
		return () => {
			clearInterval(timer);
		};
	}, []);

	/*
        Ref hook
        语法：const refContainer = React.useRef();
        作用：保存标签对象，功能与React.createRef()一样
    */
	let myRef = React.useRef();

	function add() {
		// setCount(count + 1);//第一种写法
		setCount((count) => count + 1);
	}

	function unmount() {
		ReactDOM.unmountComponentAtNode(document.getElementById("root"));
	}

	function show() {
		alert(myRef.current.value);
	}

	return (
		<div>
			<input type="text" ref={myRef} />
			<h2>当前求和为：{count}</h2>
			<button onClick={add}>点我+1</button>
			<button onClick={unmount}>卸载组件</button>
			<button onClick={show}>点我提示信息</button>
		</div>
	);
}

export default Demo;
