import './Catalog-item.scss';
import { NonogramObject } from '../../utils/types';

type CatalogItemProps = {
    catalogItem: NonogramObject;
    cardNumber: number;
};

export function CatalogItem({ catalogItem, cardNumber }: CatalogItemProps) {
    return (
        <div className="catalog-item border border-secondary border-2 rounded">
            <div className="p-1">
                <div className="">{cardNumber}</div>
                <a href="/" className="catalog-item__image border border-2 rounded">
                    Place for Image
                </a>
                <div>
                    <div className="text-truncate">{catalogItem.nonogram.title.en}</div>
                    <div>
                        Size: {catalogItem.nonogram.width}x{catalogItem.nonogram.height}
                    </div>
                    <div>Difficulty</div>
                    <div>Print</div>
                </div>
            </div>
        </div>
    );
}
