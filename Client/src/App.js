import React from 'react';
import Main from './components/Main/Main';

import './assets/bootstrap.min.css';
import './assets/app.css';

class App extends React.Component {

  render () {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <Main />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
