import { ActionCreators } from 'redux-undo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { LoadStatus, selectUserState } from '../gameSlice';
import { GameStatus } from '../gameUtils/types';
import { Button } from './Button';

const buttonClass = '';

export function RedoButton({ caption }: { caption: string }) {
    const dispatch = useAppDispatch();
    const gameState = useAppSelector(selectUserState);
    const canRedo = useAppSelector((state) => state.game.future.length > 0);

    const isActive = canRedo && gameState !== GameStatus.FINISHED;
    const handleClick = () => dispatch(ActionCreators.redo());

    return (
        <Button
            caption={caption}
            buttonClass={buttonClass}
            handler={handleClick}
            isActive={!isActive}
        />
    );
}
