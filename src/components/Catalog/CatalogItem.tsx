import './CatalogItem.scss';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../hooks';
import { CatalogItemProps } from '../../utils/types';
import { getImageFromMatrix, getNonogramTitle } from '../../utils/helpers';

const imageLinkStyle = { height: '100px' };
const imagePreviewStyle = {
    maxHeight: '100%',
    maxWidth: '100%',
};

export function CatalogItem({ catalogItem, cardNumber, solvedGames }: CatalogItemProps) {
    const { t, i18n } = useTranslation();
    const settingsMain = useAppSelector((state) => state.settings.main);
    const imageToPrint = useRef(null);
    const startedGamesArr = solvedGames.filter((item) => {
        let isUserStartGame = false;
        isUserStartGame = item.currentGame.currentUserSolution.flat().includes(1);
        return isUserStartGame;
    });
    const startedGamesIdArr = startedGamesArr.map((item) => item.currentGame.id);
    const solvedGamesIdArr = solvedGames
        .filter((elem) => elem.bestTime > 0)
        .map((item) => item.currentGame.id);

    function getNonogramTitleDependingOnSettings(): string {
        if (!settingsMain.showNonogramTitlesBeforeSolving) {
            if (solvedGamesIdArr.includes(catalogItem.id)) {
                return getNonogramTitle(i18n.language, catalogItem);
            }
            return '#####';
        }
        return getNonogramTitle(i18n.language, catalogItem);
    }

    function getNonogramImageSrcDependingOnSettings() {
        const currentGameState = solvedGames.find(
            (elem) => elem.currentGame.id === catalogItem.id
        );
        const currentGameStateWithoutNull =
            currentGameState?.currentGame.currentUserSolution.map((item) =>
                item.map((value) => Number(value))
            );
        if (!settingsMain.showNonogramThumbnailsBeforeSolving) {
            if (solvedGamesIdArr.includes(catalogItem.id)) {
                return getImageFromMatrix(catalogItem.nonogram.goal);
            }
            if (startedGamesIdArr.includes(catalogItem.id)) {
                return getImageFromMatrix(currentGameStateWithoutNull);
            }
            return 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930';
        }
        return getImageFromMatrix(catalogItem.nonogram.goal);
    }

    return (
        <div className="catalog-item border border-secondary border-2 rounded-1">
            <div className="py-1 px-3 w-100">
                <div className="text-center my-1">{cardNumber}</div>
                <Link
                    to={`/game/${catalogItem.id}`}
                    className="catalog-item__image d-flex justify-content-center align-content-center p-1 my-1"
                    style={imageLinkStyle}
                >
                    <img
                        ref={imageToPrint}
                        src={getNonogramImageSrcDependingOnSettings()}
                        alt="nonogram preview"
                        style={imagePreviewStyle}
                    />
                </Link>
                <div>
                    <div className="text-truncate my-1">
                        {getNonogramTitleDependingOnSettings()}
                    </div>
                    <div className="text-truncate my-1">
                        {t('size')}: {catalogItem.nonogram.width}x
                        {catalogItem.nonogram.height}
                    </div>
                    <div className="text-truncate my-1">
                        {t('difficulty')}: {catalogItem.nonogram.difficulty}
                    </div>
                    <Link
                        to={`/print/${catalogItem.id}`}
                        type="button"
                        className="btn btn-secondary rounded-1 d-flex justify-content-center my-1"
                    >
                        {t('print')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
