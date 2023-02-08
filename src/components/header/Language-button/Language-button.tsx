import React, { useRef } from 'react';

export function LanguageButton(): JSX.Element {
    const dropDownButtonRef = useRef<HTMLButtonElement | null>(null);

    function handleLang(e: React.MouseEvent): void {
        const allLangContainers = document.body.querySelectorAll(
            '#dropdownMenuLang button'
        );
        const eventTarget = e.target as HTMLDivElement;
        const properEventTarget = eventTarget.closest('button') as HTMLButtonElement;
        const eventTargetContent = properEventTarget.innerHTML;
        allLangContainers.forEach((elem) => {
            elem.classList.remove('active');
        });
        properEventTarget?.classList.add('active');
        if (dropDownButtonRef.current)
            dropDownButtonRef.current.innerHTML = eventTargetContent;
    }

    return (
        <div className="dropdown d-flex align-items-center">
            <button
                ref={dropDownButtonRef}
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                id="dropdownLangButton"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0,0 25,15"
                >
                    <rect width="25" height="15" fill="#00247d" />
                    <path d="M 0,0 L 25,15 M 25,0 L 0,15" stroke="#fff" strokeWidth="3" />
                    <path d="M 12.5,0 V 15 M 0,7.5 H 25" stroke="#fff" strokeWidth="5" />
                    <path
                        d="M 12.5,0 V 15 M 0,7.5 H 25"
                        stroke="#cf142b"
                        strokeWidth="3"
                    />
                </svg>
            </button>
            <div
                id="dropdownMenuLang"
                className="dropdown-menu"
                aria-labelledby="dropdownLangButton"
            >
                <button
                    type="button"
                    onClick={handleLang}
                    id="dropdownEnLang"
                    className="dropdown-item active"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0,0 25,15"
                    >
                        <desc>Switch page language to english</desc>
                        <rect width="25" height="15" fill="#00247d" />
                        <path
                            d="M 0,0 L 25,15 M 25,0 L 0,15"
                            stroke="#fff"
                            strokeWidth="3"
                        />
                        <path
                            d="M 12.5,0 V 15 M 0,7.5 H 25"
                            stroke="#fff"
                            strokeWidth="5"
                        />
                        <path
                            d="M 12.5,0 V 15 M 0,7.5 H 25"
                            stroke="#cf142b"
                            strokeWidth="3"
                        />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={handleLang}
                    id="dropdownRuLang"
                    className="dropdown-item"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 9 6"
                        width="25"
                        height="25"
                    >
                        <desc>Switch page language to russian</desc>
                        <rect fill="#fff" width="9" height="3" />
                        <rect fill="#d52b1e" y="3" width="9" height="3" />
                        <rect fill="#0039a6" y="2" width="9" height="2" />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={handleLang}
                    id="dropdownDeLang"
                    className="dropdown-item"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 5 3"
                    >
                        <desc>Switch page language to german</desc>
                        <rect
                            id="black_stripe"
                            width="5"
                            height="3"
                            y="0"
                            x="0"
                            fill="#000"
                        />
                        <rect
                            id="red_stripe"
                            width="5"
                            height="2"
                            y="1"
                            x="0"
                            fill="#D00"
                        />
                        <rect
                            id="gold_stripe"
                            width="5"
                            height="1"
                            y="2"
                            x="0"
                            fill="#FFCE00"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
