import { Dispatch, SetStateAction } from 'react';
import { EmptyCellMark, NonogramTime } from './types';
import { StorageKeys } from './storage';
import { SettingsTimingsEnum } from './enums';

export const a = 10;

export const matchSmWindowSize = window.matchMedia('(max-width: 576px)');

export function handleAsideAfterWindowResize(
    query: MediaQueryList | MediaQueryListEvent,
    setIsBurgerBtnVisible: Dispatch<SetStateAction<boolean>>
): void {
    const aside = document.body.querySelector('#aside');
    const asideCloseBtn = document.body.querySelector(
        '#asideCloseBtn'
    ) as HTMLButtonElement;
    setIsBurgerBtnVisible(query.matches);
    if (query.matches) {
        asideCloseBtn.style.display = 'flex';
        aside?.classList.add('aside-modal');
        aside?.classList.remove('col-sm-4');
        aside?.classList.remove('col-md-3');
        aside?.classList.remove('col-lg-2');
    } else {
        asideCloseBtn.style.display = 'none';
        aside?.classList.remove('aside-modal');
        aside?.classList.add('col-sm-4');
        aside?.classList.add('col-md-3');
        aside?.classList.add('col-lg-2');
    }
}

export function handleAsideCloseBtnClick(): void {
    const aside = document.body.querySelector('#aside') as HTMLDivElement;
    aside.style.left = '-170px';
}

export function getInitialLanguage(): string {
    const langInLocalStorage = localStorage.getItem('lang');
    if (langInLocalStorage) {
        return langInLocalStorage;
    }
    if (
        navigator.language === 'en-EN' ||
        navigator.language === 'de-DE' ||
        navigator.language === 'ru-RU'
    ) {
        return navigator.language;
    }
    return 'en-EN';
}

export function getEmptyCellSettingInCurrenLanguage(): {
    caption: string;
    type: EmptyCellMark;
} {
    let caption = 'dot';
    const initialLanguage = getInitialLanguage();

    if (initialLanguage === 'ru-RU') {
        caption = 'точка';
    }
    if (initialLanguage === 'de-DE') {
        caption = 'punkt';
    }
    return {
        caption,
        type: EmptyCellMark.DOT,
    };
}

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
        return [];
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
export function convertSettingToNumber(delay: SettingsTimingsEnum): number | null {
    switch (delay) {
        case SettingsTimingsEnum.NEVER: {
            return null;
        }
        case SettingsTimingsEnum.ONE_SEC: {
            return 1000;
        }
        case SettingsTimingsEnum.TWO_SEC: {
            return 2000;
        }
        case SettingsTimingsEnum.TEN_SEC: {
            return 10000;
        }
        case SettingsTimingsEnum.THIRTY_SEC: {
            return 30000;
        }
        case SettingsTimingsEnum.FIVE_MIN: {
            return 5 * 60 * 1000;
        }
        default: {
            return null;
        }
    }
}
