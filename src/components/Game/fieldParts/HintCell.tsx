import { useState } from 'react';
import Cell from './Cell';

const HINT_STATE_STYLE = 'hint-crossed';

export default function HintCell({
    hint,
    stateStyle,
    styles,
}: {
    hint: string;
    stateStyle: string;
    styles: string[];
}): JSX.Element {
    const [currentStateStyle, setCurrentStateStyle] = useState(stateStyle);

    const handleClick = () => {
        if (hint !== '') {
            setCurrentStateStyle((previous) =>
                previous === HINT_STATE_STYLE ? '' : HINT_STATE_STYLE
            );
        }
    };
    return (
        <Cell
            handler={handleClick}
            cellContent={`${hint}`}
            styles={[currentStateStyle, ...styles]}
        />
    );
}
