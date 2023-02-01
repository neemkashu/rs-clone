import './GameHeader.scss';
import Progress from './Progress';

const NONOGRAM_INFO = {
    // temp const before getting info from back-end
    name: 'Apple',
    width: 30,
    height: 20,
    difficulty: 3.2,
    status: 'new',
    id: 234,
};
// temp solution before getting file with all captions
const CAPTIONS = {
    size: 'Size',
    difficulty: 'Difficulty',
    nonogram: 'Nonogram',
};
// TODO: may add to tech spec changing title from id to name after solution
const { name, width, height, difficulty, status, id } = NONOGRAM_INFO;
const showName = status === 'isFinished' ? name : `#${id}`;

const {
    size: sizeCaption,
    difficulty: difficultyCaption,
    nonogram: nonogramCaption,
} = CAPTIONS;

function GameHeader(): JSX.Element {
    return (
        <div className="container game-header">
            <h2>
                {nonogramCaption} {showName}
            </h2>
            <div className="container game-base-info">
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
