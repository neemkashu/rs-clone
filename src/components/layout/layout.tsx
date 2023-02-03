import './layout.scss';
import { Outlet } from 'react-router-dom';
import { Header } from '../header/header';
import { Aside } from '../aside/aside';
import { Footer } from '../footer/footer';

export function Layout(): JSX.Element {
    return (
        <>
            <Header />
            <main className="main-container container">
                <div className="main-container-content">
                    <Aside />
                    <section>
                        <Outlet />
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}