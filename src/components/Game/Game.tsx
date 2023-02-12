import './gameStyles/Game.scss';
import { useEffect, useState } from 'react';
import Controls from './Controls';
import Field from './Field';
import GameHeader from './GameHeader';
import Chronometer from './Chronometer';
import { NonogramRaw, UserGameDataRaw } from '../../utils/types';
import { userNonogramData } from '../../utils/mochas';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateUserGame } from './gameSlice';
import { Cat, martini } from './gameUtils/mochas';
import { makeInitialSaveGame } from './gameUtils/helpers';
import { UserGameData } from './gameUtils/types';
import { WinChecker } from './gameLogic/WinChecker';
import { getNonogramByID } from './api/getNonogramByID';
import { getGameState } from './api/getGameState';

const ID = 'E7UMxLSZv31q5m4RwLG4'; // aI7dRHAVG7gzTishlpjM E7UMxLSZv31q5m4RwLG4

function Game(): JSX.Element {
    const [nonogramRaw, setNonogramRaw] = useState<NonogramRaw | null>(null);
    const userGame = useAppSelector((state) => state.game.userGame?.state);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getNonogramByID(ID).then((data) => {
            if (data) {
                // little mocha cat
                setNonogramRaw(Cat);
            }
        });
    }, []);
    useEffect(() => {
        getGameState(ID)
            // TODO: refactor then block after implementing server fetch
            .then((data) => {
                console.warn('get mocha user game', data?.data.currentGame);
                if (data) {
                    const loadedGame: UserGameData = data.data.currentGame;
                    // server mocha cat
                    dispatch(updateUserGame(loadedGame));
                }
            })
            .catch((error) => {
                console.warn('create empty game');
                const newGame = makeInitialSaveGame(nonogramRaw);
                dispatch(updateUserGame(newGame));
            });
    }, [dispatch, nonogramRaw]);

    return (
        <div className="container d-flex flex-column gap-2">
            {nonogramRaw && userGame && (
                <>
                    <GameHeader nonogramRaw={nonogramRaw} />
                    <Chronometer nonogramRaw={nonogramRaw} />
                    <Field nonogramRaw={nonogramRaw} />
                    <WinChecker nonogramRaw={nonogramRaw} />
                    <Controls />
                </>
            )}
        </div>
    );
}

export default Game;
