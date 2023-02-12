import { Clock } from '../../Clock';
import { useAppSelector } from '../../hooks';
import { NonogramRaw } from '../gameUtils/types';

export function WinContent({ nonogramRaw }: { nonogramRaw: NonogramRaw }): JSX.Element {
    const gameTime = useAppSelector((state) => state.game.userGame?.currentTime);
    const title = nonogramRaw.nonogram.title.ru;

    return (
        <>
            <div>{title}</div>
            <Clock userTime={gameTime ?? 0} />
        </>
    );
}
