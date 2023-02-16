import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeGameStatus, selectNonogramRaw } from '../gameSlice';
import { GameStatus, NonogramRaw } from '../gameUtils/types';
import { WinComponent } from './WinComponent';
import { handleIsWinnerCheck } from './winHandlers';

export function WinChecker(): JSX.Element {
    // console.warn('win checker is here!');
    const nonogramRaw = useAppSelector(selectNonogramRaw);
    const dispatch = useAppDispatch();
    const userSolution = useAppSelector(
        (state) => state.game.present.userGame?.currentUserSolution
    );
    const gameStatus = useAppSelector((state) => state.game.present.userGame?.state);
    const [isWin, setIsWin] = useState(false);

    useEffect(() => {
        if (gameStatus && gameStatus !== GameStatus.FINISHED) {
            setIsWin(handleIsWinnerCheck(nonogramRaw, userSolution, gameStatus));
            if (isWin) {
                console.log('isWin', isWin);
                dispatch(changeGameStatus(GameStatus.FINISHED));
            }
        }
    }, [nonogramRaw, userSolution, gameStatus, dispatch, isWin]);

    return <div>{isWin && <WinComponent />}</div>;
}
