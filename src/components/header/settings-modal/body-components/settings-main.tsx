export function SettingsMainContent() {
    return (
        <ul className="modal-body ms-2 mb-0 py-1">
            <li>
                <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                        Show crossword titles before solving
                        <input
                            role="button"
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                        />
                    </label>
                </div>
            </li>
            <li>
                <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                        Show crossword thumbnails before solving
                        <input
                            role="button"
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                        />
                    </label>
                </div>
            </li>
        </ul>
    );
}
