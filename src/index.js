import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'

const root = <Provider store={store}>
  <Router>
    <App />
  </Router>
</Provider>

ReactDOM.render(
  root,
  document.getElementById('root')
);

