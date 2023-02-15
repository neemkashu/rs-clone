import { ActionCreators } from 'redux-undo';
import { useAppDispatch } from '../../hooks';
import { Button } from './Button';

const buttonClass = '';

export function UndoButton({ caption }: { caption: string }) {
    const dispatch = useAppDispatch();

    const handleClick = () => dispatch(ActionCreators.undo());

    return <Button caption={caption} buttonClass={buttonClass} handler={handleClick} />;
}
