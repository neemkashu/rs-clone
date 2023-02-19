import './gameStyles/Game.scss';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Controls } from './Controls';
import Field from './Field';
import GameHeader from './GameHeader';
import Chronometer from './Chronometer';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
    clearGame,
    clearTimers,
    loadNonogramByID,
    saveUserGameByID,
    selectNonogramRaw,
} from './gameSlice';
import { WinChecker } from './gameLogic/WinChecker';
import { store } from '../store';

const ID = 'aI7dRHAVG7gzTishlpjM'; // aI7dRHAVG7gzTishlpjM E7UMxLSZv31q5m4RwLG4
// nsNWHaYMXSERIHX1juXN
function Game({ id }: { id: string }): JSX.Element {
    const nonogramInStore = useAppSelector(selectNonogramRaw);
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log(id);
        dispatch(loadNonogramByID(id));

        return () => {
            dispatch(
                saveUserGameByID({
                    id,
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
            dispatch(clearGame());
        };
    }, []);

    return (
        <div className="p-0 mb-2 p-sm-1 d-flex flex-column gap-2">
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
