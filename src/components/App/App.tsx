import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import { Main } from '../Main/Main';
import { Catalog } from '../Catalog/Catalog';
import { GameWrapper } from '../Game/GameWrapper';
import { RandomGameWrapper } from '../Game/RandomGameWrapper';
import { Register } from '../RegisterAuth/Register';
import { Auth } from '../RegisterAuth/Auth';
import Game from '../Game/Game';

function App(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Main />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/game/:id" element={<GameWrapper />} />
                <Route path="/random-game" element={<RandomGameWrapper />} />
                <Route path="/register" element={<Register />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}

export default App;
