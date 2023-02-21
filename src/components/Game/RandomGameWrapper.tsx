import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { clearGame } from './gameSlice';
import { getRandomNonogramId } from '../../api/requests';

export function RandomGameWrapper(): JSX.Element {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [trueId, setTrueId] = useState<string | null>(null);
    useEffect(() => {
        dispatch(clearGame());
        getRandomNonogramId().then((data) => {
            setTrueId(data);
        });
        if (trueId) {
            navigate(`/game/${trueId}`, { replace: true });
        }
    }, [dispatch, trueId, navigate]);

    return <div>Loading</div>;
}
