import { useAppDispatch } from '../../hooks';
import { store } from '../../store';
import { updateMistakeData } from '../gameSlice';
import { CellAreaState } from '../gameUtils/types';

const checkIsCellCorrect = (userCell?: number | null, goalCell?: number): boolean => {
    switch (userCell) {
        case CellAreaState.CROSSED: {
            return userCell === goalCell;
        }
        case CellAreaState.FILLED: {
            return userCell === goalCell;
        }
        default: {
            return true;
        }
    }
};

const USER_TIMEOUT = 2000;

export function mistakesHandler(
    indexRow: number,
    indexNumberRow: number,
    dispatch: ReturnType<typeof useAppDispatch>
): void {
    // const dispatch = useAppDispatch();
    const goalCell =
        store.getState().game.currentNonogram?.nonogram.goal[indexRow][indexNumberRow];
    const gotCell =
        store.getState().game.userGame?.currentUserSolution[indexRow][indexNumberRow];
    console.warn('watch cell!', goalCell, gotCell);
    console.warn('watch index!', indexRow, indexNumberRow);

    if (!checkIsCellCorrect(gotCell, goalCell)) {
        setTimeout(() => {
            const actualCell =
                store.getState().game.userGame?.currentUserSolution[indexRow][
                    indexNumberRow
                ];
            if (!checkIsCellCorrect(actualCell, goalCell)) {
                dispatch(
                    updateMistakeData({ indexRow, indexNumberRow, isCorrect: false })
                );
            }
            console.warn(
                'setTimeout: actual cell',
                checkIsCellCorrect(actualCell, goalCell)
            );
        }, USER_TIMEOUT);
    } else {
        dispatch(updateMistakeData({ indexRow, indexNumberRow, isCorrect: true }));
    }
}
