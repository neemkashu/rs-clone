import { CellProps, fieldPlace, NonogramHint } from '../../../utils/types';

export default function Cell({ cellContent, styles }: CellProps): JSX.Element {
    return (
        <td className="cell-square">
            <div className={`square ${styles?.join(' ')}`}>{cellContent ?? ''}</div>
        </td>
    );
}
