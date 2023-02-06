export type a = 'filled' | 'empty' | 'crossed';

export type fieldPlace = 'header' | 'aside' | 'area' | 'miniature';

export interface NonogramTime {
    id: number;
    time: number;
}

export enum GameStatus {
    INITIAL = 'initial',
    STARTED = 'started',
    FINISHED = 'finished',
}
export interface CellProps {
    cellContent: string;
    styles?: string[];
}
export interface TableRowProps {
    location: fieldPlace;
    indexRow: number;
    linesUnified: number[][] | NonogramHint[][];
}
export interface TableAllRowsProps {
    location: fieldPlace;
    dataLength: number;
    linesUnified: NonogramHint[][] | number[][];
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
