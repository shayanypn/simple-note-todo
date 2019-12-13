import React from 'react';

class Todo extends React.Component {

  render () {  
    return (
		<div className="card">
			<div className="card-header">
				<form className="form-inline">
					<div className="form-group d-flex">
						<label for="todo" >Todo</label>
						<input type="text" className="form-control" id="todo" />
					</div>
					<button type="submit" className="btn btn-primary mb-2">Add</button>
				</form>
			</div>
			<ul className="list-group list-group-flush">
				<li className="list-group-item">Cras justo odio</li>
				<li className="list-group-item">Dapibus ac facilisis in</li>
				<li className="list-group-item">Vestibulum at eros</li>
			</ul>
		</div>

    )
  }
}

export default Todo;
