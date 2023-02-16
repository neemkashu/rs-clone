import { useTranslation } from 'react-i18next';
import { NonogramSettingsMainState } from '../../../../utils/types';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { changedMainSettings } from '../settingsSlice';

export function SettingsMainContent() {
    const { t } = useTranslation();
    const settingsMain = useAppSelector((state) => state.settings.main);
    const dispatch = useAppDispatch();

    const handleChange = (isTitles: boolean) => {
        const { showNonogramTitlesBeforeSolving, showNonogramThumbnailsBeforeSolving } =
            settingsMain;
        const showNonogramTitlesBeforeSolvingState = isTitles
            ? !showNonogramTitlesBeforeSolving
            : showNonogramTitlesBeforeSolving;
        const showNonogramThumbnailsBeforeSolvingState = isTitles
            ? showNonogramThumbnailsBeforeSolving
            : !showNonogramThumbnailsBeforeSolving;
        dispatch(
            changedMainSettings({
                showNonogramTitlesBeforeSolving: showNonogramTitlesBeforeSolvingState,
                showNonogramThumbnailsBeforeSolving:
                    showNonogramThumbnailsBeforeSolvingState,
            })
        );
    };

    function handleNonogramTitlesSettingChange() {
        handleChange(true);
    }

    function handleNonogramThumbnailsSettingChange() {
        handleChange(false);
    }

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
                            checked={settingsMain.showNonogramTitlesBeforeSolving}
                            onChange={handleNonogramTitlesSettingChange}
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
                            checked={settingsMain.showNonogramThumbnailsBeforeSolving}
                            onChange={handleNonogramThumbnailsSettingChange}
                        />
                    </label>
                </div>
            </li>
        </ul>
    );
}
