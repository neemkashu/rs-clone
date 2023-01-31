import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';

const rootDiv = document.getElementById('root');
if (!rootDiv) {
    throw new Error('root is not found!');
}

const root = ReactDOM.createRoot(rootDiv);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
