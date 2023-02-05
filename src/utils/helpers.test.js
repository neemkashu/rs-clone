/* eslint-disable no-var */
import { StorageKeys } from './storage';
import { getTimeFromStorage, getUserCurrentTimes, setTimeToStorage } from './helpers';

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
        setTimeToStorage(234, 347823);
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
        setTimeToStorage(503, 9000);
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
        setTimeToStorage(503, 9000);
        const updatedStorage = localStorage.getItem(StorageKeys.USER_CURRENT_TIME);
        const desiredStorage = JSON.stringify([{ id: 503, time: 9000 }]);
        expect(updatedStorage).toEqual(desiredStorage);
    });
});
