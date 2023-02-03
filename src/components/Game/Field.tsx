import './Field.scss';
import ColumnHints from './fieldParts/ColumnHints';
import DrawArea from './fieldParts/DrawArea';
import RowHints from './fieldParts/RowHints';

function Field(): JSX.Element {
    return (
        <div className="game-table-container">
            <ColumnHints />
            <div className="aside-and-field">
                <RowHints />
                <DrawArea />
            </div>
        </div>
    );
}

export default Field;
