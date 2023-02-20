import { convertSettingToNumber } from '../../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { filledHintsHandler } from '../gameLogic/filledHintsHandler';
import { updateHintCell } from '../gameSlice';
import { FieldPlace } from '../gameUtils/types';
import Cell from './Cell';
import { HINT_STATE_STYLE } from '../gameUtils/constants';

export default function HintAsideCell({
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
    const dispatch = useAppDispatch();
    const isLastHintComplete = useAppSelector(
        (state) => state.settings.game.lastCrossedOutDigitFillsLineWithCrosses
    );
    const delayMistakesFromSetting = useAppSelector(
        (state) => state.settings.game.highlightCellsWithError
    );
    const hintCell = useAppSelector(
        (state) => state.game.present.userGame?.currentUserRows[indexRow][indexNumberRow]
    );
    const delayMistakes = convertSettingToNumber(delayMistakesFromSetting);
    const isCrossed = hintCell?.isCrossedOut ?? false;

    const handleClick = () => {
        if (hint !== '') {
            // console.warn('handleClick isCrossed', isCrossed);
            dispatch(
                updateHintCell({
                    isCrossedOut: !isCrossed,
                    indexRow,
                    indexColumn: indexNumberRow,
                    location: FieldPlace.ASIDE,
                })
            );
        }
        if (isLastHintComplete) {
            filledHintsHandler(indexRow, dispatch, delayMistakes, FieldPlace.ASIDE);
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
