import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { logInWithEmailAndPassword } from '../../api/firebase';

export function Auth(): JSX.Element {
    const { t } = useTranslation();

    function handleSignInSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Здесь будет вызов асинхронной функции,
        // которая будет делать запрос и проверять логин и пароль
        logInWithEmailAndPassword('example@test.com', 'i love nonograms').then(
            (token) => {
                console.log(token);
                /* save token to storage */
                /* token can be null if email and password don't match */
            }
        );
    }

    return (
        <div className="container d-flex align-items-center justify-content-center flex-column p-2">
            <div className="d-flex flex-column align-items-center">
                <h3>{t('enterAccountTitle')}</h3>
                <h6>
                    {t('dontHaveAccount')} <Link to="/register">{t('signUp')}</Link>
                </h6>
            </div>
            <form
                className="d-flex flex-column align-items-center"
                onSubmit={handleSignInSubmit}
            >
                <div className="input py-2">
                    <input
                        type="text"
                        className="form-control my-1"
                        placeholder="Login or e-mail"
                        aria-label="Login or e-mail"
                        autoComplete="on"
                    />
                </div>
                <div className="input py-2">
                    <input
                        type="text"
                        className="form-control my-1"
                        placeholder="Password"
                        aria-label="Password"
                        autoComplete="on"
                    />
                </div>
                <button type="submit" className="btn btn-primary my-2">
                    {t('signIn')}
                </button>
            </form>
        </div>
    );
}
