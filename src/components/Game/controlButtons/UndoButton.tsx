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
    const canUndo = useAppSelector((state) => state.game.past.length > 1);

    const isActive = canUndo && gameState !== GameStatus.FINISHED;

    console.log(
        'store.getState().game._latestUnfiltered'
        // eslint-disable-next-line no-underscore-dangle
    );

    const handleClick = () => {
        const pastLength = store.getState().game.past.length;
        console.log('HISTORY length: ', pastLength);
        console.log('PAST: ', store.getState().game.past[pastLength - 1].lastAction);
        console.log('PRESENT: ', store.getState().game.present.lastAction);

        const isLongAction =
            store.getState().game.past[pastLength - 1].lastAction ===
                HugeActionList.DRAG_END &&
            store.getState().game.present.lastAction === HugeActionList.DRAG_START;

        const isOneBeforeLong =
            store.getState().game.past[pastLength - 1].lastAction ===
                HugeActionList.REGULAR &&
            store.getState().game.present.lastAction === HugeActionList.DRAG_START &&
            store.getState().game.future.length !== 0;

        // console.log(
        //     'isLongAction:',
        //     isLongAction,
        //     'specific history: ',
        //     isSpecificHistory,
        //     'future length: ',
        //     store.getState().game.future.length,
        //     'prevoius action',
        //     store.getState().game.past[pastLength - 1].lastAction,
        //     'last action',
        //     store.getState().game.present.lastAction
        // );
        if (isLongAction || isOneBeforeLong) {
            dispatch(ActionCreators.jump(-2));
        } else {
            console.log('one cell change!');
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
