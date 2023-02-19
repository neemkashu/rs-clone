import './CatalogItem.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../hooks';
import { CatalogItemProps } from '../../utils/types';
import { drawImageFromMatrix, getNonogramTitle } from '../../utils/helpers';

export function CatalogItem({ catalogItem, cardNumber, solvedGames }: CatalogItemProps) {
    const { t, i18n } = useTranslation();
    const settingsMain = useAppSelector((state) => state.settings.main);

    function getNonogramTitleDependingOnSettings(): string {
        if (!settingsMain.showNonogramTitlesBeforeSolving) {
            if (solvedGames.includes(catalogItem.id)) {
                return getNonogramTitle(i18n.language, catalogItem);
            }
            return '#####';
        }
        return getNonogramTitle(i18n.language, catalogItem);
    }

    function getNonogramImageSrcDependingOnSettings() {
        if (!settingsMain.showNonogramThumbnailsBeforeSolving) {
            if (solvedGames.includes(catalogItem.id)) {
                return drawImageFromMatrix(catalogItem.nonogram.goal);
            }
            return 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930';
        }
        return drawImageFromMatrix(catalogItem.nonogram.goal);
    }

    return (
        <div className="catalog-item border border-secondary border-2 rounded">
            <div className="p-1">
                <div className="">{cardNumber}</div>
                <Link
                    to={`/game/${catalogItem.id}`}
                    className="catalog-item__image border border-2 rounded d-flex align-items-center p-1"
                >
                    <img
                        src={getNonogramImageSrcDependingOnSettings()}
                        alt="nonogram preview"
                        style={{
                            width: '100%',
                            maxHeight: '100%',
                        }}
                    />
                </Link>
                <div>
                    <div className="text-truncate">
                        {getNonogramTitleDependingOnSettings()}
                    </div>
                    <div>
                        {t('size')}: {catalogItem.nonogram.width}x
                        {catalogItem.nonogram.height}
                    </div>
                    <div>
                        {t('difficulty')}: {catalogItem.nonogram.difficulty}
                    </div>
                    <div>{t('print')}</div>
                </div>
            </div>
        </div>
    );
}
