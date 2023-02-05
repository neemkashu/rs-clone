import { Fragment } from 'react';
import { NONOGRAM_INFO } from '../../../utils/constants';
import './RowHints.scss';
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

const tableRows = Array.from({ length: rowLinesAmount }, (item, indexRow) => {
    const tableRowKey = `${location}-row-${indexRow}`;
    return (
        <Fragment key={tableRowKey}>
            {TableRow(`${tableRowKey}-tableRow`, location, indexRow, rowsUnified)}
        </Fragment>
    );
});

function RowHints(): JSX.Element {
    return (
        <table className="table table-bordered nonogram-hints-border">
            <tbody>{tableRows}</tbody>
        </table>
    );
}

export default RowHints;
