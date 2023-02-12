interface ModalCaptions {
    modalTitle: string;
    modalDismissChoise: string;
    modalAcceptChoice: string;
}

export function GamePopup({
    captions,
    children,
}: {
    captions: ModalCaptions;
    children: JSX.Element;
}): JSX.Element {
    return (
        <div
            className="modal fade show"
            tabIndex={-1}
            style={{ display: 'block', backgroundColor: 'rgba(130,130,130,0.5)' }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title">{captions.modalTitle}</div>
                        <button type="button" className="btn-close" aria-label="Close" />
                    </div>
                    <div className="modal-body">{children}</div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary">
                            {captions.modalDismissChoise}
                        </button>
                        <button type="button" className="btn btn-primary">
                            {captions.modalAcceptChoice}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
