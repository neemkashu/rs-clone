import { useState } from 'react';

export function SettingsViewContent() {
    const [emptyCellSettingState, setEmptyCellSettingState] = useState<string>('dot');

    function handleEmptyCellSetting() {
        if (emptyCellSettingState === 'dot') {
            setEmptyCellSettingState('cross');
        } else {
            setEmptyCellSettingState('dot');
        }
    }
    return (
        <ul className="modal-body mb-0 py-1">
            <li className="ms-2">
                Marking an empty cell:
                <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="emptyCell">
                        {emptyCellSettingState}
                        <input
                            role="button"
                            onClick={handleEmptyCellSetting}
                            className="form-check-input"
                            type="checkbox"
                            id="emptyCell"
                        />
                    </label>
                </div>
            </li>
            <li className="ms-2">
                <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="guessTime">
                        Show guess time
                        <input
                            role="button"
                            className="form-check-input"
                            type="checkbox"
                            id="guessTime"
                        />
                    </label>
                </div>
            </li>
        </ul>
    );
}
