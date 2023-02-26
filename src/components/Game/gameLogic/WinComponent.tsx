import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import { GamePopup } from '../modal/GamePopup';
import { WinContent } from './WinContent';

export function WinComponent(): JSX.Element {
    const { t } = useTranslation();
    const WinModalCaptions = {
        modalTitle: t('gameCongrats'),
        modalDismissChoise: t('gameToCatalog'),
        modalAcceptChoice: '',
    } as const;
    return (
        <GamePopup captions={WinModalCaptions}>
            <>
                <div className="modal-body">
                    <WinContent />
                </div>
                <div className="modal-footer">
                    <NavLink to="/catalog" className="btn btn-outline-dark">
                        {t('gameToCatalog')}
                    </NavLink>
                </div>
            </>
        </GamePopup>
    );
}
