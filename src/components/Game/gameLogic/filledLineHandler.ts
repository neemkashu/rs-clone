import { useAppDispatch } from '../../hooks';
import { store } from '../../store';
import {
    addTimerId,
    HugeActionList,
    updateAreaCell,
    updateAreaCellAuto,
    updateHintCell,
    updateHintCellAuto,
    updateMistakeData,
    updatePaintProcess,
} from '../gameSlice';
import { checkIsLineCompleted, getColumnFromMatrix, indexes } from '../gameUtils/helpers';
import { CellAreaState, ClickType, FieldPlace, LineType } from '../gameUtils/types';

export function fillLine(
    type: LineType,
    indexLine: number,
    dispatch: ReturnType<typeof useAppDispatch>
) {
    const hintLine =
        type === LineType.ROW
            ? store.getState().game.present.userGame?.currentUserRows[indexLine]
            : store.getState().game.present.userGame?.currentUserColumns[indexLine];

    const location = type === LineType.ROW ? FieldPlace.ASIDE : FieldPlace.HEADER;

    const field = store.getState().game.present.userGame?.currentUserSolution;
    const lineSize = type === LineType.ROW ? field?.length : field && field[0].length;

    if (lineSize === undefined) return;

    hintLine?.forEach((hint, index) => {
        if (hint) {
            dispatch(
                updateHintCellAuto({
                    isCrossedOut: true,
                    indexLine,
                    indexInLine: index,
                    location,
                })
            );
        }
    });
    for (let indexInLine = 0; indexInLine < lineSize; indexInLine += 1) {
        const { indexRow, indexNumberRow } = indexes(type, indexLine, indexInLine);
        const cell = field && field[indexRow][indexNumberRow];
        if (cell === null) {
            dispatch(
                updateAreaCellAuto({
                    paint: CellAreaState.CROSSED,
                    indexRow,
                    indexNumberRow,
                })
            );
        }
    }
    dispatch(updatePaintProcess(HugeActionList.AUTOCROSS));
}

export function filledLineHandler(
    indexRow: number,
    indexNumberRow: number,
    dispatch: ReturnType<typeof useAppDispatch>,
    delay: number | null
): void {
    const goalLine =
        store.getState().game.present.currentNonogram?.nonogram.goal[indexRow];
    const userLine =
        store.getState().game.present.userGame?.currentUserSolution[indexRow];

    if (
        delay !== null &&
        userLine &&
        goalLine &&
        checkIsLineCompleted(userLine, goalLine)
    ) {
        const complitedLineTimer = setTimeout(() => {
            const goalLineActual =
                store.getState().game.present.currentNonogram?.nonogram.goal[indexRow];
            const userLineActual =
                store.getState().game.present.userGame?.currentUserSolution[indexRow];

            if (
                userLineActual &&
                goalLineActual &&
                checkIsLineCompleted(userLineActual, goalLineActual)
            ) {
                fillLine(LineType.ROW, indexRow, dispatch);
            }
        }, delay);
        dispatch(addTimerId(complitedLineTimer));
    }
    const goalColumn = getColumnFromMatrix(
        store.getState().game.present.currentNonogram?.nonogram.goal ?? null,
        indexNumberRow
    );
    const userColumn = getColumnFromMatrix(
        store.getState().game.present.userGame?.currentUserSolution ?? null,
        indexNumberRow
    );
    const isCompleted =
        userColumn && goalColumn && checkIsLineCompleted(userColumn, goalColumn);
    const isToCross = delay !== null && isCompleted;

    if (isToCross) {
        const complitedLineTimer = setTimeout(() => {
            const goalActualColumn = getColumnFromMatrix(
                store.getState().game.present.currentNonogram?.nonogram.goal ?? null,
                indexNumberRow
            );
            const userActualColumn = getColumnFromMatrix(
                store.getState().game.present.userGame?.currentUserSolution ?? null,
                indexNumberRow
            );

            if (
                userActualColumn &&
                goalActualColumn &&
                checkIsLineCompleted(userActualColumn, goalActualColumn)
            ) {
                fillLine(LineType.COLUMN, indexNumberRow, dispatch);
            }
        }, delay);
        dispatch(addTimerId(complitedLineTimer));
    }
}
