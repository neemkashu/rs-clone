import { NONOGRAM_INFO } from '../../utils/constants';
import './gameStyles/GameHeader.scss';
import Progress from './Progress';

// temp solution before getting file with all captions
const CAPTIONS = {
    size: 'Size',
    difficulty: 'Difficulty',
    nonogram: 'Nonogram',
};
// TODO: may add to tech spec changing title from id to name after solution
const { title, width, height, difficulty, status, id } = NONOGRAM_INFO;
const showTitle = status === 'isFinished' ? title : `#${id}`;

const {
    size: sizeCaption,
    difficulty: difficultyCaption,
    nonogram: nonogramCaption,
} = CAPTIONS;

function GameHeader(): JSX.Element {
    return (
        <div className="game-header">
            <h2>
                {nonogramCaption} {showTitle}
            </h2>
            <div className="container d-flex gap-2">
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
