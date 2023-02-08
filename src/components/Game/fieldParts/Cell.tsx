import { CellProps } from '../../../utils/types';

export default function Cell({ cellContent, styles, handler }: CellProps): JSX.Element {
    return (
        <td role="presentation" onClick={handler} className="cell-square">
            <div className={`square lh-1 text-center ${styles?.join(' ')}`}>
                {cellContent ?? ''}
            </div>
        </td>
    );
}
