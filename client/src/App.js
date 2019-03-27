import React, { Component } from 'react';

// File in which all css files are imported
import './css/import.js'; 

// Import components
import Navbar from './components/Navbar';
import Shoppinglist from './components/Shoppinglist.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Shoppinglist />
      </div>
    );
  }
}

export default App;
