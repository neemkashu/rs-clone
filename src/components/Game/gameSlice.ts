/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppDispatch } from '../store';
import { unifyTwoDimensionalArray } from './gameUtils/helpers';
import { userNonogramData } from './gameUtils/mochas';
import {
    CellAreaState,
    ClickType,
    FieldPlace,
    fieldPlace,
    GameStatus,
    ResponseStatus,
    UserFieldData,
    UserGameData,
    UserGameDataRaw,
} from './gameUtils/types';

export const AREA_STATE_STYLES = ['crossed-square', 'empty-square', 'filled-square'];

export enum LoadStatus {
    PENDING = 'LOADING',
    FULFILLED = 'READY',
    REJECTED = 'ERROR',
}
export interface GameState {
    checkGameLoaded: LoadStatus;
    userGame: UserGameData | null;
    errorMessage: string;
}

const initialState: GameState = {
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
        changeGameStatus(state, action: PayloadAction<GameStatus>) {
            if (state.userGame) {
                state.userGame.state = action.payload;
            }
        },
        updateUserGame(state, action: PayloadAction<UserGameData | null>) {
            if (action.payload) {
                const columns = action.payload.currentUserColumns;
                const columnsUnified = unifyTwoDimensionalArray(columns);
                const rows = action.payload.currentUserRows;
                const rowsUnified = unifyTwoDimensionalArray(rows);
                console.warn('update user game!');
                state.userGame = {
                    state: action.payload.state,
                    currentUserSolution: action.payload.currentUserSolution,
                    currentTime: action.payload.currentTime,
                    currentUserColumns: columnsUnified,
                    currentUserRows: rowsUnified,
                };
            }
        },
        updateUserField(state, action: PayloadAction<UserFieldData>) {
            if (action.payload) {
                const columns = action.payload.currentUserColumns;
                const rows = action.payload.currentUserRows;
                const solution = action.payload.currentUserSolution;
                console.warn('clear user game!');
                if (state.userGame) {
                    state.userGame.currentUserColumns = columns;
                    state.userGame.currentUserRows = rows;
                    state.userGame.currentUserSolution = solution;
                }
            }
        },
        updateHintCell(
            state,
            action: PayloadAction<{
                isCrossedOut: boolean;
                indexColumn: number;
                indexRow: number;
                location: fieldPlace;
            }>
        ) {
            if (state.userGame) {
                const { indexRow, indexColumn, location } = action.payload;

                const cell =
                    location === FieldPlace.ASIDE
                        ? state.userGame.currentUserRows[indexRow][indexColumn]
                        : state.userGame.currentUserColumns[indexColumn][indexRow];
                if (cell) {
                    cell.isCrossedOut = action.payload.isCrossedOut;
                }
            }
        },
        updateAreaCell(
            state,
            action: PayloadAction<{
                clickType: ClickType;
                indexNumberRow: number;
                indexRow: number;
            }>
        ) {
            if (state.userGame) {
                const { indexRow, indexNumberRow, clickType } = action.payload;
                const cell = state.userGame.currentUserSolution[indexRow][indexNumberRow];
                const crossOrFill =
                    clickType === ClickType.MOUSE_CLICK
                        ? CellAreaState.FILLED
                        : CellAreaState.CROSSED;
                const isCellEmpty = cell === CellAreaState.EMPTY;

                state.userGame.currentUserSolution[indexRow][indexNumberRow] = isCellEmpty
                    ? crossOrFill
                    : CellAreaState.EMPTY;
            }
        },
        updateUserTime(state, action: PayloadAction<number>) {
            if (state.userGame) {
                state.userGame.currentTime = action.payload;
            }
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

export const {
    changeGameStatus,
    updateUserGame,
    updateHintCell,
    updateAreaCell,
    updateUserTime,
    updateUserField,
} = gameSlice.actions;
