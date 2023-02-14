import { NonogramRaw } from '../gameUtils/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button } from './Button';
import { mistakesHandler } from '../gameLogic/mistakesHandler';

export function CheckButton() {
    const dispatch = useAppDispatch();
    const caption = 'Check';
    const buttonClass = '';
    const userSolution = useAppSelector(
        (state) => state.game.userGame?.currentUserSolution
    );

    const handleClick = () => {
        if (userSolution) {
            userSolution.forEach((row, indexRow) => {
                row.forEach((userCell, indexNumberRow) => {
                    mistakesHandler(indexRow, indexNumberRow, dispatch, 0);
                });
            });
        }
    };
    return <Button caption={caption} buttonClass={buttonClass} handler={handleClick} />;
}
