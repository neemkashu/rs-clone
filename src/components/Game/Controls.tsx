import './Controls.scss';

// temp solution before getting file with all captions
const CAPTIONS = {
    stepBack: '↪',
    stepForward: '↩',
    clear: 'Clear',
    restart: 'Restart',
    check: 'Check',
    hint: 'Use hint',
};

const {
    stepBack: stepBackCaption,
    stepForward: stepForwardCaption,
    clear: clearCaption,
    restart: restartCaption,
    check: checkCaption,
    hint: hintCaption,
} = CAPTIONS;

function Controls(): JSX.Element {
    return (
        <div className="btn-group game-controls">
            <button
                type="button"
                className="game-undo btn btn-toolbar btn-outline-primary"
            >
                {stepBackCaption}
            </button>
            <button
                type="button"
                className="game-redo btn btn-toolbar btn-outline-primary"
            >
                {stepForwardCaption}
            </button>
            <button
                type="button"
                className="game-clear btn btn-toolbar btn-outline-primary"
            >
                {clearCaption}
            </button>
            <button
                type="button"
                className="game-clear btn btn-toolbar btn-outline-primary btn-outline-danger"
            >
                {restartCaption}
            </button>
            <button
                type="button"
                className="game-clear btn btn-toolbar btn-outline-primary"
            >
                {checkCaption}
            </button>
            <button
                type="button"
                className="game-clear btn btn-toolbar btn-outline-primary btn-outline-danger"
            >
                {hintCaption}
            </button>
        </div>
    );
}

export default Controls;
