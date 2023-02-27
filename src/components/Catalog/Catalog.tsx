import { useEffect, useState, useRef } from 'react';
import { CatalogItem } from './CatalogItem';
import { NonogramObject, UserGameObject } from '../../utils/types';
import { getCatalogDB, getSolvedGames } from '../../api/requests';
import { Loading } from '../Loading/Loading';
import { catalogDBLength } from '../../utils/constants';

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
        const container = document.querySelector('.section-container') as HTMLDivElement;
        if (fetching && catalogDB.length < catalogDBLength) {
            getCatalogDB(10, lastId)
                .then((data) => {
                    const nonogramsDB = data[1];
                    if (nonogramsDB.length) {
                        setCatalogDB([...catalogDB, ...nonogramsDB]);
                        setIsLoading(false);
                        setLastId(data[0]);
                    }
                })
                .finally(() => {
                    setFetching(false);
                    if (!(container?.scrollHeight > container?.clientHeight)) {
                        setTimeout(() => {
                            console.log('ass');
                            setFetching(true);
                        }, 0);
                    }
                });
            getSolvedGames().then((data) => {
                setSolvedGamesArr(data.data);
            });
        }
    }, [fetching]);

    useEffect(() => {
        const container = document.querySelector('.section-container');
        container?.addEventListener('scroll', scrollHandler);
        return () => container?.addEventListener('scroll', scrollHandler);
    }, []);

    return isLoading ? (
        <Loading />
    ) : (
        <div
            className="p-2"
            style={{
                justifyContent: 'center',
                display: 'grid',
                gridGap: '1rem',
                gridTemplateColumns: 'repeat(auto-fill, 250px)',
            }}
        >
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
