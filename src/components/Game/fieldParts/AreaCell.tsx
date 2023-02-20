import { MouseEventHandler, DragEventHandler, useState } from 'react';
import { convertSettingToNumber } from '../../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { filledLineHandler } from '../gameLogic/filledLineHandler';
import { checkIsCellCorrect, mistakesHandler } from '../gameLogic/mistakesHandler';
import {
    paintDrag,
    updateAreaCell,
    updatePaintedCells,
    updatePaintProcessStart,
} from '../gameSlice';
import { AREA_STYLES, getAreaCellStyle } from '../gameUtils/helpers';
import { CellAreaState, ClickType } from '../gameUtils/types';
import Cell from './Cell';

const AreaStylesExtra = {
    INCORRECT: 'incorrect-fill',
    PAINTED: 'painted-square',
} as const;

export default function AreaCell({
    styles,
    indexRow,
    indexNumberRow,
}: {
    styles: string[];
    indexRow: number;
    indexNumberRow: number;
}): JSX.Element {
    const dispatch = useAppDispatch();
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
    const delayComplete = convertSettingToNumber(delayCompleteFromSetting);
    // const goalCell =
    //     store.getState().game.present.currentNonogram?.nonogram.goal[indexRow][
    //         indexNumberRow
    //     ];

    const userCell = useAppSelector((state) => {
        if (state.game.present.userGame?.currentUserSolution) {
            return state.game.present.userGame?.currentUserSolution[indexRow][
                indexNumberRow
            ];
        }
        return null;
    });
    // console.log('AREA CELL');

    // const isNotCorrect = !checkIsCellCorrect(userCell, goalCell);
    const mistake = useAppSelector((state) => {
        if (state.game.present.incorrectCells) {
            return state.game.present.incorrectCells[indexRow][indexNumberRow];
        }
        return null;
    });
    const isNotCorrect = mistake === null;

    const style = getAreaCellStyle(emptyCellMark, userCell);

    const isPaint = useAppSelector((state) => {
        if (state.game.present.paintedCells) {
            return state.game.present.paintedCells[indexRow][indexNumberRow];
        }
        return null;
    });

    // const [paintStyle, setPaintStyle] = useState('');

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
        dispatch(updatePaintProcessStart());
        dispatch(
            updatePaintedCells({
                paint: CellAreaState.FILLED,
                indexRow,
                indexNumberRow,
            })
        );
        setTimeout(() => {
            console.log('%c UPDATE STYLE PAINTER', 'background: #ddffff; color: #000');
            // dispatch(updatePaintProcess(true));
        }, 0);
        // setPaintStyle(() => 'painted-square');
        // console.log('on drag start!', indexRow, indexNumberRow);
    };

    const handleDragEnter: MouseEventHandler = (event) => {
        console.log('drag enter', indexRow, indexNumberRow);
        dispatch(
            updatePaintedCells({
                paint: CellAreaState.FILLED,
                indexRow,
                indexNumberRow,
            })
        );
        // setPaintStyle(() => 'painted-square');
        //     dispatch(
        //         updateAreaCell({
        //             clickType: ClickType.MOUSE_CLICK,
        //             indexRow,
        //             indexNumberRow,
        //         })
        //     );
    };
    const handleDragDrop: MouseEventHandler = (event) => {
        // console.log('on drag drop!', indexRow, indexNumberRow);
        dispatch(
            updatePaintedCells({ paint: CellAreaState.FILLED, indexRow, indexNumberRow })
        );
    };
    return (
        <Cell
            handleClick={handleClick}
            handleContext={handleContext}
            handleDrag={handleDrag}
            handleDragEnter={handleDragEnter}
            handleDragDrop={handleDragDrop}
            cellContent=""
            isDraggable
            styles={[...styles]}
            stateStyle={[
                style,
                isNotCorrect ? AreaStylesExtra.INCORRECT : '',
                isPaint === 1 ? AreaStylesExtra.PAINTED : '',
            ]}
        />
    );
}
