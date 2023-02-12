import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeGameStatus } from '../gameSlice';
import { GameStatus, NonogramRaw } from '../gameUtils/types';
import { WinComponent } from './WinComponent';
import { handleWinnerCheck } from './winHandlers';

export function WinChecker({ nonogramRaw }: { nonogramRaw: NonogramRaw }): JSX.Element {
    // console.warn('win checker is here!');
    const dispatch = useAppDispatch();
    const userSolution = useAppSelector(
        (state) => state.game.userGame?.currentUserSolution
    );
    const gameStatus = useAppSelector((state) => state.game.status);
    const [isWin, setIsWin] = useState(false);

    useEffect(() => {
        if (gameStatus !== GameStatus.FINISHED) {
            setIsWin(handleWinnerCheck(nonogramRaw, userSolution, gameStatus));
            if (isWin) {
                console.log('isWin', isWin);
                dispatch(changeGameStatus(GameStatus.FINISHED));
            }
        }
    }, [nonogramRaw, userSolution, gameStatus, dispatch, isWin]);

    return <div>{isWin && <WinComponent />}</div>;
}
