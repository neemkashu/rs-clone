import './Aside.scss';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { handleAsideCloseBtnClick } from '../../utils/helpers';
import { getRandomNonogramId } from '../../api/requests';

export function Aside(): JSX.Element {
    const { t } = useTranslation();

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
                <NavLink to="/" className="btn btn-outline-primary">
                    {t('catalogMainPage')}
                </NavLink>
                <NavLink to="/catalog" className="btn btn-outline-dark">
                    {t('catalogCatalog')}
                </NavLink>
                <NavLink to="/random-game" className="btn btn-outline-dark">
                    {t('catalogRandomGame')}
                </NavLink>
                <NavLink to="/help" className="btn btn-outline-dark">
                    {t('catalogHelp')}
                </NavLink>
            </div>
        </aside>
    );
}
