import './layout.scss';
import { Outlet } from 'react-router-dom';
import { Header } from '../header/header';
import { Aside } from '../aside/aside';
import { Footer } from '../footer/footer';

export function Layout(): JSX.Element {
    return (
        <>
            <Header />
            <div className="main-container d-flex flex-grow-1">
                <Aside />
                <Outlet />
            </div>
            <Footer />
        </>
    );
}
