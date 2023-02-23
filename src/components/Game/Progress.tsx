import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../hooks';
import { store } from '../store';
import { selectUserSolution } from './gameSlice';

const getProgress = (userSolution?: (number | null)[][]): number | null => {
    if (userSolution) {
        const totalChecked = userSolution.flat().filter((cell) => cell !== null).length;
        const progress = (totalChecked / userSolution.flat().length) * 100;
        return Math.round(progress);
    }
    return 0;
};

function Progress(): JSX.Element {
    const userSolution = useAppSelector(selectUserSolution);
    const { t } = useTranslation();
    const progress = getProgress(userSolution);
    return (
        <div>
            {t('gameMarked')} {`${progress}%`}
        </div>
    );
}

export default Progress;
