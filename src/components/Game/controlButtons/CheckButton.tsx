import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button } from './Button';
import { mistakesHandler } from '../gameLogic/mistakesHandler';
import { selectUserSolution } from '../gameSlice';

export function CheckButton() {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const buttonClass = '';
    const userSolution = useAppSelector(selectUserSolution);

    const handleClick = () => {
        if (userSolution) {
            userSolution.forEach((row, indexRow) => {
                row.forEach((userCell, indexNumberRow) => {
                    mistakesHandler(indexRow, indexNumberRow, dispatch, 0);
                });
            });
        }
    };
    return (
        <Button
            caption={t('gameCheck')}
            buttonClass={buttonClass}
            handler={handleClick}
        />
    );
}
