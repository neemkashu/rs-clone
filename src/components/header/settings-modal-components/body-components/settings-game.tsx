import { useState } from 'react';

export function SettingsGameContent() {
    return (
        <ul className="modal-body mb-0 py-1">
            <li className="ms-2">
                Highlight cells with an error:
                <div className="form-check">
                    <label className="form-check-label" htmlFor="higlightNever">
                        never
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
                        1 sec
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
                        2 sec
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
                        10 sec
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
                        30 sec
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
                        5 min
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
                Automatically cross out numbers:
                <div className="form-check">
                    <label className="form-check-label" htmlFor="crossOutNever">
                        never
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
                        1 sec
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
                        2 sec
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
                        10 sec
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
                        30 sec
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
                        5 min
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
                        The last crossed out digit fills the line with crosses
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
