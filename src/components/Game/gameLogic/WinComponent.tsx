import { Link } from 'react-router-dom';
import { GamePopup } from '../modal/GamePopup';
import { NonogramRaw } from '../gameUtils/types';
import { WinContent } from './WinContent';

const WinModalCaptions = {
    modalTitle: "Hooray, you've solved the nonogram!",
    modalDismissChoise: 'To Catalog',
    modalAcceptChoice: 'Try Again',
} as const;
export function WinComponent(): JSX.Element {
    return (
        <GamePopup captions={WinModalCaptions}>
            <>
                <div className="modal-body">
                    <WinContent />
                </div>
                <div className="modal-footer">
                    <Link to="/catalog" className="btn btn-outline-dark">
                        {WinModalCaptions.modalDismissChoise}
                    </Link>
                </div>
            </>
        </GamePopup>
    );
}
