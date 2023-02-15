import { MouseEventHandler, DragEventHandler } from 'react';
import Cell from './Cell';

export default function AreaCell({
    handleClick,
    handleContext,
    handleDrag,
    handleDragEnter,
    handleDragDrop,
    stateStyle,
    styles,
}: {
    handleClick: () => void;
    handleContext: () => void;
    handleDrag: DragEventHandler;
    handleDragEnter: MouseEventHandler;
    handleDragDrop?: MouseEventHandler;
    stateStyle: string[];
    styles: string[];
}): JSX.Element {
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
            stateStyle={[...stateStyle]}
        />
    );
}
