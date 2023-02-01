import './layout.scss';
import { Outlet } from 'react-router-dom';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

export function Layout(): JSX.Element {
    return (
        <>
            <Header />
            <div className="d-flex flex-row flex-grow-1 my-1">
                <aside className="col-2 border-top border-end border-bottom rounded-end border-3">
                    aside
                </aside>
                <Outlet />
            </div>
            <Footer />
        </>
    );
}
