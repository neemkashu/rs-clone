import { useEffect, useState, useRef } from 'react';
import { CatalogItem } from './CatalogItem';
import { NonogramObject } from '../../utils/types';
import { getCatalogDB, getSolvedGames } from '../../api/requests';
import { Loading } from '../Loading/Loading';

export function Catalog(): JSX.Element {
    const [catalogDB, setCatalogDB] = useState<NonogramObject[]>([]);
    const [solvedGamesArr, setSolvedGamesArr] = useState<string[]>([]);
    const [lastId, setLastId] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [fetching, setFetching] = useState<boolean>(true);
    const container = useRef<HTMLDivElement>(document.querySelector('#catalogContainer'));

    function scrollHandler(e: Event) {
        const elem = e.target as HTMLElement;
        if (elem.scrollHeight - (elem.scrollTop + elem.clientHeight) < 100) {
            setFetching(true);
        }
    }

    useEffect(() => {
        if (fetching) {
            console.log('fetching');
            getCatalogDB(3, lastId)
                .then((data) => {
                    const nonogramsDB = data[1];
                    if (nonogramsDB.length) {
                        setCatalogDB([...catalogDB, ...nonogramsDB]);
                        setIsLoading(false);
                        setLastId(data[0]);
                    }
                })
                .finally(() => setFetching(false));
            // getSolvedGames().then((data) =>
            //     setSolvedGamesArr(data.data.map((item) => item.currentGame.id))
            // );
        }
    }, [fetching]);

    useEffect(() => {
        const catalogContainer = container.current;
        catalogContainer?.addEventListener('scroll', scrollHandler);
        return () => catalogContainer?.addEventListener('scroll', scrollHandler);
    }, []);

    return (
        <div
            ref={container}
            className="p-2 d-flex flex-wrap gap-2 catalog"
            id="catalogContainer"
        >
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
