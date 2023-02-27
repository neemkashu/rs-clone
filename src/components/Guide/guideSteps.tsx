import { ActionCreators } from 'redux-undo';
import { filledLineHandler, fillLine } from '../Game/gameLogic/filledLineHandler';
import {
    changeGameStatus,
    clearPainted,
    HugeActionList,
    updateAreaCellAuto,
    updatePaintedCells,
    updatePaintProcess,
} from '../Game/gameSlice';
import { indexes } from '../Game/gameUtils/helpers';
import { UMRELLA } from '../Game/gameUtils/mochas';
import { CellAreaState, GameStatus, LineType } from '../Game/gameUtils/types';
import { useAppDispatch } from '../hooks';
import { store } from '../store';
import { PaintStep, paintSteps } from './constants';

const { width, height } = UMRELLA.nonogram;

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
    const guideSteps = [
        makePaintStep({ ...paintSteps[0] }, dispatch),
        fillLine(LineType.ROW, 3, dispatch),
        makePaintStep({ ...paintSteps[1] }, dispatch),
        fillLine(LineType.COLUMN, 4, dispatch),
        fillLine(LineType.ROW, 0, dispatch),
        fillLine(LineType.ROW, 5, dispatch),
        fillLine(LineType.ROW, 6, dispatch),
        makePaintStep({ ...paintSteps[2] }, dispatch),
        makePaintStep({ ...paintSteps[3] }, dispatch),
        makePaintStep({ ...paintSteps[4] }, dispatch),
        fillLine(LineType.COLUMN, 2, dispatch),
        fillLine(LineType.ROW, 7, dispatch),
        makePaintStep({ ...paintSteps[5] }, dispatch),
        fillLine(LineType.ROW, 8, dispatch),
        makePaintStep({ ...paintSteps[6] }, dispatch),
        fillLine(LineType.COLUMN, 6, dispatch),
        makePaintStep({ ...paintSteps[7] }, dispatch),
        fillLine(LineType.ROW, 1, dispatch),
        fillLine(LineType.COLUMN, 3, dispatch),
        fillLine(LineType.COLUMN, 5, dispatch),
        makePaintStep({ ...paintSteps[8] }, dispatch),
        makePaintStep({ ...paintSteps[9] }, dispatch),
        fillLine(LineType.ROW, 4, dispatch),
        fillLine(LineType.COLUMN, 0, dispatch),
        fillLine(LineType.COLUMN, 8, dispatch),
        makePaintStep({ ...paintSteps[10] }, dispatch),
        fillLine(LineType.ROW, 2, dispatch),
        fillLine(LineType.COLUMN, 1, dispatch),
        fillLine(LineType.COLUMN, 7, dispatch),
    ];
    const actionsToUndo = (guideSteps.length - width - height) * 2 + width + height + 1;

    dispatch(ActionCreators.jump(-actionsToUndo));
}
