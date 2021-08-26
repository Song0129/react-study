// 引入Count的UI组件
import CountUI from "../../components/Count";
// 引入action
import { createIncrementAction, createDecrementAction, createIncrementAsyncAction } from "../../redux/count_action";
// 引入connect用于连接UI组件和redux
import { connect } from "react-redux";

// 使用connect()()创建并暴露一个Count的容器组件
export default connect(
	(state) => ({ count: state }),
	// mapDispatchToProps的一般写法
	// (dispatch) => ({
	// 	jia: (number) => dispatch(createIncrementAction(number)),
	// 	jian: (number) => {
	// 		dispatch(createDecrementAction(number));
	// 	},
	// 	jiaAsync: (number, time) => {
	// 		dispatch(createIncrementAsyncAction(number, time));
	// 	},
	// })

	// mapDispatchToProps的简写
	{
		jia: createIncrementAction,
		jian: createDecrementAction,
		jiaAsync: createIncrementAsyncAction,
	}
)(CountUI);
