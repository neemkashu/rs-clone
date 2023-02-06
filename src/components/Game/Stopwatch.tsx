import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NONOGRAM_INFO } from '../../utils/constants'; // imitation of back-end info
import { getTimeFromStorage, setTimeToStorage } from '../../utils/helpers';
import './gameStyles/Stopwatch.scss';

const REFRESH_PERIOD = 500;
const { id: nonogramID } = NONOGRAM_INFO;

const getTwoDigitIndicator = (time: number): string => {
    const isOneDigit = time < 10;
    const converted = isOneDigit ? `0${time}` : `${time}`;
    return converted;
};

// imitation before registration implementing
const isUserLogged = () => false;

function Stopwatch(): JSX.Element {
    const [userTime, setUserTime] = useState(
        isUserLogged() ? NONOGRAM_INFO.userTime : getTimeFromStorage(nonogramID)
    );
    const isPageChange = useRef(false);
    // eslint-disable-next-line no-undef
    isPageChange.current = false;
    // TODO: future using: for more precise time counting
    // const gameSessionStart = useRef(new Date());

    const timeStoreAndRefresh = useCallback((): void => {
        if (!document.hidden) {
            setUserTime(userTime + REFRESH_PERIOD);
        }
        setTimeToStorage(nonogramID, userTime);
    }, [userTime]);

    const interval = useRef<ReturnType<typeof setTimeout> | null>(
        setTimeout(timeStoreAndRefresh, REFRESH_PERIOD)
    );
    useEffect(() => {
        console.log('mount stopwatch?');
        return () => {
            console.log('delete timer');
            interval.current = null;
        };
    }, []);
    document.onvisibilitychange = timeStoreAndRefresh;

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

export default Stopwatch;
