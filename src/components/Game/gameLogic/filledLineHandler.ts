import { useAppDispatch } from '../../hooks';
import { store } from '../../store';
import {
    addTimerId,
    updateAreaCell,
    updateHintCell,
    updateMistakeData,
} from '../gameSlice';
import { checkIsLineCompleted, getColumnFromMatrix } from '../gameUtils/helpers';
import { CellAreaState, ClickType, FieldPlace } from '../gameUtils/types';

function fillRow(indexRow: number, dispatch: ReturnType<typeof useAppDispatch>) {
    const hintLine = store.getState().game.present.userGame?.currentUserRows[indexRow];
    const fieldLine =
        store.getState().game.present.userGame?.currentUserSolution[indexRow];
    hintLine?.forEach((hint, index) => {
        if (hint) {
            dispatch(
                updateHintCell({
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
                updateAreaCell({
                    clickType: ClickType.MOUSE_CONTEXT,
                    indexNumberRow: index,
                    indexRow,
                })
            );
        }
    });
}
function fillColumn(indexNumberRow: number, dispatch: ReturnType<typeof useAppDispatch>) {
    const hintLine =
        store.getState().game.present.userGame?.currentUserColumns[indexNumberRow];
    const fieldLine = getColumnFromMatrix(
        store.getState().game.present.userGame?.currentUserSolution ?? null,
        indexNumberRow
    );
    hintLine?.forEach((hint, index) => {
        if (hint) {
            dispatch(
                updateHintCell({
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
                updateAreaCell({
                    clickType: ClickType.MOUSE_CONTEXT,
                    indexNumberRow,
                    indexRow: index,
                })
            );
        }
    });
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

    if (
        delay !== null &&
        userColumn &&
        goalColumn &&
        checkIsLineCompleted(userColumn, goalColumn)
    ) {
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
