import { useEffect, useState } from 'react';
import Cell from './Cell';

const AREA_STATE_STYLES = ['crossed-square', 'empty-square', 'filled-square'];

export default function AreaCell({
    cell,
    stateStyle,
    styles,
}: {
    cell: number | null;
    stateStyle: string;
    styles: string[];
}): JSX.Element {
    const [currentStateStyle, setCurrentStateStyle] = useState(stateStyle);

    const handleClick = () => {
        let index = AREA_STATE_STYLES.findIndex((style) => style === currentStateStyle);
        if (index < AREA_STATE_STYLES.length - 1) {
            index += 1;
        } else {
            index = 0;
        }
        const nextStyle = AREA_STATE_STYLES[index];
        setCurrentStateStyle(nextStyle);
    };
    return (
        <Cell
            handler={handleClick}
            cellContent=""
            styles={[currentStateStyle, ...styles]}
        />
    );
}
