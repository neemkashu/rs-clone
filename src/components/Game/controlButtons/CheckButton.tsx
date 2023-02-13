import { NonogramRaw } from '../gameUtils/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button } from './Button';

export function CheckButton({ nonogramRaw }: { nonogramRaw: NonogramRaw }) {
    const dispatch = useAppDispatch();
    const caption = 'Check';
    const buttonClass = '';
    const userSolution = useAppSelector(
        (state) => state.game.userGame?.currentUserSolution
    );

    const handleClick = () => {
        if (userSolution) {
            // dispatch(updateUserGame(userGame));
        }
    };
    return <Button caption={caption} buttonClass={buttonClass} handler={handleClick} />;
}
