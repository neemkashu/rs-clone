import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyCellMark } from '../../../../utils/types';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { changedViewSettings } from '../settingsSlice';

export function SettingsViewContent() {
    const { t } = useTranslation();
    const settingsView = useAppSelector((state) => state.settings.view);
    const dispatch = useAppDispatch();
    const isDot =
        settingsView.markingAnEmptyCell.caption === 'точка' ||
        settingsView.markingAnEmptyCell.caption === 'dot' ||
        settingsView.markingAnEmptyCell.caption === 'punkt';

    useEffect(() => {
        dispatch(
            changedViewSettings({
                markingAnEmptyCell: {
                    caption: t(isDot ? 'dot' : 'cross'),
                    type: isDot ? EmptyCellMark.DOT : EmptyCellMark.CROSS,
                },
                showGuessTime: settingsView.showGuessTime,
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [t]);

    function returnEmptyCellStateInBoolean() {
        if (settingsView.markingAnEmptyCell.caption === t('dot')) return false;
        return true;
    }

    function handleEmptyCellSettingChange() {
        if (settingsView.markingAnEmptyCell.caption === t('dot')) {
            dispatch(
                changedViewSettings({
                    markingAnEmptyCell: {
                        caption: t('cross'),
                        type: EmptyCellMark.CROSS,
                    },
                    showGuessTime: settingsView.showGuessTime,
                })
            );
        } else {
            dispatch(
                changedViewSettings({
                    markingAnEmptyCell: {
                        caption: t('dot'),
                        type: EmptyCellMark.DOT,
                    },
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
                <div className="form-check form-switch d-flex align-items-center">
                    <label
                        className="form-check-label"
                        htmlFor="emptyCell"
                        style={{ position: 'relative', left: '-5px', top: '-10px' }}
                    >
                        <input
                            role="button"
                            className="form-check-input"
                            type="checkbox"
                            id="emptyCell"
                            onChange={handleEmptyCellSettingChange}
                            checked={returnEmptyCellStateInBoolean()}
                        />
                    </label>
                    <div>{settingsView.markingAnEmptyCell.caption}</div>
                </div>
            </li>
            <li className="ms-2">
                <div className="form-check form-switch d-flex align-items-center">
                    <label
                        className="form-check-label"
                        htmlFor="guessTime"
                        style={{ position: 'relative', left: '-5px', top: '-10px' }}
                    >
                        <input
                            role="button"
                            className="form-check-input"
                            type="checkbox"
                            id="guessTime"
                            checked={settingsView.showGuessTime}
                            onChange={handleGuessTimeChecked}
                        />
                    </label>
                    <div>{t('showGuessTime')}</div>
                </div>
            </li>
        </ul>
    );
}
