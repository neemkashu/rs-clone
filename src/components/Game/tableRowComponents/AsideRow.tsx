import { convertSettingToNumber } from '../../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import HintCell from '../fieldParts/HintCell';
import { filledRowHintsHandler } from '../gameLogic/filledHintsHandler';
import { updateHintCell } from '../gameSlice';
import { HINT_STATE_STYLE } from '../gameUtils/constants';
import { fieldPlace, FieldPlace, NonogramHint } from '../gameUtils/types';

export interface AsideRowProps {
    linesUnified: (NonogramHint | null)[][];
    indexRow: number;
}

export function AsideRow({ linesUnified, indexRow }: AsideRowProps) {
    const rowsUnified = useAppSelector(
        (state) => state.game.present.userGame?.currentUserRows
    );
    const dispatch = useAppDispatch();
    const delayMistakesFromSetting = useAppSelector(
        (state) => state.settings.game.highlightCellsWithError
    );
    const isLastHintComplete = useAppSelector(
        (state) => state.settings.game.lastCrossedOutDigitFillsLineWithCrosses
    );
    const delayMistakes = convertSettingToNumber(delayMistakesFromSetting);
    const location: fieldPlace = FieldPlace.ASIDE;

    return (
        <tr>
            {linesUnified[indexRow].map((cellContent, indexNumberRow) => {
                const squareKey = `${location}-cell-col-${indexRow}-row-${indexNumberRow}`;
                const hint = cellContent?.hint ?? '';
                const isCrossed =
                    (rowsUnified &&
                        rowsUnified[indexRow][indexNumberRow]?.isCrossedOut) ??
                    false;
                const isFifth = (indexRow + 1) % 5 === 0;

                const handleClick = () => {
                    if (hint !== '') {
                        // console.warn('handleClick isCrossed', isCrossed);
                        dispatch(
                            updateHintCell({
                                isCrossedOut: !isCrossed,
                                indexRow,
                                indexColumn: indexNumberRow,
                                location,
                            })
                        );
                    }
                    if (isLastHintComplete) {
                        filledRowHintsHandler(indexRow, dispatch, delayMistakes);
                    }
                };
                return (
                    <HintCell
                        key={squareKey}
                        handler={handleClick}
                        hint={`${hint}`}
                        stateStyle={isCrossed ? HINT_STATE_STYLE : ''}
                        styles={[isFifth ? 'border-bottom-plus' : '']}
                    />
                );
            })}
        </tr>
    );
}
