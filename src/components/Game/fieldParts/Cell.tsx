import { MouseEventHandler } from 'react';
import { changeGameStatus } from '../gameSlice';
import { GameStatus } from '../gameUtils/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';

export interface CellProps {
    cellContent: string;
    stateStyle?: string[];
    styles?: string[];
    handleClick?: () => void;
    handleContext?: () => void;
}
export default function Cell({
    cellContent,
    styles,
    stateStyle,
    handleClick,
    handleContext,
}: CellProps): JSX.Element {
    const dispatch = useAppDispatch();
    const gameStatus = useAppSelector((state) => state.game.userGame?.state);

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
        if (!store.getState().game.userGame?.state) {
            dispatch(changeGameStatus(GameStatus.STARTED));
        }
    };
    return (
        <td
            role="presentation"
            onClick={handlersClickMouse}
            onContextMenu={handlersContextMouse}
            className={`cell-square ${styles?.join(' ')}`}
        >
            <div className={`square lh-1 text-center ${stateStyle?.join(' ')}`}>
                {cellContent ?? ''}
            </div>
        </td>
    );
}
