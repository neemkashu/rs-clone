import { cellClass } from '../../../utils/constants';
import { fieldPlace } from '../../../utils/types';

export default function HintCell(
    keyNumber: string,
    indexRow: number,
    indexColumn: number,
    location: fieldPlace,
    state?: typeof cellClass
): JSX.Element {
    // eslint-disable-next-line react/destructuring-assignment
    let cellSquareClass = keyNumber === '0' ? cellClass.crossed : cellClass.filled;
    cellSquareClass = location === 'area' ? cellSquareClass : '';
    const cellContent = location === 'area' ? '' : keyNumber;

    return (
        <div
            key={`${location}-field-row-${indexRow}-col-${indexColumn}`}
            className={`square ${cellSquareClass}`}
        >
            {cellContent ?? ''}
        </div>
    );
}
