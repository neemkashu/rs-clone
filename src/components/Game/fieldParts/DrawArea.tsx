/* eslint-disable max-len */
import { Fragment } from 'react';
import { NONOGRAM_INFO } from '../../../utils/constants';
import './DrawArea.scss';
import TableRow from './TableRow';

// getting NONOGRAM INFO will be server part or local storage
const { width, height, rows, columns } = NONOGRAM_INFO;

// the columnsUnified generation will be server part in the future
// --------------server part-------------------------
const goal = [
    [1, 0, 1],
    [0, 1, 0],
];

const rowsUnified = goal.map((line) => line.map((cell) => `${cell}`));
// --------------server part-------------------------

const location = 'area';
const rowLinesAmount = rowsUnified.length;

const tableRows = Array.from({ length: rowLinesAmount }, (item, indexRow) => {
    const tableRowKey = `${location}-row-${indexRow}`;
    return (
        <Fragment key={tableRowKey}>
            {TableRow(`${tableRowKey}-tableRow`, location, indexRow, rowsUnified)}
        </Fragment>
    );
});

function DrawArea(): JSX.Element {
    return (
        <table className="table table-bordered border-success">
            <tbody>{tableRows}</tbody>
        </table>
    );
}

export default DrawArea;
