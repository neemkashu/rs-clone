import AreaCell from '../fieldParts/AreaCell';
import { fieldPlace, FieldPlace } from '../gameUtils/types';

export interface AreaRowProps {
    linesUnified: (number | null)[][];
    indexRow: number;
}
const PERIOD_OF_WIDE_TABLE_LINE = 5;

export function AreaRow({ linesUnified, indexRow }: AreaRowProps) {
    const location: fieldPlace = FieldPlace.AREA;

    return (
        <tr>
            {linesUnified[indexRow].map((cell, indexNumberRow) => {
                const squareKey = `${location}-cell-col-${indexRow}-row-${indexNumberRow}`;
                const isBottomBorder = (indexRow + 1) % PERIOD_OF_WIDE_TABLE_LINE === 0;
                const isRightBorder =
                    (indexNumberRow + 1) % PERIOD_OF_WIDE_TABLE_LINE === 0;

                return (
                    <AreaCell
                        key={squareKey}
                        styles={[
                            isBottomBorder ? 'border-bottom-plus' : '',
                            isRightBorder ? 'border-right-plus' : '',
                        ]}
                        indexRow={indexRow}
                        indexNumberRow={indexNumberRow}
                    />
                );
            })}
        </tr>
    );
}
