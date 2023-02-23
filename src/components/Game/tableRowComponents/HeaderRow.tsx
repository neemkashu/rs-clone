import HintHeaderCell from '../fieldParts/HintHeaderCell';
import { fieldPlace, FieldPlace, NonogramHint } from '../gameUtils/types';

export interface HeaderRowProps {
    linesUnified: (NonogramHint | null)[][];
    indexRow: number;
}

export function HeaderRow({ linesUnified, indexRow }: HeaderRowProps) {
    const location: fieldPlace = FieldPlace.HEADER;
    return (
        <tr>
            {linesUnified.map((column, indexColumn) => {
                const squareKey = `${location}-cell-col-${indexRow}-row-${indexColumn}`;
                const cellContent = column[indexRow];
                const hint = cellContent?.hint ?? '';
                const isFifth = (indexColumn + 1) % 5 === 0;

                return (
                    <HintHeaderCell
                        key={squareKey}
                        hint={`${hint}`}
                        styles={[isFifth ? 'border-right-plus' : '']}
                        indexRow={indexRow}
                        indexNumberRow={indexColumn}
                    />
                );
            })}
        </tr>
    );
}
