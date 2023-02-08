import React from 'react';

type SpecificLanguageButtonPropsType = {
    id: string;
    svg: React.ReactNode;
    active?: string;
    handleLang: (e: React.MouseEvent) => void;
};

export function SpecificLanguageButton({
    id,
    svg,
    active,
    handleLang,
}: SpecificLanguageButtonPropsType): JSX.Element {
    return (
        <button
            onClick={handleLang}
            type="button"
            id={id}
            className={`dropdown-item ${active}`}
        >
            {svg}
        </button>
    );
}
