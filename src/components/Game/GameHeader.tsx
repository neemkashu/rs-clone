import { useContext } from 'react';
import { userNonogramData } from '../../utils/mochas';
import { NonogramRaw } from '../../utils/types';
import { GameStatusContext } from './contexts/context';
import './gameStyles/GameHeader.scss';
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

function GameHeader({ nonogramRaw }: { nonogramRaw: NonogramRaw | null }): JSX.Element {
    const nonogramData = nonogramRaw?.nonogram;
    const { title, width, height } = nonogramData ?? {};
    const status = userNonogramData.data.currentGame.state;
    const difficulty = getDifficulty();
    const showTitle = status === 'finished' ? title?.en : '*****';
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
