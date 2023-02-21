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
// const rowLinesAmount = rowsUnified.length;
const USER_TIMEOUT = 2000;

function DrawArea(): JSX.Element {
    // const rowsUnified = nonogramRaw?.nonogram.goal;
    const rowsUnified = store.getState().game.present.userGame?.currentUserSolution;
    // console.warn('DrawArea rerender');
    const rowLinesAmount = rowsUnified?.length ?? 0;
    const dispatch = useAppDispatch();

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
                    mistakesHandler(indexRow, indexNumberRow, dispatch, USER_TIMEOUT);
                    filledLineHandler(indexRow, indexNumberRow, dispatch, USER_TIMEOUT);
                }
            });
        });
        dispatch(clearPainted());
        dispatch(updatePaintProcess(HugeActionList.DRAG_END));
    };
    return (
        <table
            onDrop={handleDrop}
            className="table field-table m-0 table-bordered border-success"
        >
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
