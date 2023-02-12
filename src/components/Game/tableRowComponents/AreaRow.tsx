import { useAppDispatch, useAppSelector } from '../../hooks';
import AreaCell from '../fieldParts/AreaCell';
import { updateAreaCell } from '../gameSlice';
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
    const location: fieldPlace = FieldPlace.AREA;
    const dispatch = useAppDispatch();
    return (
        <tr>
            {linesUnified[indexRow].map((cell, indexNumberRow) => {
                const userCell = userSolution && userSolution[indexRow][indexNumberRow];
                const style = getAreaCellStyle(userCell);
                const squareKey = `${location}-cell-col-${indexRow}-row-${indexNumberRow}`;

                const handleClick = () => {
                    // console.warn('handleClick AREA cell', userCell);
                    dispatch(
                        updateAreaCell({
                            clickType: ClickType.MOUSE_CLICK,
                            indexRow,
                            indexNumberRow,
                        })
                    );
                };
                const handlerContext = () => {
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
                        handleContext={handlerContext}
                        stateStyle={style}
                        styles={[]}
                    />
                );
            })}
        </tr>
    );
}
