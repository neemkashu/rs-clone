import './gameStyles/Controls.scss';

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

function Controls(): JSX.Element {
    return (
        <div className="btn-group btn-group-sm game-controls">
            {Object.values(CAPTIONS).map((caption, index) => {
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
