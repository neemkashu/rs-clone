/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import { gameSlice } from './Game/gameSlice';
import { settingsSlice } from './Header/SettingsModalComponents/settingsSlice';
import { userSlice } from './RegisterAuth/userSlice';

export const store = configureStore({
    reducer: {
        game: gameSlice.reducer,
        settings: settingsSlice.reducer,
        currentUser: userSlice.reducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
