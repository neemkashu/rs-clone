import { fieldPlace, TableAllRowsProps, TableRowProps } from '../../../utils/types';
import Cell from './Cell';

export default function TableRow({
    location,
    indexRow,
    linesUnified,
}: TableRowProps): JSX.Element {
    switch (location) {
        case 'aside': {
            return (
                <tr>
                    {linesUnified[indexRow].map((cellContent, indexNumberRow) => {
                        const squareKey = `${location}-cell-col-${indexRow}-row-${indexNumberRow}`;
                        const isHint = typeof cellContent !== 'number';
                        return (
                            <Cell
                                key={squareKey}
                                cellContent={`${(isHint ? cellContent?.hint : '') ?? ''}`}
                                styles={['hint-crossed']}
                            />
                        );
                    })}
                </tr>
            );
        }
        case 'header': {
            return (
                <tr>
                    {linesUnified.map((column, indexColumn) => {
                        const squareKey = `${location}-cell-col-${indexRow}-row-${indexColumn}`;
                        const cellContent = column[indexRow];
                        const isHint = typeof cellContent !== 'number';
                        return (
                            <Cell
                                key={squareKey}
                                cellContent={`${(isHint ? cellContent?.hint : '') ?? ''}`}
                                styles={[]}
                            />
                        );
                    })}
                </tr>
            );
        }
        case 'area': {
            return (
                <tr>
                    {linesUnified[indexRow].map((cell, indexNumberRow) => {
                        // TODO: in future 'area' case is for
                        // cell of type number | null

                        const cellContent = typeof cell === 'number' ? cell : cell?.hint;
                        const crossedStyle = cellContent === 0 ? 'crossed-square' : '';
                        const filledStyle = cellContent > 0 ? 'filled-square' : '';
                        const squareKey = `${location}-cell-col-${indexRow}-row-${indexNumberRow}`;
                        return (
                            <Cell
                                key={squareKey}
                                cellContent=""
                                styles={[crossedStyle, filledStyle]}
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
