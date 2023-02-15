import { changeGameStatus, clearMistakes, updateUserGame } from '../gameSlice';
import { makeInitialSaveGame, setTimeToStorage } from '../gameUtils/helpers';
import { GameStatus, NonogramRaw } from '../gameUtils/types';
import { useAppDispatch } from '../../hooks';
import { Button } from './Button';

export function RestartButton({ nonogramRaw }: { nonogramRaw: NonogramRaw }) {
    const userGame = makeInitialSaveGame(nonogramRaw);
    const dispatch = useAppDispatch();
    const caption = 'Restart';
    const buttonClass = 'btn-outline-danger';

    const handleClick = () => {
        if (userGame) {
            dispatch(updateUserGame(userGame));
            dispatch(clearMistakes());
            dispatch(changeGameStatus(GameStatus.INITIAL));
        }
    };
    return <Button caption={caption} buttonClass={buttonClass} handler={handleClick} />;
}
