import { ActionCreators } from 'redux-undo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { LoadStatus, selectUserState } from '../gameSlice';
import { GameStatus } from '../gameUtils/types';
import { Button } from './Button';

const buttonClass = '';

export function UndoButton({ caption }: { caption: string }) {
    const dispatch = useAppDispatch();
    const gameState = useAppSelector(selectUserState);
    const canUndo = useAppSelector((state) => state.game.past.length > 1);

    const isActive = canUndo && gameState !== GameStatus.FINISHED;

    const handleClick = () => dispatch(ActionCreators.undo());

    return (
        <Button
            caption={caption}
            buttonClass={buttonClass}
            handler={handleClick}
            isActive={!isActive}
        />
    );
}
