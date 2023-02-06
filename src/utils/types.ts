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
    hint: string;
    styles?: string[];
}
export interface TableRowProps {
    location: fieldPlace;
    indexRow: number;
    linesUnified: string[][];
}
export interface TableAllRowsProps {
    location: fieldPlace;
    dataLength: number;
    linesUnified: string[][];
}
