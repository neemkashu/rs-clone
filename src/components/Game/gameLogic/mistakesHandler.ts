import { store } from '../../store';
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

export function mistakesHandler(indexRow: number, indexNumberRow: number): void {
    const goalCell =
        store.getState().game.currentNonogram?.nonogram.goal[indexRow][indexNumberRow];
    const gotCell =
        store.getState().game.userGame?.currentUserSolution[indexRow][indexNumberRow];
    console.warn('watch cell!', goalCell, gotCell);
    console.warn('watch index!', indexRow, indexNumberRow);
    if (!checkIsCellCorrect(gotCell, goalCell)) {
        setTimeout(() => {
            console.warn('is not correct cell!');
        }, USER_TIMEOUT);
    }
}
