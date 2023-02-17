/* eslint-disable import/no-cycle */
import undoable, { excludeAction, includeAction } from 'redux-undo';
import { configureStore } from '@reduxjs/toolkit';
import { ACTIONS_TO_INCLUDE, gameSlice } from './Game/gameSlice';

export const store = configureStore({
    reducer: {
        game: undoable(gameSlice.reducer, {
            filter: includeAction(ACTIONS_TO_INCLUDE),
        }),
        // ... reducers from other slices
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
