import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../hooks';

export function AuthMenu(): JSX.Element {
    const { t } = useTranslation();
    const settingsMain = useAppSelector((state) => state.settings.main);

    if (loggedInUser) {
        return (
            <div className="col d-flex justify-content-center justify-content-sm-end gap-2 py-1">
                <div>{loggedInUser}</div>
                <button type="button" className="btn btn-outline-primary text-nowrap">
                    {t('signOut')}
                </button>
            </div>
        );
    }

    return (
        <div className="col d-flex justify-content-center justify-content-sm-end gap-2 py-1">
            <Link to="/auth" className="btn btn-outline-success text-nowrap">
                {t('signIn')}
            </Link>
            <Link to="/register" className="btn btn-outline-primary text-nowrap">
                {t('signUp')}
            </Link>
        </div>
    );
}
