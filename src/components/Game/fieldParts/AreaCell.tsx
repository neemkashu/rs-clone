import { MouseEventHandler, DragEventHandler, useState } from 'react';
import { convertSettingToNumber } from '../../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { filledLineHandler } from '../gameLogic/filledLineHandler';
import { checkIsCellCorrect, mistakesHandler } from '../gameLogic/mistakesHandler';
import {
    changeLastAction,
    HugeActionList,
    paintDrag,
    updateAreaCell,
    updatePaintedCells,
    updatePaintProcess,
} from '../gameSlice';
import { AREA_STYLES, getAreaCellStyle } from '../gameUtils/helpers';
import { CellAreaState, ClickType } from '../gameUtils/types';
import Cell from './Cell';

export const AreaStylesExtra = {
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

    const userCell = useAppSelector((state) => {
        if (state.game.present.userGame?.currentUserSolution) {
            return state.game.present.userGame?.currentUserSolution[indexRow][
                indexNumberRow
            ];
        }
        return null;
    });

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

    const handleClick = () => {
        dispatch(changeLastAction(HugeActionList.REGULAR));
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
    const handleContext = () => {
        dispatch(changeLastAction(HugeActionList.REGULAR));
        dispatch(
            updateAreaCell({
                clickType: ClickType.MOUSE_CONTEXT,
                indexRow,
                indexNumberRow,
            })
        );
        mistakesHandler(indexRow, indexNumberRow, dispatch, delayMistakes);
        // filledLineHandler(indexRow, indexNumberRow, dispatch, delayComplete);
    };

    const handleDrag: DragEventHandler = (event) => {
        const dragCell = event.target;
        if (dragCell instanceof HTMLElement) {
            dragCell.style.opacity = '0';
            requestAnimationFrame(() => {
                dragCell.style.opacity = '1';
            });
        }
        dispatch(updatePaintProcess(HugeActionList.DRAG_START));
        // dispatch(updatePaintProcessStart());
        dispatch(
            updatePaintedCells({
                paint: CellAreaState.FILLED,
                indexRow,
                indexNumberRow,
            })
        );
    };

    const handleDragEnter: MouseEventHandler = (event) => {
        event.preventDefault();
        dispatch(
            updatePaintedCells({
                paint: CellAreaState.FILLED,
                indexRow,
                indexNumberRow,
            })
        );
    };

    return (
        <Cell
            handleClick={handleClick}
            handleContext={handleContext}
            handleDrag={handleDrag}
            handleDragEnter={handleDragEnter}
            cellContent=""
            isDraggable
            styles={[...styles]}
            stateStyle={[
                style,
                isNotCorrect ? AreaStylesExtra.INCORRECT : '',
                isPaint === CellAreaState.FILLED ? AreaStylesExtra.PAINTED : '',
            ]}
        />
    );
}
