import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameStatus } from './gameUtils/types';

export interface GameState {
    status: GameStatus | null;
}

const initialState: GameState = {
    status: null,
};

// another slice needs different name field
export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        firstFieldClick(state, action: PayloadAction<GameStatus>) {
            // old value = action.payload
            console.warn('first Field Click!');
            if (!state.status) {
                // eslint-disable-next-line no-param-reassign
                state.status = GameStatus.INITIAL;
            }
        },
        winClick(state, action: PayloadAction<GameStatus>) {
            // old value = action.payload
            console.warn('this win Click!');
            if (state.status) {
                // eslint-disable-next-line no-param-reassign
                state.status = GameStatus.FINISHED;
            }
        },
    },
});

export const { firstFieldClick } = gameSlice.actions;
