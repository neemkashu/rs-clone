import { fieldPlace, TableRowProps } from '../../../utils/types';
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
                    {linesUnified[indexRow].map((hint, indexNumberRow) => {
                        const squareKey = `${location}-cell-col-${indexRow}-row-${indexNumberRow}`;
                        return (
                            <Cell key={squareKey} hint={hint} styles={['hint-crossed']} />
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
                        return (
                            <Cell key={squareKey} hint={column[indexRow]} styles={[]} />
                        );
                    })}
                </tr>
            );
        }
        case 'area': {
            return (
                <tr>
                    {linesUnified[indexRow].map((cell, indexNumberRow) => {
                        const crossedStyle = cell === '0' ? 'crossed-square' : '';
                        const filledStyle = +cell > 0 ? 'filled-square' : '';
                        const squareKey = `${location}-cell-col-${indexRow}-row-${indexNumberRow}`;
                        return (
                            <Cell
                                key={squareKey}
                                hint=""
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
