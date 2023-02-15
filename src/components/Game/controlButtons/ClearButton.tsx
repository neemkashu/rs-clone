import { clearMistakes, selectNonogramRaw, updateUserField } from '../gameSlice';
import { makeCleanField } from '../gameUtils/helpers';
import { NonogramRaw } from '../gameUtils/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button } from './Button';

export function ClearButton() {
    const nonogramRaw = useAppSelector(selectNonogramRaw);
    const userGame = makeCleanField(nonogramRaw);
    const dispatch = useAppDispatch();
    const caption = 'Clear';
    const buttonClass = 'game-clear';

    const handleClick = () => {
        if (userGame) {
            dispatch(updateUserField(userGame));
            dispatch(clearMistakes());
        }
    };
    return <Button caption={caption} buttonClass={buttonClass} handler={handleClick} />;
}
