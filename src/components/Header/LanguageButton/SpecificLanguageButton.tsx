import { SpecificLanguageButtonPropsType } from '../../../utils/types';

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
