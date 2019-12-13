import React from 'react';

class Note extends React.Component {

  render () {  
    return (
        <form>
			<div className="form-group">
				<label for="content">Content</label>
				<textarea className="form-control" id="content" rows="3"></textarea>
			</div>
			<div className="form-group">
				<button type="submit" className="btn btn-primary">Save</button>
			</div>
		</form>
    )
  }
}

export default Note;
