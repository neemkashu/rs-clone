import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { winClick } from '../gameSlice';
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
        setIsWin(handleWinnerCheck(nonogramRaw, userSolution, gameStatus));
    }, [nonogramRaw, userSolution, gameStatus]);

    if (isWin) {
        console.log('isWin', isWin);
        dispatch(winClick(GameStatus.FINISHED));
    }

    return <div>{isWin && <WinComponent />}</div>;
}
