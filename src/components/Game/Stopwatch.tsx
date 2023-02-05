import { useCallback, useRef, useState } from 'react';
import { NONOGRAM_INFO } from '../../utils/constants'; // imitation of back-end info
import { getTimeFromStorage, setTimeToStorage } from '../../utils/helpers';
import './Stopwatch.scss';

const REFRESH_PERIOD = 1000;
const { id: nonogramID } = NONOGRAM_INFO;

const getTwoDigitIndicator = (time: number) => {
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

    // TODO: future using: for more precise time counting
    // const gameSessionStart = useRef(new Date());

    const timeStoreAndRefresh = useCallback((): void => {
        if (document.hidden) {
            setTimeToStorage(nonogramID, userTime);
        } else {
            setUserTime(userTime + REFRESH_PERIOD);
        }
    }, [userTime]);

    setTimeout(timeStoreAndRefresh, REFRESH_PERIOD);

    document.onvisibilitychange = timeStoreAndRefresh;

    const date = new Date(userTime);
    const hours = getTwoDigitIndicator(date.getUTCHours());
    const minutes = getTwoDigitIndicator(date.getUTCMinutes());
    const seconds = getTwoDigitIndicator(date.getUTCSeconds());
    return (
        <div className="container game-timer">
            {hours}:{minutes}:{seconds}
        </div>
    );
}

export default Stopwatch;
