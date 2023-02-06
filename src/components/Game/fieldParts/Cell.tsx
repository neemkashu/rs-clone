import { CellProps, fieldPlace } from '../../../utils/types';

export default function Cell({ hint, styles }: CellProps): JSX.Element {
    return (
        <td className="cell-square">
            <div className={`square ${styles?.join(' ')}`}>{hint ?? ''}</div>
        </td>
    );
}
