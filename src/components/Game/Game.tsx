import './gameStyles/Game.scss';
import { createContext, useContext, useEffect, useState } from 'react';
import Controls from './Controls';
import Field from './Field';
import GameHeader from './GameHeader';
import Chronometer from './Chronometer';
import {
    GameStatus,
    gameStatuses,
    NonogramRaw,
    UserGameDataRaw,
} from '../../utils/types';
import { GameStatusContext } from './contexts/context';
import { userNonogramData } from '../../utils/mochas';

const SERVER_ADDRESS = 'http://127.0.0.1:3000/';
const ID = 'E7UMxLSZv31q5m4RwLG4';

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
    // moche before implementing request
    return new Promise((resolve) => {
        const data = userNonogramData as UserGameDataRaw;
        resolve(data);
    });
}
function Game(): JSX.Element {
    const [nonogramRaw, setNonogramRaw] = useState<NonogramRaw | null>(null);

    useEffect(() => {
        getNonogramByID(ID).then((data) => setNonogramRaw(data));
    }, []);

    return (
        <div className="container d-flex flex-column gap-2">
            <GameHeader nonogramRaw={nonogramRaw} />
            {nonogramRaw ? <Chronometer nonogramRaw={nonogramRaw} /> : <div />}
            <Field nonogramRaw={nonogramRaw} />
            <Controls />
        </div>
    );
}

export default Game;
