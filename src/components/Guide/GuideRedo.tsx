import { useTranslation } from 'react-i18next';
import { RedoButton } from '../Game/controlButtons/RedoButton';

export function GuideRedo({ handleClick }: { handleClick: () => void }): JSX.Element {
    const { t } = useTranslation();
    return (
        <div
            role="presentation"
            onClick={handleClick}
            className="d-flex justify-content-center"
        >
            <RedoButton caption={`${t('guideRedo')} ↩`} />
        </div>
    );
}
