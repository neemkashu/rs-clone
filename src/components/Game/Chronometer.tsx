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
import { firstFieldClick } from './gameSlice';

const REFRESH_PERIOD = 1000;

const getTwoDigitIndicator = (time: number): string => {
    const isOneDigit = time < 10;
    const converted = isOneDigit ? `0${time}` : `${time}`;
    return converted;
};

// imitation before registration implementing
const isUserLogged = () => false;

function Chronometer({ nonogramRaw }: { nonogramRaw: NonogramRaw | null }): JSX.Element {
    const nonogramID = nonogramRaw?.id;
    const dispatch = useDispatch();
    const gameState = useAppSelector((state) => state.game.status);

    const shouldUpdateStatus =
        getTimeFromStorage(nonogramID) > 0 &&
        (gameState === GameStatus.INITIAL || gameState === null);
    if (shouldUpdateStatus) {
        dispatch(firstFieldClick(GameStatus.STARTED));
    }

    const [userTime, setUserTime] = useState(
        isUserLogged()
            ? userNonogramData.data.currentGame.currentTime
            : getTimeFromStorage(nonogramID)
    );
    const [isPageHidden, setIsPageHidden] = useState(false);

    useEffect(() => {
        const timeStoreAndRefresh = () => {
            const currentTimer = userTime + REFRESH_PERIOD;
            setUserTime(currentTimer);
            setTimeToStorage(currentTimer, nonogramID);
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
    }, [userTime, isPageHidden, nonogramID, gameState]);

    document.onvisibilitychange = (event) => {
        setIsPageHidden(document.hidden);
    };

    const date = new Date(userTime);
    const hours = getTwoDigitIndicator(date.getUTCHours());
    const minutes = getTwoDigitIndicator(date.getUTCMinutes());
    const seconds = getTwoDigitIndicator(date.getUTCSeconds());

    return (
        <div className="container border border-success">
            {hours}:{minutes}:{seconds}
        </div>
    );
}

export default Chronometer;
