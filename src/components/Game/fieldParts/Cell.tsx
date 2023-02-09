import { CellProps } from '../../../utils/types';
import { firstFieldClick } from '../gameSlice';
import { GameStatus } from '../gameUtils/types';
import { useAppDispatch } from '../../hooks';
import { store } from '../../store';

export default function Cell({ cellContent, styles, handler }: CellProps): JSX.Element {
    const dispatch = useAppDispatch();
    function handlers() {
        if (handler) {
            handler();
        }
        if (!store.getState().game.status) {
            dispatch(firstFieldClick(GameStatus.STARTED));
        }
    }
    return (
        <td role="presentation" onClick={handlers} className="cell-square">
            <div className={`square lh-1 text-center ${styles?.join(' ')}`}>
                {cellContent ?? ''}
            </div>
        </td>
    );
}
