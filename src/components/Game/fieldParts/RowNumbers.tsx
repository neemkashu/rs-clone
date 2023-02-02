import { NONOGRAM_INFO } from '../../../utils/constants';
import './RowNumbers.scss';
import TableRow from './TableRow';

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

const location = 'aside';
const rowLinesAmount = rowsUnified.length;

const tableRows = Array.from({ length: rowLinesAmount }, (item, indexRow) => (
    <>{TableRow(location, indexRow, rowsUnified)}</>
));

function RowNumbers(): JSX.Element {
    return (
        <table className="table table-bordered nonogram-numbers-border">
            <tbody className="numbers-row-container">{tableRows}</tbody>
        </table>
    );
}

export default RowNumbers;
