import { useTranslation } from 'react-i18next';

export function SettingsGameContent() {
    const { t, i18n } = useTranslation();

    return (
        <ul className="modal-body mb-0 py-1">
            <li className="ms-2">
                {t('highlightCellsWithError')}
                <div className="form-check">
                    <label className="form-check-label" htmlFor="higlightNever">
                        {t('timingNever')}
                        <input
                            role="button"
                            className="form-check-input"
                            type="radio"
                            name="highlightRadio"
                            id="higlightNever"
                        />
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label" htmlFor="higlight1Sec">
                        {t('timingOneSec')}
                        <input
                            role="button"
                            className="form-check-input"
                            type="radio"
                            name="highlightRadio"
                            id="higlight1Sec"
                        />
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label" htmlFor="higlight2Sec">
                        {t('timingTwoSec')}
                        <input
                            role="button"
                            className="form-check-input"
                            type="radio"
                            name="highlightRadio"
                            id="higlight2Sec"
                        />
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label" htmlFor="higlight10Sec">
                        {t('timingTenSec')}
                        <input
                            role="button"
                            className="form-check-input"
                            type="radio"
                            name="highlightRadio"
                            id="higlight10Sec"
                        />
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label" htmlFor="higlight30Sec">
                        {t('timingThirtySec')}
                        <input
                            role="button"
                            className="form-check-input"
                            type="radio"
                            name="highlightRadio"
                            id="higlight30Sec"
                        />
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label" htmlFor="higlight5min">
                        {t('timingFiveMin')}
                        <input
                            role="button"
                            className="form-check-input"
                            type="radio"
                            name="highlightRadio"
                            id="higlight5min"
                        />
                    </label>
                </div>
            </li>
            <li className="ms-2">
                {t('automaticallyCrossOutNumbers')}
                <div className="form-check">
                    <label className="form-check-label" htmlFor="crossOutNever">
                        {t('timingNever')}
                        <input
                            role="button"
                            className="form-check-input"
                            type="radio"
                            name="crossOutRadio"
                            id="crossOutNever"
                        />
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label" htmlFor="crossOut1Sec">
                        {t('timingOneSec')}
                        <input
                            role="button"
                            className="form-check-input"
                            type="radio"
                            name="crossOutRadio"
                            id="crossOut1Sec"
                        />
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label" htmlFor="crossOut2Sec">
                        {t('timingTwoSec')}
                        <input
                            role="button"
                            className="form-check-input"
                            type="radio"
                            name="crossOutRadio"
                            id="crossOut2Sec"
                        />
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label" htmlFor="crossOut10Sec">
                        {t('timingTenSec')}
                        <input
                            role="button"
                            className="form-check-input"
                            type="radio"
                            name="crossOutRadio"
                            id="crossOut10Sec"
                        />
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label" htmlFor="crossOut30Sec">
                        {t('timingThirtySec')}
                        <input
                            role="button"
                            className="form-check-input"
                            type="radio"
                            name="crossOutRadio"
                            id="crossOut30Sec"
                        />
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label" htmlFor="crossOut5min">
                        {t('timingFiveMin')}
                        <input
                            role="button"
                            className="form-check-input"
                            type="radio"
                            name="crossOutRadio"
                            id="crossOut5min"
                        />
                    </label>
                </div>
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
