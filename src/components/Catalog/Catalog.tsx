import { useEffect, useState } from 'react';
import { CatalogItem } from './CatalogItem';
import { NonogramObject } from '../../utils/types';
import { getCatalogDB } from '../../utils/helpers';

export function Catalog(): JSX.Element {
    const [catalogDB, setCatalogDB] = useState<NonogramObject[]>([]);

    useEffect(() => {
        getCatalogDB().then((data) => {
            if (data.length) {
                setCatalogDB(data);
            }
        });
    }, []);

    return (
        <div className="p-2 d-flex flex-wrap gap-2">
            {catalogDB.map((item, index) => {
                return (
                    <CatalogItem
                        key={item.id}
                        catalogItem={item}
                        cardNumber={index + 1}
                    />
                );
            })}
        </div>
    );
}
