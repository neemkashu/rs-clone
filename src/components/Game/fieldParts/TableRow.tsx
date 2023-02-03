import { fieldPlace } from '../../../utils/types';
import Cell from './Cell';

export default function TableRow(
    location: fieldPlace,
    indexRow: number,
    linesUnified: string[][]
): JSX.Element {
    if (location === 'aside') {
        return (
            <tr key={`${location}-row-${indexRow}`}>
                {linesUnified[indexRow].map((hint, indexNumberRow) => {
                    return Cell(hint, 'hint-crossed');
                })}
            </tr>
        );
    }
    if (location === 'header') {
        return (
            <tr key={`${location}-row-${indexRow}`}>
                {linesUnified.map((column, indexColumn) => Cell(column[indexRow]))}
            </tr>
        );
    }
    if (location === 'area') {
        return (
            <tr key={`${location}-row-${indexRow}`}>
                {linesUnified[indexRow].map((cell, indexNumberRow) => {
                    const crossedStyle = cell === '0' ? 'crossed-square' : '';
                    const filledStyle = +cell > 0 ? 'filled-square' : '';
                    return Cell('', crossedStyle, filledStyle);
                })}
            </tr>
        );
    }
    throw new Error('Incorrect location for table row');
}
