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
    // const [currentStateStyle, setCurrentStateStyle] = useState(stateStyle);
    // const dispatch = useAppDispatch();

    // const handleClick = () => {
    //     if (hint !== '') {
    //         setCurrentStateStyle((previous) =>
    //             previous === HINT_STATE_STYLE ? '' : HINT_STATE_STYLE
    //         );
    //         // dispatch(updateHintCell(currentStateStyle));
    //     }
    // };
    return (
        <Cell
            handleClick={handler}
            handleContext={handler}
            cellContent={`${hint}`}
            styles={[stateStyle, ...styles]}
        />
    );
}
