import React, { MouseEventHandler } from 'react';
import { SettingsTimingsEnum } from './enums';

export type fieldPlace = 'header' | 'aside' | 'area' | 'miniature';

export type NonogramObject = {
    id: string;
    nonogram: {
        height: number;
        width: number;
        difficulty: number;
        title: {
            en: string;
            ru: string;
            de: string;
        };
        colorMapping: {
            1: string;
            2: string;
        };
        goal: Array<number[]>;
        rows: Array<
            {
                hint: number;
                color: number;
            }[]
        >;
        columns: Array<
            {
                hint: number;
                color: number;
            }[]
        >;
    };
};

export type GameStateType = {
    id: string;
    state: string;
};

export type UserWinsObject = {
    data: { currentGame: UserGameData; bestTime: number }[];
};

export type CatalogItemProps = {
    catalogItem: NonogramObject;
    cardNumber: number;
    solvedGames: string[];
};

export type SpecificLanguageButtonPropsType = {
    id: string;
    svg: React.ReactNode;
    active?: string;
    handleLang: (e: React.MouseEvent) => void;
};

export type FormCheckItemPropsType = {
    value: string;
    name: string;
    id: string;
    isChecked?: boolean;
    handleRadioButtonClick: (e: React.ChangeEvent) => void;
};

export type SettingsCategoryItemPropsType = {
    name: string;
    id: string;
    active?: string;
    handleSettingsCategorySelect: (e: React.MouseEvent) => void;
};

export type NonogramSettingsMainState = {
    showNonogramTitlesBeforeSolving: boolean;
    showNonogramThumbnailsBeforeSolving: boolean;
};

export type NonogramSettingsGameState = {
    highlightCellsWithError: SettingsTimingsEnum;
    automaticallyCrossOutNumbers: SettingsTimingsEnum;
    lastCrossedOutDigitFillsLineWithCrosses: boolean;
};

export const enum EmptyCellMark {
    CROSS = 'cross-style',
    DOT = 'dot-style',
}
export type NonogramSettingsViewState = {
    markingAnEmptyCell: {
        caption: string;
        type: EmptyCellMark;
    };
    showGuessTime: boolean;
};

export enum FieldPlace {
    HEADER = 'header',
    ASIDE = 'aside',
    AREA = 'area',
    MINIATURE = 'miniature',
}
export interface NonogramTime {
    id: string;
    time: number;
}
export type gameStatuses = 'initial' | 'started' | 'finished';

export enum GameStatus {
    INITIAL = 'initial',
    STARTED = 'started',
    FINISHED = 'finished',
}

export interface TableRowProps {
    location: fieldPlace;
    indexRow: number;
    linesUnified: (NonogramHint | null)[][] | (number | null)[][];
}
export interface TableAllRowsProps {
    location: fieldPlace;
    dataLength: number;
    linesUnified: (NonogramHint | null)[][] | (number | null)[][];
}
export interface TableFieldRowsProps {
    location: fieldPlace;
    dataLength: number;
    linesUnified: number[][];
}
export interface Languages {
    en: string;
    de: string;
    ru: string;
}
export interface NonogramHint {
    hint: number;
    color: number;
}
export interface Nonogram {
    height: number;
    width: number;
    title: Languages;
    colorMapping: { [key: number]: string };
    goal: number[][];
    rows: NonogramHint[][];
    columns: NonogramHint[][];
}
export interface NonogramRaw {
    id: string;
    nonogram: Nonogram;
}
export interface UserGameData {
    id: string;
    state: GameStatus;
    currentUserSolution: (null | number)[][];
    currentTime: number;
    currentUserRows: { isCrossedOut: boolean }[][];
    currentUserColumns: { isCrossedOut: boolean }[][];
}
export interface UserGameDataRaw {
    data: {
        currentGame: UserGameData;
    };
}
