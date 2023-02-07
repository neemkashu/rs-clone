import { CellProps } from '../../../utils/types';

export default function Cell({ cellContent, styles }: CellProps): JSX.Element {
    return (
        <td className="cell-square">
            <div className={`square lh-1 text-center ${styles?.join(' ')}`}>
                {cellContent ?? ''}
            </div>
        </td>
    );
}
