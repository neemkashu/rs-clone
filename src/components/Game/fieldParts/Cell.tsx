import { CellProps } from '../../../utils/types';
import { firstFieldClick } from '../gameSlice';
import { GameStatus } from '../gameUtils/types';
import { useAppDispatch } from '../../hooks';

export default function Cell({ cellContent, styles, handler }: CellProps): JSX.Element {
    const dispatch = useAppDispatch();
    function handlers() {
        if (handler) {
            handler();
        }
        dispatch(firstFieldClick(GameStatus.INITIAL));
    }
    return (
        <td role="presentation" onClick={handlers} className="cell-square">
            <div className={`square lh-1 text-center ${styles?.join(' ')}`}>
                {cellContent ?? ''}
            </div>
        </td>
    );
}
