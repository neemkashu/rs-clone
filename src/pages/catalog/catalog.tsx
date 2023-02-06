import './catalog.scss';
import { useEffect, useState } from 'react';
import { CatalogItem } from '../../components/Catalog/Catalog-item';
import { NonogramObject } from '../../utils/types';

export function Catalog(): JSX.Element {
    const [catalogDB, setCatalogDB] = useState<NonogramObject[]>([]);
    useEffect(() => {
        (async function getCatalogDB() {
            try {
                const response = await fetch('http://localhost:3000/nonograms', {
                    method: 'GET',
                });
                const result = await response.json();
                setCatalogDB(result);
            } catch (e) {
                console.log(`${e} occured while fetch catalog DB`);
            }
        })();
    }, []);
    return (
        <div className="p-2 d-flex flex-wrap gap-2">
            {catalogDB.map((item, index) => {
                return <CatalogItem catalogItem={item} cardNumber={index + 1} />;
            })}
        </div>
    );
}
