import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button } from './Button';
import { mistakesHandler } from '../gameLogic/mistakesHandler';
import { selectUserSolution, selectUserState } from '../gameSlice';
import { GameStatus } from '../gameUtils/types';

export function CheckButton() {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const buttonClass = '';
    const userSolution = useAppSelector(selectUserSolution);
    const gameStatus = useAppSelector(selectUserState);

    const handleClick = () => {
        if (userSolution) {
            userSolution.forEach((row, indexRow) => {
                row.forEach((userCell, indexNumberRow) => {
                    mistakesHandler(indexRow, indexNumberRow, dispatch, 0);
                });
            });
        }
    };
    const isActive = gameStatus !== GameStatus.FINISHED;
    return (
        <Button
            caption={t('gameCheck')}
            buttonClass={buttonClass}
            handler={handleClick}
            isActive={!isActive}
        />
    );
}
