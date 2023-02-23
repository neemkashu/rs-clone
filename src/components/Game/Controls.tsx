import { useTranslation } from 'react-i18next';
import { CheckButton } from './controlButtons/CheckButton';
import { ClearButton } from './controlButtons/ClearButton';
import { RedoButton } from './controlButtons/RedoButton';
import { RestartButton } from './controlButtons/RestartButton';
import { UndoButton } from './controlButtons/UndoButton';

export function Controls(): JSX.Element {
    const { t } = useTranslation();
    return (
        <div className="btn-group btn-group-sm game-controls">
            <UndoButton caption={`${t('gameUndo')} ↪`} />
            <RedoButton caption={`${t('gameRedo')} ↩`} />
            <ClearButton />
            <RestartButton />
            <CheckButton />
            <button
                type="button"
                className="btn btn-toolbar btn-outline-primary btn-outline-danger"
            >
                {t('gameHint')}
            </button>
        </div>
    );
}
