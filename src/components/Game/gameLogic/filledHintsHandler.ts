import { useAppDispatch } from '../../hooks';
import { NonogramHint } from '../gameUtils/types';

export function filledHintsHandler(
    indexColumn: number,
    dispatch: ReturnType<typeof useAppDispatch>,
    columnsUnified?: ({ isCrossedOut: boolean } | null)[][]
): void {
    console.log('check filledHintsHandler');
}
