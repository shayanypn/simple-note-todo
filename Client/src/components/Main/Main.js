import React from 'react';
import List from '../List/List';
import Todo from '../Todo/Todo';
import Note from '../Note/Note';



const NewOption = ({ onClick }) => ( <div className="row p-5">
	<div className="col">
		<div className="card card--new" onClick={() => onClick('todo')}>
			<div className="card-body">
				<h5 className="card-title text-center">Todo</h5>
			</div>
		</div>
	</div>
	<div className="col">
		<div className="card card--new" onClick={() => onClick('note')}>
			<div className="card-body">
				<h5 className="card-title text-center">Note</h5>
			</div>
		</div>
	</div>
</div>);

class Main extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			view: null,
			selected: null
		};
	}

	handleNew = () => this.setState({ view: 'new', selected: null });
	handleSelectNew = (type) => this.setState({
		view: 'select',
		selected: {
			_id: null,
			type: type
		}
	})

	render () {
		const { selected, view } = this.state;
		return (
			<div className="main">
				<div className="row">
					<div className="col-3 p-0">
						<List
							onNew={this.handleNew}
						/>
					</div>
					<div className="col-9 pt-2">
						{view === 'new' ? (<NewOption onClick={this.handleSelectNew} />) : ''}
						{selected && selected.type === 'todo' ? <Todo model={selected} /> : ''}
						{selected && selected.type === 'note' ? <Note model={selected} /> : ''}
					</div>
				</div>
			</div>
		)
	}
}

export default Main;
