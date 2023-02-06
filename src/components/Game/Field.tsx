import './gameStyles/Field.scss';
import ColumnHints from './fieldParts/ColumnHints';
import DrawArea from './fieldParts/DrawArea';
import RowHints from './fieldParts/RowHints';
import { NonogramRaw } from '../../utils/types';

function Field({ nonogramRaw }: { nonogramRaw: NonogramRaw | null }): JSX.Element {
    return (
        <div className="d-flex flex-column align-items-end">
            <ColumnHints nonogramRaw={nonogramRaw} />
            <div className="d-flex flex-nowrap">
                <RowHints nonogramRaw={nonogramRaw} />
                <DrawArea nonogramRaw={nonogramRaw} />
            </div>
        </div>
    );
}

export default Field;
