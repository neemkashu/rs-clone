/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    NonogramSettingsMainState,
    NonogramSettingsGameState,
    NonogramSettingsViewState,
} from '../../../utils/types';
import { standardSettingsState } from '../../../utils/constants';
import { getEmptyCellSettingInCurrenLanguage } from '../../../utils/helpers';

function getInitialSettingsState(): {
    main: NonogramSettingsMainState;
    game: NonogramSettingsGameState;
    view: NonogramSettingsViewState;
} {
    const savedInLocalStorageSettings = localStorage.getItem('nonogramSettings');
    const initialSettingsState = standardSettingsState;
    if (savedInLocalStorageSettings) {
        return JSON.parse(savedInLocalStorageSettings);
    }
    return initialSettingsState;
}

const initialState: {
    main: NonogramSettingsMainState;
    game: NonogramSettingsGameState;
    view: NonogramSettingsViewState;
} = getInitialSettingsState();

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changedMainSettings(state, action: PayloadAction<NonogramSettingsMainState>) {
            const settingsMain = action.payload;
            state.main = settingsMain;
            localStorage.setItem('nonogramSettings', JSON.stringify(state));
        },
        changedGameSettings(state, action: PayloadAction<NonogramSettingsGameState>) {
            const settingsGame = action.payload;
            state.game = settingsGame;
            localStorage.setItem('nonogramSettings', JSON.stringify(state));
        },
        changedViewSettings(state, action: PayloadAction<NonogramSettingsViewState>) {
            const settingsView = action.payload;
            state.view = settingsView;
            localStorage.setItem('nonogramSettings', JSON.stringify(state));
        },
        changeSettingsToDefault(state) {
            const defaultSettings = standardSettingsState;
            state.main = defaultSettings.main;
            state.game = defaultSettings.game;
            state.view = {
                markingAnEmptyCell: getEmptyCellSettingInCurrenLanguage(),
                showGuessTime: defaultSettings.view.showGuessTime,
            };
            localStorage.setItem('nonogramSettings', JSON.stringify(state));
        },
    },
});

export const {
    changedMainSettings,
    changedGameSettings,
    changedViewSettings,
    changeSettingsToDefault,
} = settingsSlice.actions;
