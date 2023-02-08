import { FieldPlace, TableRowProps } from '../../../utils/types';
import AreaCell from './AreaCell';
import Cell from './Cell';
import HintCell from './HintCell';

export default function TableRow({
    location,
    indexRow,
    linesUnified,
}: TableRowProps): JSX.Element {
    switch (location) {
        case FieldPlace.ASIDE: {
            return (
                <tr>
                    {linesUnified[indexRow].map((cellContent, indexNumberRow) => {
                        const squareKey = `${location}-cell-col-${indexRow}-row-${indexNumberRow}`;
                        const isHint = typeof cellContent !== 'number';
                        const hint = (isHint ? cellContent?.hint : '') ?? '';
                        return (
                            <HintCell
                                key={squareKey}
                                hint={`${hint}`}
                                stateStyle=""
                                styles={[]}
                            />
                        );
                    })}
                </tr>
            );
        }
        case FieldPlace.HEADER: {
            return (
                <tr>
                    {linesUnified.map((column, indexColumn) => {
                        const squareKey = `${location}-cell-col-${indexRow}-row-${indexColumn}`;
                        const cellContent = column[indexRow];
                        const isHint = typeof cellContent !== 'number';
                        const hint = (isHint ? cellContent?.hint : '') ?? '';
                        return (
                            <HintCell
                                key={squareKey}
                                hint={`${hint}`}
                                stateStyle=""
                                styles={[]}
                            />
                        );
                    })}
                </tr>
            );
        }
        case FieldPlace.AREA: {
            return (
                <tr>
                    {linesUnified[indexRow].map((cell, indexNumberRow) => {
                        const cellContent = typeof cell === 'number' ? cell : null;
                        const crossedStyle = cellContent === 0 ? 'crossed-square' : '';
                        const filledStyle = cellContent ?? -1 > 0 ? 'filled-square' : '';
                        const squareKey = `${location}-cell-col-${indexRow}-row-${indexNumberRow}`;
                        return (
                            <AreaCell
                                key={squareKey}
                                cell={cellContent}
                                stateStyle={
                                    (crossedStyle || filledStyle) ?? 'empty-square'
                                }
                                styles={[]}
                            />
                        );
                    })}
                </tr>
            );
        }

        default: {
            return <tr />;
        }
    }
}
