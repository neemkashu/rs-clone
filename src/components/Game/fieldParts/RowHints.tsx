import { unifyTwoDimensionalArray } from '../../../utils/helpers';
import { FieldPlace, fieldPlace, NonogramRaw } from '../../../utils/types';
import './RowHints.scss';
import TableAllRows from './TableAllRows';

const location: fieldPlace = FieldPlace.ASIDE;
// const rowLinesAmount = rowsUnified.length;

function RowHints({ nonogramRaw }: { nonogramRaw: NonogramRaw | null }): JSX.Element {
    const rows = nonogramRaw?.nonogram.rows;
    const rowsUnified = unifyTwoDimensionalArray(rows);
    const rowLinesAmount = rowsUnified?.length ?? 0;
    return (
        <table className="table table-bordered nonogram-hints-border">
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

export default RowHints;
