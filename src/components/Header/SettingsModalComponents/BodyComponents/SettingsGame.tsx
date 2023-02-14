import { useTranslation } from 'react-i18next';
import { FormCheckItem } from './FormCheckItem';

export function SettingsGameContent() {
    const { t, i18n } = useTranslation();

    return (
        <ul className="modal-body mb-0 py-1">
            <li className="ms-2">
                {t('highlightCellsWithError')}
                <FormCheckItem
                    value={t('timingNever')}
                    name="highlightRadio"
                    // ! after merge move next line to enum in all components
                    id="higlightOneSec"
                />
                <FormCheckItem
                    value={t('timingOneSec')}
                    name="highlightRadio"
                    id="higlightTwoSec"
                />
                <FormCheckItem
                    value={t('timingTenSec')}
                    name="highlightRadio"
                    id="higlightTenSec"
                />
                <FormCheckItem
                    value={t('timingThirtySec')}
                    name="highlightRadio"
                    id="higlightThirtySec"
                />
                <FormCheckItem
                    value={t('timingFiveMin')}
                    name="highlightRadio"
                    id="higlightFiveMin"
                />
            </li>
            <li className="ms-2">
                {t('automaticallyCrossOutNumbers')}
                <FormCheckItem
                    value={t('timingNever')}
                    name="crossOutRadio"
                    id="crossNever"
                />
                <FormCheckItem
                    value={t('timingOneSec')}
                    name="crossOutRadio"
                    id="crossOneSec"
                />
                <FormCheckItem
                    value={t('timingTwoSec')}
                    name="crossOutRadio"
                    id="crossTwoSec"
                />
                <FormCheckItem
                    value={t('timingTenSec')}
                    name="crossOutRadio"
                    id="crossTenSec"
                />
                <FormCheckItem
                    value={t('timingThirtySec')}
                    name="crossOutRadio"
                    id="crossThirtySec"
                />
                <FormCheckItem
                    value={t('timingFiveMin')}
                    name="crossOutRadio"
                    id="crossFiveMin"
                />
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
                        />
                    </label>
                </div>
            </li>
        </ul>
    );
}
