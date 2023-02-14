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
    const [isVisible, setIsVisible] = useState(true);
    const modalHandler = () => {
        setIsVisible((prevoius) => !prevoius);
    };
    return (
        <>
            <div />
            {isVisible && (
                <div
                    className="modal fade show"
                    tabIndex={-1}
                    style={{
                        display: 'block',
                        backgroundColor: 'rgba(130,130,130,0.5)',
                    }}
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
            )}
        </>
    );
}
