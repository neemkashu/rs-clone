import './Columns.scss';

function Columns(): JSX.Element {
    return (
        <div className="game-table-columns">
            <table className="game-field-columns nonogram-table">
                <tbody>
                    <tr>
                        <td className="square crossed-square"></td>
                        <td className="square filled-square"></td>
                        <td className="square crossed-square"></td>
                        <td className="square"></td>
                    </tr>
                    <tr>
                        <td className="square"></td>
                        <td className="square filled-square"></td>
                        <td className="square filled-square"></td>
                        <td className="square crossed-square"></td>
                    </tr>
                    <tr>
                        <td className="square crossed-square"></td>
                        <td className="square filled-square"></td>
                        <td className="square"></td>
                        <td className="square"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Columns;
