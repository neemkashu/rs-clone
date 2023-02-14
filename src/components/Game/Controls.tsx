import { CheckButton } from './controlButtons/CheckButton';
import { ClearButton } from './controlButtons/ClearButton';
import { RestartButton } from './controlButtons/RestartButton';
import './gameStyles/Controls.scss';
import { NonogramRaw } from './gameUtils/types';

// temp solution before getting file with all captions
const CAPTIONS = {
    stepBack: '↪',
    stepForward: '↩',
    clear: 'Clear',
    restart: 'Restart',
    check: 'Check',
    hint: 'Use hint',
};
const classNames = [
    'game-undo',
    'game-redo',
    'game-clear',
    'game-clear btn-outline-danger',
    'game-clear',
    'game-clear btn-outline-danger',
];

function Controls({ nonogramRaw }: { nonogramRaw: NonogramRaw }): JSX.Element {
    return (
        <div className="btn-group btn-group-sm game-controls">
            {Object.values(CAPTIONS).map((caption, index) => {
                if (index === 2) {
                    return <ClearButton key={caption} nonogramRaw={nonogramRaw} />;
                }
                if (index === 3) {
                    return <RestartButton key={caption} nonogramRaw={nonogramRaw} />;
                }
                if (index === 4) {
                    return <CheckButton key={caption} />;
                }
                return (
                    <button
                        key={caption}
                        type="button"
                        className={`btn btn-toolbar btn-outline-primary ${classNames[index]}`}
                    >
                        {caption}
                    </button>
                );
            })}
        </div>
    );
}

export default Controls;
