import { convertSettingToNumber } from '../../../utils/helpers';
import { FieldPlace, fieldPlace, NonogramRaw } from '../../../utils/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { filledLineHandler } from '../gameLogic/filledLineHandler';
import { mistakesHandler } from '../gameLogic/mistakesHandler';
import {
    changeLastAction,
    clearPainted,
    HugeActionList,
    selectUserSolution,
    updateAreaCell,
    updateAreaCellAuto,
    updatePaintProcess,
} from '../gameSlice';
import '../gameStyles/DrawArea.scss';
import { CellAreaState, ClickType } from '../gameUtils/types';
import TableAllRows from './TableAllRows';

const location: fieldPlace = FieldPlace.AREA;

function DrawArea(): JSX.Element {
    // const rowsUnified = nonogramRaw?.nonogram.goal;
    const rowsUnified = store.getState().game.present.userGame?.currentUserSolution;
    // console.warn('DrawArea rerender');
    const rowLinesAmount = rowsUnified?.length ?? 0;
    const dispatch = useAppDispatch();
    const delayMistakesFromSetting = useAppSelector(
        (state) => state.settings.game.highlightCellsWithError
    );
    const delayMistakes = convertSettingToNumber(delayMistakesFromSetting);
    const delayCompleteFromSetting = useAppSelector(
        (state) => state.settings.game.automaticallyCrossOutNumbers
    );
    const delayComplete = convertSettingToNumber(delayCompleteFromSetting);

    const handleDrop = () => {
        console.log('%c DRAW DROP!', 'background: #eeeeff; color: #000');
        const alreadyPainted = store.getState().game.present.paintedCells;
        alreadyPainted?.forEach((row, indexRow) => {
            row.forEach((cell, indexNumberRow) => {
                if (cell === 1) {
                    dispatch(
                        updateAreaCellAuto({
                            paint: CellAreaState.FILLED,
                            indexRow,
                            indexNumberRow,
                        })
                    );
                    mistakesHandler(indexRow, indexNumberRow, dispatch, delayMistakes);
                    filledLineHandler(indexRow, indexNumberRow, dispatch, delayComplete);
                }
            });
        });
        dispatch(clearPainted());
        dispatch(updatePaintProcess(HugeActionList.DRAG_END));
    };
    return (
        <table onDrop={handleDrop} className="table field-table m-0 table-bordered">
            <tbody>
                {rowsUnified ? (
                    <TableAllRows
                        location={location}
                        dataLength={rowLinesAmount}
                        linesUnified={rowsUnified}
                    />
                ) : (
                    <tr />
                )}
            </tbody>
        </table>
    );
}

export default DrawArea;
