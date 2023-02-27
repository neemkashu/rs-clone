import { EmptyCellMark } from '../../../utils/types';
import { StorageKeys } from './storage';
import {
    AreaCellStyle,
    CellAreaState,
    CellAreaStateType,
    DragCellInfo,
    GameStatus,
    IndexPair,
    Languages,
    LineType,
    NonogramRaw,
    NonogramTime,
    UserFieldData,
    UserGameData,
    UserGameForServer,
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
            id: nonogram.id,
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
export function makeUserGameServerFormat(
    userGame: UserGameData,
    bestTime: number | null
): UserGameForServer {
    const serverFormatColumns = userGame.currentUserColumns.map((column) =>
        column.filter((cell) => cell)
    );
    const serverFormatRows = userGame.currentUserRows.map((row) =>
        row.filter((cell) => cell)
    );
    return {
        bestTime,
        currentGame: {
            id: userGame.id,
            state: userGame.state,
            currentTime: userGame.currentTime,
            currentUserColumns: serverFormatColumns,
            currentUserRows: serverFormatRows,
            currentUserSolution: userGame.currentUserSolution,
        },
    };
}
export function increaseSmallMatrix(matrix: number[][]): number[][] {
    const SMALL = 120;
    const minSize = Math.min(matrix[0].length, matrix.length);

    const coefficient = Math.ceil(SMALL / minSize);

    if (coefficient > 1) {
        const increasedRows = matrix.reduce<number[][]>((accum, row) => {
            for (let i = 0; i < coefficient; i += 1) {
                accum.push(row);
            }
            return accum;
        }, []);
        const increasedMatrix = increasedRows.map((row) => {
            return row.reduce<number[]>((accum, cell) => {
                for (let i = 0; i < coefficient; i += 1) {
                    accum.push(cell);
                }
                return accum;
            }, []);
        });
        return increasedMatrix;
    }
    return matrix;
}
export function getImageFromMatrix(matrix?: number[][]): string {
    if (!matrix) {
        return '';
    }
    const rgbMatrix = matrix.map((row) => row.map((cell) => (cell === 0 ? 255 : 0)));
    const canvas = document.createElement('canvas');

    const increaseFactor = Math.ceil(60 / rgbMatrix.length);

    canvas.width = rgbMatrix[0].length * increaseFactor;
    canvas.height = rgbMatrix.length * increaseFactor;

    const context = canvas.getContext('2d');

    for (let y = 0; y < rgbMatrix.length; y += 1) {
        for (let x = 0; x < rgbMatrix[y].length; x += 1) {
            const pixel = rgbMatrix[y][x];
            if (context) {
                context.fillStyle = `rgb(${pixel}, ${pixel}, ${pixel})`;
                context.fillRect(
                    x * increaseFactor,
                    y * increaseFactor,
                    1 * increaseFactor,
                    1 * increaseFactor
                );
            }
        }
    }

    return canvas.toDataURL('image/png');
}
export function getTranslatedTitle(title: Languages, currentLanguage: string): string {
    const languageKey = currentLanguage.split('-')[0];
    if (Object.hasOwn(title, languageKey)) {
        const key = languageKey as keyof typeof title;
        return title[key];
    }
    return title.en;
}
export function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
    // eslint-disable-next-line no-param-reassign
    obj[key] = value;
}
export const AREA_STYLES: AreaCellStyle = {
    EMPTY: '',
    CROSSED: 'crossed-square',
    DOTTED: 'dotted-square',
    FILLED: 'filled-square',
};

export const getAreaCellStyle = (
    emptyCellMark: EmptyCellMark,
    userCell?: number | null
): string => {
    switch (userCell) {
        case CellAreaState.CROSSED: {
            return emptyCellMark === EmptyCellMark.CROSS
                ? AREA_STYLES.CROSSED
                : AREA_STYLES.DOTTED;
        }
        case CellAreaState.FILLED: {
            return AREA_STYLES.FILLED;
        }
        default: {
            return AREA_STYLES.EMPTY;
        }
    }
};

export function indexes(
    type: LineType,
    indexLine: number,
    indexInLine: number
): IndexPair {
    if (type === LineType.ROW) {
        return { indexRow: indexLine, indexNumberRow: indexInLine };
    }
    if (type === LineType.COLUMN) {
        return { indexRow: indexInLine, indexNumberRow: indexLine };
    }
    throw new Error('Incorrect line type!');
}
