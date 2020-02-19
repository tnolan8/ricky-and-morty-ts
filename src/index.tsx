import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { EpisodesProvider } from './context/episodes';

ReactDOM.render(
  <EpisodesProvider>
    <App />
  </EpisodesProvider>,
  document.getElementById('root'),
);
