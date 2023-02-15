import { useState } from 'react';

interface ModalCaptions {
    modalTitle: string;
    modalDismissChoise: string;
    modalAcceptChoice: string;
}
const modalStyle = {
    display: 'block',
    backgroundColor: 'rgba(0,0,0,0.5)',
};

export function GamePopup({
    captions,
    children,
}: {
    captions: ModalCaptions;
    children: JSX.Element;
}): JSX.Element {
    const [isVisible, setIsVisible] = useState(true);
    const modalHandler = () => {
        setIsVisible((previous) => !previous);
    };
    return (
        <>
            <div />
            {isVisible && (
                <div
                    className="modal fade show"
                    tabIndex={-1}
                    style={modalStyle}
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
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
