import { useTranslation } from 'react-i18next';
import { Guide } from '../Guide/Guide';

/* eslint-disable react/no-unescaped-entities */
export function Main(): JSX.Element {
    const { t } = useTranslation();
    return (
        <div className="d-flex flex-wrap flex-column">
            <div>
                <h1>{t('mainHeader')}</h1>
                <p>{t('mainGreeting')}</p>
                <p>{t('mainAbout')}</p>
                <p>{t('mainAppeal')}</p>
            </div>
        </div>
    );
}
