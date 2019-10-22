import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import 'babel-polyfill';

ReactDOM.render(
  <App currentSong="Song_00001" />,
  document.getElementById('app')
);
