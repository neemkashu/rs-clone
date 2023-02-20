import { convertSettingToNumber } from '../../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { filledHintsHandler } from '../gameLogic/filledHintsHandler';
import { updateHintCell } from '../gameSlice';
import { HINT_STATE_STYLE } from '../gameUtils/constants';
import { FieldPlace, fieldPlace } from '../gameUtils/types';
import Cell from './Cell';

export default function HintHeaderCell({
    handler,
    hint,
    styles,
    indexRow,
    indexNumberRow,
}: {
    handler?: () => void;
    hint: string;
    styles: string[];
    indexRow: number;
    indexNumberRow: number;
}): JSX.Element {
    const location: fieldPlace = FieldPlace.HEADER;
    const hintCell = useAppSelector(
        (state) =>
            state.game.present.userGame?.currentUserColumns[indexNumberRow][indexRow]
    );
    const delayMistakesFromSetting = useAppSelector(
        (state) => state.settings.game.highlightCellsWithError
    );
    const isLastHintComplete = useAppSelector(
        (state) => state.settings.game.lastCrossedOutDigitFillsLineWithCrosses
    );
    const delayMistakes = convertSettingToNumber(delayMistakesFromSetting);
    const dispatch = useAppDispatch();
    const isCrossed = hintCell?.isCrossedOut ?? false;

    const handleClick = () => {
        if (hint !== '') {
            dispatch(
                updateHintCell({
                    isCrossedOut: !isCrossed,
                    indexRow,
                    indexColumn: indexNumberRow,
                    location,
                })
            );
            if (isLastHintComplete) {
                filledHintsHandler(
                    indexNumberRow,
                    dispatch,
                    delayMistakes,
                    FieldPlace.HEADER
                );
            }
        }
    };
    return (
        <Cell
            handleClick={handleClick}
            handleContext={handleClick}
            cellContent={`${hint}`}
            stateStyle={[isCrossed ? HINT_STATE_STYLE : '']}
            styles={[...styles]}
        />
    );
}
