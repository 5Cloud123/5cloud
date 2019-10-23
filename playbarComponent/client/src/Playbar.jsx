import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import songs from '../../database/seed_data.js';

ReactDOM.render(<App songs={songs} />, document.getElementById('playbar'));
