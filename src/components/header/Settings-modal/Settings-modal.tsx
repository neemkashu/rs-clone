import { SettingsMainContent } from './settings-modal-body';

export function SettingsModal(): JSX.Element {
    return (
        <div id="settingsModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header d-flex flex-column px-2 py-1">
                        <div className="container d-flex justify-content-between p-0">
                            <h4 className="my-2">Setting</h4>
                            <div className="d-flex align-items-center">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    data-bs-dismiss="modal"
                                    data-bs-target="#modalSettings"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        <div className="container btn-group my-2">
                            <button type="button" className="btn btn-outline-dark btn-sm">
                                Main
                            </button>
                            <button type="button" className="btn btn-outline-dark btn-sm">
                                Game
                            </button>
                            <button type="button" className="btn btn-outline-dark btn-sm">
                                View
                            </button>
                        </div>
                    </div>
                    <SettingsMainContent />
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger btn-sm">
                            Set all to default
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
