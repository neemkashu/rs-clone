import { FieldPlace, TableRowProps } from '../../../utils/types';
import { NonogramHint } from '../gameUtils/types';
import { AreaRow } from '../tableRowComponents/AreaRow';
import { AsideRow } from '../tableRowComponents/AsideRow';
import { HeaderRow } from '../tableRowComponents/HeaderRow';

export default function TableRow({
    location,
    indexRow,
    linesUnified,
}: TableRowProps): JSX.Element {
    switch (location) {
        case FieldPlace.ASIDE: {
            // console.warn('indexRow', indexRow);
            // console.warn('rowsUnified', rowsUnified);
            const linesUnifiedAside = linesUnified as (NonogramHint | null)[][];
            return <AsideRow linesUnified={linesUnifiedAside} indexRow={indexRow} />;
        }
        case FieldPlace.HEADER: {
            const linesUnifiedHeader = linesUnified as (NonogramHint | null)[][];
            return <HeaderRow linesUnified={linesUnifiedHeader} indexRow={indexRow} />;
        }
        case FieldPlace.AREA: {
            const linesUnifiedArea = linesUnified as (number | null)[][];
            return <AreaRow linesUnified={linesUnifiedArea} indexRow={indexRow} />;
        }
        default: {
            return <tr />;
        }
    }
}
