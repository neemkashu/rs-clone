import { FieldPlace, fieldPlace, NonogramRaw } from '../../../utils/types';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { selectUserSolution } from '../gameSlice';
import '../gameStyles/DrawArea.scss';
import TableAllRows from './TableAllRows';

const location: fieldPlace = FieldPlace.AREA;
// const rowLinesAmount = rowsUnified.length;

function DrawArea(): JSX.Element {
    // const rowsUnified = nonogramRaw?.nonogram.goal;
    const rowsUnified = store.getState().game.present.userGame?.currentUserSolution;
    // console.warn('DrawArea rerender');
    const rowLinesAmount = rowsUnified?.length ?? 0;
    return (
        <table className="table field-table m-0 table-bordered border-success">
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
