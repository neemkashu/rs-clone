/* eslint-disable no-param-reassign */
import {
    createAction,
    createAsyncThunk,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import undoable from 'redux-undo';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';
import { getGameState } from './api/getGameState';
import { getNonogramByID } from './api/getNonogramByID';
import { sendGameToServer } from './api/saveGame';
// eslint-disable-next-line import/no-cycle
import {
    checkIsPainted,
    makeHash,
    makeInitialSaveGame,
    makeUserGameServerFormat,
    setProperty,
    unifyTwoDimensionalArray,
} from './gameUtils/helpers';
import { UMRELLA } from './gameUtils/mochas';
import {
    CellAreaState,
    CellAreaStateType,
    ClickType,
    DragCellInfo,
    FieldPlace,
    fieldPlace,
    GameStatus,
    NonogramRaw,
    ResponseStatus,
    UserFieldData,
    UserGameData,
} from './gameUtils/types';

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
    paintedCells: (number | null)[][] | null;
    isPaintProcess: boolean;
    bestTime: number | null;
    lastAction: HugeActionList | null;
}

const initialState: GameState = {
    loadNonogramStatus: LoadStatus.PENDING,
    userGame: null,
    currentNonogram: null,
    errorMessage: '',
    incorrectCells: null,
    timers: [],
    paintedCells: null,
    isPaintProcess: false,
    bestTime: null,
    lastAction: null,
};
export const enum HugeActionList {
    AUTOCROSS = 'updatePaintProcessEnd',
    DRAG_END = 'updatePaintProcessEnd',
    DRAG_START = 'updatePaintProcessStart',
    REGULAR = 'handleOneCell',
    LOADED = 'loadNonogram',
}
export const GUIDE_ID = 'umbrella';
export const loadNonogramByID = createAsyncThunk(
    'game/load/nonogram',
    async ({ id, signal }: { id: string; signal: AbortSignal }) => {
        if (id === GUIDE_ID) {
            return { nonogram: UMRELLA, userGame: null };
        }
        const nonogram = await getNonogramByID(id, signal);
        const userGame = await getGameState(id, signal);
        return { nonogram, userGame };
    }
);
export const saveUserGameByID = createAsyncThunk(
    'game/save',
    async ({
        id,
        userGame,
        bestTime,
    }: {
        id: string;
        userGame: UserGameData | null;
        bestTime: number | null;
    }) => {
        if (userGame) {
            const formattedUserGame = makeUserGameServerFormat(userGame, bestTime);
            console.warn('SAVE GAME', formattedUserGame);
            const reponse = await sendGameToServer(formattedUserGame, id);
            return reponse;
        }
        return ResponseStatus.ERROR;
    }
);
export const paintDrag = createAction(
    'game/drag',
    ({
        paint,
        indexRow,
        indexNumberRow,
    }: {
        paint: CellAreaStateType;
        indexRow: number;
        indexNumberRow: number;
    }) => {
        return {
            payload: {
                paint,
                indexRow,
                indexNumberRow,
            },
        };
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
                state.userGame = {
                    id: action.payload.id,
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
                const { isCrossedOut, indexRow, indexColumn, location } = action.payload;
                const cell =
                    location === FieldPlace.ASIDE
                        ? state.userGame.currentUserRows[indexRow][indexColumn]
                        : state.userGame.currentUserColumns[indexColumn][indexRow];
                if (cell) {
                    cell.isCrossedOut = isCrossedOut;
                }
            }
        },
        updateHintCellAuto(
            state,
            action: PayloadAction<{
                isCrossedOut: boolean;
                indexColumn: number;
                indexRow: number;
                location: fieldPlace;
            }>
        ) {
            if (state.userGame) {
                const { isCrossedOut, indexRow, indexColumn, location } = action.payload;
                const cell =
                    location === FieldPlace.ASIDE
                        ? state.userGame.currentUserRows[indexRow][indexColumn]
                        : state.userGame.currentUserColumns[indexColumn][indexRow];
                if (cell) {
                    cell.isCrossedOut = isCrossedOut;
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
        updateAreaCellAuto(
            state,
            action: PayloadAction<{
                paint: CellAreaStateType;
                indexNumberRow: number;
                indexRow: number;
            }>
        ) {
            if (state.userGame) {
                const { indexRow, indexNumberRow, paint } = action.payload;
                state.userGame.currentUserSolution[indexRow][indexNumberRow] = paint;
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
        updatePaintedCells(state, action: PayloadAction<DragCellInfo>) {
            const { paint, indexRow, indexNumberRow } = action.payload;
            if (state.paintedCells) {
                const isPainted = state.paintedCells[indexRow][indexNumberRow];
                state.paintedCells[indexRow][indexNumberRow] = paint;
            }
        },
        updatePaintProcess(state, action: PayloadAction<HugeActionList>) {
            state.lastAction = action.payload;
        },
        clearPainted(state, action: PayloadAction) {
            state.paintedCells =
                state.currentNonogram?.nonogram.goal.map((row, indexRow) => {
                    return row.map((cell, indexNumberRow) => {
                        return null;
                    });
                }) ?? null;
        },
        clearGame(state, action: PayloadAction) {
            Object.keys(initialState).forEach((keyInit) => {
                const key = keyInit as keyof GameState;
                setProperty(state, key, initialState[key]);
            });
        },
        updateBestTime(state, action: PayloadAction<number | null>) {
            console.warn('best time', action.payload);
            if (action.payload !== null) {
                state.bestTime = action.payload;
            }
        },
        changeLastAction(state, action: PayloadAction<HugeActionList>) {
            state.lastAction = action.payload;
        },
        writeNonogramForPrint(state, action: PayloadAction<NonogramRaw>) {
            state.currentNonogram = action.payload;
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
                state.paintedCells = nonogram.nonogram.goal.map((row, indexRow) => {
                    return row.map((cell, indexNumberRow) => {
                        return null;
                    });
                });
            }
            const gameToSet = makeInitialSaveGame(nonogram);
            if (userGame) {
                const userData = userGame.data.currentGame;
                const columns = userData.currentUserColumns;
                const columnsUnified = unifyTwoDimensionalArray(columns);
                const rows = userData.currentUserRows;
                const rowsUnified = unifyTwoDimensionalArray(rows);
                state.userGame = {
                    id: userData.id,
                    state: userData.state,
                    currentUserSolution: userData.currentUserSolution,
                    currentTime: userData.currentTime,
                    currentUserColumns: columnsUnified,
                    currentUserRows: rowsUnified,
                };
                state.bestTime = userGame.data.bestTime;
            } else {
                state.userGame = gameToSet;
                state.bestTime = null;
            }
            state.lastAction = HugeActionList.LOADED;
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
    updatePaintedCells,
    updatePaintProcess,
    clearPainted,
    clearGame,
    updateBestTime,
    updateHintCellAuto,
    updateAreaCellAuto,
    changeLastAction,
    writeNonogramForPrint,
} = gameSlice.actions;

export const selectUserState = (state: RootState) => state.game.present.userGame?.state;
export const selectNonogramRaw = (state: RootState) => state.game.present.currentNonogram;
export const selectUserSolution = (state: RootState) =>
    state.game.present.userGame?.currentUserSolution;
export const selectUserTime = (state: RootState) =>
    state.game.present.userGame?.currentTime ?? 0;

export const ACTIONS_TO_INCLUDE = [
    // 'game/updateUserField',
    'game/updateHintCell',
    'game/updateAreaCell',
    'game/updatePaintProcess',
    'game/clearMistakes',
    'game/load/nonogram/fulfilled',
];
