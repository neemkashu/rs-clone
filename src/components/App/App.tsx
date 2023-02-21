import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import { Main } from '../Main/Main';
import { Catalog } from '../Catalog/Catalog';
import { GameWrapper } from '../Game/GameWrapper';
import { RandomGameWrapper } from '../Game/RandomGameWrapper';

function App(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Main />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/game/:id" element={<GameWrapper />} />
                <Route path="/random-game" element={<RandomGameWrapper />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}

export default App;
