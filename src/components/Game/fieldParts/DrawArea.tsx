import { FieldPlace, fieldPlace, NonogramRaw } from '../../../utils/types';
import { useAppSelector } from '../../hooks';
import '../gameStyles/DrawArea.scss';
import TableAllRows from './TableAllRows';

const location: fieldPlace = FieldPlace.AREA;
// const rowLinesAmount = rowsUnified.length;

function DrawArea({ nonogramRaw }: { nonogramRaw: NonogramRaw | null }): JSX.Element {
    // const rowsUnified = nonogramRaw?.nonogram.goal;
    const rowsUnified = useAppSelector(
        (state) => state.game.userGame?.currentUserSolution
    );
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
