import React, { Component } from 'react';

// File in which all css files are imported
import './css/import.js'; 

// Import components
import Navbar from './components/Navbar';
import Shoppinglist from './components/Shoppinglist.js';

// Redux
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Navbar />
          <Shoppinglist />
        </div>
      </Provider>
    );
  }
}

export default App;
