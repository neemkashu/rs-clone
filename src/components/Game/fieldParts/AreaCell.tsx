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
    return (
        <Cell
            handleClick={handleClick}
            handleContext={handleContext}
            cellContent=""
            styles={[stateStyle, ...styles]}
        />
    );
}
