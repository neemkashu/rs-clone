import { fieldPlace } from '../../../utils/types';
import NumberCell from './NumberCell';

export default function TableRow(
    location: fieldPlace,
    indexRow: number,
    columnsUnified: string[][]
): JSX.Element {
    return (
        <tr key={`${location}-row-${indexRow}`}>
            {columnsUnified.map((column, indexColumn) => {
                return (
                    <td className="cell-square">
                        {NumberCell(column[indexRow], indexRow, indexColumn, location)}
                    </td>
                );
            })}
        </tr>
    );
}
