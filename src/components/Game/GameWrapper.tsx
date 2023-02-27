import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import Game from './Game';
import { clearGame } from './gameSlice';

export function GameWrapper(): JSX.Element {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clearGame());
    }, [dispatch, id]);

    return <div>{id && <Game id={id} />}</div>;
}
