import React, { useState } from 'react';
import { SettingsMainContent } from './body-components/settings-main';
import { SettingsGameContent } from './body-components/settings-game';
import { SettingsViewContent } from './body-components/settings-view';

export default function SettingsModal(): JSX.Element {
    const [category, setCategory] = useState('main');
    const [isMainSettingCategory, setMainSettingsCategory] = useState(true);
    const [isGameSettingCategory, setGameSettingsCategory] = useState(false);
    const [isViewSettingCategory, setViewSettingsCategory] = useState(false);

    function changeCategory(e: React.ChangeEvent) {
        const eventTarget = e.target as HTMLInputElement;
        setCategory(eventTarget.value);
    }

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
                            className="container btn-group my-2"
                            role="group"
                            aria-label="Basic checkbox toggle button group"
                        >
                            {/*
                            eslint-disable-next-line jsx-a11y/label-has-associated-control
                            */}
                            <label
                                // onClick={hadnleSettingsCategoryPick}
                                className="btn btn-outline-dark btn-sm"
                                htmlFor="settingsMainBtn"
                            >
                                Main
                            </label>
                            <input
                                type="radio"
                                className="btn-check"
                                name="settings"
                                id="settingsMainBtn"
                                autoComplete="off"
                                value="main"
                                checked={category === 'main'}
                                onChange={changeCategory}
                            />
                            {/*
                            eslint-disable-next-line jsx-a11y/label-has-associated-control
                            */}
                            <label
                                // onClick={hadnleSettingsCategoryPick}
                                className="btn btn-outline-dark btn-sm"
                                htmlFor="settingsGameBtn"
                            >
                                Game
                            </label>
                            <input
                                type="radio"
                                className="btn-check"
                                name="settings"
                                id="settingsGameBtn"
                                autoComplete="off"
                                value="game"
                                checked={category === 'game'}
                                onChange={changeCategory}
                            />
                            {/*
                            eslint-disable-next-line jsx-a11y/label-has-associated-control
                            */}
                            <label
                                // onClick={hadnleSettingsCategoryPick}
                                className="btn btn-outline-dark btn-sm"
                                htmlFor="settingsViewBtn"
                            >
                                View
                            </label>
                            <input
                                type="radio"
                                className="btn-check"
                                name="settings"
                                id="settingsViewBtn"
                                autoComplete="off"
                                value="view"
                                checked={category === 'view'}
                                onChange={changeCategory}
                            />
                            {/* <button
                                onClick={hadnleSettingsCategoryPick}
                                id="settingsCategoryGame"
                                type="submit"
                                className="btn btn-outline-dark btn-sm"
                            >
                                Game
                            </button>
                            <button
                                onClick={hadnleSettingsCategoryPick}
                                id="settingsCategoryView"
                                type="submit"
                                className="btn btn-outline-dark btn-sm"
                            >
                                View
                            </button> */}
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
