import React from 'react';

class List extends React.Component {

  render () {
  	const { onNew } = this.props;
    return (
    	<div className="main--sidebar">
    		<button className="btn btn-success btn-wide"
    			onClick={() => onNew()}
    			>New</button>
			<ul className="list-group list-group-flush">
				<li className="list-group-item active">
					Cras justo odio
				</li>
				<li className="list-group-item">Dapibus ac facilisis in</li>
				<li className="list-group-item">Morbi leo risus</li>
				<li className="list-group-item">Porta ac consectetur ac</li>
			</ul>
    	</div>
    )
  }
}

export default List;
