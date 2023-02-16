export type fieldPlace = 'header' | 'aside' | 'area' | 'miniature';

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

export interface CellProps {
    cellContent: string;
    styles?: string[];
    handler?: () => void;
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
    currentUserRows: ({ isCrossedOut: boolean } | null)[][];
    currentUserColumns: ({ isCrossedOut: boolean } | null)[][];
}
export interface UserGameDataRaw {
    data: {
        currentGame: UserGameData;
    };
}
export enum ResponseStatus {
    SUCCESS = 'successful',
    ERROR = 'failed',
}
export enum ClickType {
    MOUSE_CLICK = 'click',
    MOUSE_CONTEXT = 'context',
}
export const CellAreaState = {
    EMPTY: null,
    CROSSED: 0,
    FILLED: 1,
} as const;
export type CellAreaStateType = (typeof CellAreaState)[keyof typeof CellAreaState];
export type AreaCellStyle = Record<keyof typeof CellAreaState, string>;
