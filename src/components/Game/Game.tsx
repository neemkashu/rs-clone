import './Game.scss';
import Controls from './Controls';
import Field from './Field';
import GameHeader from './GameHeader';
import Stopwatch from './Stopwatch';

function Game(): JSX.Element {
    return (
        <div className="container game">
            <GameHeader />
            <Stopwatch />
            <Field />
            <Controls />
        </div>
    );
}

export default Game;
