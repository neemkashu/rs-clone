import './CatalogItem.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CatalogItemProps } from '../../utils/types';
import { LanguagesShortNamesEnum } from '../../utils/enums';
import { drawImageFromMatrix } from '../../utils/helpers';

export function CatalogItem({ catalogItem, cardNumber, solvedGames }: CatalogItemProps) {
    const { t, i18n } = useTranslation();

    function getNonogramTitle() {
        const currentLang = i18n.language;
        if (currentLang === LanguagesShortNamesEnum.EN_VALUE)
            return catalogItem.nonogram.title.en;
        if (currentLang === LanguagesShortNamesEnum.DE_VALUE)
            return catalogItem.nonogram.title.de;
        if (currentLang === LanguagesShortNamesEnum.RU_VALUE)
            return catalogItem.nonogram.title.ru;
        return catalogItem.nonogram.title.en;
    }

    function isCurrentNonogramSolved() {
        return solvedGames.includes(catalogItem.id);
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
                        src={
                            isCurrentNonogramSolved()
                                ? drawImageFromMatrix(catalogItem.nonogram.goal)
                                : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
                        }
                        alt="nonogram preview"
                        style={{
                            width: '100%',
                            maxHeight: '100%',
                        }}
                    />
                </Link>
                <div>
                    <div className="text-truncate">
                        {isCurrentNonogramSolved() ? getNonogramTitle() : '#####'}
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
