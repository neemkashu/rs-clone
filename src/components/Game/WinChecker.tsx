import { useAppDispatch, useAppSelector } from '../hooks';
import { winClick } from './gameSlice';
import { CellAreaState, GameStatus, NonogramRaw } from './gameUtils/types';

export function WinChecker({ nonogramRaw }: { nonogramRaw: NonogramRaw }): JSX.Element {
    // console.warn('win checker is here!');
    const dispatch = useAppDispatch();
    const userSolution = useAppSelector(
        (state) => state.game.userGame?.currentUserSolution
    );
    const gameStatus = useAppSelector((state) => state.game.status);
    const puzzleSolution = nonogramRaw.nonogram.goal;
    if (userSolution && gameStatus !== GameStatus.FINISHED) {
        // console.log(puzzleSolution, userSolution);
        const isWin = puzzleSolution.every((row, indexRow) => {
            return row.every((cell, indexColumn) => {
                let isCorrect = false;
                const shouldBeEmpty = cell === CellAreaState.CROSSED;
                const shouldBeFilled = cell === CellAreaState.FILLED;
                const userCell = userSolution[indexRow][indexColumn];
                if (shouldBeFilled) {
                    isCorrect = userCell === CellAreaState.FILLED;
                }
                if (shouldBeEmpty) {
                    isCorrect =
                        userCell === CellAreaState.EMPTY ||
                        userCell === CellAreaState.CROSSED;
                }
                return isCorrect;
            });
        });
        if (isWin) {
            console.log('isWin', isWin);
            // dispatch(winClick(GameStatus.FINISHED));
            return <div>Win!</div>;
        }
    }
    return <div />;
}
