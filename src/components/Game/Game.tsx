import './gameStyles/Game.scss';
import { useEffect } from 'react';
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

function saveGameWhenInvisible(dispatch: ReturnType<typeof useAppDispatch>) {
    const id = store.getState().game.present.currentNonogram?.id;
    if (id) {
        dispatch(
            saveUserGameByID({
                id,
                userGame: store.getState().game.present.userGame,
                bestTime: store.getState().game.present.bestTime,
            })
        );
    }
}
const nono = {
    n10p10: 'E7UMxLSZv31q5m4RwLG4',
    n20p20: '6lMmepUH20vmUxvkuUEd',
    n30p35: 'aI7dRHAVG7gzTishlpjM',
    n50p70: 'bEfUePWLRweZpBmoiP0V',
};
const ID = nono.n30p35; // aI7dRHAVG7gzTishlpjM E7UMxLSZv31q5m4RwLG4
// nsNWHaYMXSERIHX1juXN 6lMmepUH20vmUxvkuUEd uGURDew01W6reyMLJctH bEfUePWLRweZpBmoiP0V
function Game({ id }: { id?: string } = { id: ID }): JSX.Element {
    if (!id) {
        // eslint-disable-next-line no-param-reassign
        id = ID;
    }
    const nonogramInStore = useAppSelector(selectNonogramRaw);
    const dispatch = useAppDispatch();

    const handleVisibility = () => {
        saveGameWhenInvisible(dispatch);
    };
    useEffect(() => {
        dispatch(loadNonogramByID(id));

        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            dispatch(
                saveUserGameByID({
                    id: ID,
                    userGame: store.getState().game.present.userGame,
                    bestTime: store.getState().game.present.bestTime,
                })
            );
            dispatch(clearTimers());
            dispatch(clearGame());
            document.removeEventListener('visibilitychange', handleVisibility);
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
