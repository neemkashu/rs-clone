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
import { checkIsLineCompleted, getColumnFromMatrix } from '../gameUtils/helpers';
import { CellAreaState, ClickType, FieldPlace } from '../gameUtils/types';

export function fillRow(indexRow: number, dispatch: ReturnType<typeof useAppDispatch>) {
    const hintLine = store.getState().game.present.userGame?.currentUserRows[indexRow];
    const fieldLine =
        store.getState().game.present.userGame?.currentUserSolution[indexRow];
    hintLine?.forEach((hint, index) => {
        if (hint) {
            dispatch(
                updateHintCellAuto({
                    isCrossedOut: true,
                    indexColumn: index,
                    indexRow,
                    location: FieldPlace.ASIDE,
                })
            );
        }
    });
    fieldLine?.forEach((cell, index) => {
        if (cell === null) {
            dispatch(
                updateAreaCellAuto({
                    paint: CellAreaState.CROSSED,
                    indexNumberRow: index,
                    indexRow,
                })
            );
        }
    });
    dispatch(updatePaintProcess(HugeActionList.AUTOCROSS));
}
export function fillColumn(
    indexNumberRow: number,
    dispatch: ReturnType<typeof useAppDispatch>
) {
    const hintLine =
        store.getState().game.present.userGame?.currentUserColumns[indexNumberRow];
    const fieldLine = getColumnFromMatrix(
        store.getState().game.present.userGame?.currentUserSolution ?? null,
        indexNumberRow
    );
    hintLine?.forEach((hint, index) => {
        if (hint) {
            dispatch(
                updateHintCellAuto({
                    isCrossedOut: true,
                    indexColumn: indexNumberRow,
                    indexRow: index,
                    location: FieldPlace.HEADER,
                })
            );
        }
    });
    fieldLine?.forEach((cell, index) => {
        if (cell === null) {
            dispatch(
                updateAreaCellAuto({
                    paint: CellAreaState.CROSSED,
                    indexNumberRow,
                    indexRow: index,
                })
            );
        }
    });
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
                fillRow(indexRow, dispatch);
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
                fillColumn(indexNumberRow, dispatch);
            }
        }, delay);
        dispatch(addTimerId(complitedLineTimer));
    }
}
