import { useContext } from 'react';
import { unifyTwoDimensionalArray } from '../../../utils/helpers';
import { FieldPlace, fieldPlace, GameStatus, NonogramRaw } from '../../../utils/types';
import { useAppSelector } from '../../hooks';
import TableAllRows from './TableAllRows';

const location: fieldPlace = FieldPlace.HEADER;

function ColumnHints({ nonogramRaw }: { nonogramRaw: NonogramRaw | null }): JSX.Element {
    const columns = nonogramRaw?.nonogram.columns;
    const columnsUnified = unifyTwoDimensionalArray(columns);
    const columnsHeight = columnsUnified[0]?.length;

    return (
        <table className="table table-bordered nonogram-hints-border">
            <tbody className="numbers-column-container">
                {columnsUnified && (
                    <TableAllRows
                        location={location}
                        dataLength={columnsHeight}
                        linesUnified={columnsUnified}
                    />
                )}
            </tbody>
        </table>
    );
}

export default ColumnHints;
