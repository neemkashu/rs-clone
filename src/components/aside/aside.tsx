import './Aside.scss';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

export function Aside(): JSX.Element {
    const mQuery = window.matchMedia('(max-width: 576px)');

    function handleResize(query: MediaQueryList | MediaQueryListEvent): void {
        const aside = document.body.querySelector('#aside');
        const asideCloseBtn = document.body.querySelector(
            '#asideCloseBtn'
        ) as HTMLButtonElement;
        if (query?.matches) {
            asideCloseBtn.style.display = 'flex';
            aside?.classList.add('aside-modal');
            aside?.classList.remove('col-sm-4');
            aside?.classList.remove('col-md-3');
            aside?.classList.remove('col-lg-2');
        } else {
            asideCloseBtn.style.display = 'none';
            aside?.classList.remove('aside-modal');
            aside?.classList.add('col-sm-4');
            aside?.classList.add('col-md-3');
            aside?.classList.add('col-lg-2');
        }
    }

    function handleAsideCloseBtnClick(e: React.MouseEvent) {
        const aside = document.body.querySelector('#aside') as HTMLDivElement;
        aside.style.left = '-170px';
    }

    mQuery.addEventListener('change', handleResize);

    useEffect(() => {
        handleResize(mQuery);
    }, [mQuery]);

    return (
        <aside id="aside" className="border-3 border-end">
            <button
                type="button"
                onClick={handleAsideCloseBtnClick}
                id="asideCloseBtn"
                className="btn btn-outline-secondary my-1"
            >
                ✕
            </button>
            <div id="aside-btns" className="container p-2 btn-group-vertical">
                <Link to="/" className="btn btn-outline-primary">
                    Main Page
                </Link>
                <Link to="/catalog" className="btn btn-outline-dark">
                    Catalog
                </Link>
                <Link to="/game" className="btn btn-outline-dark">
                    Random Game
                </Link>
                <Link to="/" className="btn btn-outline-dark">
                    How to solve?
                </Link>
                <Link to="/" className="btn btn-outline-dark">
                    Help
                </Link>
            </div>
        </aside>
    );
}
