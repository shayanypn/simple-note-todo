import React from 'react';
import Swal from 'sweetalert2';
import ApiService from '../../Utils/Api';

class Note extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			content: props.model.items 
					? props.model.items[0].content
					: ''
		}
	}

	handleBtnClick = () => this.form.submit();
	handleChange = (event) => this.setState({ content: event.target.value });
	handleSubmit = (event) => {
		const { model, onSave } = this.props;
		const { content } = this.state;

		event.preventDefault();
		onSave(model._id, {
			name: content.slice(0, 15),
			type: 'note',
			items: [
				{
					content: content,
					completed: false
				}
			]
		});
	};

    componentDidUpdate (prevProps) {
    	if (prevProps.model._id !== this.props.model._id) {
    		this.setState({
    			content: this.props.model.items 
    					? this.props.model.items[0].content
    					: ''
    		});
    	}
    }

	render () {
		const { model, onDelete } = this.props;
		const { content } = this.state;

		return (
			<React.Fragment>
				{model._id ? (<div className="actionbar form-group d-flex justify-content-between">
					<p className="m-0">You can delete the note throw this section</p>
					<button className="btn btn-sm btn-danger"
						onClick={() => onDelete(model._id)}
						> Delete </button>
				</div>) : ''}
				<form
					ref={ele => {this.form=ele}}
					onSubmit={this.handleSubmit}
					>
					<div className="form-group">
						<textarea
							className="form-control"
							id="content"
							rows="3"
							onChange={this.handleChange}
							value={content}
							></textarea>
					</div>
					<div className="form-group">
						<button type="submit"
							className="btn btn-primary btn-wide"
							onClick={this.handleBtnClick}
							>Save</button>
					</div>
				</form>
			</React.Fragment>
		)
	}
}

export default Note;
