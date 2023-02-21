import { ActionCreators } from 'redux-undo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { HugeActionList, LoadStatus, selectUserState } from '../gameSlice';
import { GameStatus } from '../gameUtils/types';
import { Button } from './Button';

const buttonClass = '';

export function RedoButton({ caption }: { caption: string }) {
    const dispatch = useAppDispatch();
    const gameState = useAppSelector(selectUserState);
    const canRedo = useAppSelector((state) => state.game.future.length > 0);

    const isActive = canRedo && gameState !== GameStatus.FINISHED;
    const handleClick = () => {
        const pastLength = store.getState().game.past.length;
        console.log('HISTORY length: ', pastLength);
        console.log('PAST: ', store.getState().game.past[pastLength - 1].lastAction);
        console.log('PRESENT: ', store.getState().game.present.lastAction);

        const isLongAction =
            store.getState().game.future[0].lastAction === HugeActionList.DRAG_START &&
            store.getState().game.present.lastAction === HugeActionList.DRAG_END;

        const isOneBeforeLong =
            store.getState().game.future[0].lastAction === HugeActionList.DRAG_START &&
            store.getState().game.present.lastAction === HugeActionList.REGULAR &&
            store.getState().game.future.length >= 2;

        // console.log(
        //     'isLongAction:',
        //     isLongAction,
        //     'future length: ',
        //     store.getState().game.future.length,
        //     'prevoius action',
        //     store.getState().game.past[pastLength - 1].lastAction,
        //     'last action',
        //     store.getState().game.present.lastAction,
        //     store.getState().game.future.length > 1
        //         ? store.getState().game.future
        //         : 'future'
        // );
        if (isLongAction || isOneBeforeLong) {
            dispatch(ActionCreators.jump(2));
        } else {
            console.log('one cell change!');
            dispatch(ActionCreators.redo());
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
