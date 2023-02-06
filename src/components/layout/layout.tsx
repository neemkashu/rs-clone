import './Layout.scss';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/header';
import { Aside } from '../Aside/aside';
import { Footer } from '../Footer/Footer';

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
