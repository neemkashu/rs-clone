/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppDispatch } from '../store';
import { GameStatus, UserGameDataRaw } from './gameUtils/types';

export enum LoadStatus {
    PENDING = 'LOADING',
    FULFILLED = 'READY',
    REJECTED = 'ERROR',
}
export interface GameState {
    status: GameStatus | null;
    checkGameLoaded: LoadStatus | null;
    userGame: UserGameDataRaw | null;
}

const initialState: GameState = {
    status: null,
    checkGameLoaded: null,
    userGame: null,
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
                state.status = GameStatus.STARTED;
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
    extraReducers(builder) {
        builder.addCase('user/load/game/pending', (state, action) => {
            state.checkGameLoaded = LoadStatus.PENDING;
        });
        builder.addCase('user/load/game/fulfilled', (state, action) => {
            state.checkGameLoaded = LoadStatus.FULFILLED;
        });
    },
});

export function checkUserGameLoading() {
    return function checkUserGameLoadingThunk(dispatch: AppDispatch) {
        dispatch({ type: 'user/load/game/pending' });
    };
}
export function checkNonogramLoading() {
    return function checkNonogramLoadingThunk(dispatch: AppDispatch) {
        dispatch({ type: 'user/load/game/pending' });
    };
}
export const { firstFieldClick } = gameSlice.actions;
