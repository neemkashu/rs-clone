import { FieldPlace, TableRowProps } from '../../../utils/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateAreaCell, updateAsideHintCell, updateHeaderHintCell } from '../gameSlice';
import { HINT_STATE_STYLE } from '../gameUtils/constants';
import { CellAreaState, ClickType } from '../gameUtils/types';
import AreaCell from './AreaCell';
import HintCell from './HintCell';

export default function TableRow({
    location,
    indexRow,
    linesUnified,
}: TableRowProps): JSX.Element {
    const columnsUnified = useAppSelector(
        (state) => state.game.userGame?.currentUserColumns
    );
    const rowsUnified = useAppSelector((state) => state.game.userGame?.currentUserRows);
    const userSolution = useAppSelector(
        (state) => state.game.userGame?.currentUserSolution
    );
    const dispatch = useAppDispatch();

    switch (location) {
        case FieldPlace.ASIDE: {
            // console.warn('indexRow', indexRow);
            // console.warn('rowsUnified', rowsUnified);
            return (
                <tr>
                    {linesUnified[indexRow].map((cellContent, indexNumberRow) => {
                        const squareKey = `${location}-cell-col-${indexRow}-row-${indexNumberRow}`;
                        const isHint = typeof cellContent !== 'number';
                        const hint = (isHint ? cellContent?.hint : '') ?? '';
                        const isCrossed =
                            (rowsUnified &&
                                rowsUnified[indexRow][indexNumberRow]?.isCrossedOut) ??
                            false;

                        const handleClick = () => {
                            if (hint !== '') {
                                // console.warn('handleClick isCrossed', isCrossed);
                                dispatch(
                                    updateAsideHintCell({
                                        isCrossedOut: !isCrossed,
                                        indexRow,
                                        indexColumn: indexNumberRow,
                                    })
                                );
                            }
                        };
                        return (
                            <HintCell
                                key={squareKey}
                                handler={handleClick}
                                hint={`${hint}`}
                                stateStyle={isCrossed ? HINT_STATE_STYLE : ''}
                                styles={[]}
                            />
                        );
                    })}
                </tr>
            );
        }
        case FieldPlace.HEADER: {
            return (
                <tr>
                    {linesUnified.map((column, indexColumn) => {
                        const squareKey = `${location}-cell-col-${indexRow}-row-${indexColumn}`;
                        const cellContent = column[indexRow];
                        const isHint = typeof cellContent !== 'number';
                        const hint = (isHint ? cellContent?.hint : '') ?? '';
                        const isCrossed =
                            (columnsUnified &&
                                columnsUnified[indexColumn][indexRow]?.isCrossedOut) ??
                            false;

                        const handleClick = () => {
                            if (hint !== '') {
                                // console.warn('handleClick isCrossed', isCrossed);
                                dispatch(
                                    updateHeaderHintCell({
                                        isCrossedOut: !isCrossed,
                                        indexRow,
                                        indexColumn,
                                    })
                                );
                            }
                        };
                        return (
                            <HintCell
                                key={squareKey}
                                handler={handleClick}
                                hint={`${hint}`}
                                stateStyle={isCrossed ? HINT_STATE_STYLE : ''}
                                styles={[]}
                            />
                        );
                    })}
                </tr>
            );
        }
        case FieldPlace.AREA: {
            return (
                <tr>
                    {linesUnified[indexRow].map((cell, indexNumberRow) => {
                        const userCell =
                            userSolution && userSolution[indexRow][indexNumberRow];

                        // console.log('userCell', userCell);
                        const crossedStyle =
                            userCell === CellAreaState.CROSSED ? 'crossed-square' : '';
                        const filledStyle =
                            userCell === CellAreaState.FILLED ? 'filled-square' : '';
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
                                stateStyle={
                                    (crossedStyle || filledStyle) ?? 'empty-square'
                                }
                                styles={[]}
                            />
                        );
                    })}
                </tr>
            );
        }

        default: {
            return <tr />;
        }
    }
}
