import { Link } from 'react-router-dom';
import { GamePopup } from '../GamePopup';
import { NonogramRaw } from '../gameUtils/types';
import { WinContent } from './WinContent';

export function WinComponent({ nonogramRaw }: { nonogramRaw: NonogramRaw }): JSX.Element {
    const WIN_MODAL_CAPTIONS = {
        modalTitle: "Hooray, you've solved the nonogram!",
        modalDismissChoise: 'To Catalog',
        modalAcceptChoice: 'Try Again',
    };
    return (
        <GamePopup captions={WIN_MODAL_CAPTIONS}>
            <WinContent nonogramRaw={nonogramRaw} />
            <Link to="/catalog" className="btn btn-outline-dark">
                {WIN_MODAL_CAPTIONS.modalDismissChoise}
            </Link>
        </GamePopup>
    );
}
