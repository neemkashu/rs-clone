import { convertSettingToNumber } from '../../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import HintCell from '../fieldParts/HintCell';
import { filledHintsHandler } from '../gameLogic/filledHintsHandler';
import { mistakesHandler } from '../gameLogic/mistakesHandler';
import { updateHintCell } from '../gameSlice';
import { HINT_STATE_STYLE } from '../gameUtils/constants';
import { fieldPlace, FieldPlace, NonogramHint } from '../gameUtils/types';

export interface HeaderRowProps {
    linesUnified: (NonogramHint | null)[][];
    indexRow: number;
}

export function HeaderRow({ linesUnified, indexRow }: HeaderRowProps) {
    const location: fieldPlace = FieldPlace.HEADER;
    const columnsUnified = useAppSelector(
        (state) => state.game.present.userGame?.currentUserColumns
    );
    const delayMistakesFromSetting = useAppSelector(
        (state) => state.settings.game.highlightCellsWithError
    );
    const isLastHintComplete = useAppSelector(
        (state) => state.settings.game.lastCrossedOutDigitFillsLineWithCrosses
    );
    const delayMistakes = convertSettingToNumber(delayMistakesFromSetting);
    const dispatch = useAppDispatch();
    return (
        <tr>
            {linesUnified.map((column, indexColumn) => {
                const squareKey = `${location}-cell-col-${indexRow}-row-${indexColumn}`;
                const cellContent = column[indexRow];
                const hint = cellContent?.hint ?? '';
                const isCrossed =
                    (columnsUnified &&
                        columnsUnified[indexColumn][indexRow]?.isCrossedOut) ??
                    false;
                const isFifth = (indexColumn + 1) % 5 === 0;

                const handleClick = () => {
                    if (hint !== '') {
                        dispatch(
                            updateHintCell({
                                isCrossedOut: !isCrossed,
                                indexRow,
                                indexColumn,
                                location,
                            })
                        );
                        if (isLastHintComplete) {
                            filledHintsHandler(
                                indexColumn,
                                dispatch,
                                delayMistakes,
                                FieldPlace.HEADER
                            );
                        }
                    }
                };
                return (
                    <HintCell
                        key={squareKey}
                        handler={handleClick}
                        hint={`${hint}`}
                        stateStyle={isCrossed ? HINT_STATE_STYLE : ''}
                        styles={[isFifth ? 'border-right-plus' : '']}
                    />
                );
            })}
        </tr>
    );
}
