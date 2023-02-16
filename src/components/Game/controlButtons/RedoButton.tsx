import { ActionCreators } from 'redux-undo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { LoadStatus } from '../gameSlice';
import { Button } from './Button';

const buttonClass = '';

export function RedoButton({ caption }: { caption: string }) {
    const isActive = false;
    return (
        <Button
            isActive={isActive}
            caption={caption}
            buttonClass={buttonClass}
            handler={() => console.warn('click redo')}
        />
    );
}
