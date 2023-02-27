import './Header.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AsideButton } from './AsideButton/AsideButton';
import { ColorThemeButton, styleEmoji } from './ColorThemeButton/ColorThemeButton';
import { LanguageDropDownButton } from './LanguageButton/LanguageDropdownButton';
import { AuthMenu } from './AuthMenu';
import { matchSmWindowSize, handleAsideAfterWindowResize } from '../../utils/helpers';
import SettingsModal from './SettingsModalComponents/SettingsModal';

export function Header(): JSX.Element {
    const { t } = useTranslation();
    const [isBurgerBtnVisible, setIsBurgerBtnVisible] = useState(false);

    useEffect(() => {
        function helperFunction(e: MediaQueryList | MediaQueryListEvent) {
            handleAsideAfterWindowResize(e, setIsBurgerBtnVisible);
        }
        matchSmWindowSize.addEventListener('change', helperFunction);
        handleAsideAfterWindowResize(matchSmWindowSize, setIsBurgerBtnVisible);
        return () => {
            matchSmWindowSize.removeEventListener('change', helperFunction);
        };
    }, []);

    return (
        <>
            <SettingsModal />
            <header className="navbar  container p-2 border-3 border-primary border-top-0">
                <div className="col d-flex justify-content-between justify-content-sm-start gap-2 py-1">
                    {isBurgerBtnVisible && <AsideButton />}
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#settingsModal"
                        style={styleEmoji}
                    >
                        ⚙
                    </button>
                    <ColorThemeButton />
                    <LanguageDropDownButton />
                </div>
                <AuthMenu />
            </header>
        </>
    );
}
