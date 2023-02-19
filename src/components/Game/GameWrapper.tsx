import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import Game from './Game';
import { clearGame } from './gameSlice';
import { getNonogramByID } from './api/getNonogramByID';

export function GameWrapper(): JSX.Element {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const [trueId, setTrueId] = useState<string>();

    useEffect(() => {
        dispatch(clearGame());
        if (id === 'random') {
            getNonogramByID(id).then((data) => {
                setTrueId(data?.id);
            });
        } else setTrueId(id);
    }, [dispatch]);

    return <div>{trueId && <Game id={trueId} />}</div>;
}
