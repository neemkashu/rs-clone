import './gameStyles/Game.scss';
import { useEffect } from 'react';
import { Controls } from './Controls';
import Field from './Field';
import GameHeader from './GameHeader';
import Chronometer from './Chronometer';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
    clearTimers,
    loadNonogramByID,
    saveUserGameByID,
    selectNonogramRaw,
} from './gameSlice';
import { WinChecker } from './gameLogic/WinChecker';
import { store } from '../store';

const ID = 'nsNWHaYMXSERIHX1juXN'; // aI7dRHAVG7gzTishlpjM E7UMxLSZv31q5m4RwLG4
// nsNWHaYMXSERIHX1juXN
function Game(): JSX.Element {
    // const userGame = useAppSelector((state) => state.game.present.userGame);
    const nonogramInStore = useAppSelector(selectNonogramRaw);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadNonogramByID(ID));

        return () => {
            dispatch(
                saveUserGameByID({
                    id: ID,
                    userGame: store.getState().game.present.userGame,
                })
            );
            dispatch(clearTimers());
        };
    }, [dispatch]);

    useEffect(() => {
        const preventCursorMorphing = (event: Event) => {
            event.preventDefault();
        };
        document.addEventListener('dragover', preventCursorMorphing);
        return () => {
            document.removeEventListener('dragover', preventCursorMorphing);
        };
    }, []);

    return (
        <div className="p-0 p-sm-1 d-flex flex-column gap-2">
            {nonogramInStore && (
                <>
                    <GameHeader />
                    <Chronometer />
                    <Field />
                    <WinChecker />
                    <Controls />
                </>
            )}
        </div>
    );
}

export default Game;
