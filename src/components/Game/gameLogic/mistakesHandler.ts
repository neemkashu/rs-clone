import { useAppDispatch } from '../../hooks';
import { store } from '../../store';
import { addTimerId, updateMistakeData } from '../gameSlice';
import { CellAreaState } from '../gameUtils/types';

const checkIsCellCorrect = (userCell?: number | null, goalCell?: number): boolean => {
    if (userCell === CellAreaState.CROSSED || userCell === CellAreaState.FILLED) {
        return userCell === goalCell;
    }
    return true;
};

export function mistakesHandler(
    indexRow: number,
    indexNumberRow: number,
    dispatch: ReturnType<typeof useAppDispatch>,
    delay: number
): void {
    const goalCell =
        store.getState().game.currentNonogram?.nonogram.goal[indexRow][indexNumberRow];
    const gotCell =
        store.getState().game.userGame?.currentUserSolution[indexRow][indexNumberRow];
    // console.warn('watch cell!', goalCell, gotCell);
    // console.warn('watch index!', indexRow, indexNumberRow);

    if (!checkIsCellCorrect(gotCell, goalCell)) {
        const mistakeTimer = setTimeout(() => {
            const actualCell =
                store.getState().game.userGame?.currentUserSolution[indexRow][
                    indexNumberRow
                ];
            if (!checkIsCellCorrect(actualCell, goalCell)) {
                dispatch(
                    updateMistakeData({ indexRow, indexNumberRow, isCorrect: false })
                );
            }
        }, delay);
        dispatch(addTimerId(mistakeTimer));
    } else {
        dispatch(updateMistakeData({ indexRow, indexNumberRow, isCorrect: true }));
    }
}
