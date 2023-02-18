import { timeEnd } from 'console';
import { useTranslation } from 'react-i18next';
import { LanguagesShortNamesEnum } from '../../utils/enums';
import { GameStatus, NonogramRaw } from '../../utils/types';
import { useAppSelector } from '../hooks';
import { selectNonogramRaw, selectUserState } from './gameSlice';
import { getTranslatedTitle } from './gameUtils/helpers';
import { Languages } from './gameUtils/types';
import Progress from './Progress';

// temp solution before getting file with all captions
const CAPTIONS = {
    size: 'Size',
    difficulty: 'Difficulty',
    nonogram: 'Nonogram',
};
const MAX_DIFFICULTY = 5;
const TITLE_PLACEHOLDER = '*****';

function GameHeader(): JSX.Element {
    const nonogramData = useAppSelector(selectNonogramRaw);
    const { title, width, height } = nonogramData?.nonogram ?? {};
    const status = useAppSelector(selectUserState);
    const { t, i18n } = useTranslation();
    const difficulty = nonogramData?.nonogram.difficulty;
    const isShowTitleBeforeSolve = useAppSelector(
        (state) => state.settings.main.showNonogramTitlesBeforeSolving
    );
    const currentLanguage = i18n.language;

    const showTitle =
        isShowTitleBeforeSolve || status === GameStatus.FINISHED
            ? title && getTranslatedTitle(title, currentLanguage)
            : TITLE_PLACEHOLDER;

    return (
        <div className="game-header">
            <h2>
                {t('gameHeader')} {showTitle}
            </h2>
            <div className="d-flex gap-2">
                <div>
                    {t('gameSize')}: {width} ✖ {height}
                </div>
                <div>{`${t('gameDifficulty')}: ${difficulty}/${MAX_DIFFICULTY}`}</div>
            </div>
            <Progress />
        </div>
    );
}

export default GameHeader;
