import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { SettingsMainContent } from './BodyComponents/SettingsMain';
import { SettingsGameContent } from './BodyComponents/SettingsGame';
import { SettingsViewContent } from './BodyComponents/SettingsView';
import { SettingsCategoryItem } from './SettingsCategoryItem';
import { SettingsCategoryEnum } from '../../../utils/enums';

export default function SettingsModal(): JSX.Element {
    const [selectedCategory, setSelectedCategory] = useState<SettingsCategoryEnum>(
        SettingsCategoryEnum.NAME_MAIN
    );
    const { t } = useTranslation();
    const isMainCategorySelected = selectedCategory === SettingsCategoryEnum.NAME_MAIN;
    const isGameCategorySelected = selectedCategory === SettingsCategoryEnum.NAME_GAME;
    const isViewCategorySelected = selectedCategory === SettingsCategoryEnum.NAME_VIEW;
    const categoryNames = Object.values(SettingsCategoryEnum);

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
                            {categoryNames.map((item, index) => {
                                return (
                                    <SettingsCategoryItem
                                        key={item}
                                        name={item}
                                        id={item}
                                        active={selectedCategory === item ? 'active' : ''}
                                        handleSettingsCategorySelect={() =>
                                            setSelectedCategory(item)
                                        }
                                    />
                                );
                            })}
                        </div>
                    </div>
                    {isMainCategorySelected && <SettingsMainContent />}
                    {isGameCategorySelected && <SettingsGameContent />}
                    {isViewCategorySelected && <SettingsViewContent />}
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
