import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../hooks';
import { logout } from '../../api/firebase';
import { loggedOutCurrentUser } from '../RegisterAuth/userSlice';

export function AuthMenu(): JSX.Element {
    const { t } = useTranslation();
    const currentUser = useAppSelector((state) => state.currentUser.user);
    const dispatch = useAppDispatch();

    function hanleSignOut() {
        logout()
            .then(() => console.log('user logged out'))
            .catch((err) => {
                console.warn(err);
                console.log('error in log out');
            });
        dispatch(loggedOutCurrentUser());
    }

    if (currentUser) {
        return (
            <div className="col d-flex justify-content-center align-items-center justify-content-sm-end gap-2 py-1">
                <div>{currentUser}</div>
                <button
                    type="button"
                    className="btn btn-outline-primary text-nowrap"
                    onClick={hanleSignOut}
                >
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
