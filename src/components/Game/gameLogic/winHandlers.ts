import {
    CellAreaState,
    CellAreaStateType,
    GameStatus,
    NonogramRaw,
} from '../gameUtils/types';

const checkCorrectCell = (userCell: number | null, solutionCell: number): boolean => {
    switch (solutionCell) {
        case CellAreaState.CROSSED: {
            return userCell === CellAreaState.EMPTY || userCell === CellAreaState.CROSSED;
        }
        case CellAreaState.FILLED: {
            // TODO: implement checking of color nonograms
            return userCell === CellAreaState.FILLED;
        }
        default: {
            throw new Error('Error in database: wrong type of solution');
        }
    }
};
export function handleWinnerCheck(
    nonogramRaw: NonogramRaw,
    userSolution: (number | null)[][] | undefined,
    gameStatus: GameStatus | null
): boolean {
    const puzzleSolution = nonogramRaw.nonogram.goal;

    let isWin = false;

    if (userSolution && gameStatus !== GameStatus.FINISHED) {
        isWin = puzzleSolution.every((rowSolution, indexRow) => {
            return rowSolution.every((cellSolution, indexColumn) => {
                const userCell = userSolution[indexRow][indexColumn];
                return checkCorrectCell(userCell, cellSolution);
            });
        });
    }
    return isWin;
}