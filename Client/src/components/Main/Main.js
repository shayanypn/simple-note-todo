import React from 'react';
import Swal from 'sweetalert2';
import toastr from 'toastr';
import List from '../List/List';
import Todo from '../Todo/Todo';
import Note from '../Note/Note';
import ApiService from '../../Utils/Api';

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
			models: [],
			view: null,
			selected: null
		};
	}

	handleNew = () => this.setState({ view: 'new', selected: null });
	handleSelect = (model) => this.setState({ view: 'select', selected: model });
	handleSelectNew = (type) => this.setState({
		view: 'select',
		selected: {
			_id: null,
			type: type
		}
	});

	updateModels = (model) => {
		const { models } = this.state;

		const modifiedModels = models.filter(x => x._id !== model._id);
		this.setState({
			selected: model,
			models: [
				model,
				...modifiedModels
			]
		});
	};

	updateModelItems = (modelId, itemId, data) => {
		this.setState({
			models: this.state.models.map(model => {
				if (model._id === modelId) {
					model.items.map(item => {
						if (item._id === itemId){
							item = Object.assign(item, data);
						}
						return item;
					});
				}
				return model;
			})
		})
	}

	handleSave = (id, data) => {
		if (id) {
			ApiService.save(id, data)
			.then( res => res.data)
			.then( res => {
				this.updateModels(Object.assign(res, data))
				toastr.success('updated changes!');
			});
		} else {
			ApiService.create(data)
			.then( res => res.data)
			.then( res => {
				this.updateModels(res);
				toastr.success('updated changes!');
			});
		}
	};

	handleItemComplete = (modelId, itemId) => {
		ApiService.updateItem(modelId, itemId)
		.then(res => res.data)
		.then(res => {
			const selected = this.state.selected;
			this.setState({ view: null, selected: null });
			this.updateModelItems(modelId, itemId, res);

			this.setState({
				view: 'select', 
				selected: this.state.models.find(x => x._id === selected._id)
			})
		});
	}

	handleDelete = (id) => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'You won\'t be able to revert this!',
			type: 'warning',
			confirmButtonColor: '#c82333',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it.'
		}).then((result) => {
			if (result.value) {
				ApiService.destroy(id)
				.then(res => {
					this.setState(prevState => ({
						selected: null,
						models: prevState.models.filter(x => x._id !== id)
					}));
					toastr.success('item deleted successfully!');
				});
			}
		});
	};

	componentDidMount(){

		ApiService
		.fetchAll()
		.then(res => res.data )
		.then(models => {
			this.setState({
				models
			});
		})
		.catch(function (error) {
			console.log(error);
			toastr.erro('problem of fetching data!');
		})
	}

	render () {
		const { models, selected, view } = this.state;
		return (
			<div className="main">
				<div className="row">
					<div className="col-3 p-0">
						<List
							items={models}
							selectedId={selected ? selected._id : null}
							onNew={this.handleNew}
							onClick={this.handleSelect}
						/>
					</div>
					<div className="col-9 pt-2">
						{view === 'new' ? (<NewOption onClick={this.handleSelectNew} />) : ''}
						{selected && selected.type === 'todo' ? <Todo
							model={selected}
							onSave={this.handleSave}
							onDelete={this.handleDelete}
							onItemComplete={this.handleItemComplete}
						/> : ''}
						{selected && selected.type === 'note' ? <Note
							model={selected}
							onSave={this.handleSave}
							onDelete={this.handleDelete}
						/> : ''}
					</div>
				</div>
			</div>
		)
	}
}

export default Main;
