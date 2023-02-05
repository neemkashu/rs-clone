import './gameStyles/Game.scss';
import Controls from './Controls';
import Field from './Field';
import GameHeader from './GameHeader';
import Stopwatch from './Stopwatch';

function Game(): JSX.Element {
    return (
        <div className="container d-flex flex-column gap-2">
            <GameHeader />
            <Stopwatch />
            <Field />
            <Controls />
        </div>
    );
}

export default Game;
