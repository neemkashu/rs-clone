import { fieldPlace } from '../../../utils/types';

export default function Cell(
    hint: string,
    indexX: number,
    indexY: number,
    location: fieldPlace,
    ...styles: string[]
): JSX.Element {
    const squareKey = `${location}-cell-col-${indexX}-row-${indexY}`;
    return (
        <td key={squareKey} className="cell-square">
            <div className={`square ${styles.join(' ')}`}>{hint ?? ''}</div>
        </td>
    );
}
