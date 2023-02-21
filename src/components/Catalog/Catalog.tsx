import { useEffect, useState } from 'react';
import { CatalogItem } from './CatalogItem';
import { NonogramObject } from '../../utils/types';
import { getCatalogDB, getSolvedGames } from '../../api/requests';
import { Loading } from '../Loading/Loading';

export function Catalog(): JSX.Element {
    const [catalogDB, setCatalogDB] = useState<NonogramObject[]>([]);
    const [solvedGamesArr, setSolvedGamesArr] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getCatalogDB().then((data) => {
            if (data.length) {
                setCatalogDB(data);
                setIsLoading(false);
            }
        });
        getSolvedGames().then((data) =>
            setSolvedGamesArr(data.data.map((item) => item.currentGame.id))
        );
    }, []);
    return (
        <div className="p-2 d-flex flex-wrap gap-2">
            {isLoading ? (
                <Loading />
            ) : (
                catalogDB.map((item, index) => {
                    return (
                        <CatalogItem
                            key={item.id}
                            catalogItem={item}
                            cardNumber={index + 1}
                            solvedGames={solvedGamesArr}
                        />
                    );
                })
            )}
        </div>
    );
}
