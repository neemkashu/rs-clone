import { useCallback, useRef, useState } from 'react';
import { NONOGRAM_INFO } from '../../utils/constants'; // imitation of back-end info
import { getUserCurrentTimes } from '../../utils/helpers';
import { StorageKeys } from '../../utils/storage';
import './Stopwatch.scss';

const REFRESH_PERIOD = 1000;
const { id: nonogramID } = NONOGRAM_INFO;

const getTwoDigitIndicator = (time: number) => {
    const isOneDigit = time < 10;
    const converted = isOneDigit ? `0${time}` : `${time}`;
    return converted;
};
function setTimeToStorage(id: number, time: number) {
    const storageInfo = localStorage.getItem(StorageKeys.userCurrentTime);
    const storageTimes = getUserCurrentTimes(storageInfo);
    const nonogramIndex = storageTimes?.findIndex(
        (nonogramInfo) => nonogramInfo.id === id
    );
    if (Array.isArray(storageTimes) && nonogramIndex !== undefined) {
        // don't want to omit zero index, so no (!nonogramIndex)
        storageTimes[nonogramIndex] = { id, time };
        localStorage.setItem(StorageKeys.userCurrentTime, JSON.stringify(storageTimes));
    } else {
        localStorage.setItem(StorageKeys.userCurrentTime, JSON.stringify([{ id, time }]));
    }
}
function getTimeFromStorage(id: number): number {
    const storageInfo = localStorage.getItem(StorageKeys.userCurrentTime);
    const storageTimes = getUserCurrentTimes(storageInfo);

    if (storageTimes !== null) {
        const currentTimebyID = storageTimes.find(
            (nonogramInfo) => nonogramInfo.id === id
        );
        return currentTimebyID?.time ?? 0;
    }
    return 0;
}
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
