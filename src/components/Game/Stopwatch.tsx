import { cwd } from 'process';
import { useEffect, useRef, useState } from 'react';
import { NONOGRAM_INFO } from '../../utils/constants';
import './Stopwatch.scss';

const getTwoDigitIndicator = (time: number) => {
    const isOneDigit = time < 10;
    const converted = isOneDigit ? `0${time}` : `${time}`;
    return converted;
};

function Stopwatch(): JSX.Element {
    const [userTime, setUserTime] = useState(NONOGRAM_INFO.userTime);
    const [isTicking, setIsTicking] = useState(true);
    const gameSessionStart = useRef(new Date());

    let date = new Date(userTime);
    let hours = getTwoDigitIndicator(date.getHours());
    let minutes = getTwoDigitIndicator(date.getMinutes());
    let seconds = getTwoDigitIndicator(date.getSeconds());

    const refreshPeriod = 1000;
    useEffect(() => {
        const timer = setInterval(() => {
            setUserTime((previousTime) => previousTime + refreshPeriod);
        }, refreshPeriod);
        return () => {
            clearInterval(timer);
        };
    }, []);
    useEffect(() => {
        if (!isTicking) {
            console.log('stop clock');
        }
    }, [isTicking]);

    date = new Date(userTime);
    hours = getTwoDigitIndicator(date.getHours());
    minutes = getTwoDigitIndicator(date.getMinutes());
    seconds = getTwoDigitIndicator(date.getSeconds());
    return (
        <div className="container game-timer">
            {hours}:{minutes}:{seconds}
        </div>
    );
}

export default Stopwatch;
