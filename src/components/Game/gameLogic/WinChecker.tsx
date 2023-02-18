import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { changeGameStatus, saveUserGameByID, selectNonogramRaw } from '../gameSlice';
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
            setIsWin(() => {
                return false;
            });
        }
        if (gameStatus && gameStatus !== GameStatus.FINISHED) {
            setIsWin((previous) => {
                const isActualWin = handleIsWinnerCheck(
                    nonogramRaw,
                    store.getState().game.present.userGame?.currentUserSolution,
                    gameStatus
                );
                return isActualWin;
            });
            if (isWin && gameStatus !== GameStatus.INITIAL && nonogramRaw) {
                dispatch(changeGameStatus(GameStatus.FINISHED));
                dispatch(
                    saveUserGameByID({
                        id: nonogramRaw?.id,
                        userGame: store.getState().game.present.userGame,
                        bestTime:
                            store.getState().game.present.userGame?.currentTime ?? null,
                    })
                );
            }
        }
    }, [nonogramRaw, userSolution, gameStatus, dispatch, isWin]);

    return <div>{isWin && <WinComponent />}</div>;
}
