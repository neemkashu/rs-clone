import './Header.scss';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AsideButton } from './AsideButton/AsideButton';
import { ColorThemeButton } from './ColorThemeButton/ColorThemeButton';
import { LanguageDropDownButton } from './LanguageButton/LanguageDropdownButton';
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
            <header className="container p-2 border-secondary  border-3">
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
                        <LanguageDropDownButton />
                    </div>
                    <div className="col d-flex justify-content-center justify-content-sm-end gap-2 py-1">
                        <a href="/" className="btn btn-success text-nowrap">
                            {t('signIn')}
                        </a>
                        <a href="/" className="btn btn-primary text-nowrap">
                            {t('signUp')}
                        </a>
                    </div>
                </div>
            </header>
        </>
    );
}
