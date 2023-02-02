import { NONOGRAM_INFO } from '../../../utils/constants';
import './Columns.scss';

const { width, height, goal, rows, columns } = NONOGRAM_INFO;

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

const tableRows = Array.from({ length: columnsHeight }, (item, indexRow) => (
    <tr key={`head-numbers-${indexRow}`}>
        {columnsUnified.map((column, indexColumn) => {
            console.log(column, indexColumn);
            const square = (
                <div className="square square-number">{column[indexRow] ?? ''}</div>
            );
            return <td className="cell-square">{square}</td>;
        })}
    </tr>
));

console.log(columnsUnified, columnsHeight, tableRows);
function Columns(): JSX.Element {
    return (
        <table className="table table-bordered nonogram-numbers-border">
            <tbody className="numbers-column-container">{tableRows}</tbody>
        </table>
    );
}

export default Columns;
