import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import { Main } from '../Main/Main';
import { Catalog } from '../Catalog/Catalog';
import { Register } from '../RegisterAuth/Register';
import { Auth } from '../RegisterAuth/Auth';
import Game from '../Game/Game';

function App(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Main />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/game" element={<Game />} />
                <Route path="/register" element={<Register />} />
                <Route path="/auth" element={<Auth />} />
            </Route>
        </Routes>
    );
}

export default App;
