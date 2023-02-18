import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTimeFromStorage, setTimeToStorage } from '../../utils/helpers';
import { NonogramRaw } from '../../utils/types';
import { useAppSelector } from '../hooks';
import { GameStatus, UserGameData } from './gameUtils/types';
import {
    changeGameStatus,
    selectNonogramRaw,
    selectUserState,
    selectUserTime,
    updateUserTime,
} from './gameSlice';
import { Clock } from '../Clock';
import { store } from '../store';

const REFRESH_PERIOD = 1000;
const isUserLogged = true;

function Chronometer(): JSX.Element {
    const nonogramRaw = useAppSelector(selectNonogramRaw);
    const nonogramID = nonogramRaw?.id;
    const dispatch = useDispatch();
    const gameState = useAppSelector(selectUserState);
    const gameTime = useAppSelector(selectUserTime);

    const isGameStarted =
        getTimeFromStorage(nonogramID) > 0 &&
        gameTime > 0 &&
        (gameState === GameStatus.INITIAL || gameState === null);

    if (isGameStarted) {
        dispatch(changeGameStatus(GameStatus.STARTED));
    }

    const [userTime, setUserTime] = useState(
        isUserLogged
            ? store.getState().game.present.userGame?.currentTime ?? 0
            : getTimeFromStorage(nonogramID)
    );
    const [isPageHidden, setIsPageHidden] = useState(false);

    useEffect(() => {
        const timeStoreAndRefresh = () => {
            const currentTime = userTime + REFRESH_PERIOD;
            setUserTime(currentTime);

            if (!isUserLogged) {
                setTimeToStorage(currentTime, nonogramID);
            }
            dispatch(updateUserTime(currentTime));
        };

        if (gameState === GameStatus.INITIAL) {
            setUserTime(0);
            setTimeToStorage(0, nonogramID);
        }
        const isGameRunning = gameState === GameStatus.STARTED;

        const timer = setInterval(timeStoreAndRefresh, REFRESH_PERIOD);
        if (isPageHidden || !isGameRunning) {
            clearInterval(timer);
        }

        return () => {
            clearInterval(timer);
        };
    }, [userTime, isPageHidden, nonogramID, gameState, dispatch]);

    document.onvisibilitychange = (event) => {
        setIsPageHidden(document.hidden);
    };

    return <Clock userTime={userTime} />;
}

export default Chronometer;
