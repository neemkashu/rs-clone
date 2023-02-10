import { StorageKeys } from './storage';
import { GameStatus, NonogramRaw, NonogramTime, UserGameData } from './types';

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
export function makeInitialSaveGame(nonogram: NonogramRaw | null): UserGameData | null {
    if (!nonogram) {
        return null;
    }
    const solution = nonogram.nonogram.goal.map((row) => row.map((cell) => null));
    const columnsUnified = unifyTwoDimensionalArray(nonogram.nonogram.columns).map(
        (line) => line.map((cell) => ({ isCrossedOut: false }))
    );
    const rowsUnified = unifyTwoDimensionalArray(nonogram.nonogram.rows).map((line) =>
        line.map((cell) => ({ isCrossedOut: false }))
    );

    const initialGame: UserGameData = {
        state: GameStatus.INITIAL,
        currentUserSolution: solution,
        currentTime: 0,
        currentUserRows: rowsUnified,
        currentUserColumns: columnsUnified,
    };
    return initialGame;
}
