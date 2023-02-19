import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import Game from './Game';
import { clearGame } from './gameSlice';
import { getNonogramByID } from './api/getNonogramByID';

export function GameWrapper(): JSX.Element {
    const { id } = useParams();
    console.log('useParams', id);
    const dispatch = useAppDispatch();
    const [trueId, setTrueId] = useState<string>();

    useEffect(() => {
        dispatch(clearGame());
        if (id) getNonogramByID(id).then((data) => setTrueId(data?.id));
    }, []);
    console.log('trueID after use', trueId);

    return trueId ? <Game id={trueId} /> : <div />;
}
