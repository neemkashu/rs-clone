import './Layout.scss';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Aside } from '../Aside/Aside';
import { Footer } from '../Footer/Footer';

export function Layout(): JSX.Element {
    return (
        <>
            <Header />
            <main className="main-container container">
                <div className="main-container-content">
                    <Aside />
                    <section className="ps-2 d-grid flex-grow-1 section-container overflow-auto">
                        <Outlet />
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
