import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTimeFromStorage, setTimeToStorage } from '../../utils/helpers';
import './gameStyles/Chronometer.scss';
import { NonogramRaw } from '../../utils/types';
import { useAppSelector } from '../hooks';
import { GameStatus, UserGameData } from './gameUtils/types';
import { changeGameStatus, updateUserTime } from './gameSlice';
import { Clock } from '../Clock';
import { store } from '../store';

const REFRESH_PERIOD = 1000;

const sendGameToServer = (
    userGameData: UserGameData | null,
    id: string
): Promise<string> => {
    return new Promise((resolve) => {
        console.warn('save game on server', userGameData);
        resolve('succsess');
    });
};

function Chronometer({ nonogramRaw }: { nonogramRaw: NonogramRaw }): JSX.Element {
    const nonogramID = nonogramRaw.id;
    const dispatch = useDispatch();
    const gameState = useAppSelector((state) => state.game.status);
    const gameTime = useAppSelector((state) => state.game.userGame?.currentTime ?? 0);

    const shouldUpdateStatus =
        // getTimeFromStorage(nonogramID) > 0 &&
        gameTime > 0 && (gameState === GameStatus.INITIAL || gameState === null);
    if (shouldUpdateStatus) {
        dispatch(changeGameStatus(GameStatus.STARTED));
    }

    // const [userTime, setUserTime] = useState(
    //     isUserLogged() ? gameTime : getTimeFromStorage(nonogramID)
    // );
    const [isPageHidden, setIsPageHidden] = useState(false);

    useEffect(() => {
        const timeStoreAndRefresh = () => {
            const currentTimer = gameTime + REFRESH_PERIOD;
            // setUserTime(currentTimer);
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
    }, [gameTime, isPageHidden, nonogramID, gameState, dispatch]);

    useEffect(() => {
        return () => {
            sendGameToServer(store.getState().game.userGame, nonogramID);
        };
    }, []);

    document.onvisibilitychange = (event) => {
        setIsPageHidden(document.hidden);
    };

    return <Clock userTime={gameTime} />;
}

export default Chronometer;
