import { useAppDispatch } from '../../hooks';
import { store } from '../../store';
import { updateAreaCell } from '../gameSlice';
import { getColumnFromMatrix } from '../gameUtils/helpers';
import { ClickType, FieldPlace, fieldPlace, NonogramHint } from '../gameUtils/types';
import { mistakesHandler } from './mistakesHandler';

export function filledHintsHandler(
    indexLine: number,
    dispatch: ReturnType<typeof useAppDispatch>,
    delayMistakesFromSetting: number | null,
    location?: fieldPlace
): void {
    const { userGame } = store.getState().game.present;
    const solution = userGame?.currentUserSolution;
    const isInHeader = location === FieldPlace.HEADER;

    const hintLinesUnified = isInHeader
        ? userGame?.currentUserColumns
        : userGame?.currentUserRows;

    if (hintLinesUnified && solution) {
        const isLineCrossed = hintLinesUnified[indexLine].every((cell) => {
            return cell?.isCrossedOut || cell === null;
        });
        if (!isLineCrossed) {
            return;
        }
        const fieldLine = isInHeader
            ? getColumnFromMatrix(solution ?? null, indexLine)
            : solution[indexLine];

        fieldLine?.forEach((cell, index) => {
            const indexes = isInHeader
                ? {
                      indexRow: index,
                      indexNumberRow: indexLine, // index of column
                  }
                : {
                      indexRow: indexLine,
                      indexNumberRow: index,
                  };
            if (cell === null) {
                dispatch(
                    updateAreaCell({
                        clickType: ClickType.MOUSE_CONTEXT,
                        ...indexes,
                    })
                );
            }
            mistakesHandler(
                indexes.indexRow,
                indexes.indexNumberRow,
                dispatch,
                delayMistakesFromSetting
            );
        });
    }
}
const filledItemHintsHandler = (
    itemIndex: number,
    dispatch: ReturnType<typeof useAppDispatch>,
    delayMistakesFromSetting: number | null,
    item = 'column'
): void => {
    const isColumn = item === 'column';
    const { userGame } = store.getState().game.present;
    const itemsUnified = isColumn
        ? userGame?.currentUserColumns
        : userGame?.currentUserRows;
    if (itemsUnified) {
        const isLineCrossed = itemsUnified[itemIndex].every((cell) => {
            return cell?.isCrossedOut || cell === null;
        });
        if (!isLineCrossed) {
            return;
        }
        const fieldLine = isColumn
            ? getColumnFromMatrix(userGame?.currentUserSolution ?? null, itemIndex)
            : userGame?.currentUserSolution[itemIndex];

        fieldLine?.forEach((cell, index) => {
            if (cell === null) {
                dispatch(
                    updateAreaCell({
                        clickType: ClickType.MOUSE_CONTEXT,
                        indexRow: isColumn ? index : itemIndex,
                        indexNumberRow: isColumn ? itemIndex : index,
                    })
                );
            }
            mistakesHandler(index, itemIndex, dispatch, delayMistakesFromSetting);
        });
    }
};
