import './Catalog-item.scss';

export function CatalogItem() {
    return (
        <div className="catalog-item border border-secondary border-2 rounded">
            <div className="container p-1">
                <div className="">10</div>
                <a href="/" className="catalog-item__image border border-2 rounded">
                    Place for Image
                </a>
                <div className="">
                    <div>Name or Id</div>
                    <div>Size: 25x25</div>
                    <div>Difficulty</div>
                    <div>Print</div>
                </div>
            </div>
        </div>
    );
}
