import React, { useRef } from 'react';

export function ColorThemeButton(): JSX.Element {
    const lightThemeBtnContentRef = useRef<HTMLDivElement>(null);
    const darkThemeBtnContentRef = useRef<HTMLDivElement>(null);

    function handleColorThemeChange(e: React.MouseEvent): void {
        const btn = e.currentTarget as HTMLButtonElement;
        btn.classList.toggle('btn-warning');
        btn.classList.toggle('btn-dark');
        lightThemeBtnContentRef.current?.toggleAttribute('hidden');
        darkThemeBtnContentRef.current?.toggleAttribute('hidden');
    }
    return (
        <button
            type="button"
            onClick={handleColorThemeChange}
            className="btn btn-warning"
        >
            <div
                ref={lightThemeBtnContentRef}
                id="lightThemeBtnContent"
                className=" text-center"
            >
                ☀
            </div>
            <div
                ref={darkThemeBtnContentRef}
                id="darkThemeBtnContent"
                hidden
                className=" text-center"
            >
                🌒
            </div>
        </button>
    );
}
