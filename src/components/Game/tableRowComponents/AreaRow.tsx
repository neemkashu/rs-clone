import { MouseEventHandler, DragEventHandler, useState, useEffect } from 'react';
import { convertSettingToNumber } from '../../../utils/helpers';
import { EmptyCellMark } from '../../../utils/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import AreaCell from '../fieldParts/AreaCell';
import { filledLineHandler } from '../gameLogic/filledLineHandler';
import { mistakesHandler } from '../gameLogic/mistakesHandler';
import {
    paintDrag,
    selectUserSolution,
    updateAreaCell,
    updateMistakeData,
    updatePaintedCells,
    updatePaintProcess,
} from '../gameSlice';
import { checkIsPainted } from '../gameUtils/helpers';
import {
    AreaCellStyle,
    CellAreaState,
    ClickType,
    fieldPlace,
    FieldPlace,
} from '../gameUtils/types';

const USER_TIMEOUT = 2000;

export interface AreaRowProps {
    linesUnified: (number | null)[][];
    indexRow: number;
}
const AREA_STYLES: AreaCellStyle = {
    EMPTY: '',
    CROSSED: 'crossed-square',
    DOTTED: 'dotted-square',
    FILLED: 'filled-square',
};
const PAINT_STYLE = 'painted-square';

const getAreaCellStyle = (
    emptyCellMark: EmptyCellMark,
    userCell?: number | null
): string => {
    switch (userCell) {
        case CellAreaState.CROSSED: {
            return emptyCellMark === EmptyCellMark.CROSS
                ? AREA_STYLES.CROSSED
                : AREA_STYLES.DOTTED;
        }
        case CellAreaState.FILLED: {
            return AREA_STYLES.FILLED;
        }
        default: {
            return AREA_STYLES.EMPTY;
        }
    }
};

const PERIOD_OF_WIDE_TABLE_LINE = 5;

export function AreaRow({ linesUnified, indexRow }: AreaRowProps) {
    const location: fieldPlace = FieldPlace.AREA;
    const dispatch = useAppDispatch();
    const isPaintProcess = useAppSelector((state) => state.game.present.isPaintProcess);
    const emptyCellMark = useAppSelector(
        (state) => state.settings.view.markingAnEmptyCell.type
    );
    const delayMistakesFromSetting = useAppSelector(
        (state) => state.settings.game.highlightCellsWithError
    );
    const delayMistakes = convertSettingToNumber(delayMistakesFromSetting);
    const delayCompleteFromSetting = useAppSelector(
        (state) => state.settings.game.automaticallyCrossOutNumbers
    );
    const isLastHintComplete = useAppSelector(
        (state) => state.settings.game.lastCrossedOutDigitFillsLineWithCrosses
    );
    const delayComplete = convertSettingToNumber(delayCompleteFromSetting);

    return (
        <tr>
            {linesUnified[indexRow].map((cell, indexNumberRow) => {
                const userCell = useAppSelector((state) => {
                    if (state.game.present.userGame?.currentUserSolution) {
                        return state.game.present.userGame?.currentUserSolution[indexRow][
                            indexNumberRow
                        ];
                    }
                    return null;
                });

                const style = getAreaCellStyle(emptyCellMark, userCell);

                const [paintStyle, setPaintStyle] = useState('');

                useEffect(() => {
                    if (!isPaintProcess) {
                        setPaintStyle('');
                    }
                }, [isPaintProcess]);

                const squareKey = `${location}-cell-col-${indexRow}-row-${indexNumberRow}`;
                const isBottomBorder = (indexRow + 1) % PERIOD_OF_WIDE_TABLE_LINE === 0;
                const isRightBorder =
                    (indexNumberRow + 1) % PERIOD_OF_WIDE_TABLE_LINE === 0;

                const mistake = useAppSelector((state) => {
                    if (state.game.present.incorrectCells) {
                        return state.game.present.incorrectCells[indexRow][
                            indexNumberRow
                        ];
                    }
                    return null;
                });
                const isNotCorrect = mistake === null;

                const handlerFillSquare = () => {
                    dispatch(
                        updateAreaCell({
                            clickType: ClickType.MOUSE_CLICK,
                            indexRow,
                            indexNumberRow,
                        })
                    );
                    mistakesHandler(indexRow, indexNumberRow, dispatch, delayMistakes);
                    filledLineHandler(indexRow, indexNumberRow, dispatch, delayComplete);
                };
                const handleClick = () => {
                    handlerFillSquare();
                };
                const handleContext = () => {
                    dispatch(
                        updateAreaCell({
                            clickType: ClickType.MOUSE_CONTEXT,
                            indexRow,
                            indexNumberRow,
                        })
                    );
                    mistakesHandler(indexRow, indexNumberRow, dispatch, delayMistakes);
                    filledLineHandler(indexRow, indexNumberRow, dispatch, delayComplete);
                };

                const handleDrag: DragEventHandler = (event) => {
                    const dragCell = event.target;
                    if (dragCell instanceof HTMLElement) {
                        dragCell.style.opacity = '0';
                        requestAnimationFrame(() => {
                            dragCell.style.opacity = '1';
                        });
                    }
                    dispatch(
                        paintDrag({
                            paint: CellAreaState.FILLED,
                            indexRow,
                            indexNumberRow,
                        })
                    );
                    setTimeout(() => {
                        console.log(
                            '%c UPDATE STYLE PAINTER',
                            'background: #ddffff; color: #000'
                        );
                        dispatch(updatePaintProcess(true));
                    }, 0);
                    setPaintStyle(() => 'painted-square');
                    // console.log('on drag start!', indexRow, indexNumberRow);
                };
                const handleDragEnter: MouseEventHandler = (event) => {
                    // console.log('drag enter', indexRow, indexNumberRow);
                    dispatch(
                        paintDrag({
                            paint: CellAreaState.FILLED,
                            indexRow,
                            indexNumberRow,
                        })
                    );
                    setPaintStyle(() => 'painted-square');
                };
                const handleDragDrop: MouseEventHandler = (event) => {
                    // console.log('on drag drop!', indexRow, indexNumberRow);
                    dispatch(updatePaintedCells());
                    dispatch(updatePaintProcess(false));
                };
                // console.warn(
                //     'style',
                //     style,
                //     'paintStyle',
                //     paintStyle,
                //     indexRow,
                //     indexNumberRow
                // );
                return (
                    <AreaCell
                        key={squareKey}
                        handleClick={handleClick}
                        handleContext={handleContext}
                        handleDrag={handleDrag}
                        handleDragEnter={handleDragEnter}
                        handleDragDrop={handleDragDrop}
                        stateStyle={[
                            style,
                            paintStyle,
                            isNotCorrect ? 'incorrect-fill' : '',
                        ]}
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
