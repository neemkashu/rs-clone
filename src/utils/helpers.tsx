import { Dispatch, SetStateAction, ReactNode } from 'react';
import { NonogramObject, NonogramTime, EmptyCellMark } from './types';
import { LanguagesShortNamesEnum, SettingsTimingsEnum } from './enums';
import { StorageKeys } from './storage';

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

export function printElem(src: HTMLDivElement, width: string): void {
    const mywindow = window.open('', 'PRINT', 'height=720, width=1280');
    console.log(width);
    mywindow?.document.write(
        `<html>
            <head>
                <title>${document.title}</title>
            </head>
            <body>
                <div style="width: ${width}; height: 100%">
                    ${src.innerHTML}
                </div>
            </body>
        </html>`
    );
    mywindow?.document.close();
    mywindow?.focus();
    mywindow?.print();
    mywindow?.close();
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

export function validateUserNameInput(input: string): boolean {
    if (input.match(/^([a-z]{3,})(\s{0,})$/gi)) return true;
    return false;
}

export function validateUserEmailInput(input: string): boolean {
    if (input.match(/^([\w]{3,})@([\w]+\.)([a-z]{2,5})$/gi)) return true;
    return false;
}

export function validateUserPasswordInput(input: string): boolean {
    if (input.match(/^[\w\s\d@$!%*#?&]{8,}$/i)) return true;
    return false;
}

export function validateUserRepeatPasswordInput(
    input: string,
    password: string
): boolean {
    if (input === password) return true;
    return false;
}

export function checkUserNameInput(
    name: string | undefined,
    setIsUserNameNotValid: Dispatch<SetStateAction<boolean>>
): void {
    if (name && validateUserNameInput(name)) {
        setIsUserNameNotValid(false);
    } else setIsUserNameNotValid(true);
}

export function checkUserEmailInput(
    email: string | undefined,
    setIsUserEmailNotValid: Dispatch<SetStateAction<boolean>>
): void {
    if (email && validateUserEmailInput(email)) {
        setIsUserEmailNotValid(false);
    } else setIsUserEmailNotValid(true);
}

export function checkUserPasswordInput(
    password: string | undefined,
    setIsUserPasswordNotValid: Dispatch<SetStateAction<boolean>>
): void {
    if (password && validateUserPasswordInput(password)) {
        setIsUserPasswordNotValid(false);
    } else setIsUserPasswordNotValid(true);
}

export function checkUserRepeatPasswordInput(
    password: string | undefined,
    repeatPassword: string | undefined,
    setIsUserRepeatPasswordNotValid: Dispatch<SetStateAction<boolean>>
): void {
    if (
        password &&
        repeatPassword &&
        validateUserRepeatPasswordInput(repeatPassword, password)
    ) {
        setIsUserRepeatPasswordNotValid(false);
    } else setIsUserRepeatPasswordNotValid(true);
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

export function getNonogramTitle(currentLang: string, catalogItem: NonogramObject) {
    if (currentLang === LanguagesShortNamesEnum.EN_VALUE)
        return catalogItem.nonogram.title.en;
    if (currentLang === LanguagesShortNamesEnum.DE_VALUE)
        return catalogItem.nonogram.title.de;
    if (currentLang === LanguagesShortNamesEnum.RU_VALUE)
        return catalogItem.nonogram.title.ru;
    return catalogItem.nonogram.title.en;
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
                    increaseFactor,
                    increaseFactor
                );
            }
        }
    }

    return canvas.toDataURL('image/png');
}

export function changeColorTheme(isLightTheme: boolean) {
    const color = isLightTheme ? 'light' : 'dark';
    document.querySelector('html')?.setAttribute('data-bs-theme', color);
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
