/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsTimingsEnum } from '../../../utils/enums';
import {
    NonogramSettingsMainState,
    NonogramSettingsGameState,
    NonogramSettingsViewState,
} from '../../../utils/types';
import { getEmptyCellSettingInCurrenLanguage } from '../../../utils/helpers';

function getInitialSettingsState(): {
    main: NonogramSettingsMainState;
    game: NonogramSettingsGameState;
    view: NonogramSettingsViewState;
} {
    const savedInLocalStorageSettings = localStorage.getItem('nonogramSettings');
    const initialSettingsState = {
        main: {
            showNonogramTitlesBeforeSolving: true,
            showNonogramThumbnailsBeforeSolving: true,
        },
        game: {
            highlightCellsWithError: SettingsTimingsEnum.NEVER,
            automaticallyCrossOutNumbers: SettingsTimingsEnum.ONE_SEC,
            lastCrossedOutDigitFillsLineWithCrosses: true,
        },
        view: {
            markingAnEmptyCell: getEmptyCellSettingInCurrenLanguage(),
            showGuessTime: true,
        },
    };
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
    },
});

export const { changedMainSettings, changedGameSettings, changedViewSettings } =
    settingsSlice.actions;