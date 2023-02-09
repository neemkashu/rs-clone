import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import { store } from './components/store';

const rootDiv = document.getElementById('root');
if (!rootDiv) {
    throw new Error('root is not found!');
}

const root = ReactDOM.createRoot(rootDiv);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
