import { useTranslation } from 'react-i18next';
import { CheckButton } from './controlButtons/CheckButton';
import { ClearButton } from './controlButtons/ClearButton';
import { RedoButton } from './controlButtons/RedoButton';
import { RestartButton } from './controlButtons/RestartButton';
import { UndoButton } from './controlButtons/UndoButton';

export function Controls(): JSX.Element {
    const { t } = useTranslation();
    return (
        <div className="btn-group game-controls">
            <UndoButton caption={`${t('gameUndo')} ↪`} />
            <RedoButton caption={`${t('gameRedo')} ↩`} />
            <ClearButton />
            <RestartButton />
            <CheckButton />
        </div>
    );
}
