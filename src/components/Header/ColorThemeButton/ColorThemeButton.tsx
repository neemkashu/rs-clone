import React, { useState } from 'react';

export function ColorThemeButton(): JSX.Element {
    const [isLightTheme, setIsLightTheme] = useState(true);

    function handleColorThemeChange(e: React.MouseEvent): void {
        setIsLightTheme(!isLightTheme);
    }

    const classNames = isLightTheme ? 'btn btn-warning' : 'btn btn-dark';
    return (
        <button type="button" onClick={handleColorThemeChange} className={classNames}>
            {isLightTheme ? (
                <div id="lightThemeBtnContent" className=" text-center">
                    ☀
                </div>
            ) : (
                <div id="darkThemeBtnContent" className=" text-center">
                    🌒
                </div>
            )}
        </button>
    );
}
