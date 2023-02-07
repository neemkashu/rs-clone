import './app.scss';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import { Main } from '../Main/Main';
import { Catalog } from '../Catalog/Catalog';
import Game from '../Game/Game';

function App(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Main />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/game" element={<Game />} />
                <Route path="/game" element={<Catalog />} />
            </Route>
        </Routes>
    );
}

export default App;
