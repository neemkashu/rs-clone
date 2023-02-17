import './CatalogItem.scss';
import { useTranslation } from 'react-i18next';
import { CatalogItemProps } from '../../utils/types';
import { LanguagesShortNamesEnum } from '../../utils/enums';
import { drawImageFromMatrix } from '../../utils/helpers';

export function CatalogItem({ catalogItem, cardNumber }: CatalogItemProps) {
    const { t, i18n } = useTranslation();
    function getNonogramTitle() {
        const currentLang = i18n.language;
        if (
            currentLang === LanguagesShortNamesEnum.EN_VALUE ||
            navigator.language === LanguagesShortNamesEnum.EN_VALUE
        )
            return catalogItem.nonogram.title.en;
        if (
            currentLang === LanguagesShortNamesEnum.DE_VALUE ||
            navigator.language === LanguagesShortNamesEnum.DE_VALUE
        )
            return catalogItem.nonogram.title.de;
        if (
            currentLang === LanguagesShortNamesEnum.RU_VALUE ||
            navigator.language === LanguagesShortNamesEnum.RU_VALUE
        )
            return catalogItem.nonogram.title.ru;
        return catalogItem.nonogram.title.en;
    }

    return (
        <div className="catalog-item border border-secondary border-2 rounded">
            <div className="p-1">
                <div className="">{cardNumber}</div>
                <a
                    href="/"
                    className="catalog-item__image border border-2 rounded d-flex align-items-center p-1"
                >
                    <img
                        src={drawImageFromMatrix(catalogItem.nonogram.goal)}
                        alt="nonogram preview"
                        style={{
                            width: '100%',
                            maxHeight: '100%',
                        }}
                    />
                </a>
                <div>
                    <div className="text-truncate">{getNonogramTitle()}</div>
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
