import { ActionCreators } from 'redux-undo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { HugeActionList, LoadStatus, selectUserState } from '../gameSlice';
import { GameStatus } from '../gameUtils/types';
import { Button } from './Button';

const buttonClass = '';

export function UndoButton({ caption }: { caption: string }) {
    const dispatch = useAppDispatch();
    const gameState = useAppSelector(selectUserState);
    const historyLength = useAppSelector((state) => state.game.past.length);
    const isLongHistory = historyLength > 1;
    const lastAction = useAppSelector((state) => state.game.present.lastAction);
    const preLastAction = useAppSelector(
        (state) => state.game.past[historyLength - 1].lastAction
    );

    const isFirstActionDrag =
        preLastAction === HugeActionList.LOADED &&
        lastAction === HugeActionList.DRAG_START;

    const isActive =
        isLongHistory &&
        gameState !== GameStatus.FINISHED &&
        lastAction !== HugeActionList.LOADED &&
        !isFirstActionDrag;

    const handleClick = () => {
        const pastLength = store.getState().game.past.length;
        const isLongAction =
            store.getState().game.past[pastLength - 1].lastAction ===
                HugeActionList.DRAG_END &&
            store.getState().game.present.lastAction === HugeActionList.DRAG_START;

        const isOneBeforeLong =
            store.getState().game.past[pastLength - 1].lastAction ===
                HugeActionList.REGULAR &&
            store.getState().game.present.lastAction === HugeActionList.DRAG_START &&
            store.getState().game.future.length !== 0;

        if (isLongAction || isOneBeforeLong) {
            dispatch(ActionCreators.jump(-2));
        } else {
            dispatch(ActionCreators.undo());
        }
    };

    return (
        <Button
            caption={caption}
            buttonClass={buttonClass}
            handler={handleClick}
            isActive={!isActive}
        />
    );
}
