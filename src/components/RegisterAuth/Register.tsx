import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { InputItem } from './InputItem';
import {
    checkUserEmailInput,
    checkUserPasswordInput,
    checkUserRepeatPasswordInput,
} from '../../utils/helpers';
import { ErrorItem } from './ErrorItem';
import { registerWithEmailAndPassword } from '../../api/firebase';
import { changedCurrentUser } from './userSlice';

export function Register(): JSX.Element {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isUserEmailNotValid, setIsUserEmailNotValid] = useState<boolean>(false);
    const [isUserPasswordNotValid, setIsUserPasswordNotValid] = useState<boolean>(false);
    const [isUserRepeatPasswordNotValid, setIsUserRepeatPasswordNotValid] =
        useState<boolean>(false);
    const userEmailInput = useRef<HTMLInputElement>(null);
    const userPasswordInput = useRef<HTMLInputElement>(null);
    const userRepeatPasswordInput = useRef<HTMLInputElement>(null);

    function checkFormValidation() {
        const email = userEmailInput.current?.value;
        const password = userPasswordInput.current?.value;
        const repeatPassword = userRepeatPasswordInput.current?.value;
        checkUserEmailInput(email, setIsUserEmailNotValid);
        checkUserPasswordInput(password, setIsUserPasswordNotValid);
        checkUserRepeatPasswordInput(
            password,
            repeatPassword,
            setIsUserRepeatPasswordNotValid
        );

        if (
            !isUserEmailNotValid &&
            !isUserPasswordNotValid &&
            !isUserRepeatPasswordNotValid &&
            email &&
            password &&
            repeatPassword
        ) {
            registerWithEmailAndPassword(email, repeatPassword)
                .then(() => {
                    console.log('registered');
                    dispatch(changedCurrentUser(email));
                    navigate('/catalog');
                })
                .catch(() => {
                    console.log('error with register');
                });

            userEmailInput.current.value = '';
            userPasswordInput.current.value = '';
            userRepeatPasswordInput.current.value = '';
        } else console.log('form not valid');
    }

    function handleSignUpSubmit(e: React.FormEvent) {
        e.preventDefault();
        checkFormValidation();
    }

    return (
        <div className="container d-flex align-items-center justify-content-center flex-column p-2">
            <div className="d-flex flex-column align-items-center">
                <h3>{t('createAccountTitle')}</h3>
                <h6>
                    {t('alreadyHaveAccount')} <Link to="/auth">{t('signIn')}</Link>
                </h6>
            </div>
            <form
                className="d-flex flex-column align-items-center"
                onSubmit={handleSignUpSubmit}
            >
                <div className="input py-2">
                    <InputItem
                        reference={userEmailInput}
                        type="e-mail"
                        placeholder="E-mail"
                        onInput={() =>
                            checkUserEmailInput(
                                userEmailInput.current?.value,
                                setIsUserEmailNotValid
                            )
                        }
                    />
                </div>
                {isUserEmailNotValid && (
                    <ErrorItem
                        messageTitle={t('emailErrorTitle')}
                        messageBody={t('emailErrorBody')}
                    />
                )}
                <div className="input py-2">
                    <InputItem
                        reference={userPasswordInput}
                        type="password"
                        placeholder="Enter password"
                        onInput={() =>
                            checkUserPasswordInput(
                                userPasswordInput.current?.value,
                                setIsUserPasswordNotValid
                            )
                        }
                    />
                </div>
                {isUserPasswordNotValid && (
                    <ErrorItem
                        messageTitle={t('passwordErrorTitle')}
                        messageBody={t('passwordErrorBody')}
                    />
                )}
                <div className="input py-2">
                    <InputItem
                        reference={userRepeatPasswordInput}
                        type="password"
                        placeholder="Repeat password"
                        onInput={() =>
                            checkUserRepeatPasswordInput(
                                userPasswordInput.current?.value,
                                userRepeatPasswordInput.current?.value,
                                setIsUserRepeatPasswordNotValid
                            )
                        }
                    />
                </div>
                {isUserRepeatPasswordNotValid && (
                    <ErrorItem
                        messageTitle={t('repeatPasswordErrorTitle')}
                        messageBody=""
                    />
                )}
                <button type="submit" className="btn btn-primary my-2">
                    {t('signUp')}
                </button>
            </form>
        </div>
    );
}
