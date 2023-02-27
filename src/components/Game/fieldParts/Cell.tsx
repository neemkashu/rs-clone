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

function handleFirstClick(
    dispatch: ReturnType<typeof useAppDispatch>,
    gameStatus?: GameStatus
): void {
    if (gameStatus !== GameStatus.STARTED && gameStatus !== GameStatus.FINISHED) {
        dispatch(changeGameStatus(GameStatus.STARTED));
    }
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
        handleFirstClick(dispatch, gameStatus);
    }
    const handlersContextMouse: MouseEventHandler = (event?) => {
        event?.preventDefault();
        if (handleContext) {
            handleContext();
        }
        handleFirstClick(dispatch, gameStatus);
    };
    const handlersDrag: DragEventHandler = (event) => {
        if (handleDrag) {
            handleDrag(event);
        }
        handleFirstClick(dispatch, gameStatus);
    };

    return (
        <td
            role="presentation"
            onClick={handlersClickMouse}
            onContextMenu={handlersContextMouse}
            onDragEnter={(event) => event.preventDefault()}
            onDrop={handleDragDrop}
            onDragStart={handlersDrag}
            className={`cell-square ${styles?.filter((item) => item)?.join(' ')}`}
            draggable={isDraggable}
            onDragOver={(event) => event.preventDefault()}
        >
            <div
                style={{ lineHeight: '1.1' }}
                onDragEnter={handleDragEnter}
                className={`square lh-1 text-center ${stateStyle
                    ?.filter((item) => item)
                    ?.join(' ')}`}
            >
                {cellContent ?? ''}
            </div>
        </td>
    );
}
