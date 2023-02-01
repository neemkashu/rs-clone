import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './components/Game/Game';

const rootDiv = document.getElementById('root');
if (!rootDiv) {
    throw new Error('root is not found!');
}

const root = ReactDOM.createRoot(rootDiv);
root.render(
    <React.StrictMode>
        <Game />
    </React.StrictMode>
);
