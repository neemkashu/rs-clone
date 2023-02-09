/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppDispatch } from '../store';
import { userNonogramData } from './gameUtils/mochas';
import {
    GameStatus,
    ResponseStatus,
    UserGameData,
    UserGameDataRaw,
} from './gameUtils/types';

export enum LoadStatus {
    PENDING = 'LOADING',
    FULFILLED = 'READY',
    REJECTED = 'ERROR',
}
export interface GameState {
    status: GameStatus | null;
    checkGameLoaded: LoadStatus;
    userGame: UserGameData | null;
    errorMessage: string;
}

const initialState: GameState = {
    status: null,
    checkGameLoaded: LoadStatus.PENDING,
    userGame: null,
    errorMessage: '',
};

async function saveUserGameState(
    id: string,
    userGameData: UserGameData
): Promise<ResponseStatus> {
    // mocha before implementing request
    return new Promise((resolve, reject) => {
        const reponse = 'ok';
        resolve(ResponseStatus.SUCCESS);
        reject(ResponseStatus.ERROR);
    });
}

export const saveUserGame = createAsyncThunk(
    'user/save/game',
    async ({ id, userGameData }: { id: string; userGameData: UserGameData }) => {
        const response = await saveUserGameState(id, userGameData);
        return response;
    }
);
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
        pauseGame(state, action: PayloadAction<GameStatus>) {
            // old value = action.payload
            console.warn('pause!');
            state.status = null;
        },
        winClick(state, action: PayloadAction<GameStatus>) {
            // old value = action.payload
            console.warn('this win Click!');
            if (state.status) {
                // eslint-disable-next-line no-param-reassign
                state.status = GameStatus.FINISHED;
            }
        },
        updateUserGame(state, action: PayloadAction<UserGameData>) {
            console.warn('update user game!');
            state.userGame = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(saveUserGame.pending, (state, action) => {
            state.checkGameLoaded = LoadStatus.PENDING;
        });
        builder.addCase(saveUserGame.fulfilled, (state, action) => {
            state.checkGameLoaded = LoadStatus.FULFILLED;
        });
        builder.addCase(saveUserGame.rejected, (state, action) => {
            state.checkGameLoaded = LoadStatus.REJECTED;
            state.errorMessage = action.error.message ?? 'error when saving game';
        });
    },
});

export const { firstFieldClick, winClick, pauseGame, updateUserGame } = gameSlice.actions;
