import React from 'react';

export function ColorThemeButton(): JSX.Element {
    function handleColorThemeChange(e: React.MouseEvent): void {
        const btn = e.currentTarget as HTMLButtonElement;
        const lightThemeBtnContent = btn.querySelector(
            '#lightThemeBtnContent'
        ) as HTMLDivElement;
        const darkThemeBtnContent = btn.querySelector(
            '#darkThemeBtnContent'
        ) as HTMLDivElement;
        btn.classList.toggle('btn-warning');
        btn.classList.toggle('btn-dark');
        lightThemeBtnContent.toggleAttribute('hidden');
        darkThemeBtnContent.toggleAttribute('hidden');
    }
    return (
        <button
            type="button"
            onClick={handleColorThemeChange}
            className="btn btn-warning"
        >
            <div id="lightThemeBtnContent" className=" text-center">
                ☀
            </div>
            <div id="darkThemeBtnContent" hidden className=" text-center">
                🌒
            </div>
        </button>
    );
}
