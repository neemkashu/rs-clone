/* eslint-disable max-len */
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

const tableRows = Array.from({ length: rowLinesAmount }, (item, indexRow) => (
    <>{TableRow(location, indexRow, rowsUnified)}</>
));

function DrawArea(): JSX.Element {
    return (
        <table className="table table-bordered game-field nonogram-border">
            <tbody className="numbers-row-container">{tableRows}</tbody>
        </table>
    );
}

export default DrawArea;
