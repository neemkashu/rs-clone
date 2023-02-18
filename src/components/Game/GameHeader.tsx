import { GameStatus, NonogramRaw } from '../../utils/types';
import { useAppSelector } from '../hooks';
import { selectNonogramRaw, selectUserState } from './gameSlice';
import Progress from './Progress';

// temp solution before getting file with all captions
const CAPTIONS = {
    size: 'Size',
    difficulty: 'Difficulty',
    nonogram: 'Nonogram',
};
const MAX_DIFFICULTY = 5;

const {
    size: sizeCaption,
    difficulty: difficultyCaption,
    nonogram: nonogramCaption,
} = CAPTIONS;

function GameHeader(): JSX.Element {
    const nonogramData = useAppSelector(selectNonogramRaw);
    const { title, width, height } = nonogramData?.nonogram ?? {};
    const status = useAppSelector(selectUserState);
    const difficulty = nonogramData?.nonogram.difficulty;
    const isShowTitleBeforeSolve = useAppSelector(
        (state) => state.settings.main.showNonogramTitlesBeforeSolving
    );
    const showTitle =
        isShowTitleBeforeSolve || status === GameStatus.FINISHED ? title?.en : '*****';
    return (
        <div className="game-header">
            <h2>
                {nonogramCaption} {showTitle}
            </h2>
            <div className="d-flex gap-2">
                <div>
                    {sizeCaption}: {width} ✖ {height}
                </div>
                <div>{`${difficultyCaption}: ${difficulty}/${MAX_DIFFICULTY}`}</div>
            </div>
            <Progress />
        </div>
    );
}

export default GameHeader;
