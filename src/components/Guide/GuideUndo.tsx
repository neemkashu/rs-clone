import { useTranslation } from 'react-i18next';
import { UndoButton } from '../Game/controlButtons/UndoButton';

export function GuideUndo({ handleClick }: { handleClick: () => void }): JSX.Element {
    const { t } = useTranslation();
    return (
        <div
            role="presentation"
            onClick={handleClick}
            className="d-flex justify-content-center"
        >
            <UndoButton caption={`${t('guideUndo')} ↪`} />
        </div>
    );
}
