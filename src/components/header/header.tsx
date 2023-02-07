import './header.scss';
import { useState, useEffect } from 'react';
import { AsideButton } from './Aside-button/Aside-button';
import { ColorThemeButton } from './Color-theme-button/Color-theme-button';
import { LanguageButton } from './Language-button/Language-button';
import { matchSmWindowSize, handleAsideAfterWindowResize } from '../../utils/helpers';
import SettingsModal from './Settings-modal-components/Settings-modal';

export function Header(): JSX.Element {
    const [isBurgerBtnVisible, setIsBurgerBtnVisible] = useState(false);

    function helperFunction(e: MediaQueryList | MediaQueryListEvent) {
        handleAsideAfterWindowResize(e, setIsBurgerBtnVisible);
    }

    useEffect(() => {
        matchSmWindowSize.addEventListener('change', helperFunction);
        handleAsideAfterWindowResize(matchSmWindowSize, setIsBurgerBtnVisible);
        return () => {
            matchSmWindowSize.removeEventListener('change', helperFunction);
        };
    }, []);

    return (
        <>
            <SettingsModal />
            <header className="container p-2 border-bottom border-start border-end border-3 rounded-bottom">
                <div className="row flex-wrap">
                    <div className="col d-flex justify-content-between justify-content-sm-start gap-2 py-1">
                        {isBurgerBtnVisible && <AsideButton />}
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            data-bs-toggle="modal"
                            data-bs-target="#settingsModal"
                        >
                            ⚙
                        </button>
                        <ColorThemeButton />
                        <LanguageButton />
                    </div>
                    <div className="col d-flex justify-content-center justify-content-sm-end gap-2 py-1">
                        <a href="/" className="btn btn-outline-success text-nowrap">
                            {' '}
                            Sign In
                        </a>
                        <a href="/" className="btn btn-outline-primary text-nowrap">
                            Sign Up
                        </a>
                    </div>
                </div>
            </header>
        </>
    );
}
