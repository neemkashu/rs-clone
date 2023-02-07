import './gameStyles/Game.scss';
import { useEffect, useState } from 'react';
import Controls from './Controls';
import Field from './Field';
import GameHeader from './GameHeader';
import Chronometer from './Chronometer';
import { NonogramRaw } from '../../utils/types';
import { NonogramContext } from './contexts/context';

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
        console.warn('getNonogramByID', nonogram);
        return nonogram;
    } catch (error) {
        console.warn('error when fetching id', id);
        return null;
    }
}
function Game(): JSX.Element {
    const [nonogramRaw, setNonogramRaw] = useState<NonogramRaw | null>(null);
    useEffect(() => {
        getNonogramByID(ID).then((data) => setNonogramRaw(data));
    }, []);
    return (
        <NonogramContext.Provider value={nonogramRaw}>
            <div className="container d-flex flex-column gap-2">
                <GameHeader nonogramRaw={nonogramRaw} />
                <Chronometer />
                <Field nonogramRaw={nonogramRaw} />
                <Controls />
            </div>
        </NonogramContext.Provider>
    );
}

export default Game;
