import './gameStyles/Game.scss';
import { useEffect, useState } from 'react';
import Controls from './Controls';
import Field from './Field';
import GameHeader from './GameHeader';
import Chronometer from './Chronometer';
import { NonogramRaw } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { changeGameStatus, updateUserGame } from './gameSlice';
import { makeInitialSaveGame } from './gameUtils/helpers';
import { GameStatus, UserGameData } from './gameUtils/types';
import { WinChecker } from './gameLogic/WinChecker';
import { getNonogramByID } from './api/getNonogramByID';
import { getGameState } from './api/getGameState';

const ID = 'E7UMxLSZv31q5m4RwLG4'; // aI7dRHAVG7gzTishlpjM E7UMxLSZv31q5m4RwLG4

function Game(): JSX.Element {
    const [nonogramRaw, setNonogramRaw] = useState<NonogramRaw | null>(null);
    const userGame = useAppSelector((state) => state.game.userGame?.state);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getNonogramData = async () => {
            const nonogram = await getNonogramByID(ID);
            if (nonogram) {
                setNonogramRaw(nonogram);
                const userData = await getGameState(ID);
                if (userData) {
                    const loadedGame: UserGameData = userData.data.currentGame;
                    dispatch(updateUserGame(loadedGame));
                } else {
                    const newGame = makeInitialSaveGame(nonogram);
                    dispatch(updateUserGame(newGame));
                }
            }
        };
        getNonogramData();
    }, [dispatch]);

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
