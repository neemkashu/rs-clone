import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { logInWithEmailAndPassword } from '../../api/firebase';
import { InputItem } from './InputItem';
import { changedCurrentUser } from './userSlice';
import { ErrorItem } from './ErrorItem';
import { Loading } from '../Loading/Loading';

export function Auth(): JSX.Element {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isInputs, setIsInputs] = useState(true);
    const [clearInputs, setClearInputs] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const userEmailInput = useRef<HTMLInputElement>(null);
    const userPasswordInput = useRef<HTMLInputElement>(null);

    function handleSignInSubmit(e: React.FormEvent) {
        e.preventDefault();
        const emailInput = userEmailInput.current?.value;
        const passwordInput = userPasswordInput.current?.value;
        if (emailInput && passwordInput) {
            setIsLoading(true);
            logInWithEmailAndPassword(emailInput, passwordInput)
                .then(() => {
                    console.log('log in');
                    dispatch(changedCurrentUser(emailInput));
                    navigate('/catalog', { replace: true });
                })
                .catch(() => {
                    console.log('error with log in');
                    setIsLoading(false);
                    setClearInputs(false);
                    setIsInputs(true);
                });
            userEmailInput.current.value = '';
            userPasswordInput.current.value = '';
            setClearInputs(true);
        } else {
            console.log('no email or input');
            setClearInputs(true);
            setIsInputs(false);
        }
    }

    return (
        <div className="container d-flex align-items-center justify-content-center flex-column p-2">
            <div className="d-flex flex-column align-items-center">
                <div className="h3">{t('enterAccountTitle')}</div>
                <div className="h6">
                    {t('dontHaveAccount')} <Link to="/register">{t('signUp')}</Link>
                </div>
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
                        placeholder={t('passwordPlaceholder')}
                    />
                </div>
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        {!isInputs && (
                            <ErrorItem messageTitle={t('noInput')} messageBody="" />
                        )}
                        {!clearInputs && (
                            <ErrorItem
                                messageTitle={t('incorrectInput')}
                                messageBody=""
                            />
                        )}
                        <button type="submit" className="btn btn-primary my-2">
                            {t('signIn')}
                        </button>
                    </>
                )}
            </form>
        </div>
    );
}
