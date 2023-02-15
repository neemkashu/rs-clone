/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { getGameState } from './api/getGameState';
import { getNonogramByID } from './api/getNonogramByID';
import { sendGameToServer } from './api/saveGame';
import { makeInitialSaveGame, unifyTwoDimensionalArray } from './gameUtils/helpers';
import {
    CellAreaState,
    ClickType,
    FieldPlace,
    fieldPlace,
    GameStatus,
    NonogramRaw,
    ResponseStatus,
    UserFieldData,
    UserGameData,
} from './gameUtils/types';

export const AREA_STATE_STYLES = ['crossed-square', 'empty-square', 'filled-square'];

export enum LoadStatus {
    PENDING = 'LOADING',
    FULFILLED = 'READY',
    REJECTED = 'ERROR',
}
export interface GameState {
    loadNonogramStatus: LoadStatus;
    userGame: UserGameData | null;
    currentNonogram: NonogramRaw | null;
    errorMessage: string;
    incorrectCells: UserFieldData['currentUserSolution'] | null;
    timers: ReturnType<typeof setTimeout>[];
}

const initialState: GameState = {
    loadNonogramStatus: LoadStatus.PENDING,
    userGame: null,
    currentNonogram: null,
    errorMessage: '',
    incorrectCells: null,
    timers: [],
};

export const loadNonogramByID = createAsyncThunk(
    'game/load/nonogram',
    async (id: string) => {
        const nonogram = await getNonogramByID(id);
        const userGame = await getGameState(id);
        return { nonogram, userGame };
    }
);
export const saveUserGameByID = createAsyncThunk(
    'game/save',
    async ({ id, userGame }: { id: string; userGame: UserGameData | null }) => {
        if (userGame) {
            const reponse = await sendGameToServer(userGame, id);
            return reponse;
        }
        return ResponseStatus.ERROR;
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
                console.warn('update user game!', rowsUnified);
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
        updateMistakeData(
            state,
            action: PayloadAction<{
                indexRow: number;
                indexNumberRow: number;
                isCorrect: boolean;
            }>
        ) {
            const { indexRow, indexNumberRow, isCorrect } = action.payload;
            if (state.incorrectCells) {
                state.incorrectCells[indexRow][indexNumberRow] = isCorrect ? 1 : null;
            }
        },
        clearMistakes(state, action: PayloadAction) {
            if (state) {
                const nonogram = state.currentNonogram?.nonogram.goal;
                state.incorrectCells = nonogram ?? null;
            }
        },
        addTimerId(state, action: PayloadAction<ReturnType<typeof setTimeout>>) {
            state.timers.push(action.payload);
        },
        clearTimers(state, action: PayloadAction) {
            state.timers.forEach((timer) => clearTimeout(timer));
            state.timers = [];
        },
    },
    extraReducers(builder) {
        builder.addCase(loadNonogramByID.pending, (state, action) => {
            state.loadNonogramStatus = LoadStatus.PENDING;
        });
        builder.addCase(loadNonogramByID.fulfilled, (state, action) => {
            const { nonogram, userGame } = action.payload;
            state.loadNonogramStatus = LoadStatus.FULFILLED;
            state.currentNonogram = nonogram;
            if (nonogram) {
                state.incorrectCells = nonogram.nonogram.goal;
            }
            const gameToSet = makeInitialSaveGame(nonogram);
            if (userGame) {
                state.userGame = userGame.data.currentGame;
            } else {
                state.userGame = gameToSet;
            }
        });
        builder.addCase(loadNonogramByID.rejected, (state, action) => {
            state.loadNonogramStatus = LoadStatus.REJECTED;
            state.errorMessage = action.error.message ?? 'error when loading nonogram';
        });

        builder.addCase(saveUserGameByID.pending, (state, action) => {
            state.loadNonogramStatus = LoadStatus.PENDING;
        });
        builder.addCase(saveUserGameByID.fulfilled, (state, action) => {
            state.loadNonogramStatus = LoadStatus.FULFILLED;
        });
        builder.addCase(saveUserGameByID.rejected, (state, action) => {
            state.loadNonogramStatus = LoadStatus.REJECTED;
            state.errorMessage = action.error.message ?? 'error when loading nonogram';
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
    clearMistakes,
    updateMistakeData,
    addTimerId,
    clearTimers,
} = gameSlice.actions;
