import './Aside.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { handleAsideCloseBtnClick } from '../../utils/helpers';

export function Aside(): JSX.Element {
    const { t, i18n } = useTranslation();

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
                    {t('catalogMainPage')}
                </Link>
                <Link to="/catalog" className="btn btn-outline-dark">
                    {t('catalogCatalog')}
                </Link>
                <Link to="/game" className="btn btn-outline-dark">
                    {t('catalogRandomGame')}
                </Link>
                <Link to="/" className="btn btn-outline-dark">
                    {t('catalogHelp')}
                </Link>
            </div>
        </aside>
    );
}
