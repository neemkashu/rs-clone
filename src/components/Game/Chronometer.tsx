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

const REFRESH_PERIOD = 1000;

function Chronometer(): JSX.Element {
    const nonogramRaw = useAppSelector(selectNonogramRaw);
    const nonogramID = nonogramRaw?.id;
    const dispatch = useDispatch();
    const gameState = useAppSelector(selectUserState);
    const gameTime = useAppSelector(selectUserTime);

    const shouldUpdateStatus =
        // getTimeFromStorage(nonogramID) > 0 &&
        gameTime > 0 && (gameState === GameStatus.INITIAL || gameState === null);
    if (shouldUpdateStatus) {
        dispatch(changeGameStatus(GameStatus.STARTED));
    }

    const [userTime, setUserTime] = useState(getTimeFromStorage(nonogramID));
    const [isPageHidden, setIsPageHidden] = useState(false);

    useEffect(() => {
        const timeStoreAndRefresh = () => {
            const currentTimer = userTime + REFRESH_PERIOD;
            setUserTime(currentTimer);
            setTimeToStorage(currentTimer, nonogramID);
            // dispatch(updateUserTime(currentTimer));
        };
        const isGameRunning =
            gameState === GameStatus.INITIAL || gameState === GameStatus.STARTED;
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

    // return <Clock userTime={gameTime} />;
    return <Clock userTime={userTime} />;
}

export default Chronometer;
