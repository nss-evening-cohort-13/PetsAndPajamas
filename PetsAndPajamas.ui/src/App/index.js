import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../helpers/Routes';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Routes />
        </Router>
        <h2>Pets And Pajamas</h2>
      </div>
    );
  }
}

export default App;
