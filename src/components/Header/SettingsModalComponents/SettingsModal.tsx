import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingsMainContent } from './BodyComponents/SettingsMain';
import { SettingsGameContent } from './BodyComponents/SettingsGame';
import { SettingsViewContent } from './BodyComponents/SettingsView';

export default function SettingsModal(): JSX.Element {
    const { t, i18n } = useTranslation();
    // const [category, setCategory] = useState('main');
    const [isMainSettingCategory, setMainSettingsCategory] = useState(true);
    const [isGameSettingCategory, setGameSettingsCategory] = useState(false);
    const [isViewSettingCategory, setViewSettingsCategory] = useState(false);

    // function changeCategory(e: React.MouseEvent) {
    //     const eventTarget = e.target as HTMLInputElement;
    //     setCategory(eventTarget.value);
    //     console.log('change', eventTarget.value);
    //     console.log(category);
    // }

    function hadnleSettingsCategoryPick(e: React.MouseEvent) {
        const currentInput = e.target as HTMLInputElement;
        const currentLabel = currentInput.closest('label') as HTMLLabelElement;
        const allLabels = document
            .querySelector('#settingsBtnGroup')
            ?.querySelectorAll('label');
        if (currentInput.id === 'settingsMainBtn') {
            setMainSettingsCategory(true);
            setGameSettingsCategory(false);
            setViewSettingsCategory(false);
        }
        if (currentInput.id === 'settingsGameBtn') {
            setMainSettingsCategory(false);
            setGameSettingsCategory(true);
            setViewSettingsCategory(false);
        }
        if (currentInput.id === 'settingsViewBtn') {
            setMainSettingsCategory(false);
            setGameSettingsCategory(false);
            setViewSettingsCategory(true);
        }
        allLabels?.forEach((elem) => elem.classList.remove('active'));
        currentLabel.classList.add('active');
        // changeCategory(e);
    }

    return (
        <div id="settingsModal" className="modal fade">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header d-flex flex-column px-2 py-1">
                        <div className="container d-flex justify-content-between p-0">
                            <h4 className="my-2">Setting</h4>
                            <div className="d-flex align-items-center">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    data-bs-dismiss="modal"
                                    data-bs-target="#modalSettings"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        <div
                            id="settingsBtnGroup"
                            className="container btn-group my-2"
                            role="group"
                            aria-label="Basic checkbox toggle button group"
                        >
                            <label
                                className="btn btn-outline-dark btn-sm active"
                                htmlFor="settingsMainBtn"
                            >
                                Main
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="settings"
                                    id="settingsMainBtn"
                                    autoComplete="off"
                                    onClick={hadnleSettingsCategoryPick}
                                />
                            </label>
                            <label
                                className="btn btn-outline-dark btn-sm"
                                htmlFor="settingsGameBtn"
                            >
                                Game
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="settings"
                                    id="settingsGameBtn"
                                    autoComplete="off"
                                    onClick={hadnleSettingsCategoryPick}
                                />
                            </label>
                            <label
                                className="btn btn-outline-dark btn-sm"
                                htmlFor="settingsViewBtn"
                            >
                                View
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="settings"
                                    id="settingsViewBtn"
                                    autoComplete="off"
                                    onClick={hadnleSettingsCategoryPick}
                                />
                            </label>
                        </div>
                    </div>
                    {isMainSettingCategory && <SettingsMainContent />}
                    {isGameSettingCategory && <SettingsGameContent />}
                    {isViewSettingCategory && <SettingsViewContent />}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger btn-sm">
                            {t('setAllToDefault')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
