import React from 'react';

class List extends React.Component {

  render () {  
    return (
    	<div className="main--sidebar">
			<div className="list-group">
				<a href="#" className="list-group-item list-group-item-action active">
					Cras justo odio
				</a>
				<a href="#" className="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
				<a href="#" className="list-group-item list-group-item-action">Morbi leo risus</a>
				<a href="#" className="list-group-item list-group-item-action">Porta ac consectetur ac</a>
			</div>
    	</div>
    )
  }
}

export default List;
