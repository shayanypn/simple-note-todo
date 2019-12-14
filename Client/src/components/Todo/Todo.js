import React from 'react';
import DeleteIcon from '../../assets/icons/delete.svg';
import CircleIcon from '../../assets/icons/circle.svg';
import CheckedIcon from '../../assets/icons/checked.svg';

class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: props.model.items 
					? props.model.items
					: []
		}
	}

	handleBtnClick = () => this.form.submit();
	handleSubmit = (event) => {
		event.preventDefault();
		const value = this.input.value;

		// // we can have this also
		//if (value && value.length < 3) {return}

		this.setState(prevState => ({
			items: [
				{
					content: value,
					completed: false
				},
				...prevState.items
			]
		}));
		this.input.value = '';
	};
	handleItemeDelete = (id) => this.setState(
		prevState => ({
			items: prevState.items.filter(x => x._id !== id)
		})
	);
	handleComplete = () => {

	}
	handleSave = () => {
		const { model, onSave } = this.props;
		const { items } = this.state;

		if (!items.length) {return;}

		onSave(model._id, {
			name: items[0].content.slice(0, 15),
			type: 'todo',
			items: items.map(x => ({
				content: x.content,
				completed: x.completed
			}))
		});
	}

    componentDidUpdate (prevProps) {
    	if (prevProps.model._id !== this.props.model._id) {
    		this.setState({
    			items: this.props.model.items
					? this.props.model.items
					: ''
    		});
    	}
    }

	render () {
		const { items } = this.state;
		const { model, onDelete, onItemComplete } = this.props;

		return (
			<React.Fragment>
				{model._id ? (<div className="actionbar form-group d-flex justify-content-between">
					<p className="m-0">You can delete the note throw this section</p>
					<button className="btn btn-sm btn-danger"
						onClick={() => onDelete(model._id)}
						> Delete </button>
				</div>) : ''}
				<div className="card">
					<div className="card-header">
						<form
							ref={ele => {this.form=ele}}
							className="form-inline"
							onSubmit={this.handleSubmit}
							>
							<div className="form-group">
								<input
									type="text"
									id="todo"
									className="ml-1 form-control"
									ref={ele => {this.input=ele}}
								/>
							</div>
							<button type="submit"
								className="btn btn-primary"
								onClick={this.handleBtnClick}
								>Add</button>
						</form>
					</div>
					<ul className="list--todo list-group list-group-flush">
						{items.map((item, indx) => (<li key={indx}
							className="list-group-item d-flex justify-content-between align-items-center"
							>
								<span onClick={() => onItemComplete(model._id, item._id)}>
									{item.completed 
										? <img src={CheckedIcon} alt="done task" /> 
										: <img src={CircleIcon} alt="in progress task" />}
								</span>
								<div className="w-100 pl-2 text-left">
									{item.content}
								</div>
								<span onClick={()=>this.handleItemeDelete(item._id) }>
									<img src={DeleteIcon} alt="delete task" />
								</span>
						</li>))}
					</ul>
					<div className="form-group pb-0 pl-1 pr-1">
						<button type="submit"
							className="btn btn-primary btn-wide"
							onClick={this.handleSave}
							>Save</button>
					</div>
				</div>
			</React.Fragment>
		)
	}
}

export default Todo;
