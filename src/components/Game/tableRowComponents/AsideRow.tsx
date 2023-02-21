import { useEffect } from 'react';
import HintAsideCell from '../fieldParts/HintAsideCell';
import { fieldPlace, FieldPlace, NonogramHint } from '../gameUtils/types';

export interface AsideRowProps {
    linesUnified: (NonogramHint | null)[][];
    indexRow: number;
}

export function AsideRow({ linesUnified, indexRow }: AsideRowProps) {
    const location: fieldPlace = FieldPlace.ASIDE;

    return (
        <tr>
            {linesUnified[indexRow].map((cellContent, indexNumberRow) => {
                const squareKey = `${location}-cell-col-${indexRow}-row-${indexNumberRow}`;
                const hint = cellContent?.hint ?? '';
                const isFifth = (indexRow + 1) % 5 === 0;

                return (
                    <HintAsideCell
                        key={squareKey}
                        hint={`${hint}`}
                        styles={[isFifth ? 'border-bottom-plus' : '']}
                        indexRow={indexRow}
                        indexNumberRow={indexNumberRow}
                    />
                );
            })}
        </tr>
    );
}
