import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { HugeActionList, selectUserState } from '../gameSlice';
import { GameStatus } from './types';

export function useUndoActive() {
    const gameState = useAppSelector(selectUserState);
    const historyLength = useAppSelector((state) => state.game.past.length);
    const isLongHistory = historyLength > 1;
    const lastAction = useAppSelector((state) => state.game.present.lastAction);
    const preLastAction = useAppSelector((state) => {
        if (historyLength < 1) {
            return null;
        }
        return state.game.past[historyLength - 1].lastAction;
    });

    const isFirstActionDrag =
        preLastAction === HugeActionList.LOADED &&
        lastAction === HugeActionList.DRAG_START;

    const isActive =
        isLongHistory &&
        gameState !== GameStatus.FINISHED &&
        lastAction !== HugeActionList.LOADED &&
        !isFirstActionDrag;
    return isActive;
}
