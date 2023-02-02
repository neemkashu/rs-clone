import { NONOGRAM_INFO } from '../../../utils/constants';
import './Columns.scss';
import NumberCell from './NumberCell';

const { width, height, goal, rows, columns } = NONOGRAM_INFO;

// the columnsUnified generation will be server part in the future
const columnsUnified = columns
    .trim()
    .split('\n')
    .map((column, index) => column.split(','));

const columnsHeight = columnsUnified.reduce((maxLength, column) => {
    return maxLength > column.length ? maxLength : column.length;
}, 1);

columnsUnified.forEach((column, index) => {
    while (column.length < columnsHeight) {
        column.unshift('');
    }
});
const location = 'header';

const tableRows = Array.from({ length: columnsHeight }, (item, indexRow) => (
    <tr key={`${location}-row-${indexRow}`}>
        {columnsUnified.map((column, indexColumn) => {
            return (
                <td className="cell-square">
                    {NumberCell(column[indexRow], indexRow, indexColumn, location)}
                </td>
            );
        })}
    </tr>
));

function Columns(): JSX.Element {
    return (
        <table className="table table-bordered nonogram-numbers-border">
            <tbody className="numbers-column-container">{tableRows}</tbody>
        </table>
    );
}

export default Columns;
