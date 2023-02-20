import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import { Main } from '../Main/Main';
import { Catalog } from '../Catalog/Catalog';
import { GameWrapper } from '../Game/GameWrapper';

function App(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Main />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/game/:id" element={<GameWrapper />} />
            </Route>
        </Routes>
    );
}

export default App;
