import { useTranslation } from 'react-i18next';
import { EmptyCellStates } from '../../../../utils/enums';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { changedViewSettings } from '../settingsSlice';

export function SettingsViewContent() {
    const { t } = useTranslation();
    const settingsView = useAppSelector((state) => state.settings.view);
    const dispatch = useAppDispatch();

    function returnEmptyCellStateInBoolean() {
        if (settingsView.markingAnEmptyCell === 'dot') return false;
        return true;
    }

    function handleEmptyCellSettingChange() {
        if (settingsView.markingAnEmptyCell === 'dot') {
            dispatch(
                changedViewSettings({
                    markingAnEmptyCell: EmptyCellStates.CROSS,
                    showGuessTime: settingsView.showGuessTime,
                })
            );
            console.log('dot');
        } else {
            dispatch(
                changedViewSettings({
                    markingAnEmptyCell: EmptyCellStates.DOT,
                    showGuessTime: settingsView.showGuessTime,
                })
            );
        }
    }

    function handleGuessTimeChecked() {
        dispatch(
            changedViewSettings({
                markingAnEmptyCell: settingsView.markingAnEmptyCell,
                showGuessTime: !settingsView.showGuessTime,
            })
        );
    }

    return (
        <ul className="modal-body mb-0 py-1">
            <li className="ms-2">
                {t('markingEmptyCell')}
                <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="emptyCell">
                        {settingsView.markingAnEmptyCell}
                        <input
                            role="button"
                            className="form-check-input"
                            type="checkbox"
                            id="emptyCell"
                            onChange={handleEmptyCellSettingChange}
                            checked={returnEmptyCellStateInBoolean()}
                        />
                    </label>
                </div>
            </li>
            <li className="ms-2">
                <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="guessTime">
                        {t('showGuessTime')}
                        <input
                            role="button"
                            className="form-check-input"
                            type="checkbox"
                            id="guessTime"
                            checked={settingsView.showGuessTime}
                            onChange={handleGuessTimeChecked}
                        />
                    </label>
                </div>
            </li>
        </ul>
    );
}
