import './aside.scss';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export function Aside(): JSX.Element {
    const mQuery = window.matchMedia('(max-width: 576px)');

    function handleResize(query: MediaQueryList | MediaQueryListEvent): void {
        const asideBtns = document.body.querySelector('#aside-btns');
        const aside = document.body.querySelector('#aside');
        if (query?.matches) {
            asideBtns?.classList.remove('btn-group-vertical');
            aside?.classList.remove('border-end');
            asideBtns?.classList.add('btn-group');
            asideBtns?.classList.add('btn-group-sm');
        } else {
            asideBtns?.classList.remove('btn-group');
            asideBtns?.classList.remove('btn-group-sm');
            asideBtns?.classList.add('btn-group-vertical');
            aside?.classList.add('border-end');
        }
    }

    mQuery.addEventListener('change', handleResize);

    useEffect(() => {
        handleResize(mQuery);
    }, [mQuery]);

    return (
        <aside id="aside" className="col-sm-4 col-md-3 col-lg-2 border-3">
            <div id="aside-btns" className="container p-2">
                <Link to="/" className="btn btn-outline-primary">
                    Main Page
                </Link>
                <Link to="/catalog" className="btn btn-outline-secondary">
                    Catalog
                </Link>
                <Link to="" className="btn btn-outline-secondary">
                    Random Game
                </Link>
                <Link to="" className="btn btn-outline-secondary">
                    How to solve?
                </Link>
                <Link to="" className="btn btn-outline-secondary">
                    Help
                </Link>
            </div>
        </aside>
    );
}
