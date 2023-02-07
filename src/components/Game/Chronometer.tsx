import { useCallback, useEffect, useRef, useState } from 'react';
import { NONOGRAM_INFO } from '../../utils/constants'; // imitation of back-end info
import { getTimeFromStorage, setTimeToStorage } from '../../utils/helpers';
import './gameStyles/Chronometer.scss';

const REFRESH_PERIOD = 1000;
const { id: nonogramID } = NONOGRAM_INFO;

const getTwoDigitIndicator = (time: number): string => {
    const isOneDigit = time < 10;
    const converted = isOneDigit ? `0${time}` : `${time}`;
    return converted;
};

// imitation before registration implementing
const isUserLogged = () => false;

function Chronometer(): JSX.Element {
    const [userTime, setUserTime] = useState(
        isUserLogged() ? NONOGRAM_INFO.userTime : getTimeFromStorage(nonogramID)
    );
    const [isPageHidden, setIsPageHidden] = useState(false);

    useEffect(() => {
        const timeStoreAndRefresh = () => {
            const currentTimer = userTime + REFRESH_PERIOD;
            setUserTime(currentTimer);
            setTimeToStorage(nonogramID, currentTimer);
        };

        const timer = setInterval(timeStoreAndRefresh, REFRESH_PERIOD);

        if (isPageHidden) {
            clearInterval(timer);
        }

        return () => {
            clearInterval(timer);
        };
    }, [userTime, isPageHidden]);

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
