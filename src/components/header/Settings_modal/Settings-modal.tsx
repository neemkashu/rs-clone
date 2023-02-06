import React, { useState } from 'react';
import {
    SettingsGameContent,
    SettingsMainContent,
    SettingsViewContent,
} from './settings-modal-body';

export default function SettingsModal(): JSX.Element {
    const [isMainSettingCategory, setMainSettingsCategory] = useState(true);
    const [isGameSettingCategory, setGameSettingsCategory] = useState(false);
    const [isViewSettingCategory, setViewSettingsCategory] = useState(false);

    function hadnleSettingsCategoryPick(e: React.MouseEvent) {
        const currentBtn = e.target as HTMLButtonElement;
        if (currentBtn.id === 'settingsCategoryMain') {
            setMainSettingsCategory(true);
            setGameSettingsCategory(false);
            setViewSettingsCategory(false);
        }
        if (currentBtn.id === 'settingsCategoryGame') {
            setMainSettingsCategory(false);
            setGameSettingsCategory(true);
            setViewSettingsCategory(false);
        }
        if (currentBtn.id === 'settingsCategoryView') {
            setMainSettingsCategory(false);
            setGameSettingsCategory(false);
            setViewSettingsCategory(true);
        }
    }

    return (
        <div id="settingsModal" className="modal fade">
            <div className="modal-dialog">
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
                        <div className="container btn-group my-2">
                            <button
                                onClick={hadnleSettingsCategoryPick}
                                id="settingsCategoryMain"
                                type="button"
                                className="btn btn-outline-dark btn-sm"
                            >
                                Main
                            </button>
                            <button
                                onClick={hadnleSettingsCategoryPick}
                                id="settingsCategoryGame"
                                type="button"
                                className="btn btn-outline-dark btn-sm"
                            >
                                Game
                            </button>
                            <button
                                onClick={hadnleSettingsCategoryPick}
                                id="settingsCategoryView"
                                type="button"
                                className="btn btn-outline-dark btn-sm"
                            >
                                View
                            </button>
                        </div>
                    </div>
                    {isMainSettingCategory && <SettingsMainContent />}
                    {isGameSettingCategory && <SettingsGameContent />}
                    {isViewSettingCategory && <SettingsViewContent />}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger btn-sm">
                            Set all to default
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
