import { fieldPlace } from '../../../utils/types';

export default function NumberCell(
    keyNumber: string,
    indexRow: number,
    indexColumn: number,
    location: fieldPlace
): JSX.Element {
    // eslint-disable-next-line react/destructuring-assignment
    return (
        <div
            key={`${location}-field-row-${indexRow}-col-${indexColumn}`}
            className="square square-number"
        >
            {keyNumber ?? ''}
        </div>
    );
}
