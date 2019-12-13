import React from 'react';

class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [
				{
					content: 'Cras justo odio',
					compeleted: false
				},{
					content: 'Dapibus ac facilisis in',
					compeleted: false
				},{
					content: 'Morbi leo risus',
					compeleted: false
				}
			]
		}
	}

	handleBtnClick = () => this.form.submit();
	handleSubmit = (event) => {
		event.preventDefault();
		const value = this.input.value;
		if (value && value.length > 3) {
			this.setState(prevState => ({
				items: [
					{
						content: value,
						compeleted: false
					},
					...prevState.items
				]
			}));
			this.input.value = '';
		}
	}

	render () {
		const { items } = this.state;
		return (
			<React.Fragment>
				<div className="div d-flex justify-content-between">
					<p className="m-0">You can delete the Todo throw this section</p>
					<button className="btn btn-sm btn-danger"> Delete </button>
				</div>
				<div>
					<hr />
				</div>
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
					<ul className="list-group list-group-flush">
						{items.map((item, indx) => (<li key={indx}
							className="list-group-item d-flex justify-content-between align-items-center"
							>
								{item.compeleted 
									? <span className="badge badge-success badge-pill">done</span> 
									: <span className="badge badge-info badge-pill">in progress</span>}
								<div className="w-100 pl-2 text-left">
									{item.content}
								</div>
								<button className="btn btn-sm btn-danger">delete</button>
						</li>))}
					</ul>
				</div>
			</React.Fragment>
		)
	}
}

export default Todo;
