import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../layout/layout';
import { Main } from '../../pages/main/main';
import { Catalog } from '../../pages/catalog/catalog';

function App(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Main />} />
                <Route path="/catalog" element={<Catalog />} />
            </Route>
        </Routes>
    );
}

export default App;
