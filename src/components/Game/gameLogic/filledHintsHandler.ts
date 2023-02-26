import { useAppDispatch } from '../../hooks';
import { store } from '../../store';
import {
    HugeActionList,
    updateAreaCell,
    updateAreaCellAuto,
    updatePaintProcess,
} from '../gameSlice';
import { getColumnFromMatrix } from '../gameUtils/helpers';
import {
    CellAreaState,
    ClickType,
    FieldPlace,
    fieldPlace,
    NonogramHint,
} from '../gameUtils/types';
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
                    updateAreaCellAuto({
                        paint: CellAreaState.CROSSED,
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
        dispatch(updatePaintProcess(HugeActionList.AUTOCROSS));
    }
}
