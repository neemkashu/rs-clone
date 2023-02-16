import { ActionCreators } from 'redux-undo';
import {
    changeGameStatus,
    clearMistakes,
    selectNonogramRaw,
    updateUserGame,
} from '../gameSlice';
import { makeInitialSaveGame, setTimeToStorage } from '../gameUtils/helpers';
import { GameStatus, NonogramRaw } from '../gameUtils/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button } from './Button';

export function RestartButton() {
    const nonogramRaw = useAppSelector(selectNonogramRaw);
    const userGame = makeInitialSaveGame(nonogramRaw);
    const dispatch = useAppDispatch();
    const caption = 'Restart';
    const buttonClass = 'btn-outline-danger';

    const handleClick = () => {
        if (userGame) {
            dispatch(updateUserGame(userGame));
            dispatch(clearMistakes());
            dispatch(changeGameStatus(GameStatus.INITIAL));
            dispatch(ActionCreators.clearHistory());
        }
    };
    return <Button caption={caption} buttonClass={buttonClass} handler={handleClick} />;
}
