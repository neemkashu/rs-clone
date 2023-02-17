import Cell from './Cell';

export default function HintCell({
    handler,
    hint,
    stateStyle,
    styles,
}: {
    handler: () => void;
    hint: string;
    stateStyle: string;
    styles: string[];
}): JSX.Element {
    return (
        <Cell
            handleClick={handler}
            handleContext={handler}
            cellContent={`${hint}`}
            stateStyle={[stateStyle]}
            styles={[...styles]}
        />
    );
}
