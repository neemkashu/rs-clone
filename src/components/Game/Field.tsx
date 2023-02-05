import './gameStyles/Field.scss';
import ColumnHints from './fieldParts/ColumnHints';
import DrawArea from './fieldParts/DrawArea';
import RowHints from './fieldParts/RowHints';

function Field(): JSX.Element {
    return (
        <div className="d-flex flex-column align-items-end">
            <ColumnHints />
            <div className="d-flex flex-nowrap">
                <RowHints />
                <DrawArea />
            </div>
        </div>
    );
}

export default Field;
