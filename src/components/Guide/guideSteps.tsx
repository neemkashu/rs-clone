import {
    fillColumn,
    filledLineHandler,
    fillRow,
} from '../Game/gameLogic/filledLineHandler';
import {
    changeGameStatus,
    clearPainted,
    HugeActionList,
    updateAreaCellAuto,
    updatePaintedCells,
    updatePaintProcess,
} from '../Game/gameSlice';
import { UMRELLA } from '../Game/gameUtils/mochas';
import { CellAreaState, GameStatus } from '../Game/gameUtils/types';
import { useAppDispatch } from '../hooks';
import { store } from '../store';

const { width, height } = UMRELLA.nonogram;

const enum LineType {
    ROW = 'row',
    COLUMN = 'column',
}
type IndexPair = {
    indexRow: number;
    indexNumberRow: number;
};
interface PaintStep {
    type: LineType;
    lineIndex: number;
    indexStart: number;
    indexEnd: number;
}

const paintSteps: PaintStep[] = [
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
function indexes(type: LineType, lineIndex: number, indexInLine: number): IndexPair {
    if (type === LineType.ROW) {
        return { indexRow: lineIndex, indexNumberRow: indexInLine };
    }
    if (type === LineType.COLUMN) {
        return { indexRow: indexInLine, indexNumberRow: lineIndex };
    }
    throw new Error('Incorrect line type!');
}
const makePaintStep = (step: PaintStep, dispatch: ReturnType<typeof useAppDispatch>) => {
    const { type, lineIndex, indexStart, indexEnd } = step;
    dispatch(updatePaintProcess(HugeActionList.DRAG_START));

    for (let index = indexStart; index <= indexEnd; index += 1) {
        dispatch(
            updatePaintedCells({
                paint: CellAreaState.FILLED,
                ...indexes(type, lineIndex, index),
            })
        );
    }
    const alreadyPainted = store.getState().game.present.paintedCells;

    alreadyPainted?.forEach((row, indexRow) => {
        row.forEach((cell, indexNumberRow) => {
            if (cell === 1) {
                dispatch(
                    updateAreaCellAuto({
                        paint: CellAreaState.FILLED,
                        indexRow,
                        indexNumberRow,
                    })
                );
            }
        });
    });
    dispatch(clearPainted());
    dispatch(updatePaintProcess(HugeActionList.DRAG_END));
};

export function makeGuideSteps(dispatch: ReturnType<typeof useAppDispatch>) {
    dispatch(changeGameStatus(GameStatus.STARTED));
    makePaintStep({ ...paintSteps[0] }, dispatch);
    fillRow(3, dispatch);
    makePaintStep({ ...paintSteps[1] }, dispatch);
    fillColumn(4, dispatch);
    fillRow(0, dispatch);
    makePaintStep({ ...paintSteps[2] }, dispatch);
    fillRow(5, dispatch);
    fillRow(6, dispatch);
    makePaintStep({ ...paintSteps[3] }, dispatch);
    makePaintStep({ ...paintSteps[4] }, dispatch);
    fillColumn(2, dispatch);
    fillRow(7, dispatch);
    makePaintStep({ ...paintSteps[5] }, dispatch);
    fillRow(8, dispatch);
    makePaintStep({ ...paintSteps[6] }, dispatch);
    fillColumn(6, dispatch);
    makePaintStep({ ...paintSteps[7] }, dispatch);
    fillRow(1, dispatch);
    fillColumn(3, dispatch);
    fillColumn(5, dispatch);
    makePaintStep({ ...paintSteps[8] }, dispatch);
    makePaintStep({ ...paintSteps[9] }, dispatch);
    fillRow(4, dispatch);
    fillColumn(0, dispatch);
    fillColumn(8, dispatch);
    makePaintStep({ ...paintSteps[10] }, dispatch);
    fillRow(2, dispatch);
    fillColumn(1, dispatch);
    fillColumn(7, dispatch);
}
