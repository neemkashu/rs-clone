export function SettingsViewContent() {
    return (
        <ul className="modal-body mb-0 py-1">
            <li className="ms-2">
                Marking an empty cell:
                <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="emptyCell">
                        <span id="emptyCellText">dot</span>
                        <input
                            role="button"
                            onClick={(e) => {
                                const currentInput = e.target as HTMLInputElement;
                                const textContainer = currentInput
                                    .closest('label')
                                    ?.querySelector('#emptyCellText') as HTMLSpanElement;
                                // maybe I will use useRef here,
                                // when I understand how to work with it
                                textContainer.innerText =
                                    textContainer.innerText === 'dot' ? 'cross' : 'dot';
                            }}
                            className="form-check-input"
                            type="checkbox"
                            id="emptyCell"
                        />
                    </label>
                </div>
            </li>
            <li className="ms-2">
                <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="guessTime">
                        Show guess time
                        <input
                            role="button"
                            className="form-check-input"
                            type="checkbox"
                            id="guessTime"
                        />
                    </label>
                </div>
            </li>
        </ul>
    );
}
