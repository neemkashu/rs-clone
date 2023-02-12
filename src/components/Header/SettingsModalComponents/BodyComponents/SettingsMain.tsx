import { useTranslation } from 'react-i18next';

export function SettingsMainContent() {
    const { t, i18n } = useTranslation();

    return (
        <ul className="modal-body mb-0 py-1">
            <li className="ms-2">
                <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                        {t('showNonogramsTitlesBeforeSolving')}
                        <input
                            role="button"
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                        />
                    </label>
                </div>
            </li>
            <li className="ms-2">
                <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                        {t('showNonogramsThumbnailsBeforeSolving')}
                        <input
                            role="button"
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                        />
                    </label>
                </div>
            </li>
        </ul>
    );
}
