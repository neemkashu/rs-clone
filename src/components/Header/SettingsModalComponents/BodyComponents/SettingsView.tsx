import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { changedViewSettings } from '../settingsSlice';

export function SettingsViewContent() {
    const { t } = useTranslation();
    const settingsView = useAppSelector((state) => state.settings.view);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (
            settingsView.markingAnEmptyCell === 'точка' ||
            settingsView.markingAnEmptyCell === 'dot' ||
            settingsView.markingAnEmptyCell === 'punkt'
        ) {
            dispatch(
                changedViewSettings({
                    markingAnEmptyCell: t('dot'),
                    showGuessTime: settingsView.showGuessTime,
                })
            );
        } else {
            dispatch(
                changedViewSettings({
                    markingAnEmptyCell: t('cross'),
                    showGuessTime: settingsView.showGuessTime,
                })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [t]);

    function returnEmptyCellStateInBoolean() {
        if (settingsView.markingAnEmptyCell === t('dot')) return false;
        return true;
    }

    function handleEmptyCellSettingChange() {
        if (settingsView.markingAnEmptyCell === t('dot')) {
            dispatch(
                changedViewSettings({
                    markingAnEmptyCell: t('cross'),
                    showGuessTime: settingsView.showGuessTime,
                })
            );
        } else {
            dispatch(
                changedViewSettings({
                    markingAnEmptyCell: t('dot'),
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
