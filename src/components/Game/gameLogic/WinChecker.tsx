import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import {
    changeGameStatus,
    saveUserGameByID,
    selectNonogramRaw,
    updateBestTime,
} from '../gameSlice';
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
        if (gameStatus === GameStatus.INITIAL) {
            setIsWin(false);
        }
        if (gameStatus && gameStatus !== GameStatus.FINISHED) {
            const isActualWin = handleIsWinnerCheck(
                nonogramRaw,
                store.getState().game.present.userGame?.currentUserSolution,
                gameStatus
            );
            setIsWin(isActualWin);
            if (isWin && gameStatus !== GameStatus.INITIAL && nonogramRaw) {
                dispatch(changeGameStatus(GameStatus.FINISHED));
                dispatch(
                    updateBestTime(
                        store.getState().game.present.userGame?.currentTime ?? null
                    )
                );
                console.log(
                    'store.getState().game.present.userGame?.currentTime',
                    store.getState().game.present.userGame?.currentTime
                );
                dispatch(
                    saveUserGameByID({
                        id: nonogramRaw?.id,
                        userGame: store.getState().game.present.userGame,
                        bestTime:
                            store.getState().game.present.userGame?.currentTime ?? 0,
                    })
                );
            }
        }
    }, [nonogramRaw, gameStatus, dispatch, isWin, userSolution]); // userSolution

    return <div>{isWin && <WinComponent />}</div>;
}
