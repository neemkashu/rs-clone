import './Field.scss';
import Columns from './fieldTop/Columns';

const NONOGRAM_INFO = {
    // temp const before getting info from back-end
    width: 30,
    height: 20,
    difficulty: 3.2,
    status: 'new',
    rows: `
3
5
4
5
5
19
22
22
5,5
6,5
5,4,4
6,7,3
7,7,4
9,8,4
9,8,4
6,5,7,4
6,5,5,4
5,5,4
4,6,5
3,6,6
15
12
9
5
3`,
    columns: `
2
4
5
5
1,5
3,4
3,5
3,4
3,4
3,7
3,10
15
16
7,6
2,5,5
2,5,5
3,3,5,4
7,6,4
7,7,5
6,7,5
5,7,5
5,7,4
3,5,4
5,2,5
4,4
5,6
14
12
8
4
    `,
    goal:
        '000000000000001110000000000000000000000000001111100000000000000000000000000011110000000000000000000000000001111100000000000000000000000001111100000000000001111111111111111111000000000011111111111111111111110000000001111111111111111111111000000000000001111100000001111100000000000011111100000001111100000000000111110000111100011110000000001111110011111110001110000000111111100011111110001111000011111111100011111111001111000011111111100011111111001111001111110111110011111110001111011111100111110001111100011110111110000011111000000000011110111100000011111100000001111100011100000001111110000011111100000000000000111111111111111000000000000000001111111111110000000000000000000111111111000000000000000000000001111100000000000000000000000000111000000000',
};
const { width, height, goal, rows, columns } = NONOGRAM_INFO;

function Field(): JSX.Element {
    return (
        <div className="game-table-container">
            <Columns />
            <table className="table table-bordered game-field nonogram-border">
                <tbody>
                    <tr>
                        <td className="cell-square">
                            <div className="square crossed-square"></div>
                        </td>
                        <td className="cell-square">
                            <div className="square filled-square"></div>
                        </td>
                        <td className="cell-square">
                            <div className="square crossed-square"></div>
                        </td>
                        <td className="cell-square">
                            <div className="square crossed-square"></div>
                        </td>
                    </tr>
                    <tr>
                        <td className="cell-square">
                            <div className="square"></div>
                        </td>
                        <td className="cell-square">
                            <div className="square filled-square"></div>
                        </td>
                        <td className="cell-square">
                            <div className="square filled-square"></div>
                        </td>
                        <td className="cell-square">
                            <div className="square crossed-square"></div>
                        </td>
                    </tr>
                    <tr>
                        <td className="cell-square">
                            <div className="square crossed-square"></div>
                        </td>
                        <td className="cell-square">
                            <div className="square filled-square"></div>
                        </td>
                        <td className="cell-square">
                            <div className="square"></div>
                        </td>
                        <td className="cell-square">
                            <div className="square"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Field;
