import { useTranslation } from 'react-i18next';
import { Clock } from '../../Clock';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { selectNonogramRaw, selectUserTime } from '../gameSlice';
import { getImageFromMatrix, getTranslatedTitle } from '../gameUtils/helpers';
import { NonogramRaw } from '../gameUtils/types';

const imageWrapperStyle = {
    maxWidth: '100px',
};
const imageStyle = {
    width: '100%',
    maxHeight: '100%',
};

export function WinContent(): JSX.Element {
    const gameTime = useAppSelector(selectUserTime);
    const nonogramRaw = useAppSelector(selectNonogramRaw);
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const title = nonogramRaw?.nonogram.title;
    const titleTranslated = title && getTranslatedTitle(title, currentLanguage);
    const goal = nonogramRaw?.nonogram.goal;

    return (
        <div className="d-flex flex-column align-items-center gap-2">
            <div>{titleTranslated}</div>
            <div className="border border-2 rounded w-50 p-1" style={imageWrapperStyle}>
                <img src={getImageFromMatrix(goal)} alt="" style={imageStyle} />
            </div>
            <Clock userTime={gameTime ?? 0} />
        </div>
    );
}
