import { useTranslation } from 'react-i18next';
import { Sakura } from './Sakura';

/* eslint-disable react/no-unescaped-entities */
export function Main(): JSX.Element {
    const { t } = useTranslation();
    return (
        <div className="position-relative col h-100">
            <Sakura />
            <h1>{t('mainHeader')}</h1>
            <p>{t('mainGreeting')}</p>
            <p>{t('mainAbout')}</p>
            <p>{t('mainAppeal')}</p>
        </div>
    );
}
