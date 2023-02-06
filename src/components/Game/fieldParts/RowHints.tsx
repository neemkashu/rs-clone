import { NONOGRAM_INFO } from '../../../utils/constants';
import { fieldPlace } from '../../../utils/types';
import './RowHints.scss';
import TableAllRows from './TableAllRows';

// getting NONOGRAM INFO will be server part or local storage
const { width, height, goal, rows, columns } = NONOGRAM_INFO;

// the columnsUnified generation will be server part in the future
// --------------server part-------------------------
const rowsUnified = rows
    .trim()
    .split('\n')
    .map((row) => row.split(','));

const rowsHeight = rowsUnified.reduce((maxLength, row) => {
    return maxLength > row.length ? maxLength : row.length;
}, 1);

rowsUnified.forEach((row) => {
    while (row.length < rowsHeight) {
        row.unshift('');
    }
});
// --------------server part-------------------------

const location: fieldPlace = 'aside';
const rowLinesAmount = rowsUnified.length;

function RowHints(): JSX.Element {
    return (
        <table className="table table-bordered nonogram-hints-border">
            <tbody>
                <TableAllRows
                    location={location}
                    dataLength={rowLinesAmount}
                    linesUnified={rowsUnified}
                />
            </tbody>
        </table>
    );
}

export default RowHints;
