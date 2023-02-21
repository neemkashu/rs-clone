/* eslint-disable import/no-cycle */
import undoable, { excludeAction, groupByActionTypes, includeAction } from 'redux-undo';
import { configureStore } from '@reduxjs/toolkit';
import { ACTIONS_TO_INCLUDE, gameSlice } from './Game/gameSlice';
import { settingsSlice } from './Header/SettingsModalComponents/settingsSlice';

export const store = configureStore({
    reducer: {
        game: undoable(gameSlice.reducer, {
            filter: includeAction(ACTIONS_TO_INCLUDE),
            // groupBy: groupByActionTypes([
            //     'game/updatePaintProcessStart',
            //     'game/updatePaintProcessEnd',
            // ]),
        }),
        settings: settingsSlice.reducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
