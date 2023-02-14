import { useAppSelector } from '../hooks';
import { store } from '../store';

const CAPTIONS = {
    progress: 'Marked cells: ',
};
// TODO: may add to tech spec changing title from id to name after solution

const { progress: progressCaption } = CAPTIONS;

const getProgress = (userSolution?: (number | null)[][]): number | null => {
    if (userSolution) {
        const totalChecked = userSolution.flat().filter((cell) => cell !== null).length;
        const progress = (totalChecked / userSolution.flat().length) * 100;
        return Math.round(progress);
    }
    return 0;
};

function Progress(): JSX.Element {
    const userSolution = useAppSelector(
        (state) => state.game.userGame?.currentUserSolution
    );
    const progress = getProgress(userSolution);
    return (
        <div>
            {progressCaption} {`${progress}%`}
        </div>
    );
}

export default Progress;
