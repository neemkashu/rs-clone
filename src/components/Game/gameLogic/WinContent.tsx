import { Clock } from '../../Clock';
import { useAppSelector } from '../../hooks';
import { selectNonogramRaw, selectUserTime } from '../gameSlice';
import { NonogramRaw } from '../gameUtils/types';

export function WinContent(): JSX.Element {
    const gameTime = useAppSelector(selectUserTime);
    const nonogramRaw = useAppSelector(selectNonogramRaw);
    const title = nonogramRaw?.nonogram.title.ru;

    return (
        <>
            <div>{title}</div>
            <Clock userTime={gameTime ?? 0} />
        </>
    );
}
