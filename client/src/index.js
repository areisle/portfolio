import React from 'react';
import ReactDOM from 'react-dom';
import './styles/normalize.css';
import './styles/index.css';

import { BrowserRouter } from 'react-router-dom';
import App from './app.js';

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('root'));