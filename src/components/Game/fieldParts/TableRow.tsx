import { fieldPlace } from '../../../utils/types';
import NumberCell from './NumberCell';

export default function TableRow(
    location: fieldPlace,
    indexRow: number,
    numberLinesUnified: string[][]
): JSX.Element {
    if (location === 'aside') {
        return (
            <tr key={`${location}-row-${indexRow}`}>
                {numberLinesUnified[indexRow].map((cell, indexNumberRow) => {
                    return (
                        <td className="cell-square">
                            {NumberCell(cell, indexRow, indexNumberRow, location)}
                        </td>
                    );
                })}
            </tr>
        );
    }
    if (location === 'header') {
        return (
            <tr key={`${location}-row-${indexRow}`}>
                {numberLinesUnified.map((column, indexColumn) => {
                    return (
                        <td className="cell-square">
                            {NumberCell(
                                column[indexRow],
                                indexRow,
                                indexColumn,
                                location
                            )}
                        </td>
                    );
                })}
            </tr>
        );
    }
    return (
        <tr key={`${location}-row-${indexRow}`}>
            {numberLinesUnified.map((column, indexColumn) => {
                return (
                    <td className="cell-square">
                        {NumberCell(column[indexRow], indexRow, indexColumn, location)}
                    </td>
                );
            })}
        </tr>
    );
}
