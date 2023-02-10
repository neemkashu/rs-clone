import { useEffect, useState } from 'react';
import Cell from './Cell';

export default function AreaCell({
    handleClick,
    handleContext,
    stateStyle,
    styles,
}: {
    handleClick: () => void;
    handleContext: () => void;
    stateStyle: string;
    styles: string[];
}): JSX.Element {
    // const [currentStateStyle, setCurrentStateStyle] = useState(stateStyle);

    // const handleClick = () => {
    //     let index = AREA_STATE_STYLES.findIndex((style) =>style === currentStateStyle);
    //     if (index < AREA_STATE_STYLES.length - 1) {
    //         index += 1;
    //     } else {
    //         index = 0;
    //     }
    //     const nextStyle = AREA_STATE_STYLES[index];
    //     setCurrentStateStyle(nextStyle);
    // };
    return (
        <Cell
            handleClick={handleClick}
            handleContext={handleContext}
            cellContent=""
            styles={[stateStyle, ...styles]}
        />
    );
}
