import ColumnHints from './fieldParts/ColumnHints';
import DrawArea from './fieldParts/DrawArea';
import RowHints from './fieldParts/RowHints';

const styleField = {
    fontSize: '0.95rem',
};

function Field(): JSX.Element {
    // console.warn('FIELD RERENDER');
    return (
        <div className="d-flex justify-content-center" style={styleField}>
            <div className="d-flex flex-column align-items-end game-field">
                <ColumnHints />
                <div className="d-flex flex-nowrap">
                    <RowHints />
                    <DrawArea />
                </div>
            </div>
        </div>
    );
}

export default Field;
