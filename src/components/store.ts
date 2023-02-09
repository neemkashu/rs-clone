/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import { gameSlice } from './Game/gameSlice';

export const store = configureStore({
    reducer: {
        game: gameSlice.reducer,
        // ... reducers from other slices
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
