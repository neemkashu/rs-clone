/* eslint-disable no-var */
import { StorageKeys } from './storage';
import {
    getTimeFromStorage,
    getUserCurrentTimes,
    setTimeToStorage,
    unifyTwoDimensionalArray,
    makeInitialSaveGame,
    checkIsLineCompleted,
    increaseSmallMatrix,
} from './helpers';
import { nonogram } from './mochas';

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = String(value);
    }

    removeItem(key) {
        delete this.store[key];
    }
}

describe('test get User Current Times from passed string', () => {
    test('Get array of user nonogram times from currentTimesInfo parameter', () => {
        const localStorage = new LocalStorageMock();
        localStorage.clear();
        localStorage.setItem(
            StorageKeys.USER_CURRENT_TIME,
            JSON.stringify([
                { id: 234, time: 152000 },
                { id: 123, time: 48000 },
            ])
        );
        const currentTimesInfo = localStorage.getItem(StorageKeys.USER_CURRENT_TIME);
        expect(getUserCurrentTimes(currentTimesInfo)).toEqual([
            { id: 234, time: 152000 },
            { id: 123, time: 48000 },
        ]);
    });
    test('Get null if currentTimesInfo is of wrong type', () => {
        const localStorage = new LocalStorageMock();
        localStorage.clear();
        localStorage.setItem(
            StorageKeys.USER_CURRENT_TIME,
            JSON.stringify([{ id: 234 }, { id: 123, time: 48000 }])
        );
        const currentTimesInfo = localStorage.getItem(StorageKeys.USER_CURRENT_TIME);

        expect(getUserCurrentTimes(currentTimesInfo)).toBe(null);
    });
    test('Get null if currentTimesInfo is nor array', () => {
        const localStorage = new LocalStorageMock();
        localStorage.clear();
        localStorage.setItem(
            StorageKeys.USER_CURRENT_TIME,
            JSON.stringify({ id: 123, time: 48000 })
        );
        const currentTimesInfo = localStorage.getItem(StorageKeys.USER_CURRENT_TIME);

        expect(getUserCurrentTimes(currentTimesInfo)).toBe(null);
    });
});

describe('test get Time From Storage', () => {
    test('Get user time for current id nonogram from local storage', () => {
        global.localStorage = new LocalStorageMock();
        localStorage.clear();
        localStorage.setItem(
            StorageKeys.USER_CURRENT_TIME,
            JSON.stringify([{ id: 234, time: 152000 }])
        );
        expect(getTimeFromStorage(234)).toBe(152000);
    });

    test('Get user time for current id nonogram from local storage', () => {
        global.localStorage = new LocalStorageMock();
        localStorage.clear();
        localStorage.setItem(
            StorageKeys.USER_CURRENT_TIME,
            JSON.stringify([
                { id: 234, time: 152000 },
                { id: 123, time: 52000 },
            ])
        );
        expect(getTimeFromStorage(123)).toBe(52000);
    });

    test('Get 0 if the nonogram is not in storage yet', () => {
        global.localStorage = new LocalStorageMock();
        localStorage.clear();
        localStorage.setItem(
            StorageKeys.USER_CURRENT_TIME,
            JSON.stringify([
                { id: 234, time: 152000 },
                { id: 123, time: 52000 },
            ])
        );
        expect(getTimeFromStorage(4645)).toBe(0);
    });
});

describe('test Setting Time by id and time data', () => {
    test('Update existing nonogram id time', () => {
        global.localStorage = new LocalStorageMock();
        localStorage.clear();
        localStorage.setItem(
            StorageKeys.USER_CURRENT_TIME,
            JSON.stringify([
                { id: 234, time: 152000 },
                { id: 123, time: 48000 },
            ])
        );
        setTimeToStorage(347823, 234);
        const updatedStorage = localStorage.getItem(StorageKeys.USER_CURRENT_TIME);
        const desiredStorage = JSON.stringify([
            { id: 234, time: 347823 },
            { id: 123, time: 48000 },
        ]);
        expect(updatedStorage).toEqual(desiredStorage);
    });
    test('Write new nonogram id time', () => {
        global.localStorage = new LocalStorageMock();
        localStorage.clear();
        localStorage.setItem(
            StorageKeys.USER_CURRENT_TIME,
            JSON.stringify([
                { id: 234, time: 152000 },
                { id: 123, time: 48000 },
            ])
        );
        setTimeToStorage(9000, 503);
        const updatedStorage = localStorage.getItem(StorageKeys.USER_CURRENT_TIME);
        const desiredStorage = JSON.stringify([
            { id: 234, time: 152000 },
            { id: 123, time: 48000 },
            { id: 503, time: 9000 },
        ]);
        expect(updatedStorage).toEqual(desiredStorage);
    });
    test('Write new nonogram to empty storage', () => {
        global.localStorage = new LocalStorageMock();
        localStorage.clear();
        setTimeToStorage(9000, 503);
        const updatedStorage = localStorage.getItem(StorageKeys.USER_CURRENT_TIME);
        const desiredStorage = JSON.stringify([{ id: 503, time: 9000 }]);
        expect(updatedStorage).toEqual(desiredStorage);
    });
});

describe('Returns two-dimensional array with equal length subarrays', () => {
    test('does not change length of input array', () => {
        const arr = [
            [{ hint: 7, color: 1 }],
            [{ hint: 11, color: 1 }],
            [
                { hint: 1, color: 1 },
                { hint: 10, color: 1 },
                { hint: 11, color: 1 },
            ],
            [
                { hint: 1, color: 1 },
                { hint: 11, color: 1 },
            ],
        ];
        const oldArray = [...arr];
        unifyTwoDimensionalArray(arr);
        expect(oldArray.length).toEqual(arr.length);
    });
    test('makes sub arrays of equal length', () => {
        const arr = [
            [{ hint: 7, color: 1 }],
            [{ hint: 11, color: 1 }],
            [
                { hint: 1, color: 1 },
                { hint: 10, color: 1 },
                { hint: 11, color: 1 },
            ],
            [
                { hint: 1, color: 1 },
                { hint: 11, color: 1 },
            ],
        ];
        const arr2 = [[{ hint: 7, color: 1 }], [{ hint: 11, color: 1 }]];
        const unifiedArr = unifyTwoDimensionalArray(arr);
        const unifiedArr2 = unifyTwoDimensionalArray(arr2);

        const lengthOfSubArray = unifiedArr[0].length;
        const lengthOfSubArray2 = unifiedArr2[0].length;

        const areSubArraysEqual = unifiedArr.every(
            (subArray) => subArray.length === lengthOfSubArray
        );
        const areSubArraysEqual2 = unifiedArr2.every(
            (subArray) => subArray.length === lengthOfSubArray2
        );
        expect([areSubArraysEqual, areSubArraysEqual2]).toEqual([true, true]);
    });
});
describe('Make initial saved game for new game', () => {
    test('fills every solution cell with null', () => {
        const result = makeInitialSaveGame(nonogram);
        const isEveryCellNull = result.currentUserSolution
            .flat()
            .every((cell) => cell === null);

        expect(isEveryCellNull).toBeTruthy();
    });
    test('fills hints rows state with false', () => {
        const result = makeInitialSaveGame(nonogram);
        const isEveryHintFalse = result.currentUserRows
            .flat()
            .every((cell) => cell === null || cell.isCrossedOut === false);

        expect(isEveryHintFalse).toBeTruthy();
    });
    test('fills hints columns state with false', () => {
        const result = makeInitialSaveGame(nonogram);
        const isEveryHintFalse = result.currentUserColumns
            .flat()
            .every((cell) => cell === null || cell.isCrossedOut === false);

        expect(isEveryHintFalse).toBeTruthy();
    });
});
describe('Checks that nonogram line is complted and without errors', () => {
    test('show true if user line equals goal line', () => {
        const goalLine = [0, 0, 1, 1, 0, 0, 0, 0, 1, 1];
        const userLine = [0, 0, 1, 1, 0, 0, 0, 0, 1, 1];

        const result = checkIsLineCompleted(userLine, goalLine);
        const desired = true;

        expect(result).toBe(desired);
    });
    test('show true if user line equals goal line without crosses', () => {
        const goalLine = [0, 0, 1, 1, 0, 0, 0, 0, 1, 1];
        const userLine = [null, null, 1, 1, null, null, null, null, 1, 1];

        const result = checkIsLineCompleted(userLine, goalLine);
        const desired = true;

        expect(result).toBe(desired);
    });
    test('show true if user line equals goal line with some crosses', () => {
        const goalLine = [0, 0, 1, 1, 0, 0, 0, 0, 1, 1];
        const userLine = [null, null, 1, 1, null, 0, null, null, 1, 1];

        const result = checkIsLineCompleted(userLine, goalLine);
        const desired = true;

        expect(result).toBe(desired);
    });
    test('show false if user line does not have all filled cells', () => {
        const goalLine = [0, 0, 1, 1, 0, 0, 0, 0, 1, 1];
        const userLine = [null, null, 0, 1, null, 0, null, null, 1, 1];

        const result = checkIsLineCompleted(userLine, goalLine);
        const desired = false;

        expect(result).toBe(desired);
    });
    test('show false if user line does not have all filled cells', () => {
        const goalLine = [0, 0, 1, 1, 0, 0, 0, 0, 1, 1];
        const userLine = [null, null, null, 1, null, 0, null, null, 1, 1];

        const result = checkIsLineCompleted(userLine, goalLine);
        const desired = false;

        expect(result).toBe(desired);
    });
    test('show false if extra filled cells', () => {
        const goalLine = [0, 0, 1, 1, 0, 0, 0, 0, 1, 1];
        const userLine = [null, 1, 1, 1, null, 0, null, null, 1, 1];

        const result = checkIsLineCompleted(userLine, goalLine);
        const desired = false;

        expect(result).toBe(desired);
    });
});
describe('Increase small matrix in n factor', () => {
    test('increases height by 2 matrix', () => {
        const result = increaseSmallMatrix(nonogram.nonogram.goal);
        const desiredWidth = nonogram.nonogram.goal.length * 2;

        expect(result.length).toBe(desiredWidth);
    });
    test('increases width by 2 matrix', () => {
        const result = increaseSmallMatrix(nonogram.nonogram.goal);
        const desiredWidth = nonogram.nonogram.goal[0].length * 2;

        expect(result[0].length).toBe(desiredWidth);
    });
});
