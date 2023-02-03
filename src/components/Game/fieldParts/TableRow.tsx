import { fieldPlace } from '../../../utils/types';
import Cell from './Cell';

export default function TableRow(
    tableRowKey: string,
    location: fieldPlace,
    indexRow: number,
    linesUnified: string[][]
): JSX.Element {
    if (location === 'aside') {
        return (
            <tr key={tableRowKey}>
                {linesUnified[indexRow].map((hint, indexNumberRow) => {
                    return Cell(hint, indexRow, indexNumberRow, location, 'hint-crossed');
                })}
            </tr>
        );
    }
    if (location === 'header') {
        return (
            <tr key={tableRowKey}>
                {linesUnified.map((column, indexColumn) =>
                    Cell(column[indexRow], indexRow, indexColumn, location)
                )}
            </tr>
        );
    }
    if (location === 'area') {
        return (
            <tr key={tableRowKey}>
                {linesUnified[indexRow].map((cell, indexNumberRow) => {
                    const crossedStyle = cell === '0' ? 'crossed-square' : '';
                    const filledStyle = +cell > 0 ? 'filled-square' : '';
                    return Cell(
                        '',
                        indexRow,
                        indexNumberRow,
                        location,
                        crossedStyle,
                        filledStyle
                    );
                })}
            </tr>
        );
    }
    throw new Error('Incorrect location for table row');
}
