import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

const rootElement = document.getElementById('root');

// Render the UI
ReactDOM.render(
    <React.Fragment>
        <App/>
    </React.Fragment>,
    rootElement
);
