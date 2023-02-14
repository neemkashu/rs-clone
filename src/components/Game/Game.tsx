import './gameStyles/Game.scss';
import { useEffect } from 'react';
import Controls from './Controls';
import Field from './Field';
import GameHeader from './GameHeader';
import Chronometer from './Chronometer';
import { useAppDispatch, useAppSelector } from '../hooks';
import { clearTimers, loadNonogramByID, saveUserGameByID } from './gameSlice';
import { WinChecker } from './gameLogic/WinChecker';
import { store } from '../store';

const ID = 'E7UMxLSZv31q5m4RwLG4'; // aI7dRHAVG7gzTishlpjM E7UMxLSZv31q5m4RwLG4
// nsNWHaYMXSERIHX1juXN
function Game(): JSX.Element {
    const userGame = useAppSelector((state) => state.game.userGame);
    const nonogramInStore = useAppSelector((state) => state.game.currentNonogram);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadNonogramByID(ID));

        return () => {
            dispatch(
                saveUserGameByID({ id: ID, userGame: store.getState().game.userGame })
            );
            dispatch(clearTimers());
        };
    }, [dispatch]);

    return (
        <div className="container p-0 p-sm-1 d-flex flex-column gap-2">
            {nonogramInStore && userGame && (
                <>
                    <GameHeader nonogramRaw={nonogramInStore} />
                    <Chronometer nonogramRaw={nonogramInStore} />
                    <Field nonogramRaw={nonogramInStore} />
                    <WinChecker nonogramRaw={nonogramInStore} />
                    <Controls nonogramRaw={nonogramInStore} />
                </>
            )}
        </div>
    );
}

export default Game;
