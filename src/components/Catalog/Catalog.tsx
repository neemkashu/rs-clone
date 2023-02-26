import { useEffect, useState, useRef } from 'react';
import { CatalogItem } from './CatalogItem';
import { NonogramObject, UserGameObject } from '../../utils/types';
import { getCatalogDB, getSolvedGames } from '../../api/requests';
import { Loading } from '../Loading/Loading';
import { catalogDBLength } from '../../utils/constants';

// const controllerNonogram = new AbortController();
// const { signal } = controllerNonogram;

export function Catalog(): JSX.Element {
    const [catalogDB, setCatalogDB] = useState<NonogramObject[]>([]);
    const [solvedGamesArr, setSolvedGamesArr] = useState<UserGameObject[]>([]);
    const [lastId, setLastId] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [fetching, setFetching] = useState<boolean>(true);

    function scrollHandler(e: Event) {
        const elem = e.target as HTMLElement;
        if (elem.scrollHeight - (elem.scrollTop + elem.clientHeight) < 100) {
            setFetching(true);
        }
    }

    useEffect(() => {
        if (fetching && catalogDB.length < catalogDBLength) {
            console.log('fetching');
            getCatalogDB(20, lastId)
                .then((data) => {
                    const nonogramsDB = data[1];
                    if (nonogramsDB.length) {
                        setCatalogDB([...catalogDB, ...nonogramsDB]);
                        setIsLoading(false);
                        setLastId(data[0]);
                    }
                })
                .finally(() => setFetching(false));
            getSolvedGames().then((data) => {
                setSolvedGamesArr(data.data);
            });
        }
    }, [fetching]);

    // useEffect(() => {
    //     return () => {
    //         console.log('unmount');
    //         controllerNonogram.abort();
    //     };
    // }, []);

    useEffect(() => {
        const container = document.querySelector('.section-container');
        container?.addEventListener('scroll', scrollHandler);
        return () => container?.addEventListener('scroll', scrollHandler);
    }, []);

    return isLoading ? (
        <Loading />
    ) : (
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
