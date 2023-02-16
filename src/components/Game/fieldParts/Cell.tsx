import { MouseEventHandler, DragEventHandler } from 'react';
import { changeGameStatus, selectUserState } from '../gameSlice';
import { GameStatus } from '../gameUtils/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';

export interface CellProps {
    cellContent: string;
    stateStyle?: string[];
    styles?: string[];
    isDraggable?: boolean;
    handleClick?: () => void;
    handleContext?: () => void;
    handleDrag?: DragEventHandler;
    handleDragEnter?: MouseEventHandler;
    handleDragDrop?: MouseEventHandler;
}
export default function Cell({
    cellContent,
    styles,
    stateStyle,
    handleClick,
    handleContext,
    handleDrag,
    handleDragEnter,
    handleDragDrop,
    isDraggable,
}: CellProps): JSX.Element {
    const dispatch = useAppDispatch();
    const gameStatus = useAppSelector(selectUserState);

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
        if (!store.getState().game.present.userGame?.state) {
            dispatch(changeGameStatus(GameStatus.STARTED));
        }
    };

    return (
        <td
            role="presentation"
            onClick={handlersClickMouse}
            onContextMenu={handlersContextMouse}
            onDragEnter={(event) => event.preventDefault()}
            className={`cell-square ${styles?.filter((item) => item)?.join(' ')}`}
        >
            <div
                draggable={isDraggable}
                onDragStart={handleDrag}
                onDragEnter={handleDragEnter}
                onDrop={handleDragDrop}
                className={`square lh-1 text-center ${stateStyle
                    ?.filter((item) => item)
                    ?.join(' ')}`}
            >
                {cellContent ?? ''}
            </div>
        </td>
    );
}
