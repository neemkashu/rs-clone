import { userNonogramData } from '../../utils/mochas';
import { NonogramRaw } from '../../utils/types';
import { useAppSelector } from '../hooks';
import { selectNonogramRaw } from './gameSlice';
import Progress from './Progress';

// temp solution before getting file with all captions
const CAPTIONS = {
    size: 'Size',
    difficulty: 'Difficulty',
    nonogram: 'Nonogram',
};
// temporary function before implementing the real one
const getDifficulty = () => 0.24;

const {
    size: sizeCaption,
    difficulty: difficultyCaption,
    nonogram: nonogramCaption,
} = CAPTIONS;

function GameHeader(): JSX.Element {
    const nonogramData = useAppSelector(selectNonogramRaw);
    const { title, width, height } = nonogramData?.nonogram ?? {};
    const status = userNonogramData.data.currentGame.state;
    const difficulty = getDifficulty();
    const showTitle = status === 'finished' ? title?.en : '*****';
    return (
        <div className="game-header">
            <h2>
                {nonogramCaption} {showTitle}
            </h2>
            <div className="d-flex gap-2">
                <div>
                    {sizeCaption}: {width} ✖ {height}
                </div>
                <div>
                    {difficultyCaption}: {difficulty}
                </div>
            </div>
            <Progress />
        </div>
    );
}

export default GameHeader;
