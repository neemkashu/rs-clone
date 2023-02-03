import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Game from './components/Game/Game';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/App';

const rootDiv = document.getElementById('root');
if (!rootDiv) {
    throw new Error('root is not found!');
}

const root = ReactDOM.createRoot(rootDiv);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
