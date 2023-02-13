import { updateUserField } from '../Game/gameSlice';
import { makeCleanField } from '../Game/gameUtils/helpers';
import { NonogramRaw } from '../Game/gameUtils/types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Button } from './Button';

export function ClearButton({ nonogramRaw }: { nonogramRaw: NonogramRaw }) {
    const userGame = makeCleanField(nonogramRaw);
    const dispatch = useAppDispatch();
    const caption = 'Clear';
    const buttonClass = 'game-clear';

    const handleClick = () => {
        if (userGame) {
            dispatch(updateUserField(userGame));
        }
    };
    return <Button caption={caption} buttonClass={buttonClass} handler={handleClick} />;
}
