import { LineType } from '../Game/gameUtils/types';

export interface PaintStep {
    type: LineType;
    lineIndex: number;
    indexStart: number;
    indexEnd: number;
}

export const paintSteps: PaintStep[] = [
    {
        type: LineType.ROW,
        lineIndex: 3,
        indexStart: 0,
        indexEnd: 8,
    },
    {
        type: LineType.COLUMN,
        lineIndex: 4,
        indexStart: 0,
        indexEnd: 8,
    },
    {
        type: LineType.ROW,
        lineIndex: 2,
        indexStart: 2,
        indexEnd: 6,
    },
    {
        type: LineType.COLUMN,
        lineIndex: 2,
        indexStart: 1,
        indexEnd: 4,
    },
    {
        type: LineType.COLUMN,
        lineIndex: 2,
        indexStart: 7,
        indexEnd: 8,
    },
    {
        type: LineType.ROW,
        lineIndex: 8,
        indexStart: 2,
        indexEnd: 4,
    },
    {
        type: LineType.COLUMN,
        lineIndex: 6,
        indexStart: 1,
        indexEnd: 4,
    },
    {
        type: LineType.ROW,
        lineIndex: 1,
        indexStart: 2,
        indexEnd: 6,
    },
    {
        type: LineType.ROW,
        lineIndex: 4,
        indexStart: 0,
        indexEnd: 0,
    },
    {
        type: LineType.ROW,
        lineIndex: 4,
        indexStart: 8,
        indexEnd: 8,
    },
    {
        type: LineType.ROW,
        lineIndex: 2,
        indexStart: 1,
        indexEnd: 7,
    },
];
export type HighLightInfo = {
    type: LineType;
    index: number;
};

export const GuideNotesOrder = [
    0, 1, 1, 2, 3, 4, 4, 4, 5, 6, 6, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 12, 13, 13,
    14, 14, 15, 15, 15,
];
