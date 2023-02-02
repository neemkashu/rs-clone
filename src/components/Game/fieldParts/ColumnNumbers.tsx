import { NONOGRAM_INFO } from '../../../utils/constants';
import './ColumnNumbers.scss';
import TableRow from './TableRow';

// getting NONOGRAM INFO will be server part or local storage
const { width, height, goal, rows, columns } = NONOGRAM_INFO;

// the columnsUnified generation will be server part in the future
// --------------server part-------------------------
const columnsUnified = columns
    .trim()
    .split('\n')
    .map((column) => column.split(','));

const columnsHeight = columnsUnified.reduce((maxLength, column) => {
    return maxLength > column.length ? maxLength : column.length;
}, 1);

columnsUnified.forEach((column) => {
    while (column.length < columnsHeight) {
        column.unshift('');
    }
});
// --------------server part-------------------------

const location = 'header';

const tableRows = Array.from({ length: columnsHeight }, (item, indexRow) => (
    <>{TableRow(location, indexRow, columnsUnified)}</>
));

function ColumnNumbers(): JSX.Element {
    return (
        <table className="table table-bordered nonogram-numbers-border">
            <tbody className="numbers-column-container">{tableRows}</tbody>
        </table>
    );
}

export default ColumnNumbers;
