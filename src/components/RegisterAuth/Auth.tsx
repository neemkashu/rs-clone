import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { logInWithEmailAndPassword } from '../../api/firebase';
import { InputItem } from './InputItem';

export function Auth(): JSX.Element {
    const { t } = useTranslation();
    const userEmailInput = useRef<HTMLInputElement>(null);
    const userPasswordInput = useRef<HTMLInputElement>(null);

    function handleSignInSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Здесь будет вызов асинхронной функции,
        // которая будет делать запрос и проверять логин и пароль
        const emailInput = userEmailInput.current?.value;
        const passwordInput = userPasswordInput.current?.value;
        if (emailInput && passwordInput) {
            logInWithEmailAndPassword(userEmailInput?.current?.value, passwordInput)
                .catch((err) => {
                    // unsuccessful log in
                    console.log(err);
                })
                .then(() => {
                    // successful log in
                    console.log('log in');
                });
        } else {
            console.log('no email or input');
        }
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
                    <InputItem
                        reference={userEmailInput}
                        type="e-mail"
                        placeholder="E-mail"
                    />
                </div>
                <div className="input py-2">
                    <InputItem
                        reference={userPasswordInput}
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <button type="submit" className="btn btn-primary my-2">
                    {t('signIn')}
                </button>
            </form>
        </div>
    );
}
