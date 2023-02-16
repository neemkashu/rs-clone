import { FieldPlace, fieldPlace, NonogramRaw } from '../../../utils/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { filledLineHandler } from '../gameLogic/filledLineHandler';
import { mistakesHandler } from '../gameLogic/mistakesHandler';
import { clearPainted, selectUserSolution, updatePaintProcess } from '../gameSlice';
import '../gameStyles/DrawArea.scss';
import TableAllRows from './TableAllRows';

const location: fieldPlace = FieldPlace.AREA;
// const rowLinesAmount = rowsUnified.length;
const USER_TIMEOUT = 2000;

function DrawArea(): JSX.Element {
    // const rowsUnified = nonogramRaw?.nonogram.goal;
    const rowsUnified = store.getState().game.present.userGame?.currentUserSolution;
    const rowLinesAmount = rowsUnified?.length ?? 0;
    const dispatch = useAppDispatch();

    const handleDrop = () => {
        console.error('DRAW DROP');
        const alreadyPainted = store.getState().game.present.paintedCells;
        alreadyPainted.forEach((cell) => {
            const { indexRow, indexNumberRow } = cell;
            mistakesHandler(indexRow, indexNumberRow, dispatch, USER_TIMEOUT);
            filledLineHandler(indexRow, indexNumberRow, dispatch, USER_TIMEOUT);
        });
        dispatch(updatePaintProcess(false));
        dispatch(clearPainted());
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
