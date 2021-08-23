import React, { Component } from 'react';
import './index.css';

export default class Item extends Component {
	state = { mouse: false }; //标识鼠标移入、移除

	// 鼠标移入、移除的问题
	handleMouse = (flag) => {
		return () => {
			this.setState({ mouse: flag });
		};
	};

	// 勾选、取消勾选一个todo的回调
	handleCheck = (id) => {
		return (event) => {
			this.props.updateTodo(id, event.target.checked);
		};
	};

	handleDelete = (id) => {
		if (window.confirm('确定删除吗？')) {
			this.props.deleteTodo(id);
		}
	};

	render() {
		const { id, name, done } = this.props;
		const { mouse } = this.state;
		return (
			<li style={{ backgroundColor: mouse ? '#ddd' : '#fff' }} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
				<label>
					<input type="checkbox" checked={done} onChange={this.handleCheck(id)} />
					<span>{name}</span>
				</label>
				<button className="btn btn-danger" onClick={() => this.handleDelete(id)} style={{ display: mouse ? 'block' : 'none' }}>
					删除
				</button>
			</li>
		);
	}
}
