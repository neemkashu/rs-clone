import { useAppDispatch } from '../../hooks';
import { store } from '../../store';
import { addTimerId, updateMistakeData } from '../gameSlice';
import { CellAreaState } from '../gameUtils/types';

export const checkIsCellCorrect = (
    userCell?: number | null,
    goalCell?: number
): boolean => {
    if (userCell === CellAreaState.CROSSED || userCell === CellAreaState.FILLED) {
        return userCell === goalCell;
    }
    return true;
};

export function mistakesHandler(
    indexRow: number,
    indexNumberRow: number,
    dispatch: ReturnType<typeof useAppDispatch>,
    delay: number | null
): void {
    const goalCell =
        store.getState().game.present.currentNonogram?.nonogram.goal[indexRow][
            indexNumberRow
        ];
    const gotCell =
        store.getState().game.present.userGame?.currentUserSolution[indexRow][
            indexNumberRow
        ];
    // console.warn('watch cell!', goalCell, gotCell);
    // console.warn('watch index!', indexRow, indexNumberRow);
    if (delay === 0) {
        if (!checkIsCellCorrect(gotCell, goalCell)) {
            dispatch(updateMistakeData({ indexRow, indexNumberRow, isCorrect: false }));
        }
        return;
    }

    if (!checkIsCellCorrect(gotCell, goalCell) && delay !== null) {
        const mistakeTimer = setTimeout(() => {
            const actualCell =
                store.getState().game.present.userGame?.currentUserSolution[indexRow][
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
