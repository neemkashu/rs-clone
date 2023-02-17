import {
    clearMistakes,
    selectNonogramRaw,
    selectUserState,
    updateUserField,
} from '../gameSlice';
import { makeCleanField } from '../gameUtils/helpers';
import { GameStatus, NonogramRaw } from '../gameUtils/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button } from './Button';

export function ClearButton() {
    const nonogramRaw = useAppSelector(selectNonogramRaw);
    const userGame = makeCleanField(nonogramRaw);
    const dispatch = useAppDispatch();
    const caption = 'Clear';
    const buttonClass = 'game-clear';

    const gameState = useAppSelector(selectUserState);
    const isActive = gameState !== GameStatus.FINISHED;

    const handleClick = () => {
        if (userGame) {
            dispatch(updateUserField(userGame));
            dispatch(clearMistakes());
        }
    };
    return (
        <Button
            isActive={!isActive}
            caption={caption}
            buttonClass={buttonClass}
            handler={handleClick}
        />
    );
}
