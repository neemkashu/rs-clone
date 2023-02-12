import { GamePopup } from '../GamePopup';
import { WinContent } from './WinContent';

export function WinComponent(): JSX.Element {
    const WIN_MODAL_CAPTIONS = {
        modalTitle: "Hooray, you've solved the nonogram!",
        modalDismissChoise: 'To Catalog',
        modalAcceptChoice: 'Try Again',
    };
    return (
        <GamePopup captions={WIN_MODAL_CAPTIONS}>
            <WinContent />
        </GamePopup>
    );
}
