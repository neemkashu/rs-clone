import { CheckButton } from './controlButtons/CheckButton';
import { ClearButton } from './controlButtons/ClearButton';
import { RedoButton } from './controlButtons/RedoButton';
import { RestartButton } from './controlButtons/RestartButton';
import { UndoButton } from './controlButtons/UndoButton';

// temp solution before getting file with all captions
export const CAPTIONS = {
    stepBack: 'Undo ↪',
    stepForward: 'Redo ↩',
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

export function Controls(): JSX.Element {
    return (
        <div className="btn-group btn-group-sm game-controls">
            {Object.values(CAPTIONS).map((caption, index) => {
                if (caption === CAPTIONS.clear) {
                    return <ClearButton key={caption} />;
                }
                if (caption === CAPTIONS.restart) {
                    return <RestartButton key={caption} />;
                }
                if (caption === CAPTIONS.check) {
                    return <CheckButton key={caption} />;
                }
                if (caption === CAPTIONS.stepBack) {
                    return <UndoButton key={caption} caption={caption} />;
                }
                if (caption === CAPTIONS.stepForward) {
                    return <RedoButton key={caption} caption={caption} />;
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
