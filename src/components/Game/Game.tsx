import './gameStyles/Game.scss';
import { useEffect, useState } from 'react';
import Controls from './Controls';
import Field from './Field';
import GameHeader from './GameHeader';
import Chronometer from './Chronometer';
import { NonogramRaw, UserGameDataRaw } from '../../utils/types';
import { userNonogramData } from '../../utils/mochas';
import { useAppDispatch } from '../hooks';
import { updateUserGame } from './gameSlice';
import { Cat, martini } from './gameUtils/mochas';
import { makeInitialSaveGame } from './gameUtils/helpers';
import { WinChecker } from './WinChecker';
import { UserGameData } from './gameUtils/types';

const SERVER_ADDRESS = 'http://127.0.0.1:3000/';
const ID = 'E7UMxLSZv31q5m4RwLG4'; // aI7dRHAVG7gzTishlpjM E7UMxLSZv31q5m4RwLG4

async function getNonogramByID(id: string): Promise<NonogramRaw | null> {
    try {
        const url = `${SERVER_ADDRESS}nonograms/${id}`;
        const options = {
            method: 'GET',
        };
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('responce not ok!');
        }
        const nonogram: NonogramRaw = await response.json();
        return nonogram;
    } catch (error) {
        console.warn('error when fetching id', id);
        return null;
    }
}
async function getGameState(id: string): Promise<UserGameDataRaw | null> {
    // mocha before implementing request

    /* return new Promise((resolve) => {
        const data = userNonogramData as UserGameDataRaw;
        resolve(data);
    }); */

    return new Promise((resolve, reject) => {
        const data = userNonogramData as UserGameDataRaw;
        reject(new Error('no data'));
    });
}
function Game(): JSX.Element {
    const [nonogramRaw, setNonogramRaw] = useState<NonogramRaw | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getNonogramByID(ID).then((data) => {
            // server mocha martini
            // little mocha cat
            setNonogramRaw(Cat);
        });
    }, []);
    useEffect(() => {
        getGameState(ID)
            .then((data) => {
                console.warn('in game rewrite', data?.data.currentGame);
                if (data) {
                    const loadedGame: UserGameData = data.data.currentGame;
                    // server mocha martini
                    dispatch(updateUserGame(loadedGame));
                }
            })
            .catch((error) => {
                const newGame = makeInitialSaveGame(nonogramRaw);
                dispatch(updateUserGame(newGame));
            });
    }, [dispatch, nonogramRaw]);

    return (
        <div className="container d-flex flex-column gap-2">
            <GameHeader nonogramRaw={nonogramRaw} />
            {nonogramRaw ? <Chronometer nonogramRaw={nonogramRaw} /> : <div />}
            {nonogramRaw ? <WinChecker nonogramRaw={nonogramRaw} /> : <div />}
            <Field nonogramRaw={nonogramRaw} />
            <Controls />
        </div>
    );
}

export default Game;
