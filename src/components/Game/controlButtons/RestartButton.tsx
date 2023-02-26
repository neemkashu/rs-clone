import { useTranslation } from 'react-i18next';
import { ActionCreators } from 'redux-undo';
import {
    changeGameStatus,
    clearMistakes,
    selectNonogramRaw,
    updateUserGame,
    updateUserTime,
} from '../gameSlice';
import { makeInitialSaveGame, setTimeToStorage } from '../gameUtils/helpers';
import { GameStatus, NonogramRaw } from '../gameUtils/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button } from './Button';

const buttonClass = 'btn-outline-danger';

export function RestartButton() {
    const { t } = useTranslation();
    const nonogramRaw = useAppSelector(selectNonogramRaw);
    const userGame = makeInitialSaveGame(nonogramRaw);
    const dispatch = useAppDispatch();

    const handleClick = () => {
        if (userGame) {
            dispatch(changeGameStatus(GameStatus.INITIAL));
            dispatch(updateUserGame(userGame));
            dispatch(updateUserTime(0));
            dispatch(clearMistakes());
            dispatch(ActionCreators.clearHistory());
            dispatch(clearMistakes());
        }
    };
    return (
        <Button
            caption={t('gameRestart')}
            buttonClass={buttonClass}
            handler={handleClick}
        />
    );
}
