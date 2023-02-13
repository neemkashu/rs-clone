import { useState } from 'react';

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
    children: JSX.Element[];
}): JSX.Element {
    const modalStates = ['block', 'none'];
    const [modalDisplay, setmodalDisplay] = useState(modalStates[0]);
    const modalHandler = () => {
        const modalStyle =
            modalDisplay === modalStates[0] ? modalStates[1] : modalStates[0];
        setmodalDisplay(modalStyle);
    };
    return (
        <div
            className="modal fade show"
            tabIndex={-1}
            style={{ display: modalDisplay, backgroundColor: 'rgba(130,130,130,0.5)' }}
            onClick={modalHandler}
            role="presentation"
        >
            <div
                className="modal-dialog"
                onClick={(event) => {
                    event?.stopPropagation();
                }}
                role="presentation"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title">{captions.modalTitle}</div>
                        <button
                            type="button"
                            onClick={modalHandler}
                            className="btn-close"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">{children[0]}</div>
                    <div className="modal-footer">{children[1]}</div>
                </div>
            </div>
        </div>
    );
}
