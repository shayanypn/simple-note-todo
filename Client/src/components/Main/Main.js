import React from 'react';
import List from '../List/List';
import Todo from '../Todo/Todo';
import Note from '../Note/Note';

class Main extends React.Component {

  render () {  
    return (
        <div className="main">
          <div className="row">
          	<div className="col-3">
          		<List />
          	</div>
          	<div className="col-9">
				<Todo />
				<Note />
          	</div>
          </div>
        </div>
    )
  }
}

export default Main;
