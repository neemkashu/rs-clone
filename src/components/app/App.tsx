import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import { Main } from '../../pages/main/main';
import { Catalog } from '../../pages/catalog/catalog';
import Game from '../Game/Game';

function App(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Main />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/game" element={<Game />} />
            </Route>
        </Routes>
    );
}

export default App;
