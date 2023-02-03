import './header.scss';
import { useEffect } from 'react';

export function Header(): JSX.Element {
    const mQuery = window.matchMedia('(max-width: 576px)');

    function handleBurgerShow(query: MediaQueryList | MediaQueryListEvent): void {
        const burgerBtn = document.body.querySelector('#burgerButton') as HTMLButtonElement;
        if (query?.matches) {
            burgerBtn?.removeAttribute('hidden');
        } else {
            burgerBtn?.setAttribute('hidden', '');
        }
    }

    function handleBurgerBtnClick(e: React.MouseEvent) {
        const aside = document.body.querySelector('#aside') as HTMLDivElement;
        aside.style.left = '0';
    }

    mQuery.addEventListener('change', handleBurgerShow);

    useEffect(() => {
        handleBurgerShow(mQuery);
    }, [mQuery]);

    function handleLang(e: React.MouseEvent): void {
        const dropDownButton = document.body.querySelector('#dropdownLangButton');
        const allLangContainers = document.body.querySelectorAll('#dropdownMenuLang div');
        const eventTarget = e.target as HTMLDivElement;
        const properEventTarget = eventTarget.closest('div') as HTMLDivElement;
        const eventTargetContent = properEventTarget.innerHTML;
        allLangContainers.forEach((elem) => {
            elem.classList.remove('active');
        });
        properEventTarget?.classList.add('active');
        if (dropDownButton) dropDownButton.innerHTML = eventTargetContent;
        console.log('eventTargetContent', eventTargetContent);
    }

    function handleColorThemeChange(e: React.MouseEvent): void {
        const btn = e.currentTarget as HTMLButtonElement;
        const lightThemeBtnContent = btn.querySelector(
            '#lightThemeBtnContent'
        ) as HTMLDivElement;
        const darkThemeBtnContent = btn.querySelector(
            '#darkThemeBtnContent'
        ) as HTMLDivElement;
        btn.classList.toggle('btn-warning');
        btn.classList.toggle('btn-dark');
        console.log(btn);
        lightThemeBtnContent.toggleAttribute('hidden');
        darkThemeBtnContent.toggleAttribute('hidden');
    }

    return (
        <header className="container p-2 border-bottom border-start border-end border-3 rounded-bottom">
            <div className="row flex-wrap">
                <div className="col d-flex justify-content-between justify-content-sm-start gap-2 py-1">
                    <button
                        onClick={handleBurgerBtnClick}
                        id="burgerButton"
                        className="btn btn-outline-secondary"
                        hidden
                    >
                        ☰
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                    >
                        ⚙
                    </button>
                    <button onClick={handleColorThemeChange} className="btn btn-warning">
                        <div id="lightThemeBtnContent" className=" text-center">
                            ☀
                        </div>
                        <div id="darkThemeBtnContent" hidden className=" text-center">
                            🌒
                        </div>
                    </button>
                    <div className="dropdown d-flex align-items-center">
                        <button
                            className="btn btn-outline-secondary dropdown-toggle"
                            type="button"
                            id="dropdownLangButton"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0,0 25,15"
                            >
                                <rect width="25" height="15" fill="#00247d" />
                                <path
                                    d="M 0,0 L 25,15 M 25,0 L 0,15"
                                    stroke="#fff"
                                    strokeWidth="3"
                                />
                                <path
                                    d="M 12.5,0 V 15 M 0,7.5 H 25"
                                    stroke="#fff"
                                    strokeWidth="5"
                                />
                                <path
                                    d="M 12.5,0 V 15 M 0,7.5 H 25"
                                    stroke="#cf142b"
                                    strokeWidth="3"
                                />
                            </svg>
                        </button>
                        <div
                            id="dropdownMenuLang"
                            className="dropdown-menu"
                            aria-labelledby="dropdownLangButton"
                        >
                            <div
                                onClick={handleLang}
                                id="dropdownEnLang"
                                className="dropdown-item active"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    viewBox="0,0 25,15"
                                >
                                    <rect width="25" height="15" fill="#00247d" />
                                    <path
                                        d="M 0,0 L 25,15 M 25,0 L 0,15"
                                        stroke="#fff"
                                        strokeWidth="3"
                                    />
                                    <path
                                        d="M 12.5,0 V 15 M 0,7.5 H 25"
                                        stroke="#fff"
                                        strokeWidth="5"
                                    />
                                    <path
                                        d="M 12.5,0 V 15 M 0,7.5 H 25"
                                        stroke="#cf142b"
                                        strokeWidth="3"
                                    />
                                </svg>
                            </div>
                            <div
                                onClick={handleLang}
                                id="dropdownRuLang"
                                className="dropdown-item"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 9 6"
                                    width="25"
                                    height="25"
                                >
                                    <rect fill="#fff" width="9" height="3" />
                                    <rect fill="#d52b1e" y="3" width="9" height="3" />
                                    <rect fill="#0039a6" y="2" width="9" height="2" />
                                </svg>
                            </div>
                            <div
                                onClick={handleLang}
                                id="dropdownDeLang"
                                className="dropdown-item"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    viewBox="0 0 5 3"
                                >
                                    <desc>Flag of Germany</desc>
                                    <rect
                                        id="black_stripe"
                                        width="5"
                                        height="3"
                                        y="0"
                                        x="0"
                                        fill="#000"
                                    />
                                    <rect
                                        id="red_stripe"
                                        width="5"
                                        height="2"
                                        y="1"
                                        x="0"
                                        fill="#D00"
                                    />
                                    <rect
                                        id="gold_stripe"
                                        width="5"
                                        height="1"
                                        y="2"
                                        x="0"
                                        fill="#FFCE00"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col d-flex justify-content-center justify-content-sm-end gap-2 py-1">
                    <a href="#" className="btn btn-outline-success text-nowrap">
                        {' '}
                        Sign In
                    </a>
                    <a href="#" className="btn btn-outline-primary text-nowrap">
                        Sign Up
                    </a>
                </div>
            </div>
        </header>
    );
}
