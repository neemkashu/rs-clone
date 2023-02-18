import { Clock } from '../../Clock';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { selectNonogramRaw, selectUserTime } from '../gameSlice';
import { getImageFromMatrix } from '../gameUtils/helpers';
import { NonogramRaw } from '../gameUtils/types';

export function WinContent(): JSX.Element {
    const gameTime = useAppSelector(selectUserTime);
    const nonogramRaw = useAppSelector(selectNonogramRaw);
    const title = nonogramRaw?.nonogram.title.ru;

    return (
        <div className="d-flex flex-column align-items-center gap-2">
            <div>{title}</div>
            <div
                className="border border-2 rounded w-50 p-1"
                style={{
                    maxWidth: '100px',
                }}
            >
                <img
                    src={getImageFromMatrix(
                        store.getState().game.present.currentNonogram?.nonogram.goal
                    )}
                    alt=""
                    style={{
                        width: '100%',
                        maxHeight: '100%',
                    }}
                />
            </div>
            <Clock userTime={gameTime ?? 0} />
        </div>
    );
}
