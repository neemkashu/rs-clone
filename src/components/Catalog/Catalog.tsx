import { useEffect, useState } from 'react';
import { CatalogItem } from './CatalogItem';
import { NonogramObject, UserWinsObject } from '../../utils/types';
import { getCatalogDB, getSolvedGames } from '../../api/requests';

export function Catalog(): JSX.Element {
    const [catalogDB, setCatalogDB] = useState<NonogramObject[]>([]);
    const [solvedGamesArr, setSolvedGamesArr] = useState<string[]>([]);

    useEffect(() => {
        getCatalogDB().then((data) => {
            if (data.length) {
                setCatalogDB(data);
            }
        });
        getSolvedGames().then((data) =>
            setSolvedGamesArr(data.data.map((item) => item.currentGame.id))
        );
    }, []);
    return (
        <div className="p-2 d-flex flex-wrap gap-2">
            {catalogDB.map((item, index) => {
                return (
                    <CatalogItem
                        key={item.id}
                        catalogItem={item}
                        cardNumber={index + 1}
                        solvedGames={solvedGamesArr}
                    />
                );
            })}
        </div>
    );
}
