import React, { useState, useEffect } from 'react';
import { changeColorTheme } from '../../../utils/helpers';

export const styleEmoji = {
    fontFamily: 'Segoe UI emoji',
};

export function ColorThemeButton(): JSX.Element {
    const isCurrentThemeDark = localStorage.getItem('currentTheme') === 'dark';
    const [isLightTheme, setIsLightTheme] = useState(!isCurrentThemeDark);

    function handleColorThemeChange(e: React.MouseEvent): void {
        setIsLightTheme(!isLightTheme);
    }

    useEffect(() => {
        changeColorTheme(isLightTheme);
    }, [isLightTheme]);

    const classNames = isLightTheme ? 'btn btn-warning' : 'btn btn-primary';
    return (
        <button
            type="button"
            onClick={handleColorThemeChange}
            className={classNames}
            style={styleEmoji}
        >
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
