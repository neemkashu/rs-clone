import './Main.scss';
import { useTranslation } from 'react-i18next';

/* eslint-disable react/no-unescaped-entities */
export function Main(): JSX.Element {
    const { t } = useTranslation();
    return (
        <div className="position-relative">
            <div className="sakura">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>

            <h1>{t('mainHeader')}</h1>
            <p>{t('mainGreeting')}</p>
            <p>{t('mainAbout')}</p>
            <p>{t('mainAppeal')}</p>
        </div>
    );
}
