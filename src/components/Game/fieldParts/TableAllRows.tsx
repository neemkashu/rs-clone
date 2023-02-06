import { TableAllRowsProps, TableFieldRowsProps } from '../../../utils/types';
import TableRow from './TableRow';

export default function TableAllRows({
    location,
    dataLength,
    linesUnified,
}: TableAllRowsProps): JSX.Element {
    const arr = Array.from({ length: dataLength });

    return (
        <>
            {arr.map((_, indexRow) => {
                const tableRowKey = `${location}-row-${indexRow}`;
                return (
                    <TableRow
                        key={`${tableRowKey}-tableRow`}
                        location={location}
                        indexRow={indexRow}
                        linesUnified={linesUnified}
                    />
                );
            })}
        </>
    );
}
