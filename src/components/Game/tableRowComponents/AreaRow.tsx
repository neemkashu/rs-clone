import { MouseEventHandler, DragEventHandler } from 'react';
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
} from '../gameSlice';
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

const PERIOD_OF_WIDE_TABLE_LINE = 5;

export function AreaRow({ linesUnified, indexRow }: AreaRowProps) {
    const location: fieldPlace = FieldPlace.AREA;
    const dispatch = useAppDispatch();
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
                const style = getAreaCellStyle(userCell);
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
                    mistakesHandler(indexRow, indexNumberRow, dispatch, USER_TIMEOUT);
                    filledLineHandler(indexRow, indexNumberRow, dispatch, USER_TIMEOUT);
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
                    mistakesHandler(indexRow, indexNumberRow, dispatch, USER_TIMEOUT);
                    filledLineHandler(indexRow, indexNumberRow, dispatch, USER_TIMEOUT);
                };

                const handleDrag: DragEventHandler = (event) => {
                    const dragCell = event.target;
                    if (dragCell instanceof HTMLElement) {
                        dragCell.style.opacity = '0';
                        requestAnimationFrame(() => {
                            dragCell.style.opacity = '1';
                        });
                    }
                    // console.log('on drag start!', indexRow, indexNumberRow);
                };
                const handleDragEnter: MouseEventHandler = (event) => {
                    dispatch(
                        paintDrag({
                            paint: CellAreaState.FILLED,
                            indexRow,
                            indexNumberRow,
                        })
                    );
                    // handlerFillSquare();
                };
                const handleDrop: MouseEventHandler = (event) => {
                    // event.preventDefault();
                    const touchedCell = event.target;
                    if (touchedCell instanceof HTMLElement) {
                        // touchedCell.style.background = '#ffff00';
                    }
                    // console.log('on drag drop!', indexRow, indexNumberRow);
                };

                return (
                    <AreaCell
                        key={squareKey}
                        handleClick={handleClick}
                        handleContext={handleContext}
                        handleDrag={handleDrag}
                        handleDragEnter={handleDragEnter}
                        // handleDragDrop={handleDragDrop}
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
