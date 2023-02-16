/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import { gameSlice } from './Game/gameSlice';
import { settingsSlice } from './Header/SettingsModalComponents/settingsSlice';

export const store = configureStore({
    reducer: {
        game: gameSlice.reducer,
        settings: settingsSlice.reducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
