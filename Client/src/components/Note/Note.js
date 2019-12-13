import React from 'react';

class Note extends React.Component {
	handleBtnClick = () => this.form.submit();
	handleSubmit = (event) => {
		event.preventDefault();
	}

	render () {
		return (
			<form
				ref={ele => {this.form=ele}}
				onSubmit={this.handleSubmit}
				>
				<div className="form-group d-flex justify-content-between">
					<p className="m-0">You can delete the note throw this section</p>
					<button className="btn btn-sm btn-danger"> Delete </button>
				</div>
				<div className="form-group">
					<hr />
				</div>
				<div className="form-group">
					<textarea
						className="form-control"
						id="content"
						rows="3"
						ref={ele => {this.input=ele}}
						></textarea>
				</div>
				<div className="form-group">
					<button type="submit"
						className="btn btn-primary btn-wide"
						onClick={this.handleBtnClick}
						>Save</button>
				</div>
			</form>
		)
	}
}

export default Note;
