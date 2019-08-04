import React, { Component } from 'react';

// File in which all css files are imported
import './css/import.js'; 

// Import Reactstrap
import { Container } from 'reactstrap';

// Import components
import Navbar from './components/Navbar';
import Shoppinglist from './components/Shoppinglist.js';
import ItemModal from './components/ItemModal';

// Redux
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Navbar />
          <Container>
            <ItemModal />
            <Shoppinglist />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
