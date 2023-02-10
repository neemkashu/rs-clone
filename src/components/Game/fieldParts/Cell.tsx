import { MouseEventHandler } from 'react';
import { firstFieldClick } from '../gameSlice';
import { GameStatus } from '../gameUtils/types';
import { useAppDispatch } from '../../hooks';
import { store } from '../../store';

export interface CellProps {
    cellContent: string;
    styles?: string[];
    handleClick?: () => void;
    handleContext?: () => void;
}
export default function Cell({
    cellContent,
    styles,
    handleClick,
    handleContext,
}: CellProps): JSX.Element {
    const dispatch = useAppDispatch();

    function handlersClickMouse() {
        if (handleClick) {
            handleClick();
        }
        if (!store.getState().game.status) {
            dispatch(firstFieldClick(GameStatus.STARTED));
        }
    }
    const handlersContextMouse: MouseEventHandler = (event?) => {
        event?.preventDefault();
        if (handleContext) {
            handleContext();
        }
        if (!store.getState().game.status) {
            dispatch(firstFieldClick(GameStatus.STARTED));
        }
    };
    return (
        <td
            role="presentation"
            onClick={handlersClickMouse}
            onContextMenu={handlersContextMouse}
            className="cell-square"
        >
            <div className={`square lh-1 text-center ${styles?.join(' ')}`}>
                {cellContent ?? ''}
            </div>
        </td>
    );
}
