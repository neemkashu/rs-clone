import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userNonogramData } from '../../utils/mochas'; // imitation of back-end info
import { getTimeFromStorage, setTimeToStorage } from '../../utils/helpers';
import './gameStyles/Chronometer.scss';
import { NonogramRaw } from '../../utils/types';
import { GameStatusContext } from './contexts/context';
import { useAppSelector } from '../hooks';
import { store } from '../store';
import { GameStatus } from './gameUtils/types';
import { changeGameStatus, updateUserTime } from './gameSlice';
import { Clock } from '../Clock';

const REFRESH_PERIOD = 1000;

// imitation before registration implementing
const isUserLogged = () => false;

function Chronometer({ nonogramRaw }: { nonogramRaw: NonogramRaw }): JSX.Element {
    const nonogramID = nonogramRaw?.id;
    const dispatch = useDispatch();
    const gameState = useAppSelector((state) => state.game.status);
    const gameTime = useAppSelector((state) => state.game.userGame?.currentTime ?? 0);

    const shouldUpdateStatus =
        getTimeFromStorage(nonogramID) > 0 &&
        (gameState === GameStatus.INITIAL || gameState === null);
    if (shouldUpdateStatus) {
        dispatch(changeGameStatus(GameStatus.STARTED));
    }

    const [userTime, setUserTime] = useState(
        isUserLogged() ? gameTime : getTimeFromStorage(nonogramID)
    );
    const [isPageHidden, setIsPageHidden] = useState(false);

    useEffect(() => {
        const timeStoreAndRefresh = () => {
            const currentTimer = userTime + REFRESH_PERIOD;
            setUserTime(currentTimer);
            setTimeToStorage(currentTimer, nonogramID);
            dispatch(updateUserTime(currentTimer));
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

    return <Clock userTime={userTime} />;
}

export default Chronometer;
