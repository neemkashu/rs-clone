import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { changedGameSettings } from '../settingsSlice';
import {
    SettingsTimingsEnum,
    GameRadioSettingsCategories,
} from '../../../../utils/enums';
import { FormCheckItem } from './FormCheckItem';

const timingsStringValuesArray = [
    SettingsTimingsEnum.NEVER,
    SettingsTimingsEnum.ONE_SEC,
    SettingsTimingsEnum.TWO_SEC,
    SettingsTimingsEnum.TEN_SEC,
    SettingsTimingsEnum.THIRTY_SEC,
    SettingsTimingsEnum.FIVE_MIN,
];

export function SettingsGameContent() {
    const { t } = useTranslation();
    const settingsGame = useAppSelector((state) => state.settings.game);
    const dispatch = useAppDispatch();

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
        const highlightCellsWithErrorState =
            category === GameRadioSettingsCategories.HIGHLIGHT
                ? item
                : settingsGame.highlightCellsWithError;
        const automaticallyCrossOutNumbersState =
            category === GameRadioSettingsCategories.HIGHLIGHT
                ? settingsGame.automaticallyCrossOutNumbers
                : item;
        dispatch(
            changedGameSettings({
                highlightCellsWithError: highlightCellsWithErrorState,
                automaticallyCrossOutNumbers: automaticallyCrossOutNumbersState,
                lastCrossedOutDigitFillsLineWithCrosses:
                    settingsGame.lastCrossedOutDigitFillsLineWithCrosses,
            })
        );
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
                            name={GameRadioSettingsCategories.HIGHLIGHT}
                            id={`higlight${item}`}
                            isChecked={item === settingsGame.highlightCellsWithError}
                            handleRadioButtonClick={() =>
                                handleRadioButtonChange(
                                    GameRadioSettingsCategories.HIGHLIGHT,
                                    item
                                )
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
                            name={GameRadioSettingsCategories.CROSS}
                            id={`cross${item}`}
                            isChecked={item === settingsGame.automaticallyCrossOutNumbers}
                            handleRadioButtonClick={() =>
                                handleRadioButtonChange(
                                    GameRadioSettingsCategories.CROSS,
                                    item
                                )
                            }
                        />
                    );
                })}
            </li>
            <li className="ms-2">
                <div className="form-check form-switch d-flex align-items-center">
                    <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckChecked"
                        style={{ position: 'relative', left: '-5px', top: '-10px' }}
                    >
                        <input
                            role="button"
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                            checked={settingsGame.lastCrossedOutDigitFillsLineWithCrosses}
                            onChange={handleCrossedOutDigitFillsLineWithCrossesInput}
                        />
                    </label>
                    <div>{t('lastCrossedOutDigitFillsLineWithCrosses')}</div>
                </div>
            </li>
        </ul>
    );
}
