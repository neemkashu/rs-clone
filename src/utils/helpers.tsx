import { Dispatch, SetStateAction } from 'react';
import { NonogramObject } from './types';

export const a = 10;

export const matchSmWindowSize = window.matchMedia('(max-width: 576px)');

export function handleAsideAfterWindowResize(
    query: MediaQueryList | MediaQueryListEvent,
    setIsBurgerBtnVisible: Dispatch<SetStateAction<boolean>>
): void {
    const aside = document.body.querySelector('#aside');
    const asideCloseBtn = document.body.querySelector(
        '#asideCloseBtn'
    ) as HTMLButtonElement;
    setIsBurgerBtnVisible(query.matches);
    if (query.matches) {
        asideCloseBtn.style.display = 'flex';
        aside?.classList.add('aside-modal');
        aside?.classList.remove('col-sm-4');
        aside?.classList.remove('col-md-3');
        aside?.classList.remove('col-lg-2');
    } else {
        asideCloseBtn.style.display = 'none';
        aside?.classList.remove('aside-modal');
        aside?.classList.add('col-sm-4');
        aside?.classList.add('col-md-3');
        aside?.classList.add('col-lg-2');
    }
}

export function handleAsideCloseBtnClick() {
    const aside = document.body.querySelector('#aside') as HTMLDivElement;
    aside.style.left = '-170px';
}

export async function getCatalogDB(): Promise<NonogramObject[]> {
    try {
        const response = await fetch('http://localhost:3000/nonograms', {
            method: 'GET',
        });
        return await response.json();
    } catch (e) {
        console.error(e);
        console.warn('this error occurred while fetching the catalog database');
        return [];
    }
}
