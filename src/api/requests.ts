import { NonogramObject } from '../utils/types';

export async function getCatalogDB(): Promise<NonogramObject[]> {
    try {
        const response = await fetch('http://localhost:3000/nonograms', {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('this error occurred while fetching the catalog database');
        }
        return await response.json();
    } catch (e) {
        console.warn(e);
        return [];
    }
}

// to enable details for the logged in user you should use
// ! `credentials: 'include'`
// in fetch

// fetch('http://localhost:3000/users-games', {
//     method: 'GET',
//     credentials: 'include',
// });
