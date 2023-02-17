import { StorageKeys } from './storage';
import {
    CellAreaState,
    CellAreaStateType,
    DragCellInfo,
    GameStatus,
    NonogramRaw,
    NonogramTime,
    UserFieldData,
    UserGameData,
} from './types';

export function getUserCurrentTimes(
    currentTimesInfo: string | null
): NonogramTime[] | null {
    if (!currentTimesInfo) {
        return null;
    }
    const parsedInfo = JSON.parse(currentTimesInfo);

    const isCorrectData =
        Array.isArray(parsedInfo) &&
        Object.hasOwn(parsedInfo[0], 'id') &&
        Object.hasOwn(parsedInfo[0], 'time');
    if (isCorrectData) {
        return parsedInfo as NonogramTime[];
    }
    return null;
}
export function setTimeToStorage(time: number, id?: string): void {
    if (!id) {
        return;
    }
    const storageInfo = localStorage.getItem(StorageKeys.USER_CURRENT_TIME);
    const storageTimes = getUserCurrentTimes(storageInfo);

    if (Array.isArray(storageTimes)) {
        const nonogramIndex = storageTimes.findIndex(
            (nonogramInfo) => nonogramInfo.id === id
        );
        if (nonogramIndex > -1) {
            storageTimes[nonogramIndex] = { id, time };
        } else {
            storageTimes.push({ id, time });
        }
        localStorage.setItem(StorageKeys.USER_CURRENT_TIME, JSON.stringify(storageTimes));
    } else {
        localStorage.setItem(
            StorageKeys.USER_CURRENT_TIME,
            JSON.stringify([{ id, time }])
        );
    }
}
export function getTimeFromStorage(id?: string): number {
    if (!id) {
        return 0;
    }
    const storageInfo = localStorage.getItem(StorageKeys.USER_CURRENT_TIME);
    const storageTimes = getUserCurrentTimes(storageInfo);
    if (storageTimes !== null) {
        const currentTimebyID = storageTimes.find((nonogramInfo) => {
            return nonogramInfo.id === id;
        });
        return currentTimebyID?.time ?? 0;
    }
    return 0;
}
export function unifyTwoDimensionalArray<T>(arr?: T[][]): (T | null)[][] {
    if (!arr) {
        return [[null]];
    }
    const innerArrMaxLength = arr.reduce((maxLength, innerArr) => {
        return maxLength > innerArr.length ? maxLength : innerArr.length;
    }, 1);
    const arrUnified: (T | null)[][] = [...arr];
    arrUnified.forEach((column) => {
        while (column.length < innerArrMaxLength) {
            column.unshift(null);
        }
    });
    return arrUnified;
}
export function makeCleanField(nonogram: NonogramRaw | null): UserFieldData | null {
    if (!nonogram) {
        return null;
    }
    const solution = nonogram.nonogram.goal.map((row) => row.map((cell) => null));
    const columnsUnified = unifyTwoDimensionalArray(nonogram.nonogram.columns).map(
        (line) => line.map((cell) => (cell ? { isCrossedOut: false } : null))
    );
    const rowsUnified = unifyTwoDimensionalArray(nonogram.nonogram.rows).map((line) =>
        line.map((cell) => (cell ? { isCrossedOut: false } : null))
    );

    const cleanField: UserFieldData = {
        currentUserSolution: solution,
        currentUserRows: rowsUnified,
        currentUserColumns: columnsUnified,
    };
    return cleanField;
}
export function makeInitialSaveGame(nonogram: NonogramRaw | null): UserGameData | null {
    if (!nonogram) {
        return null;
    }
    const fieldData = makeCleanField(nonogram);

    if (fieldData) {
        const initialGame: UserGameData = {
            state: GameStatus.INITIAL,
            currentTime: 0,
            ...fieldData,
        };
        return initialGame;
    }
    return null;
}
export const checkIsCellCompleted = (
    userCell?: number | null,
    goalCell?: number
): boolean => {
    switch (userCell) {
        case CellAreaState.CROSSED: {
            return userCell === goalCell;
        }
        case CellAreaState.FILLED: {
            return userCell === goalCell;
        }
        case CellAreaState.EMPTY: {
            return goalCell === CellAreaState.CROSSED;
        }
        default: {
            return false;
        }
    }
};
export const checkIsLineCompleted = (
    userLine: (number | null)[],
    goalLine: number[]
): boolean => {
    const isLineCompleted = userLine.reduce((isCompleted, cell, index) => {
        return isCompleted && checkIsCellCompleted(cell, goalLine[index]);
    }, true);
    return isLineCompleted;
};
export function getColumnFromMatrix<T>(
    array: T[][] | null,
    indexColumn: number
): T[] | null {
    if (!array) {
        return null;
    }
    return array.reduce((column, row) => {
        column.push(row[indexColumn]);
        return [...column];
    }, []);
}
export function makeHash(indexRow: number, indexNumberRow: number): string {
    return JSON.stringify({ indexRow, indexNumberRow });
}
export function checkIsPainted({
    indexRow,
    indexNumberRow,
    alreadyPainted,
}: {
    indexRow: number;
    indexNumberRow: number;
    alreadyPainted: DragCellInfo[];
}) {
    const hash = makeHash(indexRow, indexNumberRow);
    // console.warn('check painted');
    return alreadyPainted.some((cell) => cell.hash === hash);
}
