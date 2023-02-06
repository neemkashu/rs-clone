import { NONOGRAM_INFO } from '../../../utils/constants';
import { fieldPlace, NonogramRaw } from '../../../utils/types';
import './DrawArea.scss';
import TableAllRows from './TableAllRows';

// getting NONOGRAM INFO will be server part or local storage
const { width, height, rows, columns } = NONOGRAM_INFO;

// the columnsUnified generation will be server part in the future
// --------------server part-------------------------
const goal = [
    [1, 0, 1],
    [0, 1, 0],
];

// const rowsUnified = goal.map((line) => line.map((cell) => `${cell}`));
// --------------server part-------------------------

const location: fieldPlace = 'area';
// const rowLinesAmount = rowsUnified.length;

function DrawArea({ nonogramRaw }: { nonogramRaw: NonogramRaw | null }): JSX.Element {
    const rowsUnified = nonogramRaw?.nonogram.goal;
    const rowLinesAmount = rowsUnified?.length ?? 0;
    return (
        <table className="table m-0 table-bordered border-success">
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
