import { useTranslation } from 'react-i18next';
import { UndoButton } from '../Game/controlButtons/UndoButton';
import { useUndoActive } from '../Game/gameUtils/hooks';

export function GuideUndo({ handleClick }: { handleClick: () => void }): JSX.Element {
    const { t } = useTranslation();
    const isActive = useUndoActive();

    const undoClick = () => {
        if (isActive) {
            handleClick();
        }
    };

    return (
        <div
            role="presentation"
            onClick={undoClick}
            className="d-flex justify-content-center"
        >
            <UndoButton caption={`${t('guideUndo')} ↪`} />
        </div>
    );
}
