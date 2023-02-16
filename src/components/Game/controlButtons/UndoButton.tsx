import { ActionCreators } from 'redux-undo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { LoadStatus } from '../gameSlice';
import { Button } from './Button';

const buttonClass = '';

export function UndoButton({ caption }: { caption: string }) {
    const dispatch = useAppDispatch();
    const canUndo = useAppSelector((state) => state.game.past.length > 1);

    const handleClick = () => dispatch(ActionCreators.undo());

    return (
        <Button
            caption={caption}
            buttonClass={buttonClass}
            handler={handleClick}
            isActive={!canUndo}
        />
    );
}
