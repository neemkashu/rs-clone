import { NonogramObject } from '../utils/types';

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
