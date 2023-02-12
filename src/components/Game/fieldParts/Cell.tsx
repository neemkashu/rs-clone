import { MouseEventHandler } from 'react';
import { changeGameStatus } from '../gameSlice';
import { GameStatus } from '../gameUtils/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
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
    const gameStatus = useAppSelector((state) => state.game.status);

    function handlersClickMouse() {
        if (handleClick) {
            handleClick();
        }
        if (!gameStatus) {
            dispatch(changeGameStatus(GameStatus.STARTED));
        }
    }
    const handlersContextMouse: MouseEventHandler = (event?) => {
        event?.preventDefault();
        if (handleContext) {
            handleContext();
        }
        if (!gameStatus) {
            dispatch(changeGameStatus(GameStatus.STARTED));
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
