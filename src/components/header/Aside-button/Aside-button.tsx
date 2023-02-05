import { useEffect } from 'react';

export function AsideButton(): JSX.Element {
    const mQuery = window.matchMedia('(max-width: 576px)');

    function handleBurgerShow(query: MediaQueryList | MediaQueryListEvent): void {
        const burgerBtn = document.body.querySelector(
            '#burgerButton'
        ) as HTMLButtonElement;
        if (query?.matches) {
            burgerBtn?.removeAttribute('hidden');
        } else {
            burgerBtn?.setAttribute('hidden', '');
        }
    }

    function handleBurgerBtnClick() {
        const aside = document.body.querySelector('#aside') as HTMLDivElement;
        aside.style.left = '0';
    }

    mQuery.addEventListener('change', handleBurgerShow);

    useEffect(() => {
        handleBurgerShow(mQuery);
    }, [mQuery]);

    return (
        <button
            type="button"
            onClick={handleBurgerBtnClick}
            id="burgerButton"
            className="btn btn-outline-secondary"
            hidden
        >
            ☰
        </button>
    );
}
