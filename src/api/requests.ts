import { NonogramObject, UserWinsObject } from '../utils/types';

export async function getCatalogDB(): Promise<NonogramObject[]> {
    try {
        const response = await fetch(
            'https://rs-clone-backend-1hqs.onrender.com/nonograms',
            {
                method: 'GET',
            }
        );
        if (!response.ok) {
            throw new Error('this error occurred while fetching the catalog database');
        }
        return await response.json();
    } catch (e) {
        console.warn(e);
        return [];
    }
}

export async function getSolvedGames(): Promise<UserWinsObject> {
    try {
        const response = await fetch(
            'https://rs-clone-backend-1hqs.onrender.com/users-games',
            {
                method: 'GET',
            }
        );
        if (!response.ok) {
            throw new Error('this error occurred while fetching the catalog database');
        }
        return await response.json();
    } catch (e) {
        console.warn(e);
        return { data: [] };
    }
}
