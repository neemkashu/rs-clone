import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import Game from './Game';
import { clearGame } from './gameSlice';

export function GameWrapper(): JSX.Element {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clearGame());
    }, []);
    console.log('id', id);

    return id ? <Game id={id} /> : <div />;
}
