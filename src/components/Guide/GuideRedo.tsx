import { useTranslation } from 'react-i18next';
import { RedoButton } from '../Game/controlButtons/RedoButton';
import { useAppSelector } from '../hooks';

export function GuideRedo({ handleClick }: { handleClick: () => void }): JSX.Element {
    const { t } = useTranslation();
    const canRedo = useAppSelector((state) => state.game.future.length > 0);

    const redoClick = () => {
        if (canRedo) {
            handleClick();
        }
    };

    return (
        <div
            role="presentation"
            onClick={redoClick}
            className="d-flex justify-content-center"
        >
            <RedoButton caption={`${t('guideRedo')} ↩`} />
        </div>
    );
}
