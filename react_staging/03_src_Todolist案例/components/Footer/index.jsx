import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default class Footer extends Component {
	static propTypes = {
		checkAllTodo: PropTypes.func.isRequired,
		clearAllDone: PropTypes.func.isRequired,
	};

	// 全选checkbox的回调
	handleCheckAll = (event) => {
		this.props.checkAllTodo(event.target.checked);
	};

	// 清除已完成任务的回调
	handleClearAllDone = () => {
		this.props.clearAllDone();
	};

	render() {
		const { todos } = this.props;
		const doneCount = todos.reduce((pre, todo) => {
			return pre + (todo.done ? 1 : 0);
		}, 0);
		const total = todos.length;
		return (
			<div className="todo-footer">
				<label>
					<input onChange={this.handleCheckAll} type="checkbox" checked={doneCount === total && total !== 0 ? true : false} />
				</label>
				<span>
					<span>已完成{doneCount}</span> / 全部{total}
				</span>
				<button className="btn btn-danger" onClick={this.handleClearAllDone}>
					清除已完成任务
				</button>
			</div>
		);
	}
}
