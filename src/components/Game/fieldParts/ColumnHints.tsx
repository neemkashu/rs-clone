import { NONOGRAM_INFO } from '../../../utils/constants';
import { fieldPlace } from '../../../utils/types';
import './ColumnHints.scss';
import TableAllRows from './TableAllRows';

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

const location: fieldPlace = 'header';

function ColumnHints(): JSX.Element {
    return (
        <table className="table table-bordered nonogram-hints-border">
            <tbody className="numbers-column-container">
                <TableAllRows
                    location={location}
                    dataLength={columnsHeight}
                    linesUnified={columnsUnified}
                />
            </tbody>
        </table>
    );
}

export default ColumnHints;
