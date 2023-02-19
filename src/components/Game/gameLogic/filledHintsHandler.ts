import { useAppDispatch } from '../../hooks';
import { store } from '../../store';
import { updateAreaCell } from '../gameSlice';
import { getColumnFromMatrix } from '../gameUtils/helpers';
import { ClickType, NonogramHint } from '../gameUtils/types';
import { mistakesHandler } from './mistakesHandler';

export function filledColumnHintsHandler(
    indexColumn: number,
    dispatch: ReturnType<typeof useAppDispatch>,
    delayMistakesFromSetting: number | null
): void {
    const columnsUnified = store.getState().game.present.userGame?.currentUserColumns;
    if (columnsUnified) {
        const isLineCrossed = columnsUnified[indexColumn].every((cell) => {
            return cell?.isCrossedOut || cell === null;
        });
        if (!isLineCrossed) {
            return;
        }
        const fieldLine = getColumnFromMatrix(
            store.getState().game.present.userGame?.currentUserSolution ?? null,
            indexColumn
        );
        fieldLine?.forEach((cell, index) => {
            if (cell === null) {
                dispatch(
                    updateAreaCell({
                        clickType: ClickType.MOUSE_CONTEXT,
                        indexRow: index,
                        indexNumberRow: indexColumn,
                    })
                );
            }
            mistakesHandler(index, indexColumn, dispatch, delayMistakesFromSetting);
        });
    }
}

export function filledRowHintsHandler(
    indexRow: number,
    dispatch: ReturnType<typeof useAppDispatch>,
    delayMistakesFromSetting: number | null
): void {
    const rowsUnified = store.getState().game.present.userGame?.currentUserRows;
    if (rowsUnified) {
        const isLineCrossed = rowsUnified[indexRow].every((cell) => {
            return cell?.isCrossedOut || cell === null;
        });
        if (!isLineCrossed) {
            return;
        }
        const fieldLine =
            store.getState().game.present.userGame?.currentUserSolution[indexRow];
        fieldLine?.forEach((cell, index) => {
            if (cell === null) {
                dispatch(
                    updateAreaCell({
                        clickType: ClickType.MOUSE_CONTEXT,
                        indexRow,
                        indexNumberRow: index,
                    })
                );
            }
            mistakesHandler(indexRow, index, dispatch, delayMistakesFromSetting);
        });
    }
}
