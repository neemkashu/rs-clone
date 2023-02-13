import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import AreaCell from '../fieldParts/AreaCell';
import { mistakesHandler } from '../gameLogic/mistakesHandler';
import { updateAreaCell, updateMistakeData } from '../gameSlice';
import {
    AreaCellStyle,
    CellAreaState,
    ClickType,
    fieldPlace,
    FieldPlace,
} from '../gameUtils/types';

export interface AreaRowProps {
    linesUnified: (number | null)[][];
    indexRow: number;
}
const AREA_STYLES: AreaCellStyle = {
    EMPTY: 'empty-square',
    CROSSED: 'crossed-square',
    FILLED: 'filled-square',
};
const getAreaCellStyle = (userCell?: number | null): string => {
    switch (userCell) {
        case CellAreaState.CROSSED: {
            return AREA_STYLES.CROSSED;
        }
        case CellAreaState.FILLED: {
            return AREA_STYLES.FILLED;
        }
        default: {
            return AREA_STYLES.EMPTY;
        }
    }
};

export function AreaRow({ linesUnified, indexRow }: AreaRowProps) {
    const userSolution = useAppSelector(
        (state) => state.game.userGame?.currentUserSolution
    );
    const mistakes = useAppSelector((state) => state.game.incorrectCells);
    const location: fieldPlace = FieldPlace.AREA;
    const dispatch = useAppDispatch();
    return (
        <tr>
            {linesUnified[indexRow].map((cell, indexNumberRow) => {
                const userCell = userSolution && userSolution[indexRow][indexNumberRow];
                const style = getAreaCellStyle(userCell);
                const squareKey = `${location}-cell-col-${indexRow}-row-${indexNumberRow}`;
                const isBottomBorder = (indexRow + 1) % 5 === 0;
                const isRightBorder = (indexNumberRow + 1) % 5 === 0;
                const isNotCorrect =
                    mistakes && mistakes[indexRow][indexNumberRow] === null;

                const handleClick = () => {
                    // console.warn('handleClick AREA cell', userCell);
                    dispatch(
                        updateAreaCell({
                            clickType: ClickType.MOUSE_CLICK,
                            indexRow,
                            indexNumberRow,
                        })
                    );
                    // dispatch(updateMistakeData({ indexRow, indexNumberRow }));
                    mistakesHandler(indexRow, indexNumberRow, dispatch);
                };
                const handleContext = () => {
                    // console.warn('handlerContext AREA cell', userCell);
                    dispatch(
                        updateAreaCell({
                            clickType: ClickType.MOUSE_CONTEXT,
                            indexRow,
                            indexNumberRow,
                        })
                    );
                };

                return (
                    <AreaCell
                        key={squareKey}
                        handleClick={handleClick}
                        handleContext={handleContext}
                        stateStyle={[style, isNotCorrect ? 'incorrect-fill' : '']}
                        styles={[
                            isBottomBorder ? 'border-bottom-plus' : '',
                            isRightBorder ? 'border-right-plus' : '',
                        ]}
                    />
                );
            })}
        </tr>
    );
}
