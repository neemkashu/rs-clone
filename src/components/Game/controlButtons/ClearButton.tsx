import { useTranslation } from 'react-i18next';
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

const buttonClass = 'game-clear';

export function ClearButton() {
    const nonogramRaw = useAppSelector(selectNonogramRaw);
    const userGame = makeCleanField(nonogramRaw);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

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
            caption={t('gameClear')}
            buttonClass={buttonClass}
            handler={handleClick}
        />
    );
}
