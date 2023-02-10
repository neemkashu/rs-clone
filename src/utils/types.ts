import { MouseEventHandler } from 'react';

export type fieldPlace = 'header' | 'aside' | 'area' | 'miniature';

export type NonogramObject = {
    id: string;
    nonogram: {
        height: number;
        width: number;
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
