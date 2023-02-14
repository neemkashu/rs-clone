import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { changedGameSettings } from '../settingsSlice';
import { SettingsTimingsEnum } from '../../../../utils/enums';
import { FormCheckItem } from './FormCheckItem';

export function SettingsGameContent() {
    const { t } = useTranslation();
    const settingsGame = useAppSelector((state) => state.settings.game);
    const dispatch = useAppDispatch();
    const timingsStringValuesArray = [
        SettingsTimingsEnum.NEVER,
        SettingsTimingsEnum.ONE_SEC,
        SettingsTimingsEnum.TWO_SEC,
        SettingsTimingsEnum.TEN_SEC,
        SettingsTimingsEnum.THIRTY_SEC,
        SettingsTimingsEnum.FIVE_MIN,
    ];

    function handleCrossedOutDigitFillsLineWithCrossesInput() {
        dispatch(
            changedGameSettings({
                highlightCellsWithError: settingsGame.highlightCellsWithError,
                automaticallyCrossOutNumbers: settingsGame.automaticallyCrossOutNumbers,
                lastCrossedOutDigitFillsLineWithCrosses:
                    !settingsGame.lastCrossedOutDigitFillsLineWithCrosses,
            })
        );
    }

    function handleRadioButtonChange(category: string, item: SettingsTimingsEnum) {
        if (category === 'highlightRadio') {
            dispatch(
                changedGameSettings({
                    highlightCellsWithError: item,
                    automaticallyCrossOutNumbers:
                        settingsGame.automaticallyCrossOutNumbers,
                    lastCrossedOutDigitFillsLineWithCrosses: true,
                })
            );
        } else {
            dispatch(
                changedGameSettings({
                    highlightCellsWithError: settingsGame.highlightCellsWithError,
                    automaticallyCrossOutNumbers: item,
                    lastCrossedOutDigitFillsLineWithCrosses: true,
                })
            );
        }
    }

    return (
        <ul className="modal-body mb-0 py-1">
            <li className="ms-2">
                {t('highlightCellsWithError')}
                {timingsStringValuesArray.map((item) => {
                    return (
                        <FormCheckItem
                            key={`${item}-highlightKey`}
                            value={t(`timing${item}`)}
                            name="highlightRadio"
                            id={`higlight${item}`}
                            isChecked={item === settingsGame.highlightCellsWithError}
                            handleRadioButtonClick={() =>
                                handleRadioButtonChange('highlightRadio', item)
                            }
                        />
                    );
                })}
            </li>
            <li className="ms-2">
                {t('automaticallyCrossOutNumbers')}
                {timingsStringValuesArray.map((item) => {
                    return (
                        <FormCheckItem
                            key={`${item}-crossOutKey`}
                            value={t(`timing${item}`)}
                            name="crossOutRadio"
                            id={`cross${item}`}
                            isChecked={item === settingsGame.automaticallyCrossOutNumbers}
                            handleRadioButtonClick={() =>
                                handleRadioButtonChange('crossOutRadio', item)
                            }
                        />
                    );
                })}
            </li>
            <li className="ms-2">
                <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                        {t('lastCrossedOutDigitFillsLineWithCrosses')}
                        <input
                            role="button"
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                            checked={settingsGame.lastCrossedOutDigitFillsLineWithCrosses}
                            onChange={handleCrossedOutDigitFillsLineWithCrossesInput}
                        />
                    </label>
                </div>
            </li>
        </ul>
    );
}
